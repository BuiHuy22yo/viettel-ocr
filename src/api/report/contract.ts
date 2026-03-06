import { defHttp } from '@/utils/http/axios';

enum Api {
  GET_TOTAL_CONTRACT = '/fsales-report/contract-general/getTotal',
  GET_CONTRACT_BY_REVENUE = '/fsales-report/contract-general/getByRevenue',
  GET_CONTRACT_BY_QUANTITY = '/fsales-report/contract-general/getQuantity',
  GET_CONTRACT_REVENUE = '/fsales-report/contract-general/getRevenue',
  GET_CONTRACT_BY_MONTH = '/fsales-report/contract-general/getAllMonth',
}

export const getTotalContract = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_TOTAL_CONTRACT,
    params,
  });

export const getContractByRevenue = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_CONTRACT_BY_REVENUE,
    params,
  });

export const getContractQuantity = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_CONTRACT_BY_QUANTITY,
    params,
  });

export const getContractRevenue = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_CONTRACT_REVENUE,
    params,
  });

export const getContractAllMonth = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_CONTRACT_BY_MONTH,
    params,
  });
