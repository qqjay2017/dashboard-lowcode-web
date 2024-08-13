import Decimal from "decimal.js";
import { get } from "lodash-es";
import {
  chartListDataFormat,
  findItemByName,
  getTotalNum,
  percentToDisplay,
} from "./chartListDataFormat";
import { getPercent, percentFixed } from "./getPercent";
import {
  getBarLineTooltipOption,
  getBottomCenterLegendConfig,
  getBottomDataZoomConfig,
  getCommonTooltipOption,
  getPieSeriesConfig,
  getTooltipWithPercentFormatter,
  getTopRightLegendConfig,
  getXAxisCategoryConfig,
  getyYAxisConfig,
} from "./chartCommonOption";
import { safeArraySelect, safeObjectSelect } from "@/schema-component/shared";

export const chartHelps = {
  percentFixed,
  Decimal,
  get,
  getTotalNum,
  findItemByName,
  percentToDisplay,
  getPercent,
  chartListDataFormat,
  getBottomCenterLegendConfig,
  getCommonTooltipOption,
  getTooltipWithPercentFormatter,
  getTopRightLegendConfig,
  getXAxisCategoryConfig,
  getyYAxisConfig,
  getBarLineTooltipOption,
  getBottomDataZoomConfig,
  getPieSeriesConfig,
  safeArraySelect,
  safeObjectSelect,
};
