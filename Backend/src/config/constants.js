import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ALLOWED_EXTENSIONS = ['.html', '.css', '.js'];
export const IGNORED_DIRS = ['node_modules', 'dist', 'build', '.git', 'images', 'videos', 'fonts'];
export const IGNORED_FILES = ['package-lock.json', 'package.json', 'README.md', '.DS_Store'];

export const REPOS_DIR = path.resolve(__dirname, '../../workspace/repositories');
export const OUTPUT_DIR = path.resolve(__dirname, '../../output');

export const PROMPT_VERSION = '1.0.0';
