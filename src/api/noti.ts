import { defHttp } from '@/utils/http/axios';

enum Api {
  GET_NOTIFICATION = '/ubos-mytel-logistics-notification/notifications/search',
  READ_NOTIFICATION = '/ubos-mytel-logistics-notification/notifications/read',
  READ_ALL_NOTIFICATION = '/ubos-mytel-logistics-notification/notifications/read/all',
  UNREAD_NOTIFICATION = '/ubos-mytel-logistics-notification/notifications/unread',
}

export const getNotification = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_NOTIFICATION,
    params,
  });

export const notificationRead = (params: any) =>
  defHttp.put<any>({
    url: Api.READ_NOTIFICATION,
    params,
  });

export const numberUnreadNotification = (params: any) =>
  defHttp.get<any>({
    url: Api.UNREAD_NOTIFICATION,
    params,
  });

export const notificationReadAll = (params: any) =>
  defHttp.put<any>({
    url: Api.READ_ALL_NOTIFICATION,
    params,
  });
