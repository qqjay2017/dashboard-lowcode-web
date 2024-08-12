import type { ReactNode } from "react";
import type { DataSourceBindType } from "./schema-component/types";

export interface FormItemComponentProps<V = any> {
  onChange?: (v: V, other?: any) => void;
  value?: V;
  onBlur?: any;
  apiInfo?: any[];
  dataSource?: any[];
  children?: ReactNode;
  pageSize?: number;
  pageNum?: number;
  searchValues?: any;
  [field: string]: any;
}

export interface ApiGroupItem {
  id: string;
  createdAt: string;
  name: string;
}

export interface SchemComponentWithDataSourceProps {
  apiInfo?: null | DataSourceBindType | DataSourceBindType[];
  queryKeys?: string[];
  queryParams?: any;
  busData?: any;
  busDataRes?: any;
  isBusDataLoading?: boolean;
  loading?: boolean;
  empty?: boolean;
}
