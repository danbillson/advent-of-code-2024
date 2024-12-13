const path = "./src/13/data.txt";
const file = Bun.file(path);

const data = await file.text();
const groups = data.split("\n\n");

function formatMachines(groups: string[], offset = 0) {
  return groups.map((group) => {
    const [a, b, prize] = group
      .split("\n")
      .map((line) => line.match(/\d+/g)?.map(Number) as [number, number]);

    return {
      a: { x: a[0], y: a[1], cost: 3 },
      b: { x: b[0], y: b[1], cost: 1 },
      prize: { x: prize[0] + offset, y: prize[1] + offset },
    };
  });
}

type Machine = ReturnType<typeof formatMachines>[0];

// Cramers rule - https://www.cuemath.com/algebra/cramers-rule/
function cost({ a, b, prize }: Machine) {
  const d = a.x * b.y - a.y * b.x;
  if (d === 0) return 0;

  const numA = (prize.x * b.y - prize.y * b.x) / d;
  const numB = (a.x * prize.y - a.y * prize.x) / d;

  if (
    Number.isInteger(numA) &&
    Number.isInteger(numB) &&
    numA >= 0 &&
    numB >= 0
  ) {
    return numA * a.cost + numB * b.cost;
  }

  return 0;
}

function part1() {
  const machines = formatMachines(groups);

  return machines.reduce((acc, machine) => acc + cost(machine), 0);
}

function part2() {
  const machines = formatMachines(groups, 10000000000000);

  return machines.reduce((acc, machine) => acc + cost(machine), 0);
}

console.log("Part 1:", part1());
console.log("Part 2:", part2());
