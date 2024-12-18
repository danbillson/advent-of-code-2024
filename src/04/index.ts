const path = "./src/04/data.txt";
const file = Bun.file(path);

const data = await file.text();
const grid = data.split("\n").map((line) => line.split(""));

const xmas = "XMAS";

console.log("Part 1:", part1());
console.log("Part 2:", part2());

function search(
  x: number,
  y: number,
  dx: number,
  dy: number,
  char: string,
  word: string
): number {
  if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) return 0;
  if (grid[x][y] !== char) return 0;
  if (!xmas.startsWith(word)) return 0;
  if (word === "XMAS") return 1;

  const nextIndex = xmas.indexOf(char) + 1;
  const nextChar = xmas[nextIndex];
  const newWord = word + nextChar;

  return search(x + dx, y + dy, dx, dy, nextChar, newWord);
}

function part1() {
  let found = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "X") {
        const n = search(i, j, 0, 1, "X", "X");
        const s = search(i, j, 0, -1, "X", "X");
        const e = search(i, j, 1, 0, "X", "X");
        const w = search(i, j, -1, 0, "X", "X");
        const ne = search(i, j, 1, 1, "X", "X");
        const nw = search(i, j, -1, 1, "X", "X");
        const se = search(i, j, 1, -1, "X", "X");
        const sw = search(i, j, -1, -1, "X", "X");

        found += n + s + e + w + ne + nw + se + sw;
      }
    }
  }

  return found;
}

function crossSearch(x: number, y: number) {
  if (x < 1 || x >= grid.length - 1 || y < 1 || y >= grid[0].length - 1)
    return false;

  const nwtose = grid[x - 1][y + 1] === "M" && grid[x + 1][y - 1] === "S";
  const swtone = grid[x - 1][y - 1] === "M" && grid[x + 1][y + 1] === "S";
  const setonw = grid[x + 1][y - 1] === "M" && grid[x - 1][y + 1] === "S";
  const netosw = grid[x + 1][y + 1] === "M" && grid[x - 1][y - 1] === "S";

  return (nwtose || setonw) && (swtone || netosw);
}

function part2() {
  let found = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "A" && crossSearch(i, j)) found++;
    }
  }

  return found;
}
