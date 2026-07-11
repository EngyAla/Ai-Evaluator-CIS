import { evaluateRepository } from '../services/repository-evaluator.service.js';

/**
 * Handles HTTP requests for evaluation.
 * Performs validation, invokes the service layer, and formats the responses.
 */
export async function evaluate(req, res) {
  const { repositoryUrl, rubric, rubricFile } = req.body;

  // Validate request input parameters
  if (!repositoryUrl) {
    return res.status(400).json({
      success: false,
      message: 'Missing repositoryUrl'
    });
  }

  // The rubric parameter can be sent as "rubric" or "rubricFile"
  const selectedRubricFile = rubric || rubricFile;
  if (!selectedRubricFile) {
    return res.status(400).json({
      success: false,
      message: 'Missing rubricFile'
    });
  }

  try {
    const result = await evaluateRepository({
      repositoryUrl,
      rubricFile: selectedRubricFile
    });

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('API Evaluation Error:', error);
    
    // Check error message content to return standard descriptive messages
    let responseMessage = error.message;

    // Map internal descriptive errors if they are wrapped or different
    if (error.message.includes('Repository cloning failed')) {
      responseMessage = 'Repository cloning failed.';
    } else if (error.message.includes('Gemini evaluation failed') || error.message.includes('AI evaluation failed')) {
      responseMessage = 'Gemini evaluation failed.';
    }

    return res.status(500).json({
      success: false,
      message: responseMessage
    });
  }
}
