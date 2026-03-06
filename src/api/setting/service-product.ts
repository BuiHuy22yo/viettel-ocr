import { defHttp } from '@/utils/http/axios';
import { companyModel } from '@/api/model/orgModel';

enum Api {
  GETALL_SERVICE = '/fsales-core/service/getAll',
  CREATE_SERVICE = '/fsales-core/service/create',
  UPDATE_SERVICE = '/fsales-core/service/update',
  DELETE_SERVICE = '/fsales-core/service/delete',

  CREATE_PRODUCT = '/fsales-core/product/create',
  UPDATE_PRODUCT = '/fsales-core/product/update',
  UPDATE_PRODUCT_SETTING = '/fsales-core/product/updates',
  DELETE_PRODUCT = '/fsales-core/product/delete',
  GETALL_PRODUCT = '/fsales-core/product/getAll',

  CREATE_GROUP_ATTRIBUTE = '/fsales-core/product-group/create',
  UPDATE_GROUP_ATTRIBUTE = '/fsales-core/product-group/update',
  DELETE_GROUP_ATTRIBUTE = '/fsales-core/product-group/delete',
  GETALL_GROUP_ATTRIBUTE = '/fsales-core/product-group/getAll',

  CREATE_PRODUCT_ATTRIBUTE = '/fsales-core/product-group-attribute/create',
  UPDATE_PRODUCT_ATTRIBUTE = '/fsales-core/product-group-attribute/update',
  DELETE_PRODUCT_ATTRIBUTE = '/fsales-core/product-group-attribute/delete',
  GETALL_PRODUCT_ATTRIBUTE = '/fsales-core/product-group-attribute/getAll',
  GET_BY_LIST_PRODUCT_GROUP_ID = '/fsales-core/product-group-attribute/get-by-list-product-group-id',

  CREATE_GROUP_ATTRIBUTE_INDICATOR = '/fsales-core/product-group-indicator/create',
  UPDATE_GROUP_ATTRIBUTE_INDICATOR = '/fsales-core/product-group-indicator/update',
  DELETE_GROUP_ATTRIBUTE_INDICATOR = '/fsales-core/product-group-indicator/delete',
  GET_ALL_GROUP_ATTRIBUTE_INDICATOR = '/fsales-core/product-group-indicator/getAll',

  CREATE_SERVICE_INDICATOR = '/fsales-core/product-service-indicator/create',
  UPDATE_SERVICE_INDICATOR = '/fsales-core/product-service-indicator/update',
  DELETE_SERVICE_INDICATOR = '/fsales-core/product-service-indicator/delete',
  GET_ALL_SERVICE_INDICATOR = '/fsales-core/product-service-indicator/getAll',

  CREATE_VARIANT = '/fsales-core/variant/create',
  UPDATE_VARIANT = '/fsales-core/variant/update',
  UPDATE_VARIANT_SETTING = '/fsales-core/variant/updates',
  DELETE_VARIANT = '/fsales-core/variant/delete',
  GETALL_VARIANT = '/fsales-core/variant/getAll',
  GETALL_VARIANT_ATTRIBUTE_BY_ID = '/fsales-core/variant/get-variant-attribute',

  CREATE_VARIANT_GROUP_ATTRIBUTE = '/fsales-core/variant-group-attribute/create',
  UPDATE_VARIANT_GROUP_ATTRIBUTE = '/fsales-core/variant-group-attribute/update',
  DELETE_VARIANT_GROUP_ATTRIBUTE = '/fsales-core/variant-group-attribute/delete',
  GETALL_VARIANT_GROUP_ATTRIBUTE = '/fsales-core/variant-group-attribute/getAll',

  CREATE_VARIANT_ATTRIBUTE = '/fsales-core/variant-attribute/create',
  UPDATE_VARIANT_ATTRIBUTE = '/fsales-core/variant-attribute/update',
  DELETE_VARIANT_ATTRIBUTE = '/fsales-core/variant-attribute/delete',
  GETALL_VARIANT_ATTRIBUTE = '/fsales-core/variant-attribute/getAll',
  GET_BY_LIST_VARIANT_GROUP_ID = '/fsales-core/variant-attribute/get-by-list-variant-group-id',

  GETALL_MANAGEMENT_METHOD = '/fsales-core/management-method/getAll',
  CREATE_MANAGEMENT_METHOD = '/fsales-core/management-method/create',
  UPDATE_MANAGEMENT_METHOD = '/fsales-core/management-method/update',
  DELETE_MANAGEMENT_METHOD = '/fsales-core/management-method/delete',

  GETALL_UNIT_OF_MEASURE = '/fsales-core/unit-of-measure/getAll',
  CREATE_UNIT_OF_MEASURE = '/fsales-core/unit-of-measure/create',
  UPDATE_UNIT_OF_MEASURE = '/fsales-core/unit-of-measure/update',
  DELETE_UNIT_OF_MEASURE = '/fsales-core/unit-of-measure/delete',

  GETALL_DELIVERY_WORKFLOW = '/fsales-core/delivery-workflow/getAll',
  CREATE_DELIVERY_WORKFLOW = '/fsales-core/delivery-workflow/create',
  UPDATE_DELIVERY_WORKFLOW = '/fsales-core/delivery-workflow/update',
  DELETE_DELIVERY_WORKFLOW = '/fsales-core/delivery-workflow/delete',
  GETALL_SHIPPING_BY_DELIVERY_ID = '/fsales-core/delivery-workflow/getAllByDeliveryId',

  GETALL_SHIPPING_STATUS = '/fsales-core/shipping-status/getAll',
  CREATE_SHIPPING_STATUS = '/fsales-core/shipping-status/create',
  UPDATE_SHIPPING_STATUS = '/fsales-core/shipping-status/update',
  DELETE_SHIPPING_STATUS = '/fsales-core/shipping-status/delete',
}

export const getAllService = (params: any) =>
  defHttp.get<any>({
    url: Api.GETALL_SERVICE,
    params,
  });
export const createService = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_SERVICE,
    data,
  });
export const updateService = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_SERVICE,
    data,
  });
export const deleteService = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_SERVICE,
    params,
  });

export const getAllProduct = async (params: any) => {
  const result = await defHttp.get<any>({
    url: Api.GETALL_PRODUCT,
    params,
  });

  if (result?.length > 0) {
    result?.forEach((item) => (item.codeName = item.productCode + ' - ' + item.productName));
  }

  // console.log(result);
  return result;
};

export const createProduct = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_PRODUCT,
    data,
  });
export const updateProduct = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_PRODUCT,
    data,
  });
export const updateProductSetting = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_PRODUCT_SETTING,
    data,
  });
export const deleteProduct = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_PRODUCT,
    params,
  });

export const getAllProductAttribute = (params: any) =>
  defHttp.get<any>({
    url: Api.GETALL_PRODUCT_ATTRIBUTE,
    params,
  });
export const createProductAttribute = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_PRODUCT_ATTRIBUTE,
    data,
  });
export const updateProductAttribute = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_PRODUCT_ATTRIBUTE,
    data,
  });
export const deleteProductAttribute = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_PRODUCT_ATTRIBUTE,
    params,
  });

export const getAllGroupProductAttribute = (params: any) =>
  defHttp.get<any>({
    url: Api.GETALL_GROUP_ATTRIBUTE,
    params,
  });
export const createGroupProductAttribute = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_GROUP_ATTRIBUTE,
    data,
  });
export const updateGroupProductAttribute = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_GROUP_ATTRIBUTE,
    data,
  });
export const deleteGroupProductAttribute = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_GROUP_ATTRIBUTE,
    params,
  });

//Group Indicator

export const getAllGroupIndicator = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_GROUP_ATTRIBUTE_INDICATOR,
    params,
  });
export const createlGroupIndicator = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_GROUP_ATTRIBUTE_INDICATOR,
    data,
  });
export const updatelGroupIndicator = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_GROUP_ATTRIBUTE_INDICATOR,
    data,
  });
export const deletelGroupIndicator = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_GROUP_ATTRIBUTE_INDICATOR,
    params,
  });

//Service Indicator

export const getAllServiceIndicator = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_SERVICE_INDICATOR,
    params,
  });
export const createlServiceIndicator = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_SERVICE_INDICATOR,
    data,
  });
export const updatelServiceIndicator = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_SERVICE_INDICATOR,
    data,
  });
export const deletelServiceIndicator = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_SERVICE_INDICATOR,
    params,
  });
export const getByListProductGroupId = (data: any) =>
  defHttp.post<any>({
    url: Api.GET_BY_LIST_PRODUCT_GROUP_ID,
    data,
  });

//Variant
export const getAllVariant = (params: any) =>
  defHttp.get<any>({
    url: Api.GETALL_VARIANT,
    params,
  });
export const createVariant = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_VARIANT,
    data,
  });
export const updateVariant = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_VARIANT,
    data,
  });
export const updateVariantSetting = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_VARIANT_SETTING,
    data,
  });
export const deleteVariant = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_VARIANT,
    params,
  });
export const getAllVariantAttributeById = (params: any) =>
  defHttp.get<any>({
    url: Api.GETALL_VARIANT_ATTRIBUTE_BY_ID,
    params,
  });

//Variant Group attribute
export const getAllVariantGroupAttribute = (params: any) =>
  defHttp.get<any>({
    url: Api.GETALL_VARIANT_GROUP_ATTRIBUTE,
    params,
  });
export const createVariantGroupAttribute = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_VARIANT_GROUP_ATTRIBUTE,
    data,
  });
export const updateVariantGroupAttribute = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_VARIANT_GROUP_ATTRIBUTE,
    data,
  });
export const deleteVariantGroupAttribute = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_VARIANT_GROUP_ATTRIBUTE,
    params,
  });

// Variant Attribute

export const getAllVariantAttribute = (params: any) =>
  defHttp.get<any>({
    url: Api.GETALL_VARIANT_ATTRIBUTE,
    params,
  });
export const createVariantAttribute = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_VARIANT_ATTRIBUTE,
    data,
  });
export const updateVariantAttribute = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_VARIANT_ATTRIBUTE,
    data,
  });
export const deleteVariantAttribute = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_VARIANT_ATTRIBUTE,
    params,
  });

export const getByListVariantGroupId = (data: any) =>
  defHttp.post<any>({
    url: Api.GET_BY_LIST_VARIANT_GROUP_ID,
    data,
  });

// Management Method
export const getAllManagementMethod = (params: any) =>
  defHttp.get<any>({
    url: Api.GETALL_MANAGEMENT_METHOD,
    params,
  });
export const createManagementMethod = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_MANAGEMENT_METHOD,
    data,
  });
export const updateManagementMethod = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_MANAGEMENT_METHOD,
    data,
  });
export const deleteManagementMethod = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_MANAGEMENT_METHOD,
    params,
  });

// Unit Of Measure
export const getAllUnitOfMeasure = async (params: any) => {
  const listId = params.listId;
  params.listId = null;

  const result = await defHttp.get<any>({
    url: Api.GETALL_UNIT_OF_MEASURE,
    params,
  });

  return listId ? result.filter((item) => listId.includes(item.id)) : result;
};

export const createUnitOfMeasure = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_UNIT_OF_MEASURE,
    data,
  });
export const updateUnitOfMeasure = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_UNIT_OF_MEASURE,
    data,
  });
export const deleteUnitOfMeasure = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_UNIT_OF_MEASURE,
    params,
  });

// Delivery Workflow
export const getAllDeliveryWorkflow = (params: any) =>
  defHttp.get<any>({
    url: Api.GETALL_DELIVERY_WORKFLOW,
    params,
  });
export const createDeliveryWorkflow = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_DELIVERY_WORKFLOW,
    data,
  });
export const updateDeliveryWorkflow = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_DELIVERY_WORKFLOW,
    data,
  });
export const deleteDeliveryWorkflow = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_DELIVERY_WORKFLOW,
    params,
  });
export const getAllShippingByDeliveryId = (params: any) =>
  defHttp.get<any>({
    url: Api.GETALL_SHIPPING_BY_DELIVERY_ID,
    params,
  });

// Shipping Status
export const getAllShippingStatus = (params: any) =>
  defHttp.get<any>({
    url: Api.GETALL_SHIPPING_STATUS,
    params,
  });
export const createShippingStatus = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_SHIPPING_STATUS,
    data,
  });
export const updateShippingStatus = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_SHIPPING_STATUS,
    data,
  });
export const deleteShippingStatus = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_SHIPPING_STATUS,
    params,
  });
