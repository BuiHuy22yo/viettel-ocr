import { defHttp } from '@/utils/http/axios';

enum Api {
  SEARCH_ROLE = '/fsales-sys/api/v1/permission/search-role',
  CREATE_ROLE = '/fsales-sys/api/v1/permission/create-role',
  UPDATE_ROLE = '/fsales-sys/api/v1/permission/update-role',
  DELETE_ROLE = '/fsales-sys/api/v1/permission/delete-role',

  SEARCH_USER = '/fsales-sys/api/v1/permission/search-user',
  GET_USER_BY_ROLE = '/fsales-sys/api/v1/permission/get-users-by-role',

  ROLE_USER = '/fsales-sys/api/v1/permission/role-user',
  ROLE_PERMISSION = '/fsales-sys/api/v1/permission/role-permission',
  PERMISSION_TREE = '/fsales-sys/api/v1/permission/get-permission-tree',
  PERMISSION_BY_ROLE = '/fsales-sys/api/v1/permission/get-permission-by-role',
  PERMISSION_BY_ROLE_AND_CLIENT = '/fsales-sys/api/v1/permission/get-permission-by-role-and-client',
}

export const searchRole = (params: any) =>
  defHttp.get<any>({
    url: Api.SEARCH_ROLE,
    params,
  });

export const createRole = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_ROLE,
    data,
  });

export const updateRole = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_ROLE,
    data,
  });

export const deleteRole = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_ROLE,
    params,
  });

export const searchUser = (data: any) =>
  defHttp.post<any>({
    url: Api.SEARCH_USER,
    data,
  });

export const getUserByRole = (data: any) =>
  defHttp.post<any>({
    url: Api.GET_USER_BY_ROLE,
    data,
  });

export const roleUser = (data: any) =>
  defHttp.post<any>({
    url: Api.ROLE_USER,
    data,
  });

export const assignPermissionsToRole = (data: any) =>
  defHttp.post<any>({
    url: Api.ROLE_PERMISSION,
    data,
  });

export const getPermissionTree = (params: any) =>
  defHttp.get<any>({
    url: Api.PERMISSION_TREE,
    params,
  });

export const getPermissionByRoleId = (params: any) =>
  defHttp.get<any>({
    url: Api.PERMISSION_BY_ROLE,
    params,
  });

export const getPermissionByRoleIdAndClientId = (params: any) =>
  defHttp.get<any>({
    url: Api.PERMISSION_BY_ROLE_AND_CLIENT,
    params,
  });
