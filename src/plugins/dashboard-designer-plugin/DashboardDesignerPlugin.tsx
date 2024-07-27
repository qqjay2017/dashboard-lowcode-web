import { Plugin } from "../../application";

import { DataSourceBind } from "@/schema-component";

/**
 * 设计器相关的插件,浏览的时候不需要用到
 */
export class DashboardDesignerPlugin extends Plugin {
  async load(): Promise<void> {
    this.app.addComponents({
      DataSourceBind,
    });
  }
}
