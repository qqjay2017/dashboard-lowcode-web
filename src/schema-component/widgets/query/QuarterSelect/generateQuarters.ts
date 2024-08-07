import dayjs from "dayjs";
import type { QuarterItemType } from "./types";

function generateQuarters(year) {
  const quarters = [];
  for (let i = 1; i <= 4; i++) {
    const quarterId = `${year}${i}`;
    const quarterName = `${year}年${i}季度`;
    quarters.push({
      quarterId,
      quarterName,
      value: quarterId,
      label: quarterName,
    });
  }
  return quarters;
}

export function generateAllQuarters(): QuarterItemType[] {
  const currentYear = dayjs().year();

  let quartersArray = [];
  for (let year = currentYear - 4; year <= currentYear + 4; year++) {
    quartersArray = quartersArray.concat(generateQuarters(year));
  }
  return quartersArray;
}
