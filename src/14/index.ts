const path = "./src/14/data.txt";
const file = Bun.file(path);

type Line = `p=${number},${number} v=${number},${number}`;

const data = await file.text();
const lines = data.split("\n") as Line[];
const positions = lines.map((line) => {
  const [c, r, vc, vr] = line.match(/-?\d+/g)?.map(Number) as number[];

  return { r, c, vr, vc };
});
const [maxR, maxC] = [103, 101] as const;

type Position = (typeof positions)[number];

function move(position: Position, count = 100) {
  if (count === 0) return position;

  const nr = (position.r + position.vr + maxR) % maxR;
  const nc = (position.c + position.vc + maxC) % maxC;

  return move({ ...position, r: nr, c: nc }, count - 1);
}

function isInQuadrant({ r, c }: Position) {
  return r !== Math.floor(maxR / 2) && c !== Math.floor(maxC / 2);
}

function toQuadrant({ r, c }: Position) {
  if (r < maxR / 2 && c < maxC / 2) return "a";
  if (r < maxR / 2 && c >= maxC / 2) return "b";
  if (r >= maxR / 2 && c < maxC / 2) return "c";
  if (r >= maxR / 2 && c >= maxC / 2) return "d";
  return "a";
}

function part1() {
  const { a, b, c, d } = positions.reduce(
    (acc, position) => {
      const newPosition = move(position);
      if (!isInQuadrant(newPosition)) return acc;
      const quadrant = toQuadrant(newPosition);

      return { ...acc, [quadrant]: acc[quadrant] + 1 };
    },
    { a: 0, b: 0, c: 0, d: 0 }
  );

  return a * b * c * d;
}

function moveOnce(position: Position) {
  const nr = (position.r + position.vr + maxR) % maxR;
  const nc = (position.c + position.vc + maxC) % maxC;

  return { ...position, r: nr, c: nc };
}

function buildGrid(positions: Position[]) {
  const grid = Array.from({ length: maxR }, () =>
    Array.from({ length: maxC }, () => " ")
  );

  for (const { r, c } of positions) {
    grid[r][c] = "#";
  }

  return grid;
}

function part2() {
  let poss = [...positions];
  let seconds = 0;

  while (true) {
    poss = poss.map(moveOnce);
    seconds++;

    let grid = buildGrid(poss);
    let rows = grid.map((row) => row.join(""));

    // This is just a silly naive way to find a christmas tree
    if (rows.some((row) => row.includes("############"))) {
      return seconds;
    }
  }
}

console.log("Part 1:", part1());
console.log("Part 2:", part2());
