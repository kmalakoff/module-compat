import Module from 'module';

import applyInterop from './applyInterop.ts';
import moduleType from './moduleType.ts';
import supportsESM from './supportsESM.ts';
import supportsSyncRequireESM from './supportsSyncRequireESM.ts';
import type { LoadCallback, LoadOptions } from './types.ts';

const _require = typeof require === 'undefined' ? Module.createRequire(import.meta.url) : require;

/**
 * Load a module (CJS or ESM) with callback-based API.
 * Works on all Node versions - uses require() or import() as appropriate.
 */
export default function loadModule(filePath: string, callback: LoadCallback): void;
export default function loadModule(filePath: string, options: LoadOptions, callback: LoadCallback): void;
export default function loadModule(filePath: string, optionsOrCallback: LoadOptions | LoadCallback, maybeCallback?: LoadCallback): void {
  let options: LoadOptions;
  let callback: LoadCallback;

  if (typeof optionsOrCallback === 'function') {
    options = {};
    callback = optionsOrCallback;
  } else {
    options = optionsOrCallback;
    callback = maybeCallback as LoadCallback;
  }

  const type = options.moduleType === 'auto' || !options.moduleType ? moduleType(filePath) : options.moduleType;

  if (type === 'commonjs') {
    try {
      const mod = _require(filePath);
      callback(null, applyInterop(mod, options));
    } catch (err) {
      callback(err as Error);
    }
    return;
  }

  // ESM
  if (!supportsESM()) {
    callback(new Error(`ESM requires Node 12+. Current: ${process.version}`));
    return;
  }

  if (supportsSyncRequireESM()) {
    // Node 23+: sync require works on ESM
    try {
      const mod = _require(filePath);
      callback(null, applyInterop(mod, options));
    } catch (err) {
      callback(err as Error);
    }
    return;
  }

  // Node 12-22: use import()
  // ESM build: preserved as import()
  // CJS build: transpiled to require() - will fail on .mjs, but that's expected
  import(filePath).then((mod) => callback(null, applyInterop(mod, options))).catch((err) => callback(err));
}
