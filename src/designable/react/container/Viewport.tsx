import {
  type PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useViewport } from "../hooks";
import type { Viewport as ViewportType } from "@/designable/core";

export interface IViewportProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "placeholder">,
    PropsWithChildren {
  placeholder?: React.ReactNode;
  dragTipsDirection?: "left" | "right";
}

export const Viewport: React.FC<IViewportProps> = ({
  children,
  placeholder,
  dragTipsDirection,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  const viewport = useViewport();
  const ref = useRef<HTMLDivElement>();
  const viewportRef = useRef<ViewportType>();
  const isFrameRef = useRef(false);

  useLayoutEffect(() => {
    console.log(viewport, "viewport");
  }, [viewport]);
  return (
    <div
      {...props}
      ref={ref}
      style={{
        opacity: !loaded ? 0 : 1,
        overflow: isFrameRef.current ? "hidden" : "overlay",
        ...props.style,
      }}
    >
      {children}
    </div>
  );
};
