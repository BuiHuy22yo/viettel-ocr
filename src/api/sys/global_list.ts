import { defHttp } from '@/utils/http/axios';
import { globalListParams } from '@/api/sys/model/globalList';

enum Api {
  INSERT_GLOBAL_LIST = '/fsales-core/globalList/insertGlobalList',
  SEARCH_GLOBAL_LIST = '/fsales-core/globalList/searchGlobalList',
  UPDATE_GLOBAL_LIST = '/fsales-core/globalList/updateGlobalList',

  INSERT_GLOBAL_LIST_DETAIL = '/fsales-core/globalListDetail/create',
  UPDATE_GLOBAL_LIST_DETAIL = '/fsales-core/globalListDetail/update',
  DELETE_GLOBAL_LIST_DETAIL = '/fsales-core/globalListDetail/delete',
  GET_LIST_GLOBAL_VALUE_BY_CODE = '/fsales-core/globalListDetail/getListGlobalValueByCode',
  GET_OPT_GLOBAL_LIST_BY_CODE = '/fsales-core/globalList/getOptGlobalListByCode',

  INSERT_REQUEST_TYPE = '/fsales-core/request-type',
  FIND_REQUEST_TYPE = '/fsales-core/request-type',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  UPDATE_REQUEST_TYPE = '/fsales-core/request-type',
  DELETE_REQUEST_TYPE = '/fsales-core/request-type/{id}',
  SEARCH_REQUEST_TYPE = '/fsales-core/request-type/search',
}

export const insertGlobalList = (data: globalListParams) =>
  defHttp.post<globalListParams>({
    url: Api.INSERT_GLOBAL_LIST,
    data,
  });

export const getOptGlobalListByCode = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_OPT_GLOBAL_LIST_BY_CODE,
    params,
  });

export const updateGlobalList = (data: globalListParams) =>
  defHttp.put<globalListParams>({
    url: Api.UPDATE_GLOBAL_LIST,
    data,
  });

export const searchGlobalList = (params: any) =>
  defHttp.get<void>({ url: Api.SEARCH_GLOBAL_LIST, params });

export const insertGlobalListDetail = (data: any) =>
  defHttp.post<any>({
    url: Api.INSERT_GLOBAL_LIST_DETAIL,
    data,
  });

export const updateGlobalListDetail = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_GLOBAL_LIST_DETAIL,
    data,
  });

export const deleteGlobalListDetail = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_GLOBAL_LIST_DETAIL,
    params,
  });

export const getListGlobalValueByCode = (params: object) =>
  defHttp.get<any>(
    { url: Api.GET_LIST_GLOBAL_VALUE_BY_CODE, params },
    {
      isTransformResponse: false,
    },
  );

export const insertRequestType = (data: any) =>
  defHttp.post<any>({
    url: Api.INSERT_REQUEST_TYPE,
    data,
  });

export const updateRequestType = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_REQUEST_TYPE,
    data,
  });

export const deleteRequestType = (data: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_REQUEST_TYPE.replace('{id}', data.id),
    data,
  });

export const searchRequestType = (params: object) =>
  defHttp.get<any>(
    { url: Api.SEARCH_REQUEST_TYPE, params },
    {
      isTransformResponse: false,
    },
  );

export const findAllRequestType = () =>
  defHttp.get<any>(
    { url: Api.FIND_REQUEST_TYPE },
    {
      isTransformResponse: false,
    },
  );
