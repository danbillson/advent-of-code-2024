const path = "./src/08/data.txt";
const file = Bun.file(path);

const data = await file.text();
const grid = data.split("\n").map((line) => line.split(""));

console.log("Part 1:", part1());
console.log("Part 2:", part2());

function inBounds(row: number, col: number) {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}

function addAntinode(
  row: number,
  col: number,
  frequency: string,
  placed: Set<string>
) {
  let antinodes = 0;
  for (let i = row; i < grid.length; i++) {
    const start = i === row ? col + 1 : 0;
    for (let j = start; j < grid[0].length; j++) {
      if (grid[i][j] === frequency) {
        const dr = i - row;
        const dc = j - col;

        const nr1 = row - dr;
        const nc1 = col - dc;
        const nr2 = i + dr;
        const nc2 = j + dc;

        if (inBounds(nr1, nc1) && !placed.has(`${nr1},${nc1}`)) {
          antinodes++;
          placed.add(`${nr1},${nc1}`);
        }
        if (inBounds(nr2, nc2) && !placed.has(`${nr2},${nc2}`)) {
          antinodes++;
          placed.add(`${nr2},${nc2}`);
        }
      }
    }
  }
  return antinodes;
}

function part1() {
  const placed = new Set<string>();
  return grid.reduce((acc, row, r) => {
    return (
      acc +
      row.reduce((acc, cell, c) => {
        if (cell === ".") return acc;

        return acc + addAntinode(r, c, cell, placed);
      }, 0)
    );
  }, 0);
}

function addMultinodes(
  row: number,
  col: number,
  frequency: string,
  placed: Set<string>
) {
  for (let i = row; i < grid.length; i++) {
    const start = i === row ? col + 1 : 0;
    for (let j = start; j < grid[0].length; j++) {
      if (grid[i][j] === frequency) {
        const dr = i - row;
        const dc = j - col;

        let nr1 = row - dr;
        let nc1 = col - dc;
        let nr2 = i + dr;
        let nc2 = j + dc;

        placed.add(`${row},${col}`);
        placed.add(`${i},${j}`);

        while (inBounds(nr1, nc1)) {
          placed.add(`${nr1},${nc1}`);
          nr1 -= dr;
          nc1 -= dc;
        }

        while (inBounds(nr2, nc2)) {
          placed.add(`${nr2},${nc2}`);
          nr2 += dr;
          nc2 += dc;
        }
      }
    }
  }
}

function part2() {
  const placed = new Set<string>();
  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === ".") return;
      addMultinodes(r, c, cell, placed);
    });
  });
  return placed.size;
}
