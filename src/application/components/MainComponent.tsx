import React, { PropsWithChildren, useMemo } from "react";
import { useApp } from "../hooks";

export const MainComponent = React.memo(({ children }: PropsWithChildren) => {
  const app = useApp();
  const Router = useMemo(() => app.router.getRouterComponent(children), [app]);
  const Providers = useMemo(() => app.getComposeProviders(), [app]);
  return <Router BaseLayout={Providers} />;
});

MainComponent.displayName = "MainComponent";
