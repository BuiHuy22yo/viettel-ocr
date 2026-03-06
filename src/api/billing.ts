import { defHttp } from '@/utils/http/axios';

enum Api {
  SEARCH_BILLING = '/fsales-core/billing/search',
  CREATE_BILLING = '/fsales-core/billing/create',
  UPDATE_BILLING = '/fsales-core/billing/update',
  DELETE_BILLING = '/fsales-core/billing/delete',
  APPROVE_BILLING = '/fsales-core/billing/approve',
  GET_BILLING_TEMPLATE_HEADER = '/fsales-core/billing/template-header',
  GET_BILLING_TEMPLATE_DATA = '/fsales-core/billing/template-data',
  UPDATE_BILLING_TEMPLATE_DATA = '/fsales-core/billing/update-template-data',
  SEARCH_BILLING_DATA_TABLE = '/fsales-core/billing/search-data-table',
  BILLING_BY_CUSTOMER = '/fsales-core/billing/by-customer',
}

export const searchBilling = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH_BILLING,
    params,
  });

export const createBilling = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_BILLING,
    data,
  });

export const updateBilling = (data: any) =>
  defHttp.post<any>({
    url: Api.UPDATE_BILLING,
    data,
  });

export const deleteBilling = (data: any) =>
  defHttp.post<any>({
    url: Api.DELETE_BILLING,
    data,
  });

export const approveBilling = (data: any) =>
  defHttp.post<any>({
    url: Api.APPROVE_BILLING,
    data,
  });

export const getBillingTemplateHeader = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_BILLING_TEMPLATE_HEADER,
    params,
  });

export const getBillingTemplateData = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_BILLING_TEMPLATE_DATA,
    params,
  });

export const updateBillingTemplateData = (data: any) =>
  defHttp.post<any>({
    url: Api.UPDATE_BILLING_TEMPLATE_DATA,
    data,
  });

export const searchBillingDataTable = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH_BILLING_DATA_TABLE,
    params,
  });

export const billingByCustomer = (params: any) =>
  defHttp.get<any>({
    url: Api.BILLING_BY_CUSTOMER,
    params,
  });
