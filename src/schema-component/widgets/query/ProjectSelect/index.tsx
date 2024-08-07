import { useField } from "@formily/react";

import { get } from "lodash-es";
import { ProjectSelectValue } from "./ProjectSelectValue";

import type { FormItemComponentProps } from "@/types";
import { BusSelect } from "@/dashboard-themes/ui";
import { sizeFormat } from "@/utils";

import {
  useDashboardRoot,
  useFetchProjectList,
  useJfGlobalProjectStore,
} from "@/schema-component/hooks";

export default function ProjectSelect(props: FormItemComponentProps) {
  const { data, isFetched } = useFetchProjectList({
    staleTime: true,
  });

  const projectList = get(data, "table.rows", []) || [];
  const { setProject, project } = useJfGlobalProjectStore();

  const { colWidth } = useDashboardRoot();
  const { decoratorProps } = useField();
  const w = decoratorProps?.w || 0;
  return (
    <BusSelect
      width={`${sizeFormat(colWidth * w)}px`}
      value={project?.id}
      onChange={(id, pro) => {
        setProject(pro);
      }}
      options={projectList.map((project) => {
        return {
          ...project,
          label: project.name,
          value: project.id,
        };
      })}
      renderSelctValue={ProjectSelectValue}
    />
  );
}
