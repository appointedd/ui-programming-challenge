import { randFullName } from "@ngneat/falso";
import { DateTime } from "luxon";
import { writeFileSync } from "node:fs";

function shuffle<T>(arr: T[]): T[] {
  return arr
    .map((a) => [Math.random(), a] as [number, T])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);
}

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function main() {
  const startRef = DateTime.utc();

  const bookings = shuffle(
    Array(30)
      .fill(0)
      .map(() => {
        const start = startRef
          .plus({
            hours: random(1, 5),
          })
          .set({
            minute: 0,
            second: 0,
            millisecond: 0,
          });

        return {
          start: start.toISO(),
          end: start.plus({ hours: random(1, 3) }).toISO(),
          staffName: randFullName(),
          customers: Array(random(1, 5))
            .fill(0)
            .map(() => {
              const name = randFullName();
              const email = `${name
                .replace(/ /g, "")
                .toLowerCase()}@example.org`;
              return {
                name,
                email,
              };
            }),
        };
      })
  );

  writeFileSync("bookings.json", JSON.stringify(bookings), { flag: "w" });
}

main();
