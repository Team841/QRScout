import { describe, expect, it } from 'vitest';
import config from './config.json';

const prematch = config.sections.find(s => s.name === 'Prematch')!;
const autonomous = config.sections.find(s => s.name === 'Autonomous')!;
const teleop = config.sections.find(s => s.name === 'Teleop')!;

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

  describe('Autonomous section', () => {
    it('has a Missed Shots counter', () => {
      const field = autonomous.fields.find(f => f.code === 'aMiss');
      expect(field).toBeDefined();
      expect(field!.type).toBe('counter');
      expect(field!.defaultValue).toBe(0);
    });

    it('has a Travel over Bump checkbox', () => {
      const field = autonomous.fields.find(f => f.code === 'aBump');
      expect(field).toBeDefined();
      expect(field!.type).toBe('boolean');
      expect(field!.defaultValue).toBe(false);
    });

    it('has a Travel over Trench checkbox', () => {
      const field = autonomous.fields.find(f => f.code === 'aTrench');
      expect(field).toBeDefined();
      expect(field!.type).toBe('boolean');
      expect(field!.defaultValue).toBe(false);
    });

    it('has a Tower Scoring boolean checkbox', () => {
      const field = autonomous.fields.find(f => f.code === 'aTower');
      expect(field).toBeDefined();
      expect(field!.type).toBe('boolean');
      expect(field!.defaultValue).toBe(false);
    });
  });

  describe('Postmatch section', () => {
    const postmatch = config.sections.find(s => s.name === 'Postmatch')!;

    it('has a Robot Broke checkbox defaulting to false', () => {
      const field = postmatch.fields.find(f => f.code === 'broke');
      expect(field).toBeDefined();
      expect(field!.type).toBe('boolean');
      expect(field!.defaultValue).toBe(false);
    });

    it.each([
      ['roleOff', 'Offense'],
      ['roleCyc', 'Cycling'],
      ['rolePas', 'Passing'],
      ['roleHerd', 'Herding'],
      ['roleDef', 'Defense'],
    ])('has a %s role checkbox', (code, title) => {
      const field = postmatch.fields.find(f => f.code === code);
      expect(field).toBeDefined();
      expect(field!.type).toBe('boolean');
      expect(field!.title).toBe(title);
      expect(field!.defaultValue).toBe(false);
    });
  });

  describe('Teleop section', () => {
    it('has a Missed Shots counter', () => {
      const field = teleop.fields.find(f => f.code === 'tMiss');
      expect(field).toBeDefined();
      expect(field!.type).toBe('counter');
      expect(field!.defaultValue).toBe(0);
    });

    it('has a Travel over Bump checkbox', () => {
      const field = teleop.fields.find(f => f.code === 'tBump');
      expect(field).toBeDefined();
      expect(field!.type).toBe('boolean');
      expect(field!.defaultValue).toBe(false);
    });

    it('has a Travel over Trench checkbox', () => {
      const field = teleop.fields.find(f => f.code === 'tTrench');
      expect(field).toBeDefined();
      expect(field!.type).toBe('boolean');
      expect(field!.defaultValue).toBe(false);
    });

    it('has a Tower Scoring select with None/L1/L2/L3 defaulting to None', () => {
      const field = teleop.fields.find(f => f.code === 'tTower');
      expect(field).toBeDefined();
      expect(field!.type).toBe('select');
      expect(field!.defaultValue).toBe('None');
      expect(field!.choices).toMatchObject({
        None: 'None',
        L1: 'L1',
        L2: 'L2',
        L3: 'L3',
      });
    });
  });
});
