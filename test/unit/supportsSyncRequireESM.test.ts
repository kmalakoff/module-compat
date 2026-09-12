import assert from 'assert';
import { supportsSyncRequireESM } from 'module-compat';

describe('supportsSyncRequireESM', () => {
  it('returns a boolean', () => {
    assert.equal(typeof supportsSyncRequireESM(), 'boolean');
  });

  it('returns true for Node 23+', () => {
    const major = +process.versions.node.split('.')[0];
    assert.equal(supportsSyncRequireESM(), major >= 23);
  });
});
