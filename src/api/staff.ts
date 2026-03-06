import { defHttp } from '@/utils/http/axios';

enum Api {
  SEARCH_STAFF = '/fsales-core/staff/findAllStaff',
  GETALL_STAFF = '/fsales-core/staff/getAll',
  FIND_STAFF = '/fsales-core/staff/findStaff',
}

export const searchStaff = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_STAFF,
    data,
  });

export const getAllStaff = (params) =>
  defHttp.get<any>({
    url: Api.GETALL_STAFF,
    params,
  });

export const findStaff = (params) =>
  defHttp.get<any>({
    url: Api.FIND_STAFF,
    params,
  });
