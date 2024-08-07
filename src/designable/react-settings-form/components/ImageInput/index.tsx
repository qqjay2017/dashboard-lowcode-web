import React, { useContext } from "react";
import type { InputProps } from "antd/lib/input";
import { Input, Upload, message } from "antd";
import cls from "classnames";
import { css } from "@emotion/css";
import { get } from "lodash-es";

import { usePrefix } from "@/designable/react";
import IconWidget from "@/designable/react/widgets/IconWidget";

import minioSdk from "@/sdk/minio-sdk/MinioSdk";

import "./styles.less";
import { addBgValue, removeBgValue } from "@/utils/removeBgValue";

export interface ImageInputProps extends Omit<InputProps, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  className,
  style,
  ...props
}) => {
  const prefix = usePrefix("image-input");
  // const context = useContext(SettingsFormContext);
  return (
    <div className={cls(prefix, className)} style={style}>
      <Input
        {...props}
        onChange={(e) => {
          props.onChange?.(e?.target?.value);
        }}
        prefix={
          <Upload
            customRequest={({ file, onProgress, onSuccess, onError }) => {
              if (typeof file === "string") {
                return false;
              }

              if (!file || !file.type || !file.size) {
                return false;
              }

              if (!file.type.startsWith("image")) {
                message.warning("请选择图片文件");

                return false;
              }
              minioSdk
                .putSmartObject({
                  file,
                  apiData: {
                    bucket: "images",
                  },
                  onProgress: ({ percent }) => {
                    onProgress && onProgress({ percent });
                  },
                })
                .then(
                  (res) => {
                    onSuccess &&
                      onSuccess({
                        ...res,
                        uid: (file as any).uid,
                      });
                  },
                  (err) => {
                    onError && onError(err);
                  }
                );
            }}
            className={css`
              width: 18px;
              height: 18px;
            `}
            itemRender={() => null}
            maxCount={1}
            onChange={(params: any) => {
              const fileSrcUrl = get(params, "file.response.fileSrcUrl");
              if (!fileSrcUrl) {
                return;
              }
              props.onChange?.(fileSrcUrl);
            }}
          >
            <IconWidget
              infer="CloudUpload"
              style={{ cursor: "pointer" }}
              size={18}
            />
          </Upload>
        }
      />
    </div>
  );
};

export const BackgroundImageInput: React.FC<ImageInputProps> = (props) => {
  return (
    <ImageInput
      value={removeBgValue(props.value)}
      onChange={(url) => {
        props.onChange?.(addBgValue(url));
      }}
    />
  );
};
