import { defHttp } from '@/utils/http/axios';

enum Api {
  SEARCH_CONTRACT = '/fsales-transport-core/contract/findAllContract',
  CREATE_CONTRACT = '/fsales-transport-core/contract/create',
  UPDATE_CONTRACT = '/fsales-transport-core/contract/update',
  DELETE_CONTRACT = '/fsales-transport-core/contract/delete',

  //buyer contract
  SEARCH_BUYER_CONTRACT = '/fsales-transport-core/buyer-contract/findAllBuyerContract',
  CREATE_BUYER_CONTRACT = '/fsales-transport-core/buyer-contract/create',
  UPDATE_BUYER_CONTRACT = '/fsales-transport-core/buyer-contract/update',
  DELETE_BUYER_CONTRACT = '/fsales-transport-core/buyer-contract/delete',
  GET_CONTRACT_BY_PARTNER = '/fsales-transport-core/buyer-contract/getBuyerContract',
  GET_CONTRACT = '/fsales-transport-core/buyer-contract/search',
  GET_DETAIL_CONTRACT = '/fsales-transport-core/buyer-contract/buyer-contract-detail',
  IMPORT_CONTRACTS = '/fsales-transport-core/buyer-contract/import-buyer-contract-product',
  EXPORT_CONTRACT = '/fsales-transport-core/buyer-contract/export',
  EXPORT_CONTRACT_BY_PARTNER = '/fsales-transport-core/buyer-contract/partner-contract-export',
  DOWNLOAD_TEMPLATE_CONTRACT = '/fsales-transport-core/buyer-contract/download-template',

  //Kanban
  SEARCH_CONTRACT_WITH_APPENDIX = '/fsales-transport-core/buyer-contract/search-contract-with-appendix',
  PARTNER_CONTRACT_APPENDIX_INFO = '/fsales-transport-core/buyer-contract/partner-contract-appendix-info',
  GET_DETAIL_APPENDIX = '/fsales-transport-core/buyer-contract/buyer-appendix-detail',

  //Pay com
  CONTRACT_SELLER_PAY_COM_ACTIVE = '/fsales-transport-core/pay-commission/saSellerActive',
  PO_CONTRACT_SELLER_PAY_COM_ACTIVE = '/fsales-transport-core/pay-commission/poSellerActive',
  MSA_CONTRACT_SELLER_PAY_COM_ACTIVE = '/fsales-transport-core/pay-commission/msaSellerActive',
}

export const exportContract = (data: any) =>
  defHttp.post<any>(
    {
      url: Api.EXPORT_CONTRACT,
      data,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const exportContractByPartner = (params: any) =>
  defHttp.get<any>(
    {
      url: Api.EXPORT_CONTRACT_BY_PARTNER,
      params,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const searchContract = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_CONTRACT,
    data,
  });

export const createContract = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_CONTRACT,
    data,
  });
export const updateContract = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_CONTRACT,
    data,
  });

export const deleteContract = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_CONTRACT,
    params,
  });

export const searchBuyerContract = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_BUYER_CONTRACT,
    data,
  });

export const getContractByPartner = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_CONTRACT_BY_PARTNER,
    params,
  });

export const getDetailContract = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_DETAIL_CONTRACT,
    params,
  });
export const getContract = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_CONTRACT,
    params,
  });
export const createBuyerContract = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_BUYER_CONTRACT,
    data,
  });

export const importContracts = (params: any) =>
  defHttp.uploadFile<any>(
    {
      url: Api.IMPORT_CONTRACTS,
      responseType: 'arraybuffer',
    },
    params,
  );
export const updateBuyerContract = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_BUYER_CONTRACT,
    data,
  });

export const deleteBuyerContract = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_BUYER_CONTRACT,
    params,
  });

export const activePayComSeller = (data: any) => {
  if (data?.type === 'PO') {
    data.sellerPurchaseOrderId = data?.contractId;
  }
  return defHttp.post<any>({
    url:
      data?.type === 'PO'
        ? Api.PO_CONTRACT_SELLER_PAY_COM_ACTIVE // type : PO
        : data?.contractType === 2 // Type : MSA
          ? Api.MSA_CONTRACT_SELLER_PAY_COM_ACTIVE
          : Api.CONTRACT_SELLER_PAY_COM_ACTIVE,
    data,
  });
};

export const downloadTemplateContract = (params: any) =>
  defHttp.get<any>(
    {
      url: Api.DOWNLOAD_TEMPLATE_CONTRACT,
      params,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const searchContractWithAppendix = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_CONTRACT_WITH_APPENDIX,
    data,
  });

export const partnerContractAppendixInfo = (params: any) =>
  defHttp.get<any>({
    url: Api.PARTNER_CONTRACT_APPENDIX_INFO,
    params,
  });

export const getDetailAppendix = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_DETAIL_APPENDIX,
    params,
  });
