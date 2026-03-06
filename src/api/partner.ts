import { defHttp } from '@/utils/http/axios';

enum Api {
  SEARCH_PARTNER = '/fsales-transport-core/partner/findAll',
  DELETE_PARTNER = '/fsales-transport-core/partner/delete',
  CREATE_PARTNER = '/fsales-transport-core/partner/create',
  UPDATE_PARTNER = '/fsales-transport-core/partner/update',
  GET_PARTNER = '/fsales-transport-core/partner/getAll',
  FIND_PARTNER = '/fsales-transport-core/partner/findPartner',
  SEARCH_PARTNER_BY_CONDITIONAL = '/fsales-transport-core/partner/search',
  EXPORT_PARTNER = '/fsales-transport-core/partner/export',
  GET_SERVICE_BY_PARTER = '/fsales-transport-core/partner/getPartnerContract',
  GET_PAYMENT_BY_PARTNER = '/fsales-transport-core/partner/getPartnerPayment',
  GET_DEBT_BY_PARTNER = '/fsales-transport-core/partner/getPartnerPaymentDebt',
  SEARCH_PARTNER_LEAD = '/fsales-transport-core/partner-lead',
  EXPORT_PARTNER_LEAD = '/fsales-transport-core/partner-lead/export',

  EXPORT_SERVICE_BY_PARTER = '/fsales-transport-core/partner/partner-service-export',
  EXPORT_PAYMENT_BY_PARTNER = '/fsales-transport-core/partner/partner-payment-export',
  EXPORT_DEBT_BY_PARTNER = '/fsales-transport-core/partner/partner-payment-debt-export',

  GET_PARTNER_BY_GROUP_AND_STATUS = '/fsales-transport-core/partner/get-partner-by-group-and-status',
}

export const exportPartner = (params: any) =>
  defHttp.get<any>(
    {
      url: Api.EXPORT_PARTNER,
      params,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );
export const getPartner = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_PARTNER,
    params,
  });

export const getServiceByPartner = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_SERVICE_BY_PARTER,
    params,
  });

export const getPaymentByPartner = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_PAYMENT_BY_PARTNER,
    params,
  });

export const getDebtByPartner = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_DEBT_BY_PARTNER,
    params,
  });

export const exportServiceByPartner = (params: any) =>
  defHttp.get<any>(
    {
      url: Api.EXPORT_SERVICE_BY_PARTER,
      params,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const exportPaymentByPartner = (params: any) =>
  defHttp.get<any>(
    {
      url: Api.EXPORT_PAYMENT_BY_PARTNER,
      params,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const exportDebtByPartner = (params: any) =>
  defHttp.get<any>(
    {
      url: Api.EXPORT_DEBT_BY_PARTNER,
      params,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const findPartner = (params: any) =>
  defHttp.get<any>({
    url: Api.FIND_PARTNER,
    params,
  });

export const searchPartner = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_PARTNER,
    data,
  });

export const getAllPartner = async (params: any) => {
  const result = await defHttp.get<any>({
    url: Api.GET_PARTNER,
    params,
  });

  if (result?.length > 0) {
    result?.forEach((item) => (item.codeName = item.partnerCode + ' - ' + item.partnerName));
  }

  return result;
};

export const createPartner = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_PARTNER,
    data,
  });

export const updatePartner = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_PARTNER,
    data,
  });

export const deletePartner = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_PARTNER,
    params,
  });
export const searchPartnerByConditional = (params) => {
  return defHttp.get<any>({
    url: Api.SEARCH_PARTNER_BY_CONDITIONAL,
    params,
  });
};

export const searchPartnerLead = (params) => {
  return defHttp.get<any>({
    url: Api.SEARCH_PARTNER_LEAD,
    params,
  });
};

export const exportPartnerLead = (params?: any) =>
  defHttp.get<any>(
    {
      url: Api.EXPORT_PARTNER_LEAD,
      params,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );
export const getPartnerByGroupAndStatusApi = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_PARTNER_BY_GROUP_AND_STATUS,
    params,
  });
