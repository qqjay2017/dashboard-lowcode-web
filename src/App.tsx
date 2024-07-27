import { BASE_URL } from "./env";
import { DesignPage2 } from "./designable/DesignPage2";
import { DesignPage } from "@/client-pages/design-page";

import { Application } from "@/application/Application";
import {
  AntdV5Plugin,
  DashboardBuildinPlugin,
  KxgcAuthPlugin,
} from "@/plugins";

import { DashboardLayout } from "@/client-pages/DashboardLayout";

import { NavigateHome } from "@/client-pages/home-list/NavigateHome";

import { HomeMain } from "@/client-pages/home";
import { DashboardMain } from "@/client-pages/dashboard";
import {
  ChartEditPage,
  ChartIndex,
  ComponentMain,
} from "@/client-pages/component";
import { AssetsMain } from "@/client-pages/assets";
import { ApiEdit, ApiMagic, ApiMain } from "@/client-pages/api";
import { PluginMain } from "@/client-pages/plugin";

const application = new Application({
  providers: [],
  plugins: [AntdV5Plugin, DashboardBuildinPlugin, KxgcAuthPlugin],
  designable: true,
  components: {},

  router: {
    type: "browser",
    basename: BASE_URL || "/",
    routes: {
      root: {
        path: "/",
        Component: NavigateHome,
      },
      home: {
        path: "/home",
        Component: DashboardLayout,
      },
      "home.main": {
        path: "/home/main",
        Component: HomeMain,
      },
      dashboard: {
        path: "/dashboard",
        Component: DashboardLayout,
      },
      "dashboard.main": {
        path: "/dashboard/main",
        Component: DashboardMain,
      },

      component: {
        path: "/component",
        Component: DashboardLayout,
      },
      "component.main": {
        path: "/component/main",
        Component: ComponentMain,
      },
      "component.chart": {
        path: "/component/chart",
        Component: ChartIndex,
      },
      "component.chartEdit": {
        path: "/component/chart-edit/:id",
        Component: ChartEditPage,
      },
      assets: {
        path: "/assets",
        Component: DashboardLayout,
      },
      "assets.main": {
        path: "/assets/main",
        Component: AssetsMain,
      },
      dapi: {
        path: "/dapi",
        Component: DashboardLayout,
      },
      "dapi.main": {
        path: "/dapi/external-data",
        Component: ApiMain,
      },
      "dapi.magic": {
        path: "/dapi/magic-api",
        Component: ApiMagic,
      },
      "dapi.edit": {
        path: "/dapi/edit",
        Component: ApiEdit,
      },
      plugin: {
        path: "/plugin",
        Component: DashboardLayout,
      },
      "plugin.main": {
        path: "/plugin/main",
        Component: PluginMain,
      },
      dashboarddesign: {
        path: "/dashboard-design/:id",
        Component: DesignPage,
      },
      dashboarddesign2: {
        path: "/dashboard-design2/:id",
        Component: DesignPage2,
      },
    },
  },
});

const App = application.getRootComponent();
export default App;
