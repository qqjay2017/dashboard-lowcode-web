import { type IWorkspaceItemProps, WorkspacePanel } from "./WorkspacePanel";

export const ViewportPanel: React.FC<IWorkspaceItemProps> = (props) => {
  return (
    <WorkspacePanel.Item {...props} flexable>
      <>{props.children}</>
    </WorkspacePanel.Item>
  );
};
