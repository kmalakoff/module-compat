const assert = require('assert');
const { extToModuleType, loadModule, loadModuleSync, moduleType, supportsESM, supportsSyncRequireESM } = require('module-compat');

describe('exports .cjs', () => {
  it('extToModuleType', () => {
    assert.equal(typeof extToModuleType, 'function');
  });
  it('loadModule', () => {
    assert.equal(typeof loadModule, 'function');
  });
  it('loadModuleSync', () => {
    assert.equal(typeof loadModuleSync, 'function');
  });
  it('moduleType', () => {
    assert.equal(typeof moduleType, 'function');
  });
  it('supportsESM', () => {
    assert.equal(typeof supportsESM, 'function');
  });
  it('supportsSyncRequireESM', () => {
    assert.equal(typeof supportsSyncRequireESM, 'function');
  });
});
