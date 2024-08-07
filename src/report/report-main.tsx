import ReactDOM from "react-dom/client";
import Application from "@/application/Application";

import AdminLayoutPlugin from "@/plugins/AdminLayoutPlugin";

import PreviewPage from "@/client-pages/preview-page";

import "../index.css";

import KxgcFrameAuthPlugin from "@/plugins/KxgcFrameAuthPlugin";

export const application = new Application({
  providers: [],
  plugins: [KxgcFrameAuthPlugin],
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
