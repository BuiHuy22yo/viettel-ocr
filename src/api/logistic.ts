import { defHttp } from '@/utils/http/axios';

enum API_TRANSPORTATION {
  GET_DATA_CHART_DASHBOARD = '/fsales-transport-core/transportation/get-shipping-order-by-state',
}
export const getDataChartDashboard = (params: any) =>
  defHttp.post<any>({
    url: API_TRANSPORTATION.GET_DATA_CHART_DASHBOARD,
    params,
  });
