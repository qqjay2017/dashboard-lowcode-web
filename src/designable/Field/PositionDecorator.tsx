import { PropsWithChildren } from "react";

interface PositionDecoratorProps extends PropsWithChildren {}
export function PositionDecorator(props: PositionDecoratorProps) {
  console.log(props, "PositionDecorator props");
  const {
    children,
    x = 0,
    y = 0,
    w = 0,
    h = 0,
    zIndex = 2,
    style,
    padding = 12,
    className,
  } = props;
  return <div>{}</div>;
}
