import Papa from 'papaparse';

/**
 * Parses an uploaded CSV File into a structured student list.
 *
 * Expected CSV format:
 *   Student,Repository
 *   Ahmed,https://github.com/user1/project
 *   Sara,https://github.com/user2/project
 *
 * @param {File} file - The raw File object from the upload card.
 * @returns {Promise<{ students: Array<{student: string, repositoryUrl: string}>, warnings: string[] }>}
 * @throws {Error} on unreadable file, missing headers, or no valid students.
 */
export function parseStudentsCsv(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      transform: (v) => v.trim(),
      complete(results) {
        // ── Header validation ──────────────────────────────────────────
        const fields = results.meta.fields ?? [];
        const hasStudent = fields.some((f) => f.toLowerCase() === 'student');
        const hasRepository = fields.some((f) => f.toLowerCase() === 'repository');

        if (!hasStudent || !hasRepository) {
          return reject(
            new Error(
              'Invalid CSV format. The file must have "Student" and "Repository" columns as the header row.'
            )
          );
        }

        if (results.data.length === 0) {
          return reject(new Error('The CSV file is empty. Please add at least one student row.'));
        }

        // ── Row validation ─────────────────────────────────────────────
        const students = [];
        const warnings = [];

        results.data.forEach((row, index) => {
          const rowNum = index + 2; // +2 to account for header row (1-indexed)

          // Case-insensitive field lookup
          const studentKey = Object.keys(row).find((k) => k.toLowerCase() === 'student');
          const repoKey = Object.keys(row).find((k) => k.toLowerCase() === 'repository');

          const studentName = row[studentKey] ?? '';
          const repositoryUrl = row[repoKey] ?? '';

          if (!studentName) {
            warnings.push(`Row ${rowNum} skipped: Missing student name.`);
            return;
          }

          if (!repositoryUrl) {
            warnings.push(`Row ${rowNum} skipped: Missing Repository for student "${studentName}".`);
            return;
          }

          if (!repositoryUrl.startsWith('https://github.com/')) {
            warnings.push(
              `Row ${rowNum} skipped: Repository URL for "${studentName}" must begin with https://github.com/.`
            );
            return;
          }

          students.push({ student: studentName, repositoryUrl });
        });

        if (students.length === 0) {
          return reject(
            new Error('No valid students were detected in the CSV. Please check the file and try again.')
          );
        }

        resolve({ students, warnings });
      },
      error(err) {
        reject(new Error(`Failed to read CSV file: ${err.message}`));
      },
    });
  });
}
