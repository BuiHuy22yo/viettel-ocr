import { defHttp } from '@/utils/http/axios';

enum Api {
  SEARCH_PRODUCT = '/fsales-core/product/findAllProduct',
  EXPORT_PRODUCT = '/fsales-core/product/export',
}

export const searchProduct = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_PRODUCT,
    data,
  });

export const exportProduct = (params: any) =>
  defHttp.get<any>(
    {
      url: Api.EXPORT_PRODUCT,
      params,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );
