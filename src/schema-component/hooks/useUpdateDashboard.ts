import { useParams } from "react-router-dom";
import { useAPIClient } from "../../api-client";
import { apiBase } from "@/utils";

export function useUpdateDashboard() {
  const apiClient = useAPIClient();

  const { id } = useParams();

  return {
    id,
    updateDashboard: async (data, _id: string = "") => {
      const submitId = _id || id;
      return apiClient.request({
        url: submitId
          ? `${apiBase}/designer/${submitId}`
          : `${apiBase}/designer`,
        method: submitId ? "put" : "post",
        data,
      });
    },
  };
}
