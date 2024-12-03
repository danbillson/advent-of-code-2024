const path = "./src/03/data.txt";
const file = Bun.file(path);

const data = await file.text();
const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
const matches = data.match(regex) as string[];

const fullRegex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;
const doDontMatches = data.match(fullRegex) as string[];

console.log("Part 1:", part1());
console.log("Part 2:", part2());

function part1() {
  return matches.reduce((acc, cur) => {
    const [_, a, b] = cur.match(/mul\((\d{1,3}),(\d{1,3})\)/) as string[];
    return acc + Number(a) * Number(b);
  }, 0);
}

function part2() {
  let match = true;
  return doDontMatches.reduce((acc, cur) => {
    if (cur === "do()") {
      match = true;
      return acc;
    }

    if (cur === "don't()") {
      match = false;
      return acc;
    }

    if (!match) return acc;

    const [_, a, b] = cur.match(/mul\((\d{1,3}),(\d{1,3})\)/) as string[];
    return acc + Number(a) * Number(b);
  }, 0);
}
