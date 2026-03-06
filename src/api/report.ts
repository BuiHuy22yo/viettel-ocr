import { defHttp } from '@/utils/http/axios';

enum Api {
  SEARCH_SERVICE_SUMMARY = '/ubos-mobi-transport-report/report/search-service-summary',
  EXPORT_SERVICE_SUMMARY = '/ubos-mobi-transport-report/report/export-service-summary',

  SEARCH_CONTRACT_SUMMARY = '/ubos-mobi-transport-report/report/search-contract-summary',
  EXPORT_CONTRACT_SUMMARY = '/ubos-mobi-transport-report/report/export-contract-summary',
  EXPORT_WAREHOUSE_INVENTORY = '/ubos-mytel-logistics-transport-report/report/export-warehouse-inventory',
  EXPORT_IMPORT_EXPORT_WAREHOUSE_BY_PRODUCT = '/ubos-mytel-logistics-transport-report/report/export-import-export-warehouse-by-product',
}

export const searchServiceSummary = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_SERVICE_SUMMARY,
    data,
  });

export const exportServiceSummary = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_SERVICE_SUMMARY,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const searchContractSummary = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_CONTRACT_SUMMARY,
    data,
  });

export const exportContractSummary = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_CONTRACT_SUMMARY,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const exportWarehouseInventoryApi = (params: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_WAREHOUSE_INVENTORY,
      params,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const exportImportExportWarehouseByProductApi = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_IMPORT_EXPORT_WAREHOUSE_BY_PRODUCT,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );
