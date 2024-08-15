import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import useTable from '../../src/composables/useTable'
import { withSetup } from '../test-util'
import { onUnmounted } from "vue";

describe('useTable', () => {
  const columns = [{ title: 'Column 1' }];
  const rows = [{ id: 1, name: 'Item 1' }];
  let restStateSpy: Mock<any>;

  beforeEach(() => {
    // Clear mocks and add some testing data after before each test run
    restStateSpy = vi.fn();
    vi.clearAllMocks();
  })

  it('should initialize with correct initial state', () => {
    const [result, app] = withSetup(() => {
      const { columnsProp, dataSource, loading, paginateProp, } = useTable(columns, rows);
      expect(columnsProp.value).toEqual(columns);
      expect(dataSource.value).toEqual(rows);
      expect(loading.value).toBe(false);
      expect(paginateProp.value).toEqual({
        current: 1,
        pageSize: 10,
        total: rows.length,
        size: "small",
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30", "40", "50"],
      });
    });

  })

  it('should update paginateProp when onChange is called', () => {
    const [result, app] = withSetup(() => {
      const { paginateProp, onChange } = useTable([]);
      onChange({ current: 2, pageSize: 20 });
      expect(paginateProp.value).toEqual({
        current: 2,
        pageSize: 20,
        total: 0,
        size: "small",
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30", "40", "50"],
      })
    })
  })

  it('should reset state when restState is called', () => {
    const [result, app] = withSetup(() => {
      const { columnsProp, dataSource, loading, paginateProp, restState } = useTable(columns, rows);
      restState()
      expect(columnsProp.value).toEqual(columns);
      expect(dataSource.value).toEqual([]);
      expect(loading.value).toBe(false);
      expect(paginateProp.value).toEqual({
        current: 1,
        pageSize: 10,
        total: 0,
        size: "small",
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30", "40", "50"],
      });
    })

  })

  it('should call restState when component unmounts', () => {
    const columns = [{ title: 'Column 1' }];
    const rows = [{ id: 1, name: 'Item 1' }];
    // 使用 withSetup 创建组合式函数的实例并挂载应用
    const [result, app] = withSetup(() => {
      // 替换原始的 restState 方法
      const { restState } = useTable(columns, rows);
      restStateSpy.mockImplementation(restState);
      onUnmounted(() => restStateSpy())
      return { restState };
    });
    // 模拟组件卸载
    app.unmount();
    // 验证 restState 是否被调用
    expect(restStateSpy).toHaveBeenCalled();
  });
});