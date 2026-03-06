import { defHttp } from '@/utils/http/axios';

enum Api {
  SEARCH_POLICY = '/fsales-transport-core/service-policy/getAll',
  CREATE_POLICY = '/fsales-transport-core/service-policy/create',
  UPDATE_POLICY = '/fsales-transport-core/service-policy/update',
  DELETE_POLICY = '/fsales-transport-core/service-policy/delete',
  EXPORT_POLICY = '/fsales-transport-core/service-policy/export',

  //sub-policy
  SEARCH_SUB_POLICY = '/fsales-transport-core/service-sub-policy/getAll',
  CREATE_SUB_POLICY = '/fsales-transport-core/service-sub-policy/create',
  UPDATE_SUB_POLICY = '/fsales-transport-core/service-sub-policy/update',
  DELETE_SUB_POLICY = '/fsales-transport-core/service-sub-policy/delete',
  DETAIL_SUB_POLICY = '/fsales-transport-core/service-sub-policy/findById',

  //sub-policy detail rule
  SEARCH_SUB_POLICY_RULE = '/fsales-transport-core/service-sub-policy-rule/getAll',
  CREATE_SUB_POLICY_RULE = '/fsales-transport-core/service-sub-policy-rule/create',
  UPDATE_SUB_POLICY_RULE = '/fsales-transport-core/service-sub-policy-rule/update',
  DELETE_SUB_POLICY_RULE = '/fsales-transport-core/service-sub-policy-rule/delete',

  //sub-policy detail tariff
  SEARCH_SUB_POLICY_TARIFF = '/fsales-transport-core/service-sub-policy-tariff/getAll',
  CREATE_SUB_POLICY_TARIFF = '/fsales-transport-core/service-sub-policy-tariff/create',
  UPDATE_SUB_POLICY_TARIFF = '/fsales-transport-core/service-sub-policy-tariff/update',
  DELETE_SUB_POLICY_TARIFF = '/fsales-transport-core/service-sub-policy-tariff/delete',

  //calulated value
  GET_ALL_CALCULATE_VALUE = '/fsales-transport-core/service-policy-calculate/getAll',
  GET_FIELD_POLICY = '/fsales-transport-core/service-policy-field/getAll',
  GET_APPLY_TO = '/fsales-transport-core/service-policy-apply-to/findByFieldPolicy',
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

export const getAllCalculateValue = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_CALCULATE_VALUE,
    params,
  });

export const getFieldPolicy = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_FIELD_POLICY,
    params,
  });

export const getApplyTo = (params: any) => {
  if (params.fieldPolicyCode) {
    return defHttp.get<any>({
      url: Api.GET_APPLY_TO,
      params,
    });
  }
  return null;
};

export const exportServicePolicy = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_POLICY,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );
