import { defHttp } from '@/utils/http/axios';

enum Api {
  SEARCH_CUSTOMER = '/fsales-core/customer/findAllCustomer',
  GETALL_CUSTOMER = '/fsales-core/customer/getAll',
  CREATE_CUSTOMER = '/fsales-core/customer/create',
  UPDATE_CUSTOMER = '/fsales-core/customer/update',
  DELETE_CUSTOMER = '/fsales-core/customer/delete',
}

export const searchCustomer = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_CUSTOMER,
    data,
  });

export const getAllCustomer = () =>
  defHttp.get<any>({
    url: Api.GETALL_CUSTOMER,
  });

export const createCustomer = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_CUSTOMER,
    data,
  });
export const updateCustomer = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_CUSTOMER,
    data,
  });

export const deleteCustomer = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_CUSTOMER,
    params,
  });
