import { uid } from "@formily/shared";
import html2canvas from "html2canvas";
import minioSdk from "@/sdk/minio-sdk/MinioSdk";
import type { ApiFileModel } from "@/sdk";

export async function htmlImgUtil({
  element,
  scale = 1,
}: {
  element: string;
  scale?: number;
}): Promise<{
  fileSrcUrl?: string;
}> {
  const r = document.getElementById(element);
  if (!r) {
    return Promise.resolve({});
  }

  return new Promise<ApiFileModel | null>((resolve) => {
    html2canvas(r, {
      scale,
    })
      .then((canvas) => {
        canvas.toBlob((blob) => {
          const file2 = new File([blob], `${uid()}.jpg`, { type: "image/jpg" });
          minioSdk
            .putSmartObject({
              file: file2,
              apiData: {
                bucket: "images",
              },
            })
            .then((res) => {
              return resolve(res || ({} as ApiFileModel));
            });
        });
      })
      .catch(() => {
        return resolve({} as ApiFileModel);
      });
  });
}
