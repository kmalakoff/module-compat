import Module from 'module';

import applyInterop from './applyInterop.ts';
import moduleType from './moduleType.ts';
import supportsSyncRequireESM from './supportsSyncRequireESM.ts';
import type { LoadOptions } from './types.ts';

const _require = typeof require === 'undefined' ? Module.createRequire(import.meta.url) : require;

/**
 * Sync version - only works for CJS or ESM on Node 23+.
 * Throws if ESM on Node < 23.
 */
export default function loadModuleSync(filePath: string, options?: LoadOptions): unknown {
  const opts = options || {};
  const type = opts.moduleType === 'auto' || !opts.moduleType ? moduleType(filePath) : opts.moduleType;

  if (type === 'commonjs') {
    const mod = _require(filePath);
    return applyInterop(mod, opts);
  }

  // ESM
  if (!supportsSyncRequireESM()) {
    throw new Error(`Sync loading of ESM requires Node 23+. Current: ${process.version}. Use loadModule() (async) instead.`);
  }

  const mod = _require(filePath);
  return applyInterop(mod, opts);
}
