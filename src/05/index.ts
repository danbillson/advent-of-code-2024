const path = "./src/05/data.txt";
const file = Bun.file(path);

const data = await file.text();
const [ruleData, pagesData] = data.split("\n\n");
const rules = ruleData.split("\n").reduce((acc, cur) => {
  const [key, value] = cur.split("|");
  if (!acc[key]) return { ...acc, [key]: [Number(value)] };
  return { ...acc, [key]: [...acc[key], Number(value)] };
}, {} as Record<string, number[]>);
const pages = pagesData
  .split("\n")
  .map((line) => line.split(",").map(Number).reverse());

console.log("Part 1:", part1());
console.log("Part 2:", part2());

function isInOrder(pages: number[]) {
  return pages.every((page, i) => {
    const compare = pages.slice(i + 1);
    if (!rules[page]) return true;
    return compare.every((c) => !rules[page].includes(c));
  });
}

function part1() {
  return pages.reduce((acc, cur) => {
    if (isInOrder(cur)) return acc + cur[Math.floor(cur.length / 2)];
    return acc;
  }, 0);
}

function sortPages(pages: number[]) {
  const copy = [...pages];
  while (!isInOrder(copy)) {
    for (let i = 0; i < copy.length; i++) {
      const page = copy[i];
      const compare = copy.slice(i + 1);
      if (!rules[page]) continue;
      const swapIndex = compare.findIndex((c) => rules[page].includes(c));

      // Page is in order
      if (swapIndex === -1) continue;

      const swap = compare[swapIndex];
      copy[i] = swap;
      copy[i + swapIndex + 1] = page;
    }
  }
  return copy;
}

function part2() {
  return pages.reduce((acc, cur) => {
    if (isInOrder(cur)) return acc;
    const sorted = sortPages(cur);

    return acc + sorted[Math.floor(sorted.length / 2)];
  }, 0);
}
