import { defHttp } from '@/utils/http/axios';

enum Api {
  GET_DASH_BOARD_INFO_CHART = '/fsales-transport-core/dashboard/get-dash-board-info-chart',
  GET_SERVICE_ORDER_BY_STATUS_CHART = '/fsales-transport-core/dashboard/get-service-order-by-status-chart',
  GET_SERVICE_QUALITY_BY_PERIOD_CHART = '/fsales-transport-core/dashboard/get-service-quality-by-period-chart',
  GET_TOTAL_VALUE_PAID_BY_CHANNEL_CHART = '/fsales-transport-core/dashboard/get-total-value-paid-by-channel-chart',
  GET_TOTAL_VALUE_BY_CHANNEL_CHART = '/fsales-transport-core/dashboard/get-total-value-by-channel-chart',
  GET_TOTAL_PAID_BY_PERIOD_CHART = '/fsales-transport-core/dashboard/get-total-paid-by-period-chart',
  GET_SERVICE_REQUEST_BY_TYPE_CHART = '/fsales-transport-core/dashboard/get-service-request-by-type-chart',
  COUNT_RFQ_BIDDING = '/fsales-transport-core/dashboard/count-rfq-bidding',
  COUNT_CONTRACT = '/fsales-transport-core/dashboard/count-contract',
  COUNT_REQUEST_ORDER = '/fsales-transport-core/dashboard/count-request-order',
  COUNT_KCS = '/fsales-transport-core/dashboard/count-kcs',
  GET_DASHBOARD_CONTRACT_PAYMENT = '/fsales-transport-core/dashboard/dashboard-contract-payment',
  GET_DASHBOARD_SHIPPING_ORDER = '/fsales-transport-core/dashboard/dashboard-shipping-order',
}

export const getDashBoardInfoChart = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_DASH_BOARD_INFO_CHART,
    params,
  });
//Trạng thái kênh tuyến
export const getServiceOrderByStatusChart = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_SERVICE_ORDER_BY_STATUS_CHART,
    params,
  });
// Theo dõi chất lượng dịch vụ theo tháng
export const getServiceQualityByPeriodChart = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_SERVICE_QUALITY_BY_PERIOD_CHART,
    params,
  });
// Loại yêu cầu
export const getServiceRequestByTypeChart = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_SERVICE_REQUEST_BY_TYPE_CHART,
    params,
  });

export const getTotalValuePaidByChannel = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_TOTAL_VALUE_PAID_BY_CHANNEL_CHART,
    params,
  });

export const getTotalValueByChannel = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_TOTAL_VALUE_BY_CHANNEL_CHART,
    params,
  });

// Thanh toán cho đối tác theo tháng
export const getTotalPaidByPeriod = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_TOTAL_PAID_BY_PERIOD_CHART,
    params,
  });

export const countRfqBiddingApi = () =>
  defHttp.get<any>({
    url: Api.COUNT_RFQ_BIDDING,
  });
export const countContractApi = () =>
  defHttp.get<any>({
    url: Api.COUNT_CONTRACT,
  });
export const countRequestOrderApi = () =>
  defHttp.get<any>({
    url: Api.COUNT_REQUEST_ORDER,
  });

export const countKcsApi = () =>
  defHttp.get<any>({
    url: Api.COUNT_KCS,
  });
export const getDashboardContractPaymentApi = () =>
  defHttp.get<any>({
    url: Api.GET_DASHBOARD_CONTRACT_PAYMENT,
  });

export const getDashboardShippingOrderApi = () =>
  defHttp.get<any>({
    url: Api.GET_DASHBOARD_SHIPPING_ORDER,
  });
