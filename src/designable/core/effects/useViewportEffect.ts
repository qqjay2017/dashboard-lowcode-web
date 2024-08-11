import { ViewportScrollEvent } from '../events'
import type { Engine } from '../models'

export function useViewportEffect(engine: Engine) {
    engine.subscribeTo(ViewportScrollEvent, (event) => {
        const currentWorkspace = event?.context?.workspace
        if (!currentWorkspace)
            return
        const viewport = currentWorkspace.viewport

        if (viewport.matchViewport(event.data.target)) {
            viewport.digestViewport()
        }
    })
}
