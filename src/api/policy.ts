import { defHttp } from '@/utils/http/axios';

enum Api {
  SEARCH_POLICY = '/fsales-transport-performance/policy/search',
  CREATE_POLICY = '/fsales-transport-performance/policy/create',
  UPDATE_POLICY = '/fsales-transport-performance/policy/update',
  DELETE_POLICY = '/fsales-transport-performance/policy/delete',

  //sub-policy
  SEARCH_SUB_POLICY = '/fsales-transport-performance/sub-policy/search',
  CREATE_SUB_POLICY = '/fsales-transport-performance/sub-policy/create',
  UPDATE_SUB_POLICY = '/fsales-transport-performance/sub-policy/update',
  DELETE_SUB_POLICY = '/fsales-transport-performance/sub-policy/delete',
  DETAIL_SUB_POLICY = '/fsales-transport-performance/sub-policy/findById',

  //sub-policy detail rule
  SEARCH_SUB_POLICY_RULE = '/fsales-transport-performance/sub-policy-rule/search',
  CREATE_SUB_POLICY_RULE = '/fsales-transport-performance/sub-policy-rule/create',
  UPDATE_SUB_POLICY_RULE = '/fsales-transport-performance/sub-policy-rule/update',
  DELETE_SUB_POLICY_RULE = '/fsales-transport-performance/sub-policy-rule/delete',

  //sub-policy detail tariff
  SEARCH_SUB_POLICY_TARIFF = '/fsales-transport-performance/sub-policy-tariff/search',
  CREATE_SUB_POLICY_TARIFF = '/fsales-transport-performance/sub-policy-tariff/create',
  UPDATE_SUB_POLICY_TARIFF = '/fsales-transport-performance/sub-policy-tariff/update',
  DELETE_SUB_POLICY_TARIFF = '/fsales-transport-performance/sub-policy-tariff/delete',
}

export const searchPolicy = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_POLICY,
    data,
  });
export const createPolicy = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_POLICY,
    data,
  });
export const updatePolicy = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_POLICY,
    data,
  });

export const deletePolicy = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_POLICY,
    params,
  });

export const searchSubPolicy = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_SUB_POLICY,
    data,
  });
export const createSubPolicy = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_SUB_POLICY,
    data,
  });
export const updateSubPolicy = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_SUB_POLICY,
    data,
  });

export const deleteSubPolicy = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_SUB_POLICY,
    params,
  });

export const getDetailSubPolicy = (params: any) =>
  defHttp.get<any>({
    url: Api.DETAIL_SUB_POLICY,
    params,
  });

export const searchSubPolicyRule = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_SUB_POLICY_RULE,
    data,
  });
export const createSubPolicyRule = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_SUB_POLICY_RULE,
    data,
  });
export const updateSubPolicyRule = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_SUB_POLICY_RULE,
    data,
  });

export const deleteSubPolicyRule = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_SUB_POLICY_RULE,
    params,
  });

export const searchSubPolicyTariff = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_SUB_POLICY_TARIFF,
    data,
  });
export const createSubPolicyTariff = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_SUB_POLICY_TARIFF,
    data,
  });
export const updateSubPolicyTariff = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_SUB_POLICY_TARIFF,
    data,
  });

export const deleteSubPolicyTariff = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_SUB_POLICY_TARIFF,
    params,
  });
