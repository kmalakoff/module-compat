import fs from 'fs';
import moduleRoot from 'module-root-sync';
import path from 'path';

import extToModuleType from './extToModuleType.ts';
import type { ModuleType } from './types.ts';

// Cache for package.json lookups
const typeCache: Record<string, ModuleType> = {};

/**
 * Detect module type from file path using Node.js resolution rules.
 * Sync version - reads package.json synchronously.
 * Results are cached by directory.
 */
export default function moduleType(filePath: string): ModuleType {
  // Rule 1: Extension takes precedence
  const ext = path.extname(filePath);
  const fromExt = extToModuleType(ext);
  if (fromExt) return fromExt;

  // Check cache
  const fileDir = path.dirname(path.resolve(filePath));
  if (typeCache[fileDir]) return typeCache[fileDir];

  // Rule 2: Find package.json using module-root-sync
  try {
    const pkgDir = moduleRoot(fileDir, { includeSynthetic: true });
    const pkgPath = path.join(pkgDir, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    const type: ModuleType = pkg.type === 'module' ? 'module' : 'commonjs';
    typeCache[fileDir] = type;
    typeCache[pkgDir] = type;
    return type;
  } catch (_err) {
    // No package.json found or parse error
  }

  // Default to commonjs (Node's default)
  typeCache[fileDir] = 'commonjs';
  return 'commonjs';
}
