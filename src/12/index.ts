const path = "./src/12/data.txt";
const file = Bun.file(path);

const data = await file.text();
const grid = data.split("\n").map((line) => line.split(""));

const move = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
} as const;

const dirs = ["up", "down", "left", "right"] as const;

function nextKey(key: string, map: Record<string, Set<string>>) {
  if (!map[key]) return key;
  return nextKey(key + key[0], map);
}

function buildGardenMap(grid: string[][]) {
  let seen = new Set<string>();
  let map = {} as Record<string, Set<string>>;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (seen.has(`${i},${j}`)) continue;

      const key = grid[i][j];
      let queue = [[i, j]];
      let region = new Set<string>([]);

      while (queue.length) {
        const [r, c] = queue.shift() || [-1, -1];
        if (grid[r][c] !== key) continue;
        if (seen.has(`${r},${c}`)) continue;

        seen.add(`${r},${c}`);
        region.add(`${r},${c}`);

        for (let dir of dirs) {
          const [dr, dc] = move[dir];
          const [nr, nc] = [r + dr, c + dc];
          if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[nr].length)
            continue;

          queue.push([nr, nc]);
        }
      }

      const next = nextKey(key, map);
      map[next] = region;
    }
  }

  return map;
}

function calculatePerimeter(region: Set<string>) {
  let perimeter = 0;

  for (let point of region) {
    const [r, c] = point.split(",").map(Number);
    for (let dir of dirs) {
      const [dr, dc] = move[dir];
      const [nr, nc] = [r + dr, c + dc];
      if (!region.has(`${nr},${nc}`)) {
        perimeter++;
      }
    }
  }

  return perimeter;
}

function part1() {
  const garden = buildGardenMap(grid);

  return Object.entries(garden).reduce((acc, [key, cur]) => {
    const area = cur.size;
    const perimeter = calculatePerimeter(cur);

    return acc + area * perimeter;
  }, 0);
}

function part2() {
  return null;
}

console.log("Part 1:", part1());
console.log("Part 2:", part2());
