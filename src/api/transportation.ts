import { defHttp } from '@/utils/http/axios';

enum API_TRANSPORTATION {
  CREATE_SHIPPING_ORDER = '/fsales-transport-core/transportation/create-shipping-order',
  CANCEL_SHIPPING_ORDER_STOCK_TRANS = '/fsales-transport-core/transportation/cancel-shipping-order-stock-trans',
  DELIVERY_SUCCESSFUL_SHIPPING_ORDER = '/fsales-transport-core/transportation/delivery-successful-shipping-order',
  GET_SHIPPING_ORDER = '/fsales-transport-core/transportation/get-shipping-order',
  CANCEL_SHIPPING_ORDER = '/fsales-transport-core/transportation/cancel-shipping-order',
  GET_SHIPPING_ORDER_MONITORING = '/fsales-transport-core/transportation/get-shipping-order-monitoring',
  GET_SHIPPING_ORDER_DETAIL = '/fsales-transport-core/transportation/get-shipping-order-detail',
  TRANSPORTATION_APP_CONFIG_SEARCH = '/fsales-transport-core/transportation-app-config/search',
  TRANSPORTATION_APP_CONFIG_CREATE = '/fsales-transport-core/transportation-app-config/create',
  TRANSPORTATION_APP_CONFIG_UPDATE = '/fsales-transport-core/transportation-app-config/update',
  TRANSPORTATION_APP_CONFIG_DELETE = '/fsales-transport-core/transportation-app-config/delete',
}
export const createShippingOrderApi = (params: any) =>
  defHttp.post<any>({
    url: API_TRANSPORTATION.CREATE_SHIPPING_ORDER,
    params,
  });
export const cancelShippingOrderStockTransApi = (params: any) =>
  defHttp.post<any>({
    url: API_TRANSPORTATION.CANCEL_SHIPPING_ORDER_STOCK_TRANS,
    params,
  });
export const deliverySuccessfulShippingOrderApi = (params: any) =>
  defHttp.post<any>({
    url: API_TRANSPORTATION.DELIVERY_SUCCESSFUL_SHIPPING_ORDER,
    params,
  });
export const getShippingOrderApi = (params: any) =>
  defHttp.post<any>({
    url: API_TRANSPORTATION.GET_SHIPPING_ORDER,
    params,
  });
export const cancelShippingOrderApi = (params: any) =>
  defHttp.post<any>({
    url: API_TRANSPORTATION.CANCEL_SHIPPING_ORDER,
    params,
  });
export const getShippingOrderMonitoringApi = (params: any) =>
  defHttp.post<any>({
    url: API_TRANSPORTATION.GET_SHIPPING_ORDER_MONITORING,
    params,
  });
export const getShippingOrderDetailApi = (params: any) =>
  defHttp.get<any>({
    url: API_TRANSPORTATION.GET_SHIPPING_ORDER_DETAIL,
    params,
  });
export const transportationAppConfigSearchApi = (params: any) =>
  defHttp.post<any>({
    url: API_TRANSPORTATION.TRANSPORTATION_APP_CONFIG_SEARCH,
    params,
  });
export const transportationAppConfigCreateApi = (params: any) =>
  defHttp.post<any>({
    url: API_TRANSPORTATION.TRANSPORTATION_APP_CONFIG_CREATE,
    params,
  });
export const transportationAppConfigUpdateApi = (params: any) =>
  defHttp.post<any>({
    url: API_TRANSPORTATION.TRANSPORTATION_APP_CONFIG_UPDATE,
    params,
  });
export const transportationAppConfigDeleteApi = (params: any) =>
  defHttp.get<any>({
    url: API_TRANSPORTATION.TRANSPORTATION_APP_CONFIG_DELETE,
    params,
  });
