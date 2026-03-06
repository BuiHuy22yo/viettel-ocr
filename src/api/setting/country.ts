import { defHttp } from '@/utils/http/axios';
import { ContentTypeEnum } from '@/enums/httpEnum';

enum Api {
  SEARCH = '/fsales-core/country/getAll',
  CREATE_COUNTRY = '/fsales-core/country/create',
  UPDATE_COUNTRY = '/fsales-core/country/update',
  DELETE_COUNTRY = '/fsales-core/country/delete',
  IMPORT_COUNTRY = '/fsales-core/country/import-excel',
  DOWNLOAD_FILE = '/fsales-core/country/download-template',
}

export const searchCountry = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH,
    params,
  });

export const create = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_COUNTRY,
    data,
  });
export const update = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_COUNTRY,
    data,
  });

export const deleteCountry = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_COUNTRY,
    params,
  });

export const importFile = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.IMPORT_COUNTRY,
      data,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true,
      },
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const downlFile = (data: any) =>
  defHttp.get<any>(
    {
      url: Api.DOWNLOAD_FILE,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );
