import { css } from "@emotion/css";

import { ResourceWidget } from "../widgets";

export function CompositePanel() {
  return (
    <div
      className={css`
        flex-grow: 0;
        flex-shrink: 0;
        display: flex;
        position: relative;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        z-index: 2;
      `}
    >
      <div
        className={css`
          display: flex;
          flex-direction: column;

          z-index: 2;
          position: relative;
        `}
      >
        tabs
      </div>
      <div
        className={css`
          width: 300px;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-sizing: content-box;
        `}
      >
        <div
          className={css`
            display: grid;
            grid-template-columns: repeat(3, 33.3333%);
            grid-gap: 1px;
            background-color: var(--dn-panel-border-color);
            border-bottom: 1px solid var(--dn-panel-border-color);
          `}
        >
          <ResourceWidget />
        </div>
      </div>
    </div>
  );
}
