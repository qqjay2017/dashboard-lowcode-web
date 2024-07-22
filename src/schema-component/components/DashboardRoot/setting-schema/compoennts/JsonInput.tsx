import { MonacoEditor } from "@/schema-component";
import type { FormItemComponentProps } from "@/types";

export const JsonInput = ({ value, onChange }: FormItemComponentProps) => {
  return (
    <MonacoEditor
      theme="vs-dark"
      language="json"
      value={value || ""}
      onChange={(e) => {
        onChange && onChange(e);
      }}
    />
  );
};
