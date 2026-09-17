export function rollDice({ count, sides, modifier = 0, difficulty = 0 }, random = Math.random) {
  const safeCount = Number(count);
  const safeSides = Number(sides);
  const safeModifier = Number(modifier);
  const safeDifficulty = Number(difficulty);
  if (!Number.isInteger(safeCount) || safeCount < 1 || safeCount > 20) throw new RangeError('Dice count must be between 1 and 20.');
  if (!Number.isInteger(safeSides) || safeSides < 2 || safeSides > 100) throw new RangeError('Die sides must be between 2 and 100.');
  if (!Number.isInteger(safeModifier) || !Number.isInteger(safeDifficulty)) throw new TypeError('Modifier and difficulty must be integers.');
  const dice = Array.from({ length: safeCount }, () => Math.floor(random() * safeSides) + 1);
  const total = dice.reduce((sum, die) => sum + die, safeModifier);
  return { dice, total, success: safeDifficulty === 0 ? null : total >= safeDifficulty };
}

export function formatFormula({ count, sides, modifier }) {
  const suffix = modifier === 0 ? '' : ` ${modifier > 0 ? '+' : '−'} ${Math.abs(modifier)}`;
  return `${count}d${sides}${suffix}`;
}
