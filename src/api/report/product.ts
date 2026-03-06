import { defHttp } from '@/utils/http/axios';

enum Api {
  GET_TOTAL_PRODUCT = '/fsales-report/product-general/getTotal',
  GET_PRODUCT_BY_STATUS = '/fsales-report/product-general/getStatus',
  GET_PRODUCT_BY_MONTH = '/fsales-report/product-general/getAllMonth',
  GET_PRODUCT_BY_CATEGORY = '/fsales-report/product-general/getProductByCategory',
  GET_CATEGORY_BY_DOMAIN = '/fsales-report/product-general/getCategoryByDomain',
}

export const getTotalProduct = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_TOTAL_PRODUCT,
    params,
  });

export const getProductByStatus = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_PRODUCT_BY_STATUS,
    params,
  });

export const getProductByMonth = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_PRODUCT_BY_MONTH,
    params,
  });

export const getProductByCategory = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_PRODUCT_BY_CATEGORY,
    params,
  });

export const getCategoryByDomain = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_CATEGORY_BY_DOMAIN,
    params,
  });
