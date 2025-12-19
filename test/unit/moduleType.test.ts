import assert from 'assert';
import { moduleType } from 'module-compat';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const DATA = path.join(__dirname, '..', 'data');

describe('moduleType', () => {
  describe('extension-based detection', () => {
    it('returns module for .mjs files', () => {
      assert.equal(moduleType(path.join(DATA, 'esm-module.mjs')), 'module');
    });

    it('returns commonjs for .cjs files', () => {
      assert.equal(moduleType(path.join(DATA, 'cjs-module.cjs')), 'commonjs');
    });
  });

  describe('package.json detection', () => {
    it('detects type from package.json', () => {
      // This package has "type": "module" in package.json
      const result = moduleType(path.join(__dirname, '..', '..', 'src', 'index.ts'));
      assert.equal(result, 'module');
    });
  });

  describe('caching', () => {
    it('returns consistent results for same directory', () => {
      const file1 = path.join(DATA, 'cjs-module.cjs');
      const file2 = path.join(DATA, 'cjs-object.cjs');
      const result1 = moduleType(file1);
      const result2 = moduleType(file2);
      // Both should be detected consistently
      assert.equal(result1, result2);
    });
  });
});
