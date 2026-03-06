import { defHttp } from '@/utils/http/axios';
import { companyModel } from '@/api/model/orgModel';

enum Api {
  SEARCH_RESOURCE = '/fsales-core/staff/findAllStaff',
  CREATE_RESOURCE = '/fsales-core/staff/create',
  UPDATE_RESOURCE = '/fsales-core/staff/update',
  DELETE_RESOURCE = '/fsales-core/staff/delete',
}

export const searchResource = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_RESOURCE,
    data,
  });

export const createResource = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_RESOURCE,
    data,
  });

export const updateResource = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_RESOURCE,
    data,
  });

export const deleteResource = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_RESOURCE,
    params,
  });
