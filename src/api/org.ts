import { defHttp } from '@/utils/http/axios';

enum Api {
  GET_ORG_CHART = '/fsales-core/organization/getOrganizationChart',
}

export const getOrgChart = () =>
  defHttp.get<any>({
    url: Api.GET_ORG_CHART,
  });
