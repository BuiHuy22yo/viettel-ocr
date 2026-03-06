import { defHttp } from '@/utils/http/axios';

enum Api {
  SEARCH_EVALUATION = '/fsales-transport-core/sm-quality-evaluation/search',
  EXPORT_EVALUATION = '/fsales-transport-core/sm-quality-evaluation/export',
  UPDATE_EVALUATION = '/fsales-transport-core/sm-quality-evaluation/update',
  DELETE_EVALUATION = '/fsales-transport-core/sm-quality-evaluation/delete',

  SEARCH_EVALUATION_DETAIL = '/fsales-transport-core/sm-quality-evaluation/search-detail',
  EXPORT_EVALUATION_DETAIL = '/fsales-transport-core/sm-quality-evaluation/export-detail',
}

export const searchEvaluationBase = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_EVALUATION,
    data,
  });

export const exportEvaluation = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_EVALUATION,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const updateEvaluation = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_EVALUATION,
    data,
  });

export const deleteEvaluation = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_EVALUATION,
    params,
  });

export const searchEvaluationDetail = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_EVALUATION_DETAIL,
    data,
  });

export const exportEvaluationDetail = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_EVALUATION_DETAIL,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );
