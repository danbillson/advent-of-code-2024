const path = "./src/10/data.txt";
const file = Bun.file(path);

const data = await file.text();
const map = data.split("\n").map((line) => line.split("").map(Number));

const move = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
} as const;

const dirs = ["up", "down", "left", "right"] as const;

console.log("Part 1:", part1());
console.log("Part 2:", part2());

function findStarts(map: number[][]): [number, number][] {
  let starts = [];

  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      if (map[r][c] === 0) {
        starts.push([r, c] as [number, number]);
      }
    }
  }

  return starts;
}

function travel(map: number[][], pos: [number, number]) {
  let seen = new Set<string>();
  let completed = new Set<string>();
  let queue = [pos];
  let trailheads = 0;

  while (queue.length) {
    const [r, c] = queue.shift() || [-1, -1];
    const currentValue = map[r][c];

    for (let dir of dirs) {
      const [dr, dc] = move[dir];
      const [nr, nc] = [r + dr, c + dc];

      if (r === pos[0] && c === pos[1]) seen.add(`${nr}${nc}-${r}${c}`);

      if (nr < 0 || nr >= map.length || nc < 0 || nc >= map[nr].length)
        continue;

      const key = `${r}${c}-${nr}${nc}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const completedKey = `${pos[0]}${pos[1]}-${nr}${nc}`;
      const nextValue = map[nr][nc];
      if (
        nextValue === 9 &&
        currentValue === 8 &&
        !completed.has(completedKey)
      ) {
        trailheads++;
        completed.add(completedKey);
        continue;
      }

      if (nextValue === currentValue + 1) {
        queue.push([nr, nc]);
      }
    }
  }

  return trailheads;
}

function part1() {
  const starts = findStarts(map);

  return starts.reduce((acc, start) => acc + travel(map, start), 0);
}

function part2() {
  return null;
}
