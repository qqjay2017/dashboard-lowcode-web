import Decimal from "decimal.js";
import { get } from "lodash-es";
import {
  chartListDataFormat,
  findItemByName,
  getTotalNum,
  percentToDisplay,
} from "./chartListDataFormat";
import { getPercent } from "./getPercent";
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

export const chartHelps = {
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
};
