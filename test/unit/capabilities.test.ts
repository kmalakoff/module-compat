import assert from 'assert';
import { supportsESM, supportsSyncRequireESM } from 'module-compat';

describe('capability detection', () => {
  describe('supportsESM', () => {
    it('returns a boolean', () => {
      assert.equal(typeof supportsESM(), 'boolean');
    });

    it('returns true for Node 12+', () => {
      const major = +process.versions.node.split('.')[0];
      assert.equal(supportsESM(), major >= 12);
    });
  });

  describe('supportsSyncRequireESM', () => {
    it('returns a boolean', () => {
      assert.equal(typeof supportsSyncRequireESM(), 'boolean');
    });

    it('returns true for Node 23+', () => {
      const major = +process.versions.node.split('.')[0];
      assert.equal(supportsSyncRequireESM(), major >= 23);
    });
  });
});
