import { defHttp } from '@/utils/http/axios';
import { companyModel } from '@/api/model/orgModel';

enum Api {
  GET_ALL_RATING_LEVEL = '/fsales-transport-core/rating-level/getAll',
  CREATE_RATING_LEVEL = '/fsales-transport-core/rating-level/create',
  UPDATE_RATING_LEVEL = '/fsales-transport-core/rating-level/update',
  DELETE_RATING_LEVEL = '/fsales-transport-core/rating-level/delete',

  CREATE_RATING_INDICATOR = '/fsales-transport-core/rating-indicator/create',
  UPDATE_RATING_INDICATOR = '/fsales-transport-core/rating-indicator/update',
  DELETE_RATING_INDICATOR = '/fsales-transport-core/rating-indicator/delete',
  GET_ALL_RATING_INDICATOR = '/fsales-transport-core/rating-indicator/getAll',
}

export const getAllRatingLevel = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_RATING_LEVEL,
    params,
  });
export const createRatingLevel = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_RATING_LEVEL,
    data,
  });
export const updateRatingLevel = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_RATING_LEVEL,
    data,
  });
export const deleteRatingLevel = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_RATING_LEVEL,
    params,
  });

export const getAllRatingIndicator = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_RATING_INDICATOR,
    params,
  });
export const createRatingIndicator = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_RATING_INDICATOR,
    data,
  });
export const updateRatingIndicator = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_RATING_INDICATOR,
    data,
  });
export const deleteRatingIndicator = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_RATING_INDICATOR,
    params,
  });
