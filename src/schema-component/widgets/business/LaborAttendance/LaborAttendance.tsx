import React from "react";
import { getSchemeWrap } from "./getSchemeWrap";
import { menuItem } from "./menuItem";
import { settingSchema } from "./settingSchema";

export const LaborAttendance = () => {
  return <div>LaborAttendance</div>;
};

LaborAttendance.displayName = "LaborAttendance";
LaborAttendance.schemaFn = getSchemeWrap;
LaborAttendance.menuItem = menuItem;
LaborAttendance.settingSchema = settingSchema;
