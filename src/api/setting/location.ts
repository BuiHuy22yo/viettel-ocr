import { defHttp } from '@/utils/http/axios';

enum Api {
  GETALL_AREA = '/fsales-core/area/getAll',
  GET_ALL_NATION = '/fsales-core/nation/getAll',
  GET_PROVINCE = '/fsales-core/province/getAll',
  GET_DISTRICT = '/fsales-core/district/getByProvince',
  GET_WARD = '/fsales-core/ward/getByDistrict',
  GET_REGION = '/fsales-core/regions/getRegions',
}

export const getAllArea = (params: any) =>
  defHttp.get<any>({
    url: Api.GETALL_AREA,
    params,
  });

export const getAllNation = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_NATION,
    params,
  });

export const getAllProvince = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_PROVINCE,
    params,
  });

export const getWardByDistrict = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_WARD,
    params,
  });

export const getDistrictByProvince = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_DISTRICT,
    params,
  });

export const getAllRegion = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_REGION,
    params,
  });
