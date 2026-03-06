import { defHttp } from '@/utils/http/axios';
import { companyModel } from '@/api/model/orgModel';

enum Api {
  GETALL_DOMAIN = '/fsales-core/business-domain/getAll',
  CREATE_DOMAIN = '/fsales-core/business-domain/create',
  UPDATE_DOMAIN = '/fsales-core/business-domain/update',
  DELETE_DOMAIN = '/fsales-core/business-domain/delete',

  CREATE_SEGMENT = '/fsales-core/segment/create',
  UPDATE_SEGMENT = '/fsales-core/segment/update',
  DELETE_SEGMENT = '/fsales-core/segment/delete',
  GETALL_SEGMENT = '/fsales-core/segment/getAll',

  CREATE_POSITION = '/fsales-core/position/create',
  UPDATE_POSITION = '/fsales-core/position/update',
  DELETE_POSITION = '/fsales-core/position/delete',
  GETALL_POSITION = '/fsales-core/position/getAll',

  CREATE_CHANNEL = '/fsales-core/channel/create',
  UPDATE_CHANNEL = '/fsales-core/channel/update',
  DELETE_CHANNEL = '/fsales-core/channel/delete',
  GETALL_CHANNEL = '/fsales-core/channel/getAll',
}

export const getAllDomain = (params: any) =>
  defHttp.get<any>({
    url: Api.GETALL_DOMAIN,
    params,
  });
export const createDomain = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_DOMAIN,
    data,
  });
export const updateDomain = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_DOMAIN,
    data,
  });
export const deleteDomain = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_DOMAIN,
    params,
  });

export const getAllSegment = (params: any) =>
  defHttp.get<any>({
    url: Api.GETALL_SEGMENT,
    params,
  });
export const createSegment = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_SEGMENT,
    data,
  });
export const updateSegment = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_SEGMENT,
    data,
  });
export const deleteSegment = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_SEGMENT,
    params,
  });

export const getAllRole = (params: any) =>
  defHttp.get<any>({
    url: Api.GETALL_POSITION,
    params,
  });
export const createRole = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_POSITION,
    data,
  });
export const updateRole = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_POSITION,
    data,
  });
export const deleteRole = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_POSITION,
    params,
  });

export const getAllChannel = (params: any) =>
  defHttp.get<any>({
    url: Api.GETALL_CHANNEL,
    params,
  });
export const createChannel = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_CHANNEL,
    data,
  });
export const updateChannel = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_CHANNEL,
    data,
  });
export const deleteChannel = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_CHANNEL,
    params,
  });
