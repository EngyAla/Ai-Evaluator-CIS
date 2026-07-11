/**
 * Parses a raw AI evaluation text response into a structured report object.
 * 
 * @param {string} rawResponse - The raw evaluation string returned by the LLM.
 * @returns {import('../types/evaluation.schema.js').EvaluationReport} - Structured evaluation report.
 */
export function parseEvaluation(rawResponse) {
  if (!rawResponse || typeof rawResponse !== 'string' || rawResponse.trim() === '') {
    throw new Error('Cannot parse an empty AI evaluation.');
  }

  const text = rawResponse.replace(/\r\n/g, '\n').trim();
  const lines = text.split('\n');

  // Summary is always the first line
  const summary = lines[0].trim();

  // Determine if it is a correct submission
  const isCorrect = text.includes('Excellent work!') || text.includes('Everything is correct.');
  if (isCorrect) {
    return {
      summary: "Excellent work!",
      totalIssues: 0,
      issues: []
    };
  }

  const issues = [];
  let currentFile = null;
  let currentIssueMessage = '';
  let currentSnippet = null;
  let inCodeBlock = false;
  let codeBlockLines = [];

  function commitCurrentIssue() {
    if (currentIssueMessage.trim() === '') {
      return;
    }

    // Clean up bullet point prefixes, list spacing, and stars
    let cleanMessage = currentIssueMessage
      .replace(/^[\s*\-+\d.)#]+/, '') // remove leading bullets
      .trim();

    // Clean up internal bullet points or formatting
    cleanMessage = cleanMessage
      .replace(/\n\s*[*+-]\s*/g, ' ') // join sub-bullet lines with spaces
      .replace(/\s+/g, ' '); // collapse spaces

    // Strip trailing colons or dashes
    cleanMessage = cleanMessage.replace(/:\s*$/, '').trim();

    // Remove markdown bold around Task titles
    cleanMessage = cleanMessage.replace(/\*\*(Task \d+ [^*]+)\*\*:\s*/gi, '$1: ');
    cleanMessage = cleanMessage.replace(/\*\*(Task \d+ [^*]+)\*\*\s*/gi, '$1 ');

    // Auto-detect file references mentioned inside the issue message
    let issueFile = currentFile;
    const fileMatch = cleanMessage.match(/(?:^|\s|\`|'|")([\w\-./()]+\.(?:html|css|js))(?:$|\b|\`|'|")/i);
    if (fileMatch) {
      issueFile = fileMatch[1];
      currentFile = issueFile; // update active file context
    }

    if (cleanMessage) {
      issues.push({
        file: issueFile,
        message: cleanMessage,
        snippet: currentSnippet || null
      });
    }

    currentIssueMessage = '';
    currentSnippet = null;
    codeBlockLines = [];
  }

  // Loop starting from index 1 (skipping summary line)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Handle code blocks
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        currentSnippet = codeBlockLines.join('\n');
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeBlockLines = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    if (trimmed === '') {
      continue;
    }

    // Check for "In <filename>" pattern to set file context
    const fileMatch = line.match(/In\s+[`*_\b]?([\w\-./()]+\.(?:html|css|js))[`*_\b]?:?/i);
    if (fileMatch) {
      commitCurrentIssue();
      currentFile = fileMatch[1];
      continue;
    }

    // Check if it is a language header preceding a code block (e.g. "HTML" or "CSS")
    const isLangHeader = ['html', 'css', 'js', 'javascript'].includes(trimmed.toLowerCase());
    if (isLangHeader) {
      let nextLineIsCodeBlock = false;
      for (let j = i + 1; j < lines.length; j++) {
        const nextTrimmed = lines[j].trim();
        if (nextTrimmed === '') continue;
        if (nextTrimmed.startsWith('```')) {
          nextLineIsCodeBlock = true;
        }
        break;
      }
      if (nextLineIsCodeBlock) {
        continue; // skip the language header line
      }
    }

    // Check for a new bullet point indicating a new issue
    // Matches bullet points, numbered lists, or lines starting with Task X or **Task X**
    const isNewBullet = 
      /^[ \t]{0,2}[*+-]\s+/.test(line) || 
      /^[ \t]{0,2}\d+\.\s+/.test(line) ||
      /^[ \t]{0,2}\*\*Task\s+\d+/i.test(line) ||
      /^[ \t]{0,2}Task\s+\d+/i.test(line);

    if (isNewBullet) {
      commitCurrentIssue();
      currentIssueMessage = trimmed;
    } else {
      // Append line content
      if (currentIssueMessage === '') {
        currentIssueMessage = trimmed;
      } else {
        currentIssueMessage += '\n' + trimmed;
      }
    }
  }

  // Commit last issue in flight
  commitCurrentIssue();

  // General fallback: if no issues parsed, but there's feedback content after summary, save as a general issue
  if (issues.length === 0 && text.length > summary.length) {
    const remainingText = lines.slice(1).join('\n').trim();
    if (remainingText) {
      issues.push({
        file: null,
        message: remainingText.replace(/\s+/g, ' ').trim(),
        snippet: null
      });
    }
  }

  return {
    summary: summary,
    issues,
    totalIssues: issues.length
  };
}
