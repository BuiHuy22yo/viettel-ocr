import { defHttp } from '@/utils/http/axios';
import { companyModel } from '@/api/model/orgModel';

enum Api {
  GET_ALL_GROUP_ATTRIBUTE = '/fsales-transport-core/contract-group/get-all',
  CREATE_GROUP_ATTRIBUTE = '/fsales-transport-core/contract-group/create',
  UPDATE_GROUP_ATTRIBUTE = '/fsales-transport-core/contract-group/update',
  DELETE_GROUP_ATTRIBUTE = '/fsales-transport-core/contract-group/delete',
  GET_GROUP_ATTRIBUTE = '/fsales-transport-core/contract-group/get-group-attribute',

  CREATE_ATTRIBUTE = '/fsales-transport-core/contract-group-attribute/create',
  UPDATE_ATTRIBUTE = '/fsales-transport-core/contract-group-attribute/update',
  DELETE_ATTRIBUTE = '/fsales-transport-core/contract-group-attribute/delete',
  GET_ALL_ATTRIBUTE = '/fsales-transport-core/contract-group-attribute/get-all-attribute',
  //Renewal
  SEARCH_RENEWAL = '/fsales-transport-core/renewal/getAll',
  CREATE_RENEWAL = '/fsales-transport-core/renewal/create',
  UPDATE_RENEWAL = '/fsales-transport-core/renewal/update',
  DELETE_RENEWAL = '/fsales-transport-core/renewal/delete',
}

export const searchRenewal = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH_RENEWAL,
    params,
  });

export const createRenewal = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_RENEWAL,
    data,
  });
export const updateRenewal = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_RENEWAL,
    data,
  });

export const deleteRenewal = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_RENEWAL,
    params,
  });
export const getAllGroupAttribute = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_GROUP_ATTRIBUTE,
    params,
  });

export const getGroupAttribute = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_GROUP_ATTRIBUTE,
    params,
  });
export const createGroupAttribute = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_GROUP_ATTRIBUTE,
    data,
  });
export const updateGroupAttribute = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_GROUP_ATTRIBUTE,
    data,
  });
export const deleteGroupAttribute = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_GROUP_ATTRIBUTE,
    params,
  });

export const getAllAttribute = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_ATTRIBUTE,
    params,
  });
export const createAttribute = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_ATTRIBUTE,
    data,
  });
export const updateAttribute = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_ATTRIBUTE,
    data,
  });
export const deleteAttribute = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_ATTRIBUTE,
    params,
  });
