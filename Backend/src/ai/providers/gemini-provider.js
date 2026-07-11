import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { AI_CONFIG } from '../../config/ai.config.js';

dotenv.config();

// ── Retry configuration ────────────────────────────────────────────────────
const MAX_RETRIES        = 3;
const INITIAL_DELAY_MS   = 5000;
const BACKOFF_MULTIPLIER = 2;

/** HTTP / gRPC status codes that are safe to retry (transient failures). */
const RETRYABLE_CODES = [
  429,  // RESOURCE_EXHAUSTED — quota or rate-limit
  503,  // UNAVAILABLE        — temporary service outage
];

// ── Helpers ────────────────────────────────────────────────────────────────

/** Returns true when the error is a transient failure worth retrying. */
function isRetryable(error) {
  const msg = error?.message ?? '';
  if (RETRYABLE_CODES.includes(error?.status)) return true;
  if (RETRYABLE_CODES.includes(error?.code))   return true;
  if (msg.includes('RESOURCE_EXHAUSTED'))       return true;
  if (msg.includes('UNAVAILABLE'))              return true;
  if (msg.includes('503'))                      return true;
  if (msg.includes('429'))                      return true;
  return false;
}

/** Returns true when the error is permanent and must not be retried. */
function isPermanent(error) {
  const msg = error?.message ?? '';
  return (
    msg.includes('API_KEY_INVALID') ||
    msg.includes('API key not valid') ||
    msg.includes('INVALID_ARGUMENT') ||
    msg.includes('Empty prompt')
  );
}

/** Resolves after `ms` milliseconds. */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Sends a prompt to the Google Gemini API using the official SDK.
 * Retries up to MAX_RETRIES times on transient failures (429 / 503)
 * with exponential back-off. Permanent errors are surfaced immediately.
 *
 * @param {string} prompt
 * @returns {Promise<Omit<import('../../types/ai-response.schema.js').AIResponse, 'durationMs'>>}
 */
export async function generateContent(prompt) {
  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
    throw new Error('Empty prompt: Prompt content must be a non-empty string.');
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing API key: GEMINI_API_KEY is not defined in the environment.');
  }

  const modelName = AI_CONFIG.model;
  const ai = new GoogleGenAI({ apiKey });

  let lastError = null;
  let delayMs   = INITIAL_DELAY_MS;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model:    modelName,
        contents: prompt,
      });

      if (!response || !response.text) {
        throw new Error('Empty response: Received an empty response from Gemini API.');
      }

      const responseText = response.text;

      return {
        provider: 'gemini',
        model:    modelName,
        text:     responseText,
        usage: {
          promptCharacters:   prompt.length,
          responseCharacters: responseText.length,
        },
      };
    } catch (error) {
      lastError = error;
      const msg = error?.message ?? '';

      // ── Permanent errors — fail immediately, no retry ──────────────
      if (isPermanent(error)) {
        if (msg.includes('API_KEY_INVALID') || msg.includes('API key not valid')) {
          throw new Error('Invalid API key: GEMINI_API_KEY is incorrect.');
        }
        if (msg.includes('ENOTFOUND') || msg.includes('EAI_AGAIN') || msg.includes('fetch failed')) {
          throw new Error('Network failure: Unable to reach Gemini API. Please check your internet connection.');
        }
        throw new Error(`Gemini API failure: ${msg}`);
      }

      // ── Transient errors — retry with back-off ─────────────────────
      if (isRetryable(error) && attempt < MAX_RETRIES) {
        const statusTag = msg.includes('RESOURCE_EXHAUSTED') || msg.includes('429')
          ? '429 RESOURCE_EXHAUSTED'
          : '503 UNAVAILABLE';

        console.warn(
          `[Gemini] Request failed (${statusTag}).\n` +
          `  Retrying... Attempt ${attempt + 1} of ${MAX_RETRIES}\n` +
          `  Waiting ${delayMs} ms...`
        );

        await sleep(delayMs);
        delayMs *= BACKOFF_MULTIPLIER;
        continue;
      }

      // ── Final attempt or non-retryable unknown error ───────────────
      if (attempt === MAX_RETRIES) {
        console.error('[Gemini] Maximum retry attempts reached. Evaluation failed.');
      }

      // Re-classify the error with a clean message for upstream callers
      if (msg.includes('RESOURCE_EXHAUSTED') || error?.status === 429) {
        throw new Error(`Gemini API quota exceeded after ${MAX_RETRIES} retry attempts.`);
      }
      if (msg.includes('UNAVAILABLE') || error?.status === 503) {
        throw new Error(`Gemini API temporarily unavailable after ${MAX_RETRIES} retry attempts.`);
      }
      throw new Error(`Gemini API failure: ${msg}`);
    }
  }

  // Shouldn't be reached, but satisfies linters
  throw new Error(`Gemini API failure after ${MAX_RETRIES} attempts: ${lastError?.message}`);
}
