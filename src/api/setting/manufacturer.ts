import { defHttp } from '@/utils/http/axios';
import { ContentTypeEnum } from '@/enums/httpEnum';

enum Api {
  SEARCH = '/fsales-core/manufacturer/getAll',
  CREATE_MANUFACTURER = '/fsales-core/manufacturer/create',
  UPDATE_MANUFACTURER = '/fsales-core/manufacturer/update',
  DELETE_MANUFACTURER = '/fsales-core/manufacturer/delete',
  IMPORT_MANUFACTURER = '/fsales-core/manufacturer/import-excel',
  DOWNLOAD_FILE = '/fsales-core/manufacturer/download-template',
}

export const searchManufacturer = async (params: any) => {
  const result = await defHttp.get<any>({
    url: Api.SEARCH,
    params,
  });

  if (result?.length > 0) {
    result?.forEach((item) => (item.codeName = item.code + ' - ' + item.name));
  }

  return result;
};

export const create = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_MANUFACTURER,
    data,
  });
export const update = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_MANUFACTURER,
    data,
  });

export const deleteManufacturer = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_MANUFACTURER,
    params,
  });

export const importFile = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.IMPORT_MANUFACTURER,
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
