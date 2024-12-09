const path = "./src/09/data.txt";
const file = Bun.file(path);

const data = await file.text();

console.log("Part 1:", part1());
console.log("Part 2:", part2());

function format(data: string) {
  return data.split("").reduce((acc, cur, i) => {
    if (i % 2 === 0)
      return [
        ...acc,
        ...Array.from({ length: Number(cur) }, () => Math.floor(Number(i) / 2)),
      ];

    return [...acc, ...Array.from({ length: Number(cur) }, () => ".")];
  }, [] as (string | number)[]);
}

function sort(data: (string | number)[]) {
  let sorted = [];
  let total = data.filter((d) => d !== ".").length;
  let end = data.length - 1;

  for (let i = 0; i < total; i++) {
    if (data[i] !== ".") {
      sorted.push(data[i]);
      continue;
    }
    for (let j = end; j >= 0; j--) {
      if (data[j] !== ".") {
        sorted.push(data[j]);
        data[j] = ".";
        end = j - 1;
        break;
      }
    }
  }

  return sorted as number[];
}

function checksum(data: number[]) {
  return data.reduce((acc, cur, i) => acc + cur * i, 0);
}

function part1() {
  const formatted = format(data);
  const sorted = sort(formatted);
  return checksum(sorted);
}

function part2() {
  return null;
}
