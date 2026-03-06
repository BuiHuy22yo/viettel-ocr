import { defHttp } from '@/utils/http/axios';
import {
  LoginParams,
  ResultModel,
  GetUserInfoModel,
  LogoutParams,
  ChangePasswordParams,
} from './model/userModel';

import { ErrorMessageMode } from '#/axios';

enum Api {
  Login = '/fsales-sys/authen/login',
  Logout = '/fsales-sys/authen/logout',
  GetUserInfo = '/fsales-sys/getUserInfo',
  GetPermCode = '/fsales-sys/getPermCode',
  ChangePassword = '/fsales-sys/user/changePassword',
  resetPassword = '/fsales-sys/authen/rest-password-cms',
  requestForgotPassword = '/fsales-sys/authen/request-forgot-password-web',
  confirmForgotPassword = '/fsales-sys/authen/confirm-forgot-password-web',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout(params: LogoutParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<ResultModel>(
    {
      url: Api.Logout,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function changePassword(params: ChangePasswordParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<ResultModel>(
    {
      url: Api.ChangePassword,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function resetPassword(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<ResultModel>(
    {
      url: Api.resetPassword,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export const requestForgotPwd = (params) =>
  defHttp.get<any>({
    url: Api.requestForgotPassword,
    params,
  });

export const confirmForgotPwd = (data) =>
  defHttp.post<any>({
    url: Api.confirmForgotPassword,
    data,
  });
