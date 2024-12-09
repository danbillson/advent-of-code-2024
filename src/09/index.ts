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

type File = { id: number; size: number; gap: number };

function formatFiles(data: string) {
  return data.split("").reduce((acc, cur, i) => {
    if (i % 2 !== 0) return acc;

    return [
      ...acc,
      {
        id: Math.floor(Number(i) / 2),
        size: Number(cur),
        gap: Number(data[i + 1]) || 0,
      },
    ];
  }, [] as File[]);
}

function sortFiles(data: File[]) {
  let sorted = [...data];
  let seen = new Set<number>();

  for (let i = sorted.length - 1; i > 0; i--) {
    const { id, size, gap: gapAhead } = sorted[i];
    if (seen.has(id)) continue;
    seen.add(id);

    for (let j = 0; j < i; j++) {
      const { gap } = sorted[j];
      if (gap >= size) {
        // Adjust gaps
        sorted[j].gap = 0;
        sorted[i].gap = gap - size;
        sorted[i - 1].gap += size + gapAhead;

        // Move file
        sorted.splice(j + 1, 0, sorted[i]);
        sorted.splice(i + 1, 1);
        i++;
        break;
      }
    }
  }

  return sorted;
}

function checksumFiles(data: File[]) {
  let i = 0;

  return data.reduce((acc, cur) => {
    let sum = 0;
    for (let j = 0; j < cur.size; j++) {
      sum += cur.id * i;
      i++;
    }
    i += cur.gap;

    return acc + sum;
  }, 0);
}

function part2() {
  const formatted = formatFiles(data);
  const sorted = sortFiles(formatted);

  return checksumFiles(sorted);
}
