import { defHttp } from '@/utils/http/axios';

enum Api {
  GETALL_DEFINITION_KPI = '/fsales-performance/kpi-definition/getAll',
  SEARCH_DEFINITION_KPI = '/fsales-performance/kpi-definition/searchKpiDefinition',
  CREATE_DEFINITION_KPI = '/fsales-performance/kpi-definition/create',
  UPDATE_DEFINITION_KPI = '/fsales-performance/kpi-definition/update',
  DELETE_DEFINITION_KPI = '/fsales-performance/kpi-definition/delete',
  SEARCH_ASSIGNMENT_KPI = '/fsales-performance/kpi-assignment/searchKpiAssignment',
  CREATE_ASSIGNMENT_KPI = '/fsales-performance/kpi-assignment/create',
  UPDATE_ASSIGNMENT_KPI = '/fsales-performance/kpi-assignment/update',
  DELETE_ASSIGNMENT_KPI = '/fsales-performance/kpi-assignment/delete',

  SEARCH_MONITORING_KPI = '/fsales-performance/kpi-monitor/searchKpiMonitor',
  CREATE_MONITORING_KPI = '/fsales-performance/kpi-monitor/create',
  UPDATE_MONITORING_KPI = '/fsales-performance/kpi-monitor/update',
  DELETE_MONITORING_KPI = '/fsales-performance/kpi-monitor/delete',
}

export const getAllKpiDefinition = (params: any) =>
  defHttp.get<any>({
    url: Api.GETALL_DEFINITION_KPI,
    params,
  });

export const searchKpiDefinition = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_DEFINITION_KPI,
    data,
  });

export const createKpiDefinition = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_DEFINITION_KPI,
    data,
  });

export const updateKpiDefinition = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_DEFINITION_KPI,
    data,
  });

export const deleteKpiDefinition = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_DEFINITION_KPI,
    params,
  });

export const searchKpiAssignment = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_ASSIGNMENT_KPI,
    data,
  });

export const createKpiAssignment = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_ASSIGNMENT_KPI,
    data,
  });

export const updateKpiAssignment = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_ASSIGNMENT_KPI,
    data,
  });

export const deleteKpiAssignment = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_ASSIGNMENT_KPI,
    params,
  });

export const searchKpiMonitor = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_MONITORING_KPI,
    data,
  });

export const createKpiMonitoring = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_MONITORING_KPI,
    data,
  });

export const updateKpiMonitoring = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_MONITORING_KPI,
    data,
  });

export const deleteKpiMonitoring = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_MONITORING_KPI,
    params,
  });
