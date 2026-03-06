import { defHttp } from '@/utils/http/axios';
import { companyModel } from '@/api/model/orgModel';

enum Api {
  COMPANY_CREATE = '/fsales-core/company/create',
  COMPANY_UPDATE = '/fsales-core/company/update',
  COMPANY_DELETE = '/fsales-core/company/delete',
  COMPANY_GETALL = '/fsales-core/company/getAll',
  COMPANY_FIND = '/fsales-core/company/findCompanyV2',

  DIVISION_CREATE = '/fsales-core/division/create',
  DIVISION_UPDATE = '/fsales-core/division/update',
  DIVISION_DELETE = '/fsales-core/division/delete',
  DIVISION_GETALL = '/fsales-core/division/getAll',

  DEPARTMENT_CREATE = '/fsales-core/unit/create',
  DEPARTMENT_UPDATE = '/fsales-core/unit/update',
  DEPARTMENT_DELETE = '/fsales-core/unit/delete',
  DEPARTMENT_GETALL = '/fsales-core/unit/getAll',

  SUB_DEPARTMENT_CREATE = '/fsales-core/sub-unit/create',
  SUB_DEPARTMENT_UPDATE = '/fsales-core/sub-unit/update',
  SUB_DEPARTMENT_DELETE = '/fsales-core/sub-unit/delete',
  SUB_DEPARTMENT_GETALL = '/fsales-core/sub-unit/getAll',

  STATION_CREATE = '/fsales-core/station/create',
  STATION_UPDATE = '/fsales-core/station/update',
  STATION_DELETE = '/fsales-core/station/delete',
  STATION_GET_ALL = '/fsales-core/station/getAll',
}

export const getAllCompany = (params: any) =>
  defHttp.get<any>({
    url: Api.COMPANY_GETALL,
    params,
  });

export const findCompany = (params: any) =>
  defHttp.get<any>({
    url: Api.COMPANY_FIND,
    params,
  });
export const createCompany = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.COMPANY_CREATE,
    data,
  });
export const updateCompany = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.COMPANY_UPDATE,
    data,
  });
export const deleteCompany = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.COMPANY_DELETE,
    params,
  });

export const getAllDivision = (params: any) =>
  defHttp.get<any>({
    url: Api.DIVISION_GETALL,
    params,
  });
export const createDivision = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.DIVISION_CREATE,
    data,
  });
export const updateDivision = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.DIVISION_UPDATE,
    data,
  });
export const deleteDivision = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DIVISION_DELETE,
    params,
  });

//Unit

export const getAllUnit = (params: any) =>
  defHttp.get<any>({
    url: Api.DEPARTMENT_GETALL,
    params,
  });
export const createUnit = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.DEPARTMENT_CREATE,
    data,
  });
export const updateUnit = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.DEPARTMENT_UPDATE,
    data,
  });
export const deleteUnit = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DEPARTMENT_DELETE,
    params,
  });

// Sub Unit

export const getAllSubUnit = (params: any) =>
  defHttp.get<any>({
    url: Api.SUB_DEPARTMENT_GETALL,
    params,
  });
export const createSubUnit = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.SUB_DEPARTMENT_CREATE,
    data,
  });
export const updateSubUnit = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.SUB_DEPARTMENT_UPDATE,
    data,
  });
export const deleteSubUnit = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.SUB_DEPARTMENT_DELETE,
    params,
  });

//station
export const getAllStation = (params: any) =>
  defHttp.get<any>({
    url: Api.STATION_GET_ALL,
    params,
  });
export const createStation = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.STATION_CREATE,
    data,
  });
export const updateStation = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.STATION_UPDATE,
    data,
  });
export const deleteStation = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.STATION_DELETE,
    params,
  });
