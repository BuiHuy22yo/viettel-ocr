import { defHttp } from '@/utils/http/axios';

enum Api {
  UPLOAD_FILE = '/ubos-mytel-logistics-uploads/file-management/upload-file',
  DETAIL_FILE = '/ubos-mytel-logistics-uploads/file-management/file-detail',
  DELETE_FILE = '/ubos-mytel-logistics-uploads/file-management/delete',
  DOWNLOAD_FILE = '/ubos-mytel-logistics-uploads/file-management/download',
}

export const uploadFileData = (params: any) =>
  defHttp.uploadFile<any>(
    {
      url: Api.UPLOAD_FILE,
    },
    params,
  );

export const getDetailFile = (params: any) =>
  defHttp.get<any>({
    url: Api.DETAIL_FILE,
    params,
  });

export const downloadFile = (params: any) =>
  defHttp.get<any>(
    {
      url: Api.DOWNLOAD_FILE,
      params,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );

export const deleteFile = (params: any) =>
  defHttp.delete<any>(
    {
      url: Api.DELETE_FILE,
      params,
    },
    {
      isReturnNativeResponse: true,
    },
  );
