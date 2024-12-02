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
    const dir = cur[0] < cur[1] ? "inc" : "dec";
    const mistakes = cur.reduce((m, _, i) => {
      if (!isSafe(dir, cur[i], cur[i + 1])) {
        m.push(i);
        if (i === cur.length - 2) m.push(i + 1);
      }

      return m;
    }, [] as number[]);

    if (mistakes.length) {
      const s = mistakes.some((m) => {
        const newReport = [...cur];
        newReport.splice(m, 1);
        const newDir = newReport[0] < newReport[1] ? "inc" : "dec";

        return newReport
          .slice(1)
          .every((n, i) => isSafe(newDir, newReport[i], n));
      });

      return s ? safe + 1 : safe;
    }

    return safe + 1;
  }, 0);
}
