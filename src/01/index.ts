const path = "./src/01/data.txt";
const file = Bun.file(path);

const data = await file.text();
const lines = data.split("\n");

const { left, right } = lines.reduce(
  (acc, cur) => {
    const [l, r] = cur.split("   ");
    return { left: [...acc.left, Number(l)], right: [...acc.right, Number(r)] };
  },
  { left: [], right: [] } as { left: number[]; right: number[] }
);

const sortedLeft = left.sort();
const sortedRight = right.sort();

console.log("Part 1:", part1());
console.log("Part 2:", part2());

function part1() {
  let diff = 0;

  for (let i = 0; i < sortedLeft.length; i++) {
    diff += Math.abs(sortedLeft[i] - sortedRight[i]);
  }

  return diff;
}

function part2() {
  let similarity = 0;

  for (let l of left) {
    let occurances = 0;
    for (let r of right) {
      if (l === r) {
        occurances++;
      }
    }
    similarity += occurances * l;
  }

  return similarity;
}
