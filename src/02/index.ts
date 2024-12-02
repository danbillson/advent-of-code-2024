const path = "./src/02/data.txt";
const file = Bun.file(path);

const data = await file.text();
const reports = data.split("\n").map((r) => r.split(" ").map(Number));

console.log("Part 1:", part1());
console.log("Part 2:", part2());

function isSafe(dir: string, a: number, b: number) {
  if (dir === "inc" && a > b) return false;
  if (dir === "dec" && a < b) return false;
  if (Math.abs(a - b) < 1 || Math.abs(a - b) > 3) return false;

  return true;
}

function part1() {
  return reports.reduce((safe, cur) => {
    const dir = cur[0] < cur[1] ? "inc" : "dec";
    const s = cur.slice(1).every((n, i) => isSafe(dir, cur[i], n));

    return s ? safe + 1 : safe;
  }, 0);
}

function part2() {
  return reports.reduce((safe, cur) => {
    const anySafe = cur.some((_, i) => {
      const report = [...cur];
      report.splice(i, 1);
      const dir = report[0] < report[1] ? "inc" : "dec";

      return report.slice(1).every((n, i) => isSafe(dir, report[i], n));
    });

    return anySafe ? safe + 1 : safe;
  }, 0);
}
