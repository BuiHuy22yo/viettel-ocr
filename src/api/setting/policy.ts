import { defHttp } from '@/utils/http/axios';
import { companyModel } from '@/api/model/orgModel';

enum Api {
  FINDALL_FORMULA = '/fsales-transport-core/service-policy-formula-definition/findAll',
  GETALL_FORMULA = '/fsales-transport-core/service-policy-formula-definition/getAll',
  CREATE_FORMULA = '/fsales-transport-core/service-policy-formula-definition/create',
  UPDATE_FORMULA = '/fsales-transport-core/service-policy-formula-definition/update',
  DELETE_FORMULA = '/fsales-transport-core/service-policy-formula-definition/delete',

  // EXTEND PARAM
  GETALL_PARAMETER = '/fsales-transport-core/service-policy-expand-condition/getAll',
  CREATE_PARAMETER = '/fsales-transport-core/service-policy-expand-condition/create',
  UPDATE_PARAMETER = '/fsales-transport-core/service-policy-expand-condition/update',
  DELETE_PARAMETER = '/fsales-transport-core/service-policy-expand-condition/delete',
}

export const searchFormula = (params: any) =>
  defHttp.get<any>({
    url: Api.GETALL_FORMULA,
    params,
  });
export const getAllFormula = (params: any) =>
  defHttp.get<any>({
    url: Api.FINDALL_FORMULA,
    params,
  });
export const createFormula = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_FORMULA,
    data,
  });
export const updateFormula = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_FORMULA,
    data,
  });
export const deleteFormula = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_FORMULA,
    params,
  });

export const getAllParameter = (params: any) =>
  defHttp.get<any>({
    url: Api.GETALL_PARAMETER,
    params,
  });
export const createParameter = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_PARAMETER,
    data,
  });
export const updateParameter = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_PARAMETER,
    data,
  });
export const deleteParameter = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_PARAMETER,
    params,
  });
