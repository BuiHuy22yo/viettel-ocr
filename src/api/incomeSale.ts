import { defHttp } from '@/utils/http/axios';

enum Api {
  GET_ALL_INCOME_TABLE = '/fsales-core/income-table/get-all-income-table',
  CREATE_INCOME_TABLE = '/fsales-core/income-table/create',
  UPDATE_INCOME_TABLE = '/fsales-core/income-table/update',
  DELETE_INCOME_TABLE = '/fsales-core/income-table/delete',
}

export const getAllIncomeTable = (data: any) =>
  defHttp.post<any>({
    url: Api.GET_ALL_INCOME_TABLE,
    data,
  });

export const createIncomeTable = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_INCOME_TABLE,
    data,
  });
export const updateIncomeTable = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_INCOME_TABLE,
    data,
  });

export const deleteIncomeTable = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_INCOME_TABLE,
    params,
  });
