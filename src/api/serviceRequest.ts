import { defHttp } from '@/utils/http/axios';

enum Api {
  SEARCH_ALL_SERVICE_REQUEST = '/ubos-mytel-logistics-transport-so/purchase-service-requests/paging/all',
  SEARCH_SERVICE_REQUEST = '/ubos-mytel-logistics-transport-so/purchase-service-requests/paging/new',
  SEARCH_SERVICE_PENDING = '/ubos-mytel-logistics-transport-so/purchase-service-requests/paging/pending',
  SEARCH_SERVICE_APPROVED = '/ubos-mytel-logistics-transport-so/purchase-service-requests/paging/approve',
  DELETE_SERVICE_REQUEST = '/ubos-mytel-logistics-transport-so/purchase-service-requests/',
  APPRAISAL_SERVICE_REQUEST = '/ubos-mytel-logistics-transport-so/purchase-service-request/{id}/purchase-service-request-appraisal',
  APPRAISERS_SERVICE_REQUEST = '/ubos-mytel-logistics-transport-so/purchase-service-request/{id}/purchase-service-request-appraisal/appraisal',
  APPROVE_SERVICE_REQUEST = '/ubos-mytel-logistics-transport-so/purchase-service-request/{id}/purchase-service-request-appraisal/approve',
  CREATE_SERVICE_REQUEST = '/ubos-mytel-logistics-transport-so/purchase-service-request',
  UPDATE_SERVICE_REQUEST = '/ubos-mytel-logistics-transport-so/purchase-service-request/:id',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  SERVICE_REQUEST_INFO = '/ubos-mytel-logistics-transport-so/purchase-service-request/:id',
  SEARCH_STAFF = '/fsales-core/company/getAll',
  ALL_DOMAIN = '/fsales-core/business-domain/getAll?keyword=',
  GET_SERVICE_BY_DOMAIN = '/ubos-mytel-logistics-transport-so/business-domain/:id/services',
  GET_PRODUCT_BY_SERVICE = '/ubos-mytel-logistics-transport-so/service/:id/products',
  GET_PRODUCT_BY_ID = '/fsales-core/service/:id',
  GET_ATTRIBUTE_BY_PRODUCT = '/fsales-core/product/:id/attributes',
  DETAIL_FILE = '/ubos-mytel-logistics-uploads/file-management/v2/file-detail?id=:id',
  CONTRACT_INFO = '/ubos-mytel-logistics-transport-so/purchase-service-request/:serviceRequestId/contractInfo',
  UPGRADE_INFO = '/ubos-mobi-purchase-so/purchase-service-request/:id/informationUpgrade',
  SERVICE_ORDER_BY_PARTNER_ID = '/ubos-mobi-purchase-so/buyer-contract/service-order/by-partner-id?partnerId=:partnerId&pageNo=:pageNo&pageSize=:pageSize',
  SERVICE_ORDER = '/ubos-mobi-purchase-so/buyer-contract/service-order',
  GEN_SERVICE_REQUEST = '/ubos-mobi-purchase-so/purchase-service-request/generateCode',
  GET_VARIANT_BY_PRODUCT = '/fsales-core/variant/getAll',
  GET_MASTER_PLAN = '/fsales-transport-core/master-plan/search',
  GET_MASTER_PLAN_PRODUCT = '/fsales-transport-core/master-plan/get-product-by-master-plan',
}

export const genCodeServiceRequests = (params: any) =>
  defHttp.get<any>({
    url: Api.GEN_SERVICE_REQUEST,
    params,
  });

export const searchAllServiceRequests = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH_ALL_SERVICE_REQUEST,
    params,
  });

export const searchServiceRequests = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH_SERVICE_REQUEST,
    params,
  });

export const searchServicePending = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH_SERVICE_PENDING,
    params,
  });

export const searchServiceApproved = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH_SERVICE_APPROVED,
    params,
  });

export const deleteServiceRequest = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_SERVICE_REQUEST + params.id,
    params,
  });

export const appraisalServiceRequest = (params: any) =>
  defHttp.get<any>({
    url: Api.APPRAISAL_SERVICE_REQUEST.replace('{id}', params.id),
    params,
  });

export const appraisersServiceRequest = (params: any) =>
  defHttp.post<any>({
    url: Api.APPRAISERS_SERVICE_REQUEST.replace('{id}', params.id),
    params,
  });

export const approveApproveServiceRequest = (params: any) =>
  defHttp.post<any>({
    url: Api.APPROVE_SERVICE_REQUEST.replace('{id}', params.id),
    params,
  });

export const createPurchaseServiceRequest = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_SERVICE_REQUEST,
    data,
  });

export const updatePurchaseServiceRequest = (data: any) => {
  const url = Api.UPDATE_SERVICE_REQUEST.replace(':id', data.id);
  return defHttp.put<any>({
    url: url,
    data,
  });
};

export const getPurchaseServiceRequest = (data: any) => {
  const url = Api.SERVICE_REQUEST_INFO.replace(':id', data.id);
  return defHttp.get<any>({
    url: url,
    data,
  });
};

export const searchStaff = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH_STAFF,
    params,
  });

export const allDomain = (params: any) =>
  defHttp.get<any>({
    url: Api.ALL_DOMAIN,
    params,
  });

export const getServiceByDomain = (params: any) => {
  const id = params?.domainId;
  if (!id) {
    return [];
  }
  const url = Api.GET_SERVICE_BY_DOMAIN.replace(':id', id);
  return defHttp.get<any>({
    url: url,
  });
};

export const getProductByService = (params: any) => {
  const id = params?.categoryId;
  if (!id) {
    return [];
  }
  const url = Api.GET_PRODUCT_BY_SERVICE.replace(':id', id);

  return defHttp.get<any>(
    {
      url: url,
    },
    params,
  );
};

export const getProductById = (params: any) => {
  const id = params.productId;
  const url = Api.GET_PRODUCT_BY_ID.replace(':id', id);
  if (id === undefined) {
    return [];
  } else
    return defHttp.get<any>({
      url: url,
    });
};

export const getDetailFile = (params: any) => {
  const url = Api.DETAIL_FILE.replace(':id', params.id);
  return defHttp.get<any>({
    url: url,
    params,
  });
};

export const getContractInfoByServiceRequestId = (params: any) => {
  const url = Api.CONTRACT_INFO.replace(':serviceRequestId', params.id);
  return defHttp.get<any>({
    url: url,
  });
};

export const upgradeInfo = (params: any) =>
  defHttp.put<any>({
    url: Api.UPGRADE_INFO.replace(':id', params.id),
    params,
  });

export const getServiceOrderByPartnerId = (params: any) => {
  const url = Api.SERVICE_ORDER_BY_PARTNER_ID.replace(':partnerId', params.partnerId)
    .replace(':pageNo', params.pageNo)
    .replace(':pageSize', params.pageSize);
  if (!params.partnerId) return [];
  return defHttp.get<any>({
    url: url,
  });
};

export const getServiceOrder = (params: any) => {
  return defHttp.get<any>({
    url: Api.SERVICE_ORDER,
    params,
  });
};

export const getVariantByProduct = async (params: any) => {
  const id = params.productId;
  const url = Api.GET_VARIANT_BY_PRODUCT;
  if (id === undefined) {
    return [];
  }
  const result = await defHttp.get<any>({
    url: url,
    params,
  });

  if (result?.length > 0) {
    result?.forEach((item) => (item.variantCodeName = item.variantCode + ' - ' + item.variantName));
  }

  return result;
};

export const getMasterPlan = async (params: any) => {
  const result = await defHttp.post<any>({
    url: Api.GET_MASTER_PLAN,
    params,
  });

  if (result?.content?.length > 0) {
    result?.content?.forEach((item) => (item.fullName = item.planCode + ' - ' + item.planName));
  }

  return result;
};

export const getMasterPlanProduct = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_MASTER_PLAN_PRODUCT,
    params,
  });
