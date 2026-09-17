import test from 'node:test';
import assert from 'node:assert/strict';
import { formatFormula, rollDice } from '../src/roller.js';

test('rollDice adds dice and modifier and resolves difficulty', () => {
  const result = rollDice({ count: 2, sides: 6, modifier: 2, difficulty: 10 }, () => 0.5);
  assert.deepEqual(result, { dice: [4, 4], total: 10, success: true });
});
test('formatFormula formats negative modifiers', () => assert.equal(formatFormula({ count: 1, sides: 20, modifier: -3 }), '1d20 − 3'));
test('rollDice rejects invalid dice pools', () => assert.throws(() => rollDice({ count: 0, sides: 6 }), RangeError));
