import { defHttp } from '@/utils/http/axios';

enum Api {
  CREATE_PARTNER_RECONCILIATION = '/fsales-transport-core/sm-quality-partner_reconcile/create',
  SEARCH_PARTNER_RECONCILIATION = '/fsales-transport-core/sm-quality-partner_reconcile/search',
  APPROVE_PARTNER_RECONCILIATION = '/fsales-transport-core/sm-quality-partner_reconcile/approve',
  SUMMARY_PARTNER_RECONCILIATION = '/fsales-transport-core/sm-quality-partner_reconcile/summary',
  GET_PARTNER_RECONCILIATION_TEMPLATE_HEADER = '/fsales-transport-core/sm-quality-partner_reconcile/template-header',
  GET_PARTNER_RECONCILIATION_TEMPLATE_DATA = '/fsales-transport-core/sm-quality-partner_reconcile/template-data',
  UPDATE_PARTNER_RECONCILIATION_TEMPLATE_DATA = '/fsales-transport-core/sm-quality-partner_reconcile/update-template-data',
}

export const createPartnerReconciliation = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_PARTNER_RECONCILIATION,
    data,
  });

export const searchPartnerReconciliation = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH_PARTNER_RECONCILIATION,
    params,
  });

export const approvePartnerReconciliation = (data: any) =>
  defHttp.post<any>({
    url: Api.APPROVE_PARTNER_RECONCILIATION,
    data,
  });

export const summaryPartnerReconciliation = (data: any) =>
  defHttp.post<any>({
    url: Api.SUMMARY_PARTNER_RECONCILIATION,
    data,
  });

export const getPartnerReconciliationTemplateHeader = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_PARTNER_RECONCILIATION_TEMPLATE_HEADER,
    params,
  });

export const getPartnerReconciliationTemplateData = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_PARTNER_RECONCILIATION_TEMPLATE_DATA,
    params,
  });

export const updatePartnerReconciliationTemplateData = (data: any) =>
  defHttp.post<any>({
    url: Api.UPDATE_PARTNER_RECONCILIATION_TEMPLATE_DATA,
    data,
  });
