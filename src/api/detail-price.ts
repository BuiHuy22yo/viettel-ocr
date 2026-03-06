import { defHttp } from '@/utils/http/axios';

enum Api {
  // BASE_URL = '',
  BASE_URL = '/fsales-transport-core',
  GET_DETAIL_PRICE = BASE_URL + '/quota/detail',
  UPDATE_DETAIL_PRICE = BASE_URL + '/quota/update',
  UPDATE_STATUS = BASE_URL + '/quota/update-status',
}

export const getDetailPrice = (params: any) =>
  defHttp.get<any>(
    {
      url: Api.GET_DETAIL_PRICE,
      params,
    },
    // {
    //   apiUrl: 'http://localhost:8891',
    // },
  );
export const update = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.UPDATE_DETAIL_PRICE,
      data,
    },
    // {
    //   apiUrl: 'http://localhost:8891',
    // },
  );
export const updateStatus = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.UPDATE_STATUS,
      data,
    },
    // {
    //   apiUrl: 'http://localhost:8891',
    // },
  );
