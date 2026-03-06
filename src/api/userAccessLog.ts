import { defHttp } from '@/utils/http/axios';

enum Api {
  CREATE = '/ubos-mytel-logistics-logging/user-access-log/create',
}

export const createUserAccessLog = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE,
    data,
  });
