import type { UserInfo } from '#/store';
import type { ErrorMessageMode } from '#/axios';
import { defineStore } from 'pinia';
import { store } from '@/store';
import { RoleEnum } from '@/enums/roleEnum';
import { PageEnum } from '@/enums/pageEnum';
import {
  RERFESH_TOKEN_KEY,
  ROLES_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
  LOGIN_RESPONSE_KEY,
  ROLES_V2_KEY,
  PERMISSIONS_KEY,
} from '@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '@/utils/auth';
import { GetUserInfoModel, LoginParams, LogoutParams } from '@/api/sys/model/userModel';
import { doLogout, loginApi } from '@/api/sys/user';
import { useI18n } from '@/hooks/web/useI18n';
import { useMessage } from '@/hooks/web/useMessage';
import { router } from '@/router';
import { usePermissionStore } from '@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic';
import { isArray } from '@/utils/is';
import { h } from 'vue';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  refreshToken?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
  loginResponse?: any;
  rolesV2?: string[];
  permissions?: string[];
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    loginResponse: null,
    // token
    token: undefined,
    //refresh token
    refreshToken: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
    // List role
    rolesV2: [],
    // List permission
    permissions: [],
  }),
  getters: {
    getUserInfo(state): UserInfo {
      return state.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(state): string {
      return state.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRefreshToken(state): string {
      return state.refreshToken || getAuthCache<string>(RERFESH_TOKEN_KEY);
    },
    getRoleList(state): RoleEnum[] {
      return state.roleList.length > 0 ? state.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(state): boolean {
      return !!state.sessionTimeout;
    },
    getLastUpdateTime(state): number {
      return state.lastUpdateTime;
    },
    getLoginResponse(state): any {
      return state.loginResponse || getAuthCache<any>(LOGIN_RESPONSE_KEY);
    },
    getRolesV2(state): string[] {
      return state?.rolesV2 && state?.rolesV2.length > 0
        ? state.rolesV2
        : getAuthCache<[]>(ROLES_V2_KEY);
    },
    getPermissions(state): string[] {
      return state?.permissions && state?.permissions.length > 0
        ? state.permissions
        : getAuthCache<[]>(PERMISSIONS_KEY);
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setRefreshToken(info: string | undefined) {
      this.refreshToken = info ? info : ''; // for null or undefined value
      setAuthCache(RERFESH_TOKEN_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.refreshToken = '';
      this.roleList = [];
      this.sessionTimeout = false;
      this.rolesV2 = [];
      this.permissions = [];
    },
    setLoginResponse(loginResponse?: any) {
      this.loginResponse = loginResponse;
      setAuthCache(LOGIN_RESPONSE_KEY, loginResponse);
    },
    setRolesV2(info: string[]) {
      this.rolesV2 = info ? info : [];
      setAuthCache(ROLES_V2_KEY, info);
    },
    setPermissions(info: string[]) {
      this.permissions = info ? info : [];
      setAuthCache(PERMISSIONS_KEY, info);
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const permissionStore = usePermissionStore();
        loginParams['language'] = 'vi';
        loginParams['clientId'] = 'ubos-mytel-logistics';
        const data = await loginApi(loginParams, 'modal');
        const token = data?.accessToken;
        const refreshToken = data?.refreshToken;
        const roles = data?.roles;
        const permissions = data?.permissions;
        // save token & refresh token
        this.setToken(token);
        this.setRefreshToken(refreshToken);
        this.setLoginResponse(data);
        this.setPermissions(permissions);
        this.setRolesV2(roles);
        permissionStore.setPermissionMenuList(data?.menus ?? []);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // get user info
      const userInfo = await this.getUserInfoAction();

      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }
        goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
      }
      return userInfo;
    },
    async getUserInfoAction(data?: any): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      const userInfo: any = {
        code: 0,
        result: {
          userId: this.loginResponse?.userInfo?.staffId,
          username: this.loginResponse?.userInfo?.preferred_username,
          realName:
            this.loginResponse?.userInfo?.given_name +
            ' ' +
            this.loginResponse?.userInfo?.family_name,
          avatar: '',
          desc: '',
          token: '',
          homePath: '',
          roles: this.loginResponse?.userInfo?.realm_access?.roles || [],
          rolesV2: this.loginResponse?.roles || [],
          permissions: this.loginResponse?.permissions || [],
        },
        preferred_username: this.loginResponse?.userInfo?.preferred_username,
        message: 'ok',
        type: 'success',
      };
      const { roles = [] } = userInfo;
      if (isArray(roles)) {
        const roleList = roles.map((item) => item.value) as RoleEnum[];
        this.setRoleList(roleList);
      } else {
        userInfo.roles = [];
        this.setRoleList([]);
      }
      this.setUserInfo(userInfo);
      return userInfo;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      const params: LogoutParams = {
        refreshToken: this.getRefreshToken,
        clientId: 'fsale',
      };
      await doLogout(params);
      this.setToken(undefined);
      this.setRefreshToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      this.setPermissions([]);
      this.setRolesV2([]);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
