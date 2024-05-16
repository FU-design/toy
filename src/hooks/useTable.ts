import { ref } from "vue";
import type {
  TableProps,
  TablePaginationConfig,
  TableColumnType,
} from "ant-design-vue";

interface UseTable {
  dataSource: any[];
  columns: TableColumnType[];
  pagination: TablePaginationConfig | false | undefined;
}

const useTable = (config: UseTable) => {
  const loading = ref(false);
  const dataSource = ref(config.dataSource);
  const columnsProp = ref<TableColumnType[]>(config.columns);
  const paginateProp = ref<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: dataSource.value.length,
    size: "small",
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30", "40", "50"],
  });

  // merge pagination config
  if (config.pagination) {
    paginateProp.value = Object.assign(paginateProp.value, config.pagination);
  }

  const handleChange: TableProps["onChange"] = (
    pagination: TablePaginationConfig,
    _filters: any,
    _sorter: any
  ) => {
    paginateProp.value = Object.assign(paginateProp.value, pagination);
    // console.log("pagination :>> ", pagination);
    // console.log("filters:", filters);
    // console.log("sorter:", sorter);
  };

  return {
    columnsProp,
    dataSource,
    loading,
    paginateProp,
    handleChange,
  };
};

export default useTable;
