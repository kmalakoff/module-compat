import type { LoadOptions } from './types.ts';

/**
 * Apply interop transformation to a loaded module.
 */
export default function applyInterop(mod: unknown, options: LoadOptions): unknown {
  const interop = options.interop || 'default';

  if (interop === 'raw') {
    return mod;
  }

  if (interop === 'typescript') {
    // TypeScript-style: check __esModule flag (set by transpilers)
    if (mod && typeof mod === 'object' && (mod as Record<string, unknown>).__esModule) {
      return (mod as Record<string, unknown>).default;
    }
    return mod;
  }

  // interop: 'default' - extract .default if present
  if (mod && typeof mod === 'object' && 'default' in mod) {
    return (mod as Record<string, unknown>).default;
  }
  return mod;
}
