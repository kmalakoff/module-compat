import assert from 'assert';
import isAbsolute from 'is-absolute';
import { loadModule, supportsESM } from 'module-compat';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const DATA = path.join(__dirname, '..', 'data');

describe('loadModule', () => {
  describe('CJS modules', () => {
    it('loads a CJS function', (done) => {
      loadModule(path.join(DATA, 'cjs-module.cjs'), (err, mod) => {
        assert.equal(err, null);
        assert.equal(typeof mod, 'function');
        assert.equal((mod as () => string)(), 'cjs-result');
        done();
      });
    });

    it('loads a CJS object', (done) => {
      loadModule(path.join(DATA, 'cjs-object.cjs'), (err, mod) => {
        assert.equal(err, null);
        assert.deepEqual(mod, { value: 'cjs-object' });
        done();
      });
    });
  });

  describe('ESM modules', () => {
    before(function () {
      if (!supportsESM()) this.skip();
    });

    it('loads ESM with default export (interop: default)', (done) => {
      loadModule(path.join(DATA, 'esm-module.mjs'), { interop: 'default' }, (err, mod) => {
        assert.equal(err, null);
        assert.equal(typeof mod, 'function');
        assert.equal((mod as () => string)(), 'esm-result');
        done();
      });
    });

    it('loads ESM with raw namespace (interop: raw)', (done) => {
      loadModule(path.join(DATA, 'esm-module.mjs'), { interop: 'raw' }, (err, mod) => {
        assert.equal(err, null);
        assert.equal(typeof mod, 'object');
        assert.equal(typeof (mod as Record<string, unknown>).default, 'function');
        assert.equal(typeof (mod as Record<string, unknown>).namedExport, 'function');
        done();
      });
    });

    it('loads ESM with named exports only (interop: raw)', (done) => {
      loadModule(path.join(DATA, 'esm-named-only.mjs'), { interop: 'raw' }, (err, mod) => {
        assert.equal(err, null);
        assert.equal(typeof (mod as Record<string, unknown>).foo, 'function');
        assert.equal(typeof (mod as Record<string, unknown>).bar, 'function');
        done();
      });
    });
  });

  describe('moduleType override', () => {
    it('respects explicit moduleType: commonjs', (done) => {
      loadModule(path.join(DATA, 'cjs-module.cjs'), { moduleType: 'commonjs' }, (err, mod) => {
        assert.equal(err, null);
        assert.equal(typeof mod, 'function');
        done();
      });
    });
  });

  describe('error handling', () => {
    it('returns error for non-existent file', (done) => {
      loadModule(path.join(DATA, 'non-existent.cjs'), (err) => {
        assert.ok(err);
        assert.ok(err.message.indexOf('Cannot find module') >= 0 || (err as NodeJS.ErrnoException).code === 'MODULE_NOT_FOUND');
        done();
      });
    });
  });

  describe('absolute path handling', () => {
    // Windows requires file:// URLs for import(), not raw paths like D:\...
    // These tests verify absolute paths are handled correctly on all platforms

    it('loads CJS with absolute path', (done) => {
      const absolutePath = path.resolve(DATA, 'cjs-module.cjs');
      assert.ok(isAbsolute(absolutePath), 'path should be absolute');
      loadModule(absolutePath, (err, mod) => {
        assert.equal(err, null);
        assert.equal(typeof mod, 'function');
        done();
      });
    });

    it('loads ESM with absolute path', function (done) {
      if (!supportsESM()) return this.skip();
      const absolutePath = path.resolve(DATA, 'esm-module.mjs');
      assert.ok(isAbsolute(absolutePath), 'path should be absolute');
      loadModule(absolutePath, (err, mod) => {
        assert.equal(err, null);
        assert.equal(typeof mod, 'function');
        done();
      });
    });
  });
});
