import type { OpUnitType, QUnitType } from "dayjs";
import dayjs from "dayjs";

export function dateFormatBase(
  text?: string | number | any,
  template = "YYYY-MM-DD"
) {
  if (!text) {
    return "--";
  }
  if (typeof text === "object") {
    text = text?.props?.children;
  }
  if (!text) {
    return "--";
  }

  if (typeof text === "string") {
    text = Number(text);
  }

  return dayjs(text).format(template);
}

/**
 * 日期格式化- YYYY-MM-DD
 * @param date 日期
 * @returns  格式化后的时间
 */

export function dateFormat(date?: string | number) {
  return dateFormatBase(date);
}

/**
 * 时间格式化- YYYY-MM-DD HH:mm:ss
 * @param date 日期
 * @returns  格式化后的时间
 */

export function timeFormat(date?: string | number) {
  return dateFormatBase(date, "YYYY-MM-DD HH:mm:ss");
}
/**
 * 计算两个时间的时间差,默认算天
 * @param startDate 开始时间
 * @param endDate  结束时间
 * @param unit  单位
 * @returns  返回时间差
 */

export function calculateDaysBetween(
  startDate: string | number,
  endDate: string | number,
  unit: QUnitType | OpUnitType = "day"
) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  return end.diff(start, "day");
}
