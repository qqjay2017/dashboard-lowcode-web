import { useRequest } from "@/api-client";
import { apiConfig, systemIds } from "@/schema-component/shared";

export function useFetchProjectDt(projectId = "") {
  return useRequest(
    `${apiConfig.apiProjectSystem}/v1/project/${projectId}/3
`,
    {
      method: "GET",
      refreshDeps: [projectId],
      enabled: !!projectId,
      headers: {
        "system-id": systemIds.project,
      },
    }
  );
}
