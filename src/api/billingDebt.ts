import { defHttp } from '@/utils/http/axios';

enum Api {
  SEARCH_BILLING_DEBT = '/fsales-core/billing-debt/search',
  BILLING_DEBT_BY_CUSTOMER = '/fsales-core/billing-debt/by-customer',
  UPDATE_BILLING_DEBT = '/fsales-core/billing-debt/update',
}

export const searchBillingDebt = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH_BILLING_DEBT,
    params,
  });

export const billingDebtByCustomer = (params: any) =>
  defHttp.get<any>({
    url: Api.BILLING_DEBT_BY_CUSTOMER,
    params,
  });

export const updateBillingDebt = (data: any) =>
  defHttp.post<any>({
    url: Api.UPDATE_BILLING_DEBT,
    data,
  });
