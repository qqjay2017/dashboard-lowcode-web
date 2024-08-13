/**
 *  const scrollBarStyle = useScrollBarStyle({
    thumbColor: "rgba(59, 120, 239, 0.5)",
  });
 
    className={cx(
           scrollBarStyle.styles,
 
        )}
 */

import { createStyles } from "antd-style";

export const useScrollBarStyle = createStyles(
  (
    { css, token },
    { thumbColor }: { thumbColor: string } = { thumbColor: "" }
  ) => {
    return css`
      scrollbar-color: ${thumbColor || token.thumbColor} transparent;
      scrollbar-width: thin;
      ::-webkit-scrollbar,
      ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }
      ::-webkit-scrollbar-thumb,
      ::-webkit-scrollbar-thumb {
        background: ${thumbColor};
        border-radius: 10px;
      }
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }

      ::-webkit-scrollbar-track-piece,
      ::-webkit-scrollbar-track-piece {
        background: transparent;
      }

      * {
        scrollbar-color: ${thumbColor} transparent;
        scrollbar-width: thin;
        ::-webkit-scrollbar,
        ::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        ::-webkit-scrollbar-thumb,
        ::-webkit-scrollbar-thumb {
          background: ${thumbColor};
          border-radius: 10px;
        }
        ::-webkit-scrollbar-track {
          background-color: transparent;
        }
        ::-webkit-scrollbar-track-piece,
        ::-webkit-scrollbar-track-piece {
          background: transparent;
        }
      }
    `;
  }
);
