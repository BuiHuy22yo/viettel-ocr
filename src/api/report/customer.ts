import { defHttp } from '@/utils/http/axios';

enum Api {
  GET_TOTAL_CUSTOMER = '/fsales-report/customer-general/getTotal',
  GET_CUSTOMER_BY_STATUS = '/fsales-report/customer-general/getStatus',
  GET_CUSTOMER_BY_MONTH = '/fsales-report/customer-general/getCustomerMonth',
  GET_CUSTOMER_BY_LEVEL = '/fsales-report/customer-general/getLevel',
  GET_CUSTOMER_BY_SIZE = '/fsales-report/customer-general/getCustomerSize',
  GET_CUSTOMER_BY_INDUSTRY = '/fsales-report/customer-general/getCustomerIndustry',
}

export const getTotalCustomer = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_TOTAL_CUSTOMER,
    params,
  });

export const getCustomerByStatus = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_CUSTOMER_BY_STATUS,
    params,
  });

export const getCustomerByMonth = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_CUSTOMER_BY_MONTH,
    params,
  });

export const getCustomerByLevel = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_CUSTOMER_BY_LEVEL,
    params,
  });

export const getCustomerSize = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_CUSTOMER_BY_SIZE,
    params,
  });

export const getCustomerIndustry = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_CUSTOMER_BY_INDUSTRY,
    params,
  });
