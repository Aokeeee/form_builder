export type ScanCode = {
  productBarCode: string;
  trayCode: string;
  articleNumber: string;
  articleName: string;
  lineCode: string;
  qRTime: string;
  operator: string;
};

export type DataAcquisition = {
  equipmentCode: string;
  createTime: string;
  operator: string;
  [x: string]: any;
};

export interface WorkShopLine {
  workShopAndLineName: string;
  lineClassCode: string;
}

export interface IndexState {
  code: string;
  tray: string;
  workShopLine: string | null;
  scanCodeData: ScanCode[];
  productQuantity: number;
  dataAcquisitionData: DataAcquisition[];
  workShopLineOption: WorkShopLine[];
}
