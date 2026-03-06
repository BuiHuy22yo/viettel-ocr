import { defHttp } from '@/utils/http/axios';

enum Api {
  SEARCH_PAYMENT = '/fsales-transport-core/payment/search',
  DELETE_PAYMENT = '/fsales-transport-core/payment/delete',
  APPROVE_PAYMENT = '/fsales-transport-core/payment/approve',
  SEARCH_PAYMENT_DETAIL = '/fsales-transport-core/payment-detail/search',
  PAYMENT_DETAIL_FOR_TEMPLATE = '/fsales-transport-core/payment-detail/for-template',
  UPDATE_BATCH_PAYMENT_DETAIL = '/fsales-transport-core/payment-detail/update-batch',
  GET_PAYMENT_DETAIL_TEMPLATE_HEADER = '/fsales-transport-core/payment-detail/template-header',
  GET_PAYMENT_DETAIL_TEMPLATE_DATA = '/fsales-transport-core/payment-detail/template-data',
  UPDATE_PAYMENT_DETAIL_TEMPLATE_DATA = '/fsales-transport-core/payment-detail/update-template-data',
  SEARCH_PAYMENT_DOC = '/fsales-transport-core/payment-doc/search',
  CREATE_PAYMENT_DOC = '/fsales-transport-core/payment-doc/create',
  UPDATE_PAYMENT_DOC = '/fsales-transport-core/payment-doc/update',
  DELETE_PAYMENT_DOC = '/fsales-transport-core/payment-doc/delete',
  PAYMENT_DEBT_BY_CONTRACT = '/fsales-transport-core/payment-debt/by-contract',
  PAYMENT_DEBT_BY_PARTNER = '/fsales-transport-core/payment-debt/by-partner',
  PAYMENT_DEBT_UPDATE = '/fsales-transport-core/payment-debt/update',
  PAYMENT_DEBT_TRANS_SEARCH = '/fsales-transport-core/payment-debt-trans/search',
  PAYMENT_DEBT_TRANS_CREATE = '/fsales-transport-core/payment-debt-trans/create',
  PAYMENT_DEBT_TRANS_UPDATE = '/fsales-transport-core/payment-debt-trans/update',
  PAYMENT_DEBT_TRANS_DELETE = '/fsales-transport-core/payment-debt-trans/delete',
  SEARCH_PAYMENT_CONTRACT = '/fsales-transport-core/payment/search-payment',
  PAYMENT_DEBT_BY_CONTRACT_MAIN = '/fsales-transport-core/payment-debt/by-contract-main',
  SEARCH_PAYMENT_DOC_BY_CONTRACT = '/fsales-transport-core/payment-doc/search-by-contract',
  GET_APPENDIX_BY_CONTRACT = '/fsales-transport-core/payment/get-appendix-by-contract',
  GET_PHASE_BY_CONTRACT = '/fsales-transport-core/payment/get-phase-by-contract',
}

export const searchPayment = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH_PAYMENT,
    params,
  });

export const deletePayment = (data: any) =>
  defHttp.post<any>({
    url: Api.DELETE_PAYMENT,
    data,
  });

export const approvePayment = (data: any) =>
  defHttp.post<any>({
    url: Api.APPROVE_PAYMENT,
    data,
  });

export const searchPaymentDetail = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH_PAYMENT_DETAIL,
    params,
  });

export const paymentDetailForTemplate = (params: any) =>
  defHttp.get<any>({
    url: Api.PAYMENT_DETAIL_FOR_TEMPLATE,
    params,
  });

export const updateBatchPaymentDetail = (data: any) =>
  defHttp.post<any>({
    url: Api.UPDATE_BATCH_PAYMENT_DETAIL,
    data,
  });

export const getPaymentDetailTemplateHeader = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_PAYMENT_DETAIL_TEMPLATE_HEADER,
    params,
  });

export const getPaymentDetailTemplateData = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_PAYMENT_DETAIL_TEMPLATE_DATA,
    params,
  });

export const updatePaymentDetailTemplateData = (data: any) =>
  defHttp.post<any>({
    url: Api.UPDATE_PAYMENT_DETAIL_TEMPLATE_DATA,
    data,
  });

export const searchPaymentDoc = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH_PAYMENT_DOC,
    params,
  });

export const createPaymentDoc = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_PAYMENT_DOC,
    data,
  });

export const updatePaymentDoc = (data: any) =>
  defHttp.post<any>({
    url: Api.UPDATE_PAYMENT_DOC,
    data,
  });

export const deletePaymentDoc = (data: any) =>
  defHttp.post<any>({
    url: Api.DELETE_PAYMENT_DOC,
    data,
  });

export const paymentDebtByContract = (params: any) =>
  defHttp.get<any>({
    url: Api.PAYMENT_DEBT_BY_CONTRACT,
    params,
  });

export const paymentDebtByContractMainApi = (params: any) =>
  defHttp.get<any>({
    url: Api.PAYMENT_DEBT_BY_CONTRACT_MAIN,
    params,
  });

export const paymentDebtByPartner = (params: any) =>
  defHttp.get<any>({
    url: Api.PAYMENT_DEBT_BY_PARTNER,
    params,
  });

export const updatePaymentDebt = (data: any) =>
  defHttp.post<any>({
    url: Api.PAYMENT_DEBT_UPDATE,
    data,
  });

export const searchPaymentDebtTrans = (params: any) =>
  defHttp.get<any>({
    url: Api.PAYMENT_DEBT_TRANS_SEARCH,
    params,
  });

export const createPaymentDebtTrans = (data: any) =>
  defHttp.post<any>({
    url: Api.PAYMENT_DEBT_TRANS_CREATE,
    data,
  });

export const updatePaymentDebtTrans = (data: any) =>
  defHttp.post<any>({
    url: Api.PAYMENT_DEBT_TRANS_UPDATE,
    data,
  });

export const deletePaymentDebtTrans = (data: any) =>
  defHttp.post<any>({
    url: Api.PAYMENT_DEBT_TRANS_DELETE,
    data,
  });
export const searchPaymentContractApi = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH_PAYMENT_CONTRACT,
    params,
  });
export const searchPaymentDocByContractApi = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH_PAYMENT_DOC_BY_CONTRACT,
    params,
  });

export const getListAppendixByContractApi = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_APPENDIX_BY_CONTRACT,
    params,
  });

export const getListPhaseByContractApi = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_PHASE_BY_CONTRACT,
    params,
  });
