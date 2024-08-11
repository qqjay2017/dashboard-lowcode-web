import { ViewportResizeEvent, ViewportScrollEvent } from "../events";
import type { Engine } from "../models";

export function useViewportEffect(engine: Engine) {
  engine.subscribeTo(ViewportResizeEvent, (event) => {
    const currentWorkspace = event?.context?.workspace;
    if (!currentWorkspace) return;
    const viewport = currentWorkspace.viewport;

    if (viewport.matchViewport(event.data.target)) {
      console.log("digestViewportdigestViewport");
      viewport.digestViewport();
    }
  });
  engine.subscribeTo(ViewportScrollEvent, (event) => {
    const currentWorkspace = event?.context?.workspace;
    if (!currentWorkspace) return;
    const viewport = currentWorkspace.viewport;

    if (viewport.matchViewport(event.data.target)) {
      viewport.digestViewport();
    }
  });
}
