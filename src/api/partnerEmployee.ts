import { defHttp } from '@/utils/http/axios';

enum Api {
  SEARCH = '/fsales-core/partner_employees/search',
  SEARCH_BY_STATUS = '/fsales-transport-core/partner-employee-registration/search',
  CREATE = '/fsales-core/partner_employees/create',
  UPDATE = '/fsales-core/partner_employees/update',
  UPDATE_PENDING = '/fsales-transport-core/partner-employee-registration/updateByAdmin',
  DELETE = '/fsales-core/partner_employees/delete',
  APPROVAL = '/fsales-transport-core/partner-employee-registration/approve',
  REJECT = '/fsales-transport-core/partner-employee-registration/reject',
  LOCK = '/fsales-core/partner_employees/lock',
  UNLOCK = '/fsales-core/partner_employees/unlock',
}

export const searchPartnerEmployee = async (params: any) => {
  return await defHttp.post<any>({
    url: Api.SEARCH,
    params,
  });
};

export const searchPartnerEmployeeByStatus = async (params: any) => {
  return await defHttp.post<any>({
    url: Api.SEARCH_BY_STATUS,
    params,
  });
};

export const createPartnerEmployee = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE,
    data,
  });
export const updatePartnerEmployee = (data: any) =>
  defHttp.post<any>({
    url: Api.UPDATE,
    data,
  });

export const updatePartnerEmployeePending = (data: any) =>
  defHttp.post<any>({
    url: Api.UPDATE_PENDING,
    data,
  });

export const deletePartnerEmployee = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE,
    params,
  });

export const approvalPartnerEmployee = (params) =>
  defHttp.get<any>({
    url: Api.APPROVAL,
    params,
  });

export const rejectPartnerEmployee = (params) =>
  defHttp.get<any>({
    url: Api.REJECT,
    params,
  });

export const approvalListPartnerEmployee = (data: any) =>
  defHttp.post<any>({
    url: Api.APPROVAL,
    data,
  });

export const rejectListPartnerEmployee = (data: any) =>
  defHttp.post<any>({
    url: Api.REJECT,
    data,
  });

export const lockPartnerEmployee = (params: any) =>
  defHttp.get<any>({
    url: Api.LOCK,
    params,
  });
export const unlockPartnerEmployee = (params: any) =>
  defHttp.get<any>({
    url: Api.UNLOCK,
    params,
  });
