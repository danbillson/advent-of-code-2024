const path = "./src/15/data.txt";
const file = Bun.file(path);

const data = await file.text();
const [top, bottom] = data.split("\n\n");
const grid = top.split("\n").map((line) => line.split(""));
const instructions = bottom.split("\n").join("").split("") as Direction[];

function findStart(grid: string[][]): [number, number] {
  const sr = grid.findIndex((row) => row.includes("@"));
  const sc = grid[sr].indexOf("@");

  return [sr, sc];
}

const move = {
  "^": [-1, 0],
  v: [1, 0],
  "<": [0, -1],
  ">": [0, 1],
} as const;

type Direction = keyof typeof move;

function shift(grid: string[][], r: number, c: number, dir: Direction) {
  let [dr, dc] = move[dir];
  const nr = r + dr;
  const nc = c + dc;

  if (grid[nr][nc] === "#") return [r, c];
  if (grid[nr][nc] === ".") {
    grid[r][c] = ".";
    grid[nr][nc] = "@";
    return [nr, nc];
  }

  while (grid[nr + dr][nc + dc] === "O") {
    dr += move[dir][0];
    dc += move[dir][1];
  }

  if (grid[nr + dr][nc + dc] === "#") return [r, c];

  grid[r][c] = ".";
  grid[nr][nc] = "@";
  grid[nr + dr][nc + dc] = "O";

  return [nr, nc];
}

function gps(grid: string[][]) {
  let score = 0;

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[0].length - 1; j++) {
      if (grid[i][j] === "O") score += 100 * i + j;
    }
  }

  return score;
}

function part1() {
  const gridCopy = [...grid];
  let [r, c] = findStart(gridCopy);

  for (let dir of instructions) {
    [r, c] = shift(gridCopy, r, c, dir);
  }

  return gps(gridCopy);
}

function part2() {
  return null;
}

console.log("Part 1:", part1());
console.log("Part 2:", part2());
