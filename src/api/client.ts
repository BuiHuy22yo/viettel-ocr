import { defHttp } from '@/utils/http/axios';

enum Api {
  CLIENT_SEARCH = '/fsales-sys/client/search',
}

export const searchClient = async (params: any) => {
  const result = (
    await defHttp.get<any>({
      url: Api.CLIENT_SEARCH,
      params,
    })
  )?.result;

  if (result && result.length > 0) {
    result.forEach((item) => {
      item.label = item.code;
      item.value = item.code;
    });
  }

  return result;
};
