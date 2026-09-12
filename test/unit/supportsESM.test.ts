import assert from 'assert';
import { supportsESM } from 'module-compat';

describe('supportsESM', () => {
  it('returns a boolean', () => {
    assert.equal(typeof supportsESM(), 'boolean');
  });

  it('returns true for Node 12+', () => {
    const major = +process.versions.node.split('.')[0];
    assert.equal(supportsESM(), major >= 12);
  });
});
