import { defHttp } from '@/utils/http/axios';

enum Api {
  SEARCH = '/fsales-transport-core/stock/search',
  CREATE = '/fsales-transport-core/stock/create',
  UPDATE = '/fsales-transport-core/stock/update',
  DELETE = '/fsales-transport-core/stock/delete',
  GET_ALL_STOCK_BY_STATUS = '/fsales-transport-core/stock/get-all-stock-by-status',
  GET_STOCK_BY_STAFF_ID = '/fsales-transport-core/stock/get-stock-by-staff-id',
  GET_ALL_STOCK_ATTRIBUTE = '/fsales-transport-core/stock/get-all-stock-attribute',
  CREATE_STOCK_ATTRIBUTE = '/fsales-transport-core/stock/create-stock-attribute',
  UPDATE_STOCK_ATTRIBUTE = '/fsales-transport-core/stock/update-stock-attribute',
  DELETE_STOCK_ATTRIBUTE = '/fsales-transport-core/stock/delete-stock-attribute',
  GET_ALL_STOCK_TYPE = '/fsales-transport-core/stock/get-all-stock-type',
  CREATE_STOCK_TYPE = '/fsales-transport-core/stock/create-stock-type',
  UPDATE_STOCK_TYPE = '/fsales-transport-core/stock/update-stock-type',
  DELETE_STOCK_TYPE = '/fsales-transport-core/stock/delete-stock-type',
}
export const createStockCategory = (params: any) =>
  defHttp.post<any>({
    url: Api.CREATE,
    params,
  });
export const searchStockCategory = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH,
    params,
  });
export const updateStockCategory = (params: any) =>
  defHttp.post<any>({
    url: Api.UPDATE,
    params,
  });
export const deleteStockCategory = (params: any) =>
  defHttp.post<any>({
    url: Api.DELETE,
    params,
  });
export const getAllStockByStatus = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_STOCK_BY_STATUS,
    params,
  });
export const getStockByStaffId = async (params: any) => {
  const result = await defHttp.get<any>({
    url: Api.GET_STOCK_BY_STAFF_ID,
    params,
  });
  if (result?.length > 0) {
    result?.forEach((item) => (item.codeName = item.stockCode + ' - ' + item.stockName));
  }
  return result;
};
export const getAllStockAttributeApi = (params: any) =>
  defHttp.post<any>({
    url: Api.GET_ALL_STOCK_ATTRIBUTE,
    params,
  });
export const createStockAttributeApi = (params: any) =>
  defHttp.post<any>({
    url: Api.CREATE_STOCK_ATTRIBUTE,
    params,
  });
export const updateStockAttributeApi = (params: any) =>
  defHttp.post<any>({
    url: Api.UPDATE_STOCK_ATTRIBUTE,
    params,
  });
export const deleteStockAttributeApi = (params: any) =>
  defHttp.post<any>({
    url: Api.DELETE_STOCK_ATTRIBUTE,
    params,
  });

export const getAllStockTypeApi = (params: any) =>
  defHttp.post<any>({
    url: Api.GET_ALL_STOCK_TYPE,
    params,
  });
export const createStockTypeApi = (params: any) =>
  defHttp.post<any>({
    url: Api.CREATE_STOCK_TYPE,
    params,
  });
export const updateStockTypeApi = (params: any) =>
  defHttp.post<any>({
    url: Api.UPDATE_STOCK_TYPE,
    params,
  });
export const deleteStockTypeApi = (params: any) =>
  defHttp.post<any>({
    url: Api.DELETE_STOCK_TYPE,
    params,
  });
