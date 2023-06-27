import { DataTableColumn } from "naive-ui";
export const scanCodeTableColumns: DataTableColumn[] = [
  {
    title: "序号",
    key: "index",
  },
  {
    title: "产品条码",
    key: "productBarCode",
  },
  {
    title: "托盘码",
    key: "trayCode",
  },
  {
    title: "品号",
    key: "articleNumber ",
  },
  {
    title: "品名",
    key: "articleName",
  },
  {
    title: "线别",
    key: "lineCode",
  },
  {
    title: "扫码时间",
    key: "qRTime",
  },
  {
    title: "操作员",
    key: "operator",
  },
];
export const dataAcquisitionTableColumns: DataTableColumn[] = [
  {
    title: "序号",
    key: "index",
  },
  {
    title: "设备编号",
    key: "equipmentCode",
  },
  {
    title: "参数1",
    key: "pone",
  },
  {
    title: "参数2",
    key: "ptwo",
  },
  {
    title: "参数3",
    key: "pthree",
  },
  {
    title: "时间",
    key: "createTime",
  },
  {
    title: "操作人员",
    key: "operator",
  },
];
