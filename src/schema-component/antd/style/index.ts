import type { CreateStylesUtils } from "antd-style";
import { createStyles } from "antd-style";
import type { CustomToken } from "@/global-theme";

export * from "./useToken";
export { createStyles };
export interface CustomCreateStylesUtils extends CreateStylesUtils {
  token: CustomToken;
}
