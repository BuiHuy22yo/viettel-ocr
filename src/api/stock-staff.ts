import { defHttp } from '@/utils/http/axios';

enum Api {
  CREATE_STOCK_STAFF = '/fsales-transport-core/stock-staff/create-stock-staff',
  GET_STOCK_STAFF_BY_STOCK_ID = '/fsales-transport-core/stock-staff/get-stock-staff-by-stock-id',
}
export const createStockStaff = (params: any) =>
  defHttp.post<any>({
    url: Api.CREATE_STOCK_STAFF,
    params,
  });
export const getStockStaffByStockId = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_STOCK_STAFF_BY_STOCK_ID,
    params,
  });
