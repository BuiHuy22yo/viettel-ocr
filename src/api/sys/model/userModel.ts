/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  clientId: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description:  interface return value
 */
export interface ResultModel {
  code: string;
  message: string;
  body: any; // bổ sung sau
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  userId: string | number;
  username: string;
  realName: string;
  avatar: string;
  desc?: string;
}

/**
 * @description : Logout interface parameters
 */

export interface LogoutParams {
  refreshToken: string;
  clientId: string;
}

/**
 * @description : ChangePass interface parameters
 */

export interface ChangePasswordParams {
  newPwd: string;
  oldPassword: string;
}
