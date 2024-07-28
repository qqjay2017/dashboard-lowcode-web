import type { ITreeNode, TreeNode } from "@/designable/core";
import { transformToTreeNode } from "@/designable/core";
import { transformToSchema } from "@/designable/Field";
import { MonacoEditor } from "@/schema-component";

export interface ISchemaEditorWidgetProps {
  tree: TreeNode;
  onChange?: (tree: ITreeNode) => void;
}

export const SchemaEditorWidget: React.FC<ISchemaEditorWidgetProps> = (
  props
) => {
  return (
    <MonacoEditor
      {...props}
      value={JSON.stringify(transformToSchema(props.tree), null, 2)}
      onChange={(value) => {
        props.onChange?.(transformToTreeNode(JSON.parse(value)));
      }}
      language="json"
      theme="vs-dark"
      height="100%"
    />
  );
};
