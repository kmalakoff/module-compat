import type { ModuleType } from './types.ts';

const EXT_MAP: Record<string, ModuleType> = {
  '.mjs': 'module',
  '.mts': 'module',
  '.cjs': 'commonjs',
  '.cts': 'commonjs',
};

/**
 * Detect module type from extension only (no filesystem access).
 * Returns undefined for .js/.ts files (need package.json check).
 */
export default function extToModuleType(ext: string): ModuleType | undefined {
  return EXT_MAP[ext];
}
