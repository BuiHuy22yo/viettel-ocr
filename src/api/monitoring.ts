import { defHttp } from '@/utils/http/axios';
import { ContentTypeEnum } from '@/enums/httpEnum';

enum Api {
  SEARCH_MONITORING = '/fsales-transport-core/service-management-monitoring/search',
  EXPORT_MONITORING = '/fsales-transport-core/service-management-monitoring/export',
  IMPORT_MONITORING = '/fsales-transport-core/service-management-monitoring/import',
  UPDATE_MONITORING = '/fsales-transport-core/service-management-monitoring/update',
  DELETE_MONITORING = '/fsales-transport-core/service-management-monitoring/delete',

  SEARCH_DEPLOYMENT = '/fsales-transport-core/service-management-monitoring/search-deployment',
  EXPORT_DEPLOYMENT = '/fsales-transport-core/service-management-monitoring/export-deployment',

  // Downtime
  SEARCH_DOWNTIME = '/fsales-transport-core/monitoring/downtime/search-downtime',
  IMPORT_DOWNTIME = '/fsales-transport-core/monitoring/downtime/import-service-comm-loss',
  EXPORT_DOWNTIME = '/fsales-transport-core/monitoring/downtime/export-downtime',

  SEARCH_DOWNTIME_TOTAL = '/fsales-transport-core/monitoring/downtime/search-downtime-total',
  EXPORT_DOWNTIME_TOTAL = '/fsales-transport-core/monitoring/downtime/export-downtime-total',

  SEARCH_DOWNTIME_CONTRACT = '/fsales-transport-core/monitoring/downtime/search-downtime-contract',
  EXPORT_DOWNTIME_CONTRACT = '/fsales-transport-core/monitoring/downtime/export-downtime-contract',

  SEARCH_DOWNTIME_PARTNER = '/fsales-transport-core/monitoring/downtime/search-downtime-partner',
  EXPORT_DOWNTIME_PARTNER = '/fsales-transport-core/monitoring/downtime/export-downtime-partner',

  // Incident Response
  SEARCH_INCIDENT_RESPONSE = '/fsales-transport-core/monitoring/incident-response/search-incident-response',
  EXPORT_INCIDENT_RESPONSE = '/fsales-transport-core/monitoring/incident-response/export-incident-response',

  SEARCH_INCIDENT_RESPONSE_TOTAL = '/fsales-transport-core/monitoring/incident-response/search-incident-response-total',
  EXPORT_INCIDENT_RESPONSE_TOTAL = '/fsales-transport-core/monitoring/incident-response/export-incident-response-total',

  SEARCH_INCIDENT_RESPONSE_CONTRACT = '/fsales-transport-core/monitoring/incident-response/search-incident-response-contract',
  EXPORT_INCIDENT_RESPONSE_CONTRACT = '/fsales-transport-core/monitoring/incident-response/export-incident-response-contract',

  SEARCH_SNMP_DEVICE = '/fsales-transport-core/service-management-monitoring/get-snmp-device',
  SEARCH_NETWORK_INCIDENT = '/fsales-transport-core/service-management-monitoring/get-network-incident',
}

export const searchMonitoringBase = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_MONITORING,
    data,
  });

export const exportMonitoring = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_MONITORING,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const importMonitoring = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.IMPORT_MONITORING,
      data,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        // @ts-ignore
        ignoreCancelToken: true,
      },
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const updateMonitoring = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_MONITORING,
    data,
  });

export const deleteMonitoring = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_MONITORING,
    params,
  });

export const searchDeployment = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_DEPLOYMENT,
    data,
  });

export const exportDeployment = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_DEPLOYMENT,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

// BLOCK Downtime
export const searchDowntime = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_DOWNTIME,
    data,
  });

export const importDowntime = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.IMPORT_DOWNTIME,
      data,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        // @ts-ignore
        ignoreCancelToken: true,
      },
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const exportDowntime = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_DOWNTIME,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const searchDowntimeTotal = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_DOWNTIME_TOTAL,
    data,
  });

export const exportDowntimeTotal = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_DOWNTIME_TOTAL,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const searchDowntimeContract = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_DOWNTIME_CONTRACT,
    data,
  });

export const exportDowntimeContract = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_DOWNTIME_CONTRACT,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const searchDowntimePartner = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_DOWNTIME_PARTNER,
    data,
  });

export const exportDowntimePartner = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_DOWNTIME_PARTNER,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );
// BLOCK Downtime

// BLOCK Incident Response
export const searchIncidentResponse = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_INCIDENT_RESPONSE,
    data,
  });

export const exportIncidentResponse = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_INCIDENT_RESPONSE,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const searchIncidentResponseTotal = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_INCIDENT_RESPONSE_TOTAL,
    data,
  });

export const exportIncidentResponseTotal = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_INCIDENT_RESPONSE_TOTAL,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const searchIncidentResponseContract = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_INCIDENT_RESPONSE_CONTRACT,
    data,
  });

export const exportIncidentResponseContract = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_INCIDENT_RESPONSE_CONTRACT,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );
// BLOCK Incident Response

export const searchSnmpDevice = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_SNMP_DEVICE,
    data,
  });

export const searchNetworkIncident = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_NETWORK_INCIDENT,
    data,
  });
