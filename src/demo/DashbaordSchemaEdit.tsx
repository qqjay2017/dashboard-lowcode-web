import { DesignPage } from "../client-pages/design-page";

import { Application } from "../application/Application";
import {
  AntdV5Plugin,
  DashboardBuildinPlugin,
  KxgcAuthPlugin,
} from "../plugins";

import { DashboardLayout } from "../client-pages/DashboardLayout";

import { NavigateHome } from "../client-pages/home-list/NavigateHome";

import { HomeMain } from "@/client-pages/home";
import { DashboardMain } from "@/client-pages/dashboard";
import { ComponentMain } from "@/client-pages/component";
import { AssetsMain } from "@/client-pages/assets";
import { ApiEdit, ApiMain } from "@/client-pages/api";
import { PluginMain } from "@/client-pages/plugin";
import { BASE_URL } from "@/env";

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
      assets: {
        path: "/assets",
        Component: DashboardLayout,
      },
      "assets.main": {
        path: "/assets/main",
        Component: AssetsMain,
      },
      api: {
        path: "/api",
        Component: DashboardLayout,
      },
      "api.main": {
        path: "/api/main",
        Component: ApiMain,
      },
      "api.edit": {
        path: "/api/edit",
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
      design: {
        path: "/dashboard-design/:id",
        Component: DesignPage,
      },
    },
  },
});

const App = application.getRootComponent();

export default App;
