const path = "./src/11/data.txt";
const file = Bun.file(path);

const data = await file.text();
const stones = data.split(" ");

console.log("Part 1:", part1());
console.log("Part 2:", part2());

function convert(stone: string) {
  return String(Number(stone));
}

function blink(stones: string[]) {
  let newStones = [];
  for (let i = 0; i < stones.length; i++) {
    let stone = stones[i];
    if (stone === "0") {
      newStones.push("1");
      continue;
    }

    if (stone.length % 2 === 0) {
      let half = stone.length / 2;
      newStones.push(convert(stone.slice(0, half)));
      newStones.push(convert(stone.slice(half)));
      continue;
    }

    newStones.push(String(Number(stone) * 2024));
  }
  return newStones;
}

function part1() {
  const blinkedStones = Array.from({ length: 25 }).reduce((acc) => {
    return blink(acc as string[]);
  }, stones) as string[];

  return blinkedStones.length;
}

function part2() {
  return null;
}
