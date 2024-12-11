const path = "./src/11/data.txt";
const file = Bun.file(path);

const data = await file.text();
const stones = data.split(" ").map(Number);

export function memoize<Args extends unknown[], Result>(
  func: (...args: Args) => Result
): (...args: Args) => Result {
  const stored = new Map<string, Result>();

  return (...args) => {
    const k = JSON.stringify(args);
    if (stored.has(k)) {
      return stored.get(k)!;
    }
    const result = func(...args);
    stored.set(k, result);
    return result;
  };
}

const blink = memoize((stone: number, blinks: number): number => {
  if (blinks === 0) return 1;
  if (stone === 0) return blink(1, blinks - 1);
  const digits = Math.floor(Math.log10(stone)) + 1;
  if (digits % 2 === 0) {
    const exp = 10 ** (digits / 2);
    const left = Math.floor(stone / exp);
    const right = stone % exp;
    return blink(left, blinks - 1) + blink(right, blinks - 1);
  }
  return blink(stone * 2024, blinks - 1);
});

console.log("Part 1:", part1());
console.log("Part 2:", part2());

function part1() {
  return stones.reduce((acc, stone) => acc + blink(stone, 25), 0);
}

function part2() {
  return stones.reduce((acc, stone) => acc + blink(stone, 75), 0);
}
