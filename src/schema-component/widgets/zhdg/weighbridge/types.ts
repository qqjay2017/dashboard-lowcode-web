export interface wagonBalanceRow {
  id: string;
  carNo: string;
  carNumberImg?: any;
  goodsDevCompany: string;
  goodsName: string;
  goodsSpec: string;
  deliveryActualWeight: string;
  grossWeight: string;
  tare: string;
  netWeight: string;
  deductWeight: string;
  trueWeight: string;
  weighMan: string;
  grossWeightTime: number;
  tareTime: number;
  reportTime: number;
  deliveryNo: string;
  grossWeightImgList?: any;
  tareImgList?: any;
  weightDeviation?: any;
  deviationRatio?: any;
  /**
   * 称重标识 [0:正常 1:超量 2:缺量]
   */
  weightFlag?: number;
}
