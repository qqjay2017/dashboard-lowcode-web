import ReactDOM from "react-dom/client";
import Application from "@/application/Application";
import KxgcAuthPlugin from "@/plugins/KxgcAuthPlugin";
import AdminLayoutPlugin from "@/plugins/AdminLayoutPlugin";

import PreviewPage from "@/client-pages/preview-page";

import "../index.css";

export const application = new Application({
  providers: [],
  plugins: [KxgcAuthPlugin, AdminLayoutPlugin],
  designable: false,
  components: {},

  router: {
    basename: "/dashboard-report",
    type: "browser",
    routes: {
      preview: {
        path: "/preview/:shareURL",
        Component: PreviewPage,
      },
    },
  },
});

const App = application.getRootComponent();

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
