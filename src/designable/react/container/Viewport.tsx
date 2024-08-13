import { css } from "@emotion/css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { observer } from "@formily/react";
import { useTreeRootProps, useViewport } from "../hooks";

import AuxToolWidget from "../widgets/AuxToolWidget";
import { cx } from "@/utils";
import type { Viewport as ViewportType } from "@/designable/core";
import { globalThisPolyfill, requestIdle } from "@/designable/shared";

export interface IViewportProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "placeholder"> {
  placeholder?: React.ReactNode;
  dragTipsDirection?: "left" | "right";
}

export const Viewport = observer(
  ({ placeholder, dragTipsDirection, ...props }: IViewportProps) => {
    const [loaded, setLoaded] = useState(false);
    const scrollContainer = useRef<HTMLDivElement>();
    const viewportContainer = useRef<HTMLDivElement>();
    const viewport = useViewport();
    const viewportRef = useRef<ViewportType>();
    const isFrameRef = useRef(false);
    const { designWidth = 1920, designHeight = 1080 } = useTreeRootProps();
    const simulatorWidth = designWidth * 1.5;
    const simulatorHeight = designHeight * 1.5;
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

      viewport.digestViewport();
    }, [viewport, viewport.designScale]);

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
            transition: opacity 1s;
          `
        )}
        style={{
          opacity: !loaded ? 0 : 1,
        }}
      >
        <div
          className={cx(
            "big-simulator",
            css`
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              box-sizing: border-box;
              width: ${simulatorWidth * viewport.designScale}px;
              height: ${simulatorHeight * viewport.designScale}px;
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
                id="viewportContainer"
                ref={viewportContainer}
                className={css`
                  width: ${designWidth * viewport.designScale}px;
                  height: ${designHeight * viewport.designScale}px;
                  box-shadow: 0 8px 10px #1e1e1e1f;

                  overflow: hidden;
                  position: relative;
                `}
              >
                <div
                  id="scaleContainer"
                  className={css`
                    width: ${designWidth}px;
                    height: ${designHeight}px;
                    transform-origin: 0px 0px;
                    transform: scale(${viewport.designScale});
                    background-color: #232324;
                  `}
                >
                  <div
                    className={css`
                      width: ${designWidth}px;
                      height: ${designHeight}px;
                      position: absolute;
                      left: 0;
                      top: 0;
                    `}
                  >
                    {props.children}
                  </div>
                </div>
                <AuxToolWidget
                  key={`rerenderAuxToolWidget${viewport.designScale}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
