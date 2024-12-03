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

console.log("Part 1:", part1());
console.log("Part 2:", part2());

function part1() {
  const sortedLeft = left.sort();
  const sortedRight = right.sort();

  return sortedLeft.reduce(
    (acc, cur, i) => acc + Math.abs(cur - sortedRight[i]),
    0
  );
}

function part2() {
  return left.reduce((acc, cur) => {
    const occurances = right.filter((r) => r === cur).length;
    return acc + occurances * cur;
  }, 0);
}
