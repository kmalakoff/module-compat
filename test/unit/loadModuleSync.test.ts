import assert from 'assert';
import isAbsolute from 'is-absolute';
import { loadModuleSync } from 'module-compat';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const DATA = path.join(__dirname, '..', 'data');

describe('loadModuleSync', () => {
  describe('CJS modules', () => {
    it('loads a CJS function', () => {
      const mod = loadModuleSync(path.join(DATA, 'cjs-module.cjs'));
      assert.equal(typeof mod, 'function');
      assert.equal((mod as () => string)(), 'cjs-result');
    });

    it('loads a CJS object', () => {
      const mod = loadModuleSync(path.join(DATA, 'cjs-object.cjs'));
      assert.deepEqual(mod, { value: 'cjs-object' });
    });

    it('respects interop: raw for CJS', () => {
      const mod = loadModuleSync(path.join(DATA, 'cjs-object.cjs'), { interop: 'raw' });
      assert.deepEqual(mod, { value: 'cjs-object' });
    });
  });

  describe('error handling', () => {
    it('throws for non-existent file', () => {
      assert.throws(() => {
        loadModuleSync(path.join(DATA, 'non-existent.cjs'));
      }, /Cannot find module/);
    });
  });

  describe('absolute path handling', () => {
    // Verify absolute paths work correctly on all platforms (including Windows)

    it('loads CJS with absolute path', () => {
      const absolutePath = path.resolve(DATA, 'cjs-module.cjs');
      assert.ok(isAbsolute(absolutePath), 'path should be absolute');
      const mod = loadModuleSync(absolutePath);
      assert.equal(typeof mod, 'function');
    });
  });
});
