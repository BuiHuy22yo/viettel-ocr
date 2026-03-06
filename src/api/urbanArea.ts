import { defHttp } from '@/utils/http/axios';
import { UrbanAreaModel, UrbanAreaParams } from '@/api/model/urbanAreaModel';

enum Api {
  SEARCH_URBAN_AREA = '/urbanArea/findByCondition',
  INSERT_URBAN_AREA = '/urbanArea/create',
  UPDATE_URBAN_AREA = '/urbanArea/update',
  DELETE_URBAN_AREA = '/urbanArea/changeStatus',
  DETAIL_URBAN_AREA = '/urbanArea/detail',
  GET_ALL_URBAN_AREA = '/urbanArea/getListUrbanArea',
  GET_REGION = '/area/areaV2',
}

export const searchUrbanArea = (data: any) =>
  defHttp.post<UrbanAreaModel>(
    {
      url: Api.SEARCH_URBAN_AREA,
      data,
    },
    {
      apiUrl: 'http://207.148.75.114:8044',
    },
  );
export const createUrbanArea = (data: UrbanAreaParams) =>
  defHttp.post<UrbanAreaParams>(
    {
      url: Api.INSERT_URBAN_AREA,
      data,
    },
    {
      apiUrl: 'http://207.148.75.114:8044',
    },
  );
export const updateUrbanArea = (data: UrbanAreaParams) =>
  defHttp.put<UrbanAreaParams>(
    {
      url: Api.UPDATE_URBAN_AREA,
      data,
    },
    {
      apiUrl: 'http://207.148.75.114:8044',
    },
  );
export const deleteUrbanArea = (data: any) =>
  defHttp.put<UrbanAreaParams>(
    {
      url: Api.DELETE_URBAN_AREA,
      data,
    },
    {
      apiUrl: 'http://207.148.75.114:8044',
    },
  );
export const detailUrbanArea = (params: any) =>
  defHttp.get<void>(
    { url: Api.DETAIL_URBAN_AREA, params },
    {
      apiUrl: 'http://207.148.75.114:8044',
    },
  );

export const getAllRegion = (params: any) =>
  defHttp.get<void>(
    { url: Api.GET_REGION, params },
    {
      apiUrl: 'http://207.148.75.114:8044',
      isTransformResponse: false,
    },
  );

export const getAllUrbanArea = () =>
  defHttp.get<void>(
    { url: Api.GET_ALL_URBAN_AREA },
    {
      apiUrl: 'http://207.148.75.114:8044',
      isTransformResponse: false,
    },
  );
