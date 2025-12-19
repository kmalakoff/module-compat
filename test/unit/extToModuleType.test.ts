import assert from 'assert';
import { extToModuleType } from 'module-compat';

describe('extToModuleType', () => {
  it('returns module for .mjs', () => {
    assert.equal(extToModuleType('.mjs'), 'module');
  });

  it('returns module for .mts', () => {
    assert.equal(extToModuleType('.mts'), 'module');
  });

  it('returns commonjs for .cjs', () => {
    assert.equal(extToModuleType('.cjs'), 'commonjs');
  });

  it('returns commonjs for .cts', () => {
    assert.equal(extToModuleType('.cts'), 'commonjs');
  });

  it('returns undefined for .js', () => {
    assert.equal(extToModuleType('.js'), undefined);
  });

  it('returns undefined for .ts', () => {
    assert.equal(extToModuleType('.ts'), undefined);
  });

  it('returns undefined for unknown extensions', () => {
    assert.equal(extToModuleType('.txt'), undefined);
    assert.equal(extToModuleType('.json'), undefined);
  });
});
