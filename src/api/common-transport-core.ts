import { defHttp } from '@/utils/http/axios';

enum API_COMMON {
  DOWNLOAD_TEMPLATE = '/fsales-transport-core/common-transport-core/download-template',
}

export const downloadTemplateFileApi = (params: any) =>
  defHttp.post<any>(
    {
      url: API_COMMON.DOWNLOAD_TEMPLATE,
      params,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );
