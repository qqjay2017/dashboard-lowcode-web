import { Plugin } from "@/application";

class KxgcFrameAuthPlugin extends Plugin {
  async load(): Promise<void> {
    // this.app.use(() => {
    //   return <div>123</div>;
    // });
  }

  async beforeLoad(): Promise<void> {
    this.app.setIsInFrame(true);
    window.addEventListener(
      "message",
      (e) => {
        if (e?.data?.type === "initReport") {
          const dataStr = e?.data?.data || "{}";
          const data = JSON.parse(dataStr);

          if (data.sessionStorage) {
            Object.keys(data.sessionStorage).forEach((key) => {
              sessionStorage.setItem(key, data.sessionStorage[key]);
            });
          }
          if (data.localStorage) {
            Object.keys(data.localStorage).forEach((key) => {
              localStorage.setItem(key, data.localStorage[key]);
            });
          }
          if (data.query?.project && data.query?.project.id) {
            const projectId = data.query?.project.id;
            sessionStorage.setItem(
              "jf-project-storage",
              JSON.stringify({
                version: 0,
                state: {
                  projectId,
                  project: {
                    id: projectId,
                  },
                },
              })
            );
          }
        }
      },
      false
    );
  }
}

export default KxgcFrameAuthPlugin;
