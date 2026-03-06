import { defHttp } from '@/utils/http/axios';

enum Api {
  // PARTH_APISIX = '',
  PARTH_APISIX = '/fsales-transport-core',
  GET_ALL_SERVICE = PARTH_APISIX + '/master-plan/search',
  GET_ALL_PLAN_SERVICE = PARTH_APISIX + '/master-plan/search-manager-plan',
  CREATE_SERVICE = PARTH_APISIX + '/master-plan/create',
  UPDATE_SERVICE = PARTH_APISIX + '/master-plan/update',
  DELETE_SERVICE = PARTH_APISIX + '/master-plan/delete',
  DETAIL_SERVICE = PARTH_APISIX + '/master-plan/detail',
  GET_ALL_MASTER_PLAN = PARTH_APISIX + '/master-plan/get-all',
  GET_ALL_MASTER_PLAN_PRODUCT = PARTH_APISIX + '/master-plan/search-manager-plan-product', //PARTH_APISIX + '/master-plan/search-manager-plan-product',
  EXPORT_MASTER_PLAN = PARTH_APISIX + '/master-plan/export-data',
  UPDATE_LOCK_PRODUCT = PARTH_APISIX + '/master-plan/update-lock-product',

  CREATE_VOUCHER = PARTH_APISIX + '/voucher/create',
  UPDATE_VOUCHER = PARTH_APISIX + '/voucher/update',
  DELETE_VOUCHER = PARTH_APISIX + '/voucher/delete',
  DETAIL_VOUCHER = PARTH_APISIX + '/voucher/detail',
  GET_ALL_VOUCHER = PARTH_APISIX + '/voucher/get-all',
  SEARCH_VOUCHER = PARTH_APISIX + '/voucher/search',
  APPROVE_VOUCHER = PARTH_APISIX + '/voucher/approve',
  REJECT_VOUCHER = PARTH_APISIX + '/voucher/reject',
}
export const getAllPlan2 = (data: any) =>
  defHttp.get<any>(
    {
      url: Api.GET_ALL_MASTER_PLAN,
      data,
    },
    // {
    //   apiUrl: 'http://localhost:8891',
    // },
  );
export const getAllPlan = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.GET_ALL_SERVICE,
      data,
    },
    // {
    //   apiUrl: 'http://localhost:8891',
    // },
  );
export const getManagerPlan = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.GET_ALL_PLAN_SERVICE,
      data,
    },
    // {
    //   apiUrl: 'http://localhost:8891',
    // },
  );
export const createBudget = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.CREATE_SERVICE,
      data,
    },
    // {
    //   apiUrl: 'http://localhost:8891',
    // },
  );
export const updateBudget = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.UPDATE_SERVICE,
      data,
    },
    // {
    //   apiUrl: 'http://localhost:8891',
    // },
  );
export const deleteBudget = (params: any) =>
  defHttp.get<any>(
    {
      url: Api.DELETE_SERVICE,
      params,
    },
    // {
    //   apiUrl: 'http://localhost:8891',
    // },
  );
export const getDetailBudget = (params: any) =>
  defHttp.get<any>(
    {
      url: Api.DETAIL_SERVICE,
      params,
    },
    // {
    //   apiUrl: 'http://localhost:8891',
    // },
  );
export const getAllBudgetProduct = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.GET_ALL_MASTER_PLAN_PRODUCT,
      data,
    },
    // {
    //   apiUrl: 'http://localhost:8891',
    // },
  );

export const createVoucher = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.CREATE_VOUCHER,
      data,
    },
    // {
    //   apiUrl: 'http://localhost:8891',
    // },
  );
export const updateVoucher = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.UPDATE_VOUCHER,
      data,
    },
    // {
    //   apiUrl: 'http://localhost:8891',
    // },
  );
export const searchVoucher = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.SEARCH_VOUCHER,
      data,
    },
    // {
    //   apiUrl: 'http://localhost:8891',
    // },
  );
export const getAllVoucher = (params: any) =>
  defHttp.get<any>(
    {
      url: Api.GET_ALL_VOUCHER,
      params,
    },
    // {
    //   apiUrl: 'http://localhost:8891',
    // },
  );
export const getDetailVoucher = (params: any) =>
  defHttp.get<any>(
    {
      url: Api.DETAIL_VOUCHER,
      params,
    },
    // {
    //   apiUrl: 'http://localhost:8891',
    // },
  );
export const deleteVoucher = (params: any) =>
  defHttp.get<any>(
    {
      url: Api.DELETE_VOUCHER,
      params,
    },
    // {
    //   apiUrl: 'http://localhost:8891',
    // },
  );

export const exportDataMP = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_MASTER_PLAN,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
      // apiUrl: 'http://localhost:8891',
    },
  );

export const approveVoucher = (params: any) =>
  defHttp.get<any>(
    {
      url: Api.APPROVE_VOUCHER,
      params,
    },
    // {
    //   apiUrl: 'http://localhost:8891',
    // },
  );
export const updateLock = (params: any) =>
  defHttp.get<any>(
    {
      url: Api.UPDATE_LOCK_PRODUCT,
      params,
    },
    // {
    //   apiUrl: 'http://localhost:8891',
    // },
  );
export const rejectVoucher = (params: any) =>
  defHttp.get<any>({
    url: Api.REJECT_VOUCHER,
    params,
  });
