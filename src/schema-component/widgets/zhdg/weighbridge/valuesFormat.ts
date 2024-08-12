import dayjs from "dayjs";

export function valuesFormat(values: any = {}) {
  const newV = {
    ...values,
  };
  if (newV.dateType) {
    newV.startTime = dayjs().startOf(newV.dateType).valueOf();
    newV.endTime = dayjs().endOf(newV.dateType).valueOf();
  } else if (newV.times && newV.times[0] && newV.times[1]) {
    newV.startTime = dayjs(newV.times[0]).valueOf();
    newV.endTime = dayjs(newV.times[1]).valueOf();
  }
  return newV;
}
