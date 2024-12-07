const path = "./src/00/data.txt";
const file = Bun.file(path);

const data = await file.text();
const lines = data.split("\n");
const grid = data.split("\n").map((line) => line.split(""));

console.log("Part 1:", part1());
console.log("Part 2:", part2());

function part1() {
  return null;
}

function part2() {
  return null;
}
