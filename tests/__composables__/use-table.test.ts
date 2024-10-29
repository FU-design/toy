import { describe, it, expect, vi } from 'vitest';
import useTable from '../../src/composables/useTable';
import { withSetup } from '../test-util';

describe('useTable', () => {
  const columns = [{ title: 'Column 1' }];
  const rows = [{ id: 1, name: 'Item 1' }];

  it('should initialize with correct initial state', () => {
    const [result, app] = withSetup(useTable, { columns, rows });
    expect(result.columnsProp.value).toEqual(columns);
    expect(result.dataSource.value).toEqual(rows);
    expect(result.loading.value).toBe(false);
    expect(result.paginateProp.value).toEqual({
      current: 1,
      pageSize: 10,
      total: rows.length,
      size: 'small',
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '40', '50']
    });
  });

  it('should update paginateProp when onChange is called', () => {
    const [result, app] = withSetup(useTable, { columns, rows });
    result.onChange({ current: 2, pageSize: 20 });
    expect(result.paginateProp.value).toEqual({
      current: 2,
      pageSize: 20,
      total: 1,
      size: 'small',
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '40', '50']
    });
  });

  it('should reset state when restState is called', () => {
    const [result, app] = withSetup(useTable, { columns, rows });
    result.restState();
    expect(result.columnsProp.value).toEqual(columns);
    expect(result.dataSource.value).toEqual([]);
    expect(result.loading.value).toBe(false);
    expect(result.paginateProp.value).toEqual({
      current: 1,
      pageSize: 10,
      total: 0,
      size: 'small',
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '40', '50']
    });
  });

  it('should call resetState when component unmounts', () => {
    const [result, app] = withSetup(useTable, { columns, rows });
    const restStateSpy = vi.fn();
    result.resetState = restStateSpy;
    app.unmount = vi.fn().mockImplementation(() => {
      restStateSpy();
    });
    app.unmount();
    expect(restStateSpy).toHaveBeenCalled();
  });
});
