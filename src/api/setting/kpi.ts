import { defHttp } from '@/utils/http/axios';
import { companyModel } from '@/api/model/orgModel';

enum Api {
  GET_ALL_FIELD_KPI = '/fsales-performance/kpi-field/getAll',
  CREATE_FIELD_KPI = '/fsales-performance/kpi-field/create',
  UPDATE_FIELD_KPI = '/fsales-performance/kpi-field/update',
  DELETE_FIELD_KPI = '/fsales-performance/kpi-field/delete',
}

export const getAllFieldKpi = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_FIELD_KPI,
    params,
  });
export const createFieldKpi = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_FIELD_KPI,
    data,
  });
export const updateFieldKpi = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_FIELD_KPI,
    data,
  });
export const deleteFieldKpi = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_FIELD_KPI,
    params,
  });
