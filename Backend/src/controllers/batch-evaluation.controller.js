import { evaluateBatch } from '../services/batch-evaluator.service.js';

/**
 * Handles HTTP request for batch evaluation.
 * Performs request body validation and delegates to batch evaluation service.
 */
export async function evaluate(req, res) {
  const { rubricFile, students } = req.body;

  if (!rubricFile) {
    return res.status(400).json({
      success: false,
      message: 'Missing rubricFile'
    });
  }

  if (!students) {
    return res.status(400).json({
      success: false,
      message: 'Missing students'
    });
  }

  if (!Array.isArray(students) || students.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'students is empty'
    });
  }

  // Validate each student entry
  for (let i = 0; i < students.length; i++) {
    const s = students[i];
    if (!s || typeof s !== 'object') {
      return res.status(400).json({
        success: false,
        message: `Invalid student object at index ${i}`
      });
    }
    if (!s.student) {
      return res.status(400).json({
        success: false,
        message: `Missing student at index ${i}`
      });
    }
    if (!s.repositoryUrl) {
      return res.status(400).json({
        success: false,
        message: `Missing repositoryUrl for student at index ${i}`
      });
    }
  }

  try {
    const data = await evaluateBatch({ rubricFile, students });
    return res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Batch Evaluation Request Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unexpected server error prevents execution.'
    });
  }
}
