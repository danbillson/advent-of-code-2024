const path = "./src/16/data.txt";
const file = Bun.file(path);

const data = await file.text();
const grid = data.split("\n").map((line) => line.split(""));

const move = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
} as const;

const directions = ["up", "down", "left", "right"] as const;

type Pos = [number, number];

type State = {
  path: Pos[];
  score: number;
  lastDirection: (typeof directions)[number] | null;
};

function findStart(grid: string[][]): [number, number] {
  const sr = grid.findIndex((row) => row.includes("S"));
  const sc = grid[sr].indexOf("S");

  return [sr, sc];
}

function travel(grid: string[][], start: Pos): number | null {
  let queue: State[] = [
    {
      path: [start],
      score: 0,
      lastDirection: null,
    },
  ];

  let seen = new Map<string, number>();

  while (queue.length) {
    queue.sort((a, b) => a.score - b.score);
    const state = queue.shift()!;
    const [r, c] = state.path[state.path.length - 1];

    if (grid[r][c] === "E") {
      return state.score;
    }

    const key = `${r},${c}`;
    const best = seen.get(key) ?? Infinity;
    if (state.score >= best) continue;
    seen.set(key, state.score);

    for (const dir of directions) {
      const [dr, dc] = move[dir];
      const [nr, nc] = [r + dr, c + dc];

      if (grid[nr][nc] === "#") continue;

      const sd = dir === state.lastDirection ? 1 : 1001;

      queue.push({
        path: [...state.path, [nr, nc]],
        score: state.score + sd,
        lastDirection: dir,
      });
    }
  }

  return null;
}

function part1() {
  const start = findStart(grid);
  return travel(grid, start);
}

function part2() {
  return null;
}

console.log("Part 1:", part1());
console.log("Part 2:", part2());
