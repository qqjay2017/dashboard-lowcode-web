import type { PropsWithChildren } from "react";
import React, { Suspense, useMemo } from "react";
import { Spin } from "antd";
import { useApp } from "../hooks";

/**
 * app核心容器
 */
export const MainComponent = React.memo(({ children }: PropsWithChildren) => {
  const app = useApp();
  const Router = useMemo(() => app.router.getRouterComponent(children), [app]);
  const Providers = useMemo(() => app.getComposeProviders(), [app]);
  return (
    <Suspense fallback={<Spin />}>
      <Router BaseLayout={Providers} />
    </Suspense>
  );
});

MainComponent.displayName = "MainComponent";
