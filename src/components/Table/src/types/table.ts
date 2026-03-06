import type { VNodeChild } from 'vue';
import type { PaginationProps } from './pagination';
import type { FormProps } from '@/components/Form';
import type {
  TableRowSelection as ITableRowSelection,
  Key,
} from 'ant-design-vue/lib/table/interface';

import type { ColumnProps } from 'ant-design-vue/lib/table';

import { ComponentType } from './componentType';
import { VueNode } from '@/utils/propTypes';
import { RoleEnum } from '@/enums/roleEnum';
import { FixedType } from 'ant-design-vue/es/vc-table/interface';

import AntDesignVueTable from 'ant-design-vue/es/table';

export declare type SortOrder = 'ascend' | 'descend';

export interface TableCurrentDataSource<T = Recordable> {
  currentDataSource: T[];
}

export interface TableRowSelection<T = any> extends ITableRowSelection {
  /**
   * Callback executed when selected rows change
   * @param selectedRowKeys 已选的 keyValues
   * @param selectedRows 已选的 records
   * @param isClickCustomRow 是否是点击行触发（反之，就是点击checkbox/radiobox）
   * @returns void
   */
  onChange?: (selectedRowKeys: Key[], selectedRows: T[], isClickCustomRow?: boolean) => void;

  /**
   * Callback executed when select/deselect one row
   * @type Function
   */
  onSelect?: (record: T, selected: boolean, selectedRows: Object[], nativeEvent: Event) => any;

  /**
   * Callback executed when select/deselect all rows
   * @type Function
   */
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => any;

  /**
   * Callback executed when row selection is inverted
   * @type Function
   */
  onSelectInvert?: (selectedRows: Key[]) => any;
}

export interface TableCustomRecord<T> {
  record?: T;
  index?: number;
}

export interface ExpandedRowRenderRecord<T> extends TableCustomRecord<T> {
  indent?: number;
  expanded?: boolean;
}
export interface ColumnFilterItem {
  text?: string;
  value?: string;
  children?: any;
}

export interface TableCustomRecord<T = Recordable> {
  record?: T;
  index?: number;
}

export interface SorterResult {
  column: ColumnProps;
  order: SortOrder;
  field: string;
  columnKey: string;
}

export interface FetchParams {
  searchInfo?: Recordable;
  page?: number;
  sortInfo?: Recordable;
  filterInfo?: Recordable;
}

export interface GetColumnsParams {
  ignoreIndex?: boolean;
  ignoreAction?: boolean;
  sort?: boolean;
}

export type SizeType = 'default' | 'middle' | 'small' | 'large';

export interface TableActionType {
  reload: (opt?: FetchParams) => Promise<Recordable<any>[] | undefined>;
  setSelectedRows: (rows: Recordable[]) => void;
  getSelectRows: <T = Recordable>() => T[];
  clearSelectedRowKeys: () => void;
  expandAll: () => void;
  collapseAll: () => void;
  expandRows: (keyValues: Key[]) => void;
  collapseRows: (keyValues: Key[]) => void;
  scrollTo: (pos: string) => void; // pos: id | "top" | "bottom"
  getSelectRowKeys: () => Key[];
  deleteSelectRowByKey: (keyValue: Key) => void;
  setPagination: (info: Partial<PaginationProps>) => void;
  setTableData: <T = Recordable>(values: T[]) => void;
  updateTableDataRecord: (keyValue: Key, record: Recordable) => Recordable | void;
  deleteTableDataRecord: (keyValues: Key | Key[]) => void;
  insertTableDataRecord: (record: Recordable | Recordable[], index?: number) => Recordable[] | void;
  findTableDataRecord: (keyValue: Key) => Recordable | void;
  getColumns: (opt?: GetColumnsParams) => BasicColumn[];
  setColumns: (columns: BasicColumn[] | string[]) => void;
  getDataSource: <T = Recordable>() => T[];
  getRawDataSource: <T = Recordable>() => T;
  getSearchInfo: <T = Recordable>() => T;
  setLoading: (loading: boolean) => void;
  setProps: (props: Partial<BasicTableProps>) => void;
  redoHeight: () => void;
  setSelectedRowKeys: (keyValues: Key[]) => void;
  getPaginationRef: () => PaginationProps | boolean;
  getSize: () => SizeType;
  getRowSelection: () => TableRowSelection<Recordable>;
  getCacheColumns: () => BasicColumn[];
  emit?: EmitType;
  updateTableData: (index: number, key: string, value: any) => Recordable;
  setShowPagination: (show: boolean) => Promise<void>;
  getShowPagination: () => boolean;
  setCacheColumnsByField?: (dataIndex: string | undefined, value: BasicColumn) => void;
  setCacheColumns?: (columns: BasicColumn[]) => void;
}

export interface FetchSetting {
  pageField: string;
  sizeField: string;
  listField: string;
  totalField: string;
}

export interface TableSetting {
  redo?: boolean;
  size?: boolean;
  setting?: boolean;
  settingCache?: boolean;
  fullScreen?: boolean;
}

export interface BasicTableProps<T = any> {
  // Select row on click
  clickToRowSelect?: boolean;
  isTreeTable?: boolean;
  accordion?: boolean; // Supported when isTreeTable or expandRowByClick is enabled
  // Custom sorting function
  sortFn?: (sortInfo: SorterResult) => any;
  // Custom filtering function
  filterFn?: (data: Partial<Recordable<string[]>>) => any;
  // Remove the default table padding
  inset?: boolean;
  // Show table settings
  showTableSetting?: boolean;
  tableSetting?: TableSetting;
  // Zebra stripes
  striped?: boolean;
  // Automatically generate a key
  autoCreateKey?: boolean;
  // Method to calculate the summary row
  summaryFunc?: (...arg: any) => Recordable[];
  // Custom summary data
  summaryData?: Recordable[];
  // Show summary row
  showSummary?: boolean;
  // Allow column dragging
  canColDrag?: boolean;
  // API request object
  api?: (...arg: any) => Promise<any>;
  // Process parameters before the API request
  beforeFetch?: Fn;
  // Custom processing of the API response
  afterFetch?: Fn;
  // Process the search conditions before the API request
  handleSearchInfoFn?: Fn;
  // API request settings
  fetchSetting?: Partial<FetchSetting>;
  // Immediately trigger API request
  immediate?: boolean;
  // Show the table if no data is found when the search form is open
  emptyDataIsShowTable?: boolean;
  // Extra parameters for the request
  searchInfo?: Recordable;
  // Default sorting parameters
  defSort?: Recordable;
  // Use the search form
  useSearchForm?: boolean;
  // Form configuration
  formConfig?: Partial<FormProps>;
  // Column configuration
  columns: BasicColumn[];
  // Show index column
  showIndexColumn?: boolean;
  // Index column configuration
  indexColumnProps?: BasicColumn;
  actionColumn?: BasicColumn;
  // Show ellipsis if text overflows
  ellipsis?: boolean;
  // Inherit parent height (parent height - form height - padding height)
  isCanResizeParent?: boolean;
  // Automatically resize height
  canResize?: boolean;
  // Offset for the auto-resize height calculation
  resizeHeightOffset?: number;

  // Clear selections when the page changes
  clearSelectOnPageChange?: boolean;
  // Row key
  rowKey?: InstanceType<typeof AntDesignVueTable>['$props']['rowKey'];
  // Table data
  dataSource?: Recordable[];
  // Help message to the right of the title
  titleHelpMessage?: string | string[];
  // Maximum scroll height of the table
  maxHeight?: number;
  // Show borders
  bordered?: boolean;
  // Pagination settings
  pagination?: PaginationProps | boolean;
  // Loading state
  loading?: boolean;

  /**
   * The column contains children to display
   * @default 'children'
   * @type string | string[]
   */
  childrenColumnName?: string;

  /**
   * Override default table elements
   * @type object
   */
  components?: object;

  /**
   * Expand all rows initially
   * @default false
   * @type boolean
   */
  defaultExpandAllRows?: boolean;

  /**
   * Initial expanded row keys
   * @type string[]
   */
  defaultExpandedRowKeys?: string[];

  /**
   * Current expanded row keys
   * @type string[]
   */
  expandedRowKeys?: string[];

  /**
   * Expanded container render for each row
   * @type Function
   */
  expandedRowRender?: (record?: ExpandedRowRenderRecord<T>) => VNodeChild | JSX.Element;

  /**
   * Customize row expand Icon.
   * @type Function | VNodeChild
   */
  expandIcon?: Function | VNodeChild | JSX.Element;

  /**
   * Whether to expand row by clicking anywhere in the whole row
   * @default false
   * @type boolean
   */
  expandRowByClick?: boolean;

  /**
   * The index of `expandIcon` which column will be inserted when `expandIconAsCell` is false. default 0
   */
  expandIconColumnIndex?: number;

  /**
   * Table footer renderer
   * @type Function | VNodeChild
   */
  footer?: Function | VNodeChild | JSX.Element;

  /**
   * Indent size in pixels of tree data
   * @default 15
   * @type number
   */
  indentSize?: number;

  /**
   * i18n text including filter, sort, empty text, etc
   * @default { filterConfirm: 'Ok', filterReset: 'Reset', emptyText: 'No Data' }
   * @type object
   */
  locale?: object;

  /**
   * Row's className
   * @type Function
   */
  rowClassName?: (record: TableCustomRecord<T>, index: number) => string;

  /**
   * Row selection config
   * @type object
   */
  rowSelection?: TableRowSelection;

  /**
   * Show table selection bar（显示多选状态栏）
   * @type boolean
   */
  showSelectionBar?: boolean;

  /**
   * Set horizontal or vertical scrolling, can also be used to specify the width and height of the scroll area.
   * It is recommended to set a number for x, if you want to set it to true,
   * you need to add style .ant-table td { white-space: nowrap; }.
   * @type object
   */
  scroll?: InstanceType<typeof AntDesignVueTable>['$props']['scroll'];

  /**
   * Whether to show table header
   * @default true
   * @type boolean
   */
  showHeader?: boolean;

  /**
   * Size of table
   * @default 'default'
   * @type string
   */
  size?: SizeType;

  /**
   * Table title renderer
   * @type Function | ScopedSlot
   */
  title?: VNodeChild | JSX.Element | string | ((data: Recordable) => string);
  /**
   * Sub Title Table
   */
  subTitle?: string;
  /**
   * Icon Table
   */
  icon?: string;
  /**
   * Set props on per header row
   * @type Function
   */
  customHeaderRow?: (column: ColumnProps, index: number) => object;

  /**
   * Set props on per row
   * @type Function
   */
  customRow?: (record: T, index: number) => object;

  /**
   * `table-layout` attribute of table element
   * `fixed` when header/columns are fixed, or using `column.ellipsis`
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout
   * @version 1.5.0
   */
  tableLayout?: 'auto' | 'fixed' | string;

  /**
   * the render container of dropdowns in table
   * @param triggerNode
   * @version 1.5.0
   */
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;

  /**
   * Data can be changed again before rendering.
   * The default configuration of general user empty data.
   * You can configured globally through [ConfigProvider](https://antdv.com/components/config-provider-cn/)
   *
   * @version 1.5.4
   */
  transformCellText?: Function;

  /**
   * Callback executed before editable cell submit value, not for row-editor
   *
   * The cell will not submit data while callback return false
   */
  beforeEditSubmit?: (data: {
    record: Recordable;
    index: number;
    key: Key;
    value: any;
  }) => Promise<any>;

  /**
   * Callback executed when pagination, filters or sorter is changed
   * @param pagination
   * @param filters
   * @param sorter
   * @param currentDataSource
   */
  onChange?: (pagination: any, filters: any, sorter: any, extra: any) => void;

  /**
   * Callback executed when the row expand icon is clicked
   *
   * @param expanded
   * @param record
   */
  onExpand?: (expanded: boolean, record: T) => void;

  /**
   * Callback executed when the expanded rows change
   * @param expandedRows
   */
  onExpandedRowsChange?: (expandedRows: string[] | number[]) => void;

  onColumnsChange?: (data: ColumnChangeParam[]) => void;
}

export type CellFormat =
  | string
  | ((text: string, record: Recordable, index: number) => string | number)
  | Map<string | number, any>;

// @ts-ignore
export interface BasicColumn extends ColumnProps<Recordable> {
  children?: BasicColumn[];
  filters?: {
    text: string;
    value: string;
    children?:
      | unknown[]
      | (((props: Record<string, unknown>) => unknown[]) & (() => unknown[]) & (() => unknown[]));
  }[];

  //
  flag?: 'INDEX' | 'DEFAULT' | 'CHECKBOX' | 'RADIO' | 'ACTION';
  customTitle?: VueNode;

  slots?: Recordable;

  // 自定义header渲染
  customHeaderRender?: (column: BasicColumn) => string | VNodeChild | JSX.Element;
  // Whether to hide the column by default, it can be displayed in the column configuration
  defaultHidden?: boolean;

  // Help text for table column header
  helpMessage?: string | string[] | VNodeChild | JSX.Element;

  format?: CellFormat;

  // Editable
  edit?: boolean;
  editRow?: boolean;
  editable?: boolean;
  editComponent?: ((opt: { record: Recordable }) => ComponentType) | ComponentType;
  editComponentProps?:
    | ((opt: {
        text: string | number | boolean | Recordable;
        record: Recordable;
        column: BasicColumn;
        index: number;
      }) => Recordable)
    | Recordable;
  editRule?: boolean | ((text: string, record: Recordable) => Promise<string>);
  editValueMap?: (value: any) => string;
  onEditRow?: () => void;
  // 权限编码控制是否显示
  auth?: RoleEnum | RoleEnum[] | string | string[];
  // 业务控制是否显示
  ifShow?: boolean | ((column: BasicColumn) => boolean);
  // 自定义修改后显示的内容
  editRender?: (opt: {
    text: string | number | boolean | Recordable;
    record: Recordable;
    column: BasicColumn;
    index: number;
    currentValue: string | number | boolean | Recordable;
  }) => VNodeChild | JSX.Element;
  // 动态 Disabled
  editDynamicDisabled?: boolean | ((record: Recordable) => boolean);
}

export type ColumnChangeParam = {
  dataIndex: string;
  fixed: boolean | 'left' | 'right' | undefined;
  visible: boolean;
};

export interface InnerHandlers {
  onColumnsChange: (data: ColumnChangeParam[]) => void;
}

export interface InnerMethods {
  clearSelectedRowKeys: TableActionType['clearSelectedRowKeys'];
  getSelectRowKeys: TableActionType['getSelectRowKeys'];
}

export interface ColumnOptionsType {
  value: string;
  label: string;
  //
  column: {
    defaultHidden?: boolean;
  };
  //
  fixed?: FixedType;
}
