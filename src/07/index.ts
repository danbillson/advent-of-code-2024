const path = "./src/07/data.txt";
const file = Bun.file(path);

const data = await file.text();
const lines = data.split("\n") as `${string}: ${string}`[];

type Calibration = {
  target: number;
  values: number[];
};
const calibrations = lines.map((line) => {
  const [target, rest] = line.split(": ");
  const values = rest.split(" ").map(Number);
  return { target: Number(target), values };
}) as Calibration[];

const operations = ["+", "*"];

console.log("Part 1:", part1());
console.log("Part 2:", part2());

function combinations(length: number) {
  if (length === 1) return operations;

  const prev = combinations(length - 1);
  const combos = prev.flatMap((op) =>
    operations.map((o) => `${op}${o}`)
  ) as string[];
  return combos;
}

function evaluate({ target, values }: Calibration) {
  const ops = combinations(values.length - 1);

  for (const opString of ops) {
    let value = values[0];

    for (let i = 0; i < opString.length; i++) {
      const op = opString[i];
      const next = values[i + 1];

      if (op === "+") value += next;
      if (op === "*") value *= next;
    }

    if (value === target) return target;
  }

  return 0;
}

function part1() {
  return calibrations.reduce((acc, cur) => {
    return acc + evaluate(cur);
  }, 0);
}

function part2() {
  return null;
}
