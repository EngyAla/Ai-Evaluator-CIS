import { performance } from 'perf_hooks';
import { AI_CONFIG } from '../config/ai.config.js';
import { generateContent as gemini } from './providers/gemini-provider.js';

// Explicit provider registry
const providers = {
  gemini
  // Future providers (e.g. openai, claude) will be imported and registered here
};

/**
 * Orchestrates prompt evaluation by delegating to the configured provider
 * and tracking execution duration in milliseconds.
 * 
 * @param {string} prompt - Raw evaluation prompt.
 * @returns {Promise<import('../types/ai-response.schema.js').AIResponse>}
 */
export async function evaluatePrompt(prompt) {
  const providerName = AI_CONFIG.provider;

  const activeProviderFn = providers[providerName];
  if (!activeProviderFn) {
    throw new Error(`Unsupported AI provider: "${providerName}". Supported providers are: ${Object.keys(providers).join(', ')}`);
  }

  const startTime = performance.now();

  try {
    const providerResult = await activeProviderFn(prompt);
    const endTime = performance.now();

    return {
      ...providerResult,
      durationMs: Math.round(endTime - startTime)
    };
  } catch (error) {
    throw error;
  }
}
