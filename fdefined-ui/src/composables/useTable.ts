import { ref, onUnmounted } from "vue";
import type { TablePaginationConfig, TableColumnType } from "ant-design-vue";

const useBaseTable = <T>(
  columns: TableColumnType[],
  rows?: T[],
  pagination?: TablePaginationConfig | false | undefined
) => {
  const loading = ref(false);
  const dataSource = ref<T[]>(rows || []);
  const columnsProp = ref<TableColumnType[]>(columns);
  const paginateProp = ref<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: dataSource.value.length,
    size: "small",
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30", "40", "50"],
  });

  // merge pagination config
  if (pagination) {
    paginateProp.value = Object.assign(paginateProp.value, pagination);
  }

  const onChange = (pagination: TablePaginationConfig) => {
    paginateProp.value = Object.assign(paginateProp.value, pagination);
  };

  const restState = () => {
    loading.value = false;
    dataSource.value = [];
    paginateProp.value = {
      current: 1,
      pageSize: 10,
      total: dataSource.value.length || 0,
      size: "small",
      showSizeChanger: true,
      pageSizeOptions: ["10", "20", "30", "40", "50"],
    };
  };

  onUnmounted(() => {
    restState();
  });

  return {
    columnsProp,
    dataSource,
    loading,
    paginateProp,
    onChange,
    restState,
  };
};

export default useBaseTable;
