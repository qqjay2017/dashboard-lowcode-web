import { css } from "@emotion/css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useViewport } from "../hooks";

import AuxToolWidget from "../widgets/AuxToolWidget";
import { cx } from "@/utils";
import type { Viewport as ViewportType } from "@/designable/core";
import { globalThisPolyfill, requestIdle } from "@/designable/shared";

export interface IViewportProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "placeholder"> {
  placeholder?: React.ReactNode;
  dragTipsDirection?: "left" | "right";
}

export function Viewport({
  placeholder,
  dragTipsDirection,
  ...props
}: IViewportProps) {
  const [loaded, setLoaded] = useState(false);
  const scrollContainer = useRef<HTMLDivElement>();
  const viewportContainer = useRef<HTMLDivElement>();
  const viewport = useViewport();
  const viewportRef = useRef<ViewportType>();
  const isFrameRef = useRef(false);
  useLayoutEffect(() => {
    if (!viewport) return;
    if (viewportRef.current && viewportRef.current !== viewport) {
      viewportRef.current.onUnmount();
    }
    viewport.onMount(viewportContainer.current, globalThisPolyfill);
    requestIdle(() => {
      isFrameRef.current = false;
      setLoaded(true);
    });
  }, [viewport]);

  useEffect(() => {
    if (!viewport) {
      return;
    }
    if (!scrollContainer.current) {
      return;
    }
    // 垂直居中
    scrollContainer.current.scrollTop =
      scrollContainer.current.scrollHeight / 2 -
      scrollContainer.current.clientHeight / 2;
    // 水平居中
    scrollContainer.current.scrollLeft =
      scrollContainer.current.scrollWidth / 2 -
      scrollContainer.current.clientWidth / 2;
  }, [viewport]);

  return (
    <div
      ref={scrollContainer}
      className={cx(
        "edit-screens",
        css`
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: auto;
          user-select: none;
          padding-bottom: 0;
          scrollbar-color: rgba(144, 146, 152, 0.3) transparent;
          scrollbar-width: thin;
        `
      )}
      style={{
        opacity: !loaded ? 0 : 1,
      }}
    >
      <div
        className={cx(
          "dn-pc-simulator",
          css`
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            box-sizing: border-box;
            width: 3840px;
            height: 2160px;
          `
        )}
      >
        <div
          className={cx(
            "canvas",
            css`
              position: absolute;
              top: 50%;
              left: 50%;
              transform-origin: 0 0;
              transform: translate(-50%, -50%);
              /* margin-left: -483px; */
            `
          )}
        >
          <div
            className={css`
              pointer-events: auto;
            `}
          >
            <div
              ref={viewportContainer}
              className={css`
                height: 467.003px;
                width: 830.227px;
                box-shadow: 0 8px 10px #1e1e1e1f;

                overflow: hidden;
                position: relative;
              `}
            >
              <div
                className={css`
                  width: 1920px;
                  height: 1080px;
                  transform-origin: 0px 0px;
                  transform: scale(0.43241);
                  background-color: #232324;
                `}
              >
                <div
                  className={css`
                    width: 1920px;
                    height: 1080px;
                    position: absolute;
                    left: 0;
                    top: 0;
                  `}
                >
                  {props.children}
                </div>
              </div>
              <AuxToolWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
