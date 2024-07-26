import React, { useMemo } from "react";
import { Designer, Workbench } from "./react/container";
import { createDesigner } from "./core";
import { CompositePanel, StudioPanel } from "./react/panels";

export function DesignPage2() {
  const engine = useMemo(() => {
    return createDesigner({});
  }, []);
  return (
    <Designer engine={engine}>
      <Workbench>
        <StudioPanel>
          <CompositePanel></CompositePanel>
        </StudioPanel>
      </Workbench>
    </Designer>
  );
}
