import React from "react";
import { HomeList } from "./HomeList";
import { DesignPage } from "./DesignPage";
import { Hello } from "./Hello";
import { Application } from "../application/Application";

export const application = new Application({
  providers: [],
  plugins: [],
  // designable: true,
  components: {
    Hello,
  },
  router: {
    type: "browser",
    routes: {
      home: {
        path: "/",
        Component: HomeList,
      },
      design: {
        path: "/design/:id",
        Component: DesignPage,
      },
    },
  },
});

export default application.getRootComponent();
