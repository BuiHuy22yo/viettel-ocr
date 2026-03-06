import { defHttp } from '@/utils/http/axios';
import { companyModel } from '@/api/model/orgModel';

enum Api {
  GET_ALL_GROUP_ATTRIBUTES = '/fsales-core/gr-attributes/getAll',
  CREATE_GROUP_ATTRIBUTES = '/fsales-core/gr-attributes/create',
  UPDATE_GROUP_ATTRIBUTES = '/fsales-core/gr-attributes/update',
  DELETE_GROUP_ATTRIBUTES = '/fsales-core/gr-attributes/delete',

  GET_ALL_ATTRIBUTES = '/fsales-core/attributes/getAll',
  CREATE_ATTRIBUTES = '/fsales-core/attributes/create',
  UPDATE_ATTRIBUTES = '/fsales-core/attributes/update',
  DELETE_ATTRIBUTES = '/fsales-core/attributes/delete',
}

export const getCAllGroupAttributes = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_GROUP_ATTRIBUTES,
    params,
  });
export const createCGroupAttributes = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_GROUP_ATTRIBUTES,
    data,
  });
export const updateCGroupAttributes = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_GROUP_ATTRIBUTES,
    data,
  });
export const deleteCGroupAttributes = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_GROUP_ATTRIBUTES,
    params,
  });

export const getCAllAttributes = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_ATTRIBUTES,
    params,
  });
export const createCAttributes = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_ATTRIBUTES,
    data,
  });
export const updateCAttributes = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_ATTRIBUTES,
    data,
  });
export const deleteCDataSource = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_ATTRIBUTES,
    params,
  });
