const path = "./src/06/data.txt";
const file = Bun.file(path);

const data = await file.text();
const grid = data.split("\n").map((line) => line.split(""));
const [sr, sc] = findStart(grid);

const move = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
} as const;

const dirs = ["up", "right", "down", "left"] as const;

type Dir = keyof typeof move;

function findStart(grid: string[][]): [number, number] {
  const sr = grid.findIndex((row) => row.includes("^"));
  const sc = grid[sr].indexOf("^");
  grid[sr][sc] = ".";

  return [sr, sc];
}

function travel(grid: string[][], [sr, sc]: [number, number]) {
  const seen = new Set<string>([`${sr},${sc}`]);
  const route = new Set<string>([`${sr},${sc},up`]);
  const queue = [[sr, sc]];
  let dir: Dir = "up";
  let isBlocked = false;

  while (queue.length) {
    const [r, c] = queue.shift()!;
    const [dr, dc] = move[dir];

    if (
      r + dr < 0 ||
      r + dr >= grid.length ||
      c + dc < 0 ||
      c + dc >= grid[0].length
    )
      break;

    if (route.has(`${r + dr},${c + dc},${dir}`)) {
      isBlocked = true;
      break;
    }

    const nextTile = grid[r + dr][c + dc];

    if (nextTile === "#") {
      dir = dirs[(dirs.indexOf(dir) + 1) % 4] as Dir;
      queue.push([r, c]);
      route.add(`${r},${c},${dir}`);
      continue;
    }

    queue.push([r + dr, c + dc]);
    seen.add(`${r + dr},${c + dc}`);
    route.add(`${r + dr},${c + dc},${dir}`);
  }

  return { seen, route, isBlocked };
}

console.log("Part 1:", part1());
console.log("Part 2:", part2());

function part1() {
  const { seen } = travel(grid, [sr, sc]);

  return seen.size;
}

function part2() {
  const { seen: seenSet } = travel(grid, [sr, sc]);
  const [, ...seen] = [...seenSet].map((s) => s.split(",").map(Number));

  return seen.reduce((acc, [r, c]) => {
    grid[r][c] = "#";
    const { isBlocked } = travel(grid, [sr, sc]);
    grid[r][c] = ".";
    return acc + (isBlocked ? 1 : 0);
  }, 0);
}
