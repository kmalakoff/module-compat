import assert from 'assert';
import { extToModuleType, loadModule, loadModuleSync, moduleType, supportsESM, supportsSyncRequireESM } from 'module-compat';

describe('exports .ts', () => {
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
