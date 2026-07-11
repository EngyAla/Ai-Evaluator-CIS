/**
 * @typedef {Object} AIResponse
 *
 * @property {string} provider - The name of the AI provider (e.g. 'gemini')
 * @property {string} model - The name of the model used (e.g. 'gemini-2.5-flash')
 * @property {string} text - The raw, unparsed response text returned by the model
 * @property {Object} usage - Statistics on prompt and response character counts
 * @property {number} usage.promptCharacters - Total characters in the sent prompt
 * @property {number} usage.responseCharacters - Total characters in the returned response
 * @property {number} durationMs - Round-trip duration of the API request in milliseconds
 */
export {};
