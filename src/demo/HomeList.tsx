import React from "react";
import { useApp } from "../application";

export const HomeList = () => {
  const app = useApp();
  return <div>{app.renderComponent("Hello")}123</div>;
};
