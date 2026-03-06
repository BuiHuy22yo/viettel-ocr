import { defHttp } from '@/utils/http/axios';

enum Api {
  GET_ATTRIBUTE = '/fsales-core/attribute/getAll',
  GET_ATTRIBUTE_BY_PRODUCT = '/fsales-core/attribute/getAttributeByProductId',
  CREATE_ATTRIBUTE = '/fsales-core/attribute/create',
  UPDATE_ATTRIBUTE = '/fsales-core/attribute/update',
  DELETE_ATTRIBUTE = '/fsales-core/attribute/delete',
}

export const getAllAttribute = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ATTRIBUTE,
    params,
  });

export const getAllAttributeByProduct = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ATTRIBUTE_BY_PRODUCT,
    params,
  });

export const createAttribute = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_ATTRIBUTE,
    data,
  });

export const updateAttribute = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_ATTRIBUTE,
    data,
  });

export const deleteAttribute = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_ATTRIBUTE,
    params,
  });
