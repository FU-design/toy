import { TableColumnType, TablePaginationConfig } from "ant-design-vue";

export interface XTablePorps {
  columns: TableColumnType[];
  data: any[];
  loading: boolean;
  rowKey?: string | ((record: any) => string);
  pagination?: TablePaginationConfig;
  customRender?: any;
}
