import { css } from "@emotion/css";
import React, { useState } from "react";

const defaultPaginationProps = {
  className: css`
    align-items: center;
    .ant-pagination-total-text {
      flex: 1;
    }
  `,
  showQuickJumper: true,
  showTotal: (total) => {
    return `共${total}条记录`;
  },
};

export function usePageParams(defaultProps: {
  pageSize?: number;
  pageNum?: number;
}) {
  const [pageSize, setPageSize] = useState(defaultProps.pageSize || 5);
  const [pageNum, setPageNum] = useState(defaultProps.pageNum || 1);

  return {
    pageSize,
    pageNum,
    setPageSize,
    setPageNum,
    paginationProps: {
      ...defaultPaginationProps,
      current: pageNum,
      pageSize,
      onChange: (page: number, pageSize: number) => {
        setPageNum(page);
        setPageSize(pageSize);
      },
    },
  };
}
