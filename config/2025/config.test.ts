import { describe, expect, it } from 'vitest';
import config from './config.json';

const prematch = config.sections.find(s => s.name === 'Prematch')!;

describe('2025 config', () => {
  it('page title is REBUILT', () => {
    expect(config.page_title).toBe('REBUILT');
  });

  describe('Prematch section', () => {
    it('has a Set Up Location select field defaulting to empty', () => {
      const field = prematch.fields.find(f => f.code === 'setupLoc');
      expect(field).toBeDefined();
      expect(field!.type).toBe('select');
      expect(field!.defaultValue).toBe('');
      expect(field!.choices).toMatchObject({
        '': '',
        bump: 'Bump',
        trench: 'Trench',
        hub: 'Hub',
      });
    });

    it('has a No Show boolean field defaulting to false', () => {
      const field = prematch.fields.find(f => f.code === 'noShow');
      expect(field).toBeDefined();
      expect(field!.type).toBe('boolean');
      expect(field!.defaultValue).toBe(false);
    });
  });
});
