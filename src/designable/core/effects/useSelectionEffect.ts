import { MouseClickEvent } from "../events";
import { CursorStatus, type Engine } from "../models";

export function useSelectionEffect(engine: Engine) {
  engine.subscribeTo(MouseClickEvent, (event) => {
    if (engine.cursor.status !== CursorStatus.Normal) return;
    const target: HTMLElement = event.data.target as HTMLDivElement;
    const el = target?.closest?.(`
      *[${engine.props.nodeIdAttrName}]
    `);

    const isHelpers = target?.closest?.(
      `*[${engine.props.nodeSelectionIdAttrName}]`
    );

    const currentWorkspace =
      event.context?.workspace ?? engine.workbench.activeWorkspace;

    if (!currentWorkspace) return;

    if (!el?.getAttribute) {
      return;
    }

    const nodeId = el.getAttribute(engine.props.nodeIdAttrName);

    const operation = currentWorkspace.operation;
    const selection = operation.selection;
    const tree = operation.tree;
    const node = tree.findById(nodeId);
    if (node) {
      selection.select(node);
    } else {
      selection.select(tree);
    }
  });
}
