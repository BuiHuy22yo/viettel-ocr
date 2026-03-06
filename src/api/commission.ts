import { defHttp } from '@/utils/http/axios';

enum Api {
  GET_COMMISSION = '/fsales-performance/getCommission',
  //Staff
  GET_CONTRACT_REVENUE_BY_STAFF = '/fsales-performance/getContractRevenueByStaff',
  GET_ACCUMULATED_CONTRACT_REVENUE_BY_STAFF = '/fsales-performance/getAccumulatedContractRevenueByStaff',
  GET_COMMISSION_BY_STAFF = '/fsales-performance/getCommissionByStaff',
  //Org
  GET_COMMISSION_REVENUE_BY_ORG = '/fsales-performance/getCommissionRevenueByOrg',
  GET_COMMISSION_REVENUE_ORG_BY_CONTRACT = '/fsales-performance/getCommissionRevenueOrgByContract',
  GET_COMMISSION_BY_ORG = '/fsales-performance/getCommissionByOrg',
  //Channel
  GET_COMMISSION_REVENUE_BY_CHANNEL = '/fsales-performance/getCommissionRevenueByChannel',
  GET_COMMISSION_REVENUE_CHANNEL_BY_CONTRACT = '/fsales-performance/getCommissionRevenueChannelByContract',
  GET_COMMISSION_BY_CHANNEL = '/fsales-performance/getCommissionChannel',
}

export const getCommission = (data: any) =>
  defHttp.post<any>({
    url: Api.GET_COMMISSION,
    data,
  });

export const getContractRevenueByStaff = (data: any) =>
  defHttp.post<any>({
    url: Api.GET_CONTRACT_REVENUE_BY_STAFF,
    data,
  });

export const getAccumulatedContractRevenueByStaff = (data: any) =>
  defHttp.post<any>({
    url: Api.GET_ACCUMULATED_CONTRACT_REVENUE_BY_STAFF,
    data,
  });

export const getCommissionByStaff = (data: any) =>
  defHttp.post<any>({
    url: Api.GET_COMMISSION_BY_STAFF,
    data,
  });

export const getCommissionRevenueByOrg = (data: any) =>
  defHttp.post<any>({
    url: Api.GET_COMMISSION_REVENUE_BY_ORG,
    data,
  });

export const getCommissionRevenueOrgByContract = (data: any) =>
  defHttp.post<any>({
    url: Api.GET_COMMISSION_REVENUE_ORG_BY_CONTRACT,
    data,
  });

export const getCommissionByOrg = (data: any) =>
  defHttp.post<any>({
    url: Api.GET_COMMISSION_BY_ORG,
    data,
  });

export const getCommissionRevenueByChannel = (data: any) =>
  defHttp.post<any>({
    url: Api.GET_COMMISSION_REVENUE_BY_CHANNEL,
    data,
  });

export const getCommissionRevenueChannelByContract = (data: any) =>
  defHttp.post<any>({
    url: Api.GET_COMMISSION_REVENUE_CHANNEL_BY_CONTRACT,
    data,
  });

export const getCommissionByChannel = (data: any) =>
  defHttp.post<any>({
    url: Api.GET_COMMISSION_BY_CHANNEL,
    data,
  });
