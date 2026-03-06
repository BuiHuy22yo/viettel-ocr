// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged

import type { AxiosInstance, AxiosResponse } from 'axios';
import { clone } from 'lodash-es';
import type { RequestOptions, Result } from '#/axios';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import { VAxios } from './Axios';
// import { checkStatus } from './checkStatus';
import { useGlobSetting } from '@/hooks/setting';
import { useMessage } from '@/hooks/web/useMessage';
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/enums/httpEnum';
import { isString, isUndefined, isNull, isEmpty } from '@/utils/is';
import { getToken } from '@/utils/auth';
import { setObjToUrlParams, deepMerge } from '@/utils';
import { useErrorLogStoreWithOut } from '@/store/modules/errorLog';
import { useI18n } from '@/hooks/web/useI18n';
import { joinTimestamp, formatRequestDate } from './helper';
import { useUserStoreWithOut } from '@/store/modules/user';
// import { AxiosRetry } from '@/utils/http/axios/axiosRetry';
import axios from 'axios';
import { router } from '@/router';
import { PageEnum } from '@/enums/pageEnum';
import { useLocale } from '@/locales/useLocale';

const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix;
const { createMessage, createErrorModal, createSuccessModal } = useMessage();

/**
 * @description:
 */
const transform: AxiosTransform = {
  /**
   * @description:
   */
  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { t } = useI18n();
    const { isTransformResponse, isReturnNativeResponse } = options;
    if (isReturnNativeResponse) {
      return res;
    }
    if (!isTransformResponse) {
      return res.data;
    }

    const data = res?.data;
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error(t('sys.api.apiRequestFailed'));
    }
    const { code, body, message } = data;

    const hasSuccess = data && Reflect.has(data, 'code') && code == ResultEnum.SUCCESS;
    if (hasSuccess) {
      let successMsg = message;

      if (isNull(successMsg) || isUndefined(successMsg) || isEmpty(successMsg)) {
        successMsg = t(`sys.api.operationSuccess`);
      }

      if (options.successMessageMode === 'modal') {
        createSuccessModal({ title: t('sys.api.successTip'), content: successMsg });
      } else if (options.successMessageMode === 'message') {
        createMessage.success(successMsg);
      }
      return body;
    }

    let timeoutMsg = '';
    switch (code) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = t('sys.api.timeoutMessage');
        const userStore = useUserStoreWithOut();
        userStore.logout(true);
        break;
      default:
        if (message) {
          timeoutMsg = message;
        }
    }

    if (options.errorMessageMode === 'modal') {
      createErrorModal({ title: t('sys.api.errorTip'), content: timeoutMsg });
    } else if (options.errorMessageMode === 'message') {
      createMessage.error(timeoutMsg);
    }

    throw new Error(timeoutMsg || t('sys.api.apiRequestFailed'));
  },

  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (
      config.method?.toUpperCase() === RequestEnum.GET ||
      config.method?.toUpperCase() === RequestEnum.DELETE
    ) {
      if (!isString(params)) {
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          (Object.keys(config.data).length > 0 || config.data instanceof FormData)
        ) {
          config.data = data;
          config.params = params;
        } else {
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          );
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description:
   */
  requestInterceptors: (config, options) => {
    const token = getToken();
    const { getLocale } = useLocale();
    (config as Recordable).headers.lang = getLocale.value;
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      (config as Recordable).headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token;
    }
    return config;
  },

  /**
   * @description:
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  /**
   * @description:
   */
  responseInterceptorsCatch: (axiosInstance: AxiosInstance, error: any) => {
    const errorLogStore = useErrorLogStoreWithOut();
    const { t } = useI18n();

    errorLogStore.addAjaxErrorInfo(error);
    const { response, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'modal';
    // const msg: string = response?.data?.error?.message ?? '';
    const msg: string = response?.data?.message ?? '';
    // const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    // const err: string = error?.toString?.() ?? '';
    // const errMessage = msg;
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }
    const userStore = useUserStoreWithOut();
    if (error?.response?.data?.path === '/authen/logout') {
      userStore.setToken(undefined);
      router.push(PageEnum.BASE_LOGIN);
      return;
    }
    if (error?.response?.status === 401 && error?.response?.data?.path !== '/authen/logout') {
      userStore.setToken(undefined);
      userStore.logout(true);
      return Promise.reject(new Error('Unauthorized'));
    }
    if (errorMessageMode === 'modal' && msg) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: msg,
      });
    }

    return Promise.reject(new Error(msg));
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        authenticationScheme: 'Bearer',
        timeout: 60 * 1000,

        headers: { 'Content-Type': ContentTypeEnum.JSON },
        transform: clone(transform),
        requestOptions: {
          joinPrefix: true,
          isReturnNativeResponse: false,
          isTransformResponse: true,
          joinParamsToUrl: false,
          formatDate: true,
          errorMessageMode: 'modal',
          apiUrl: globSetting.apiUrl,
          urlPrefix: urlPrefix,
          joinTime: false,
          ignoreCancelToken: true,
          withToken: true,
          retryRequest: {
            isOpenRetry: true,
            count: 5,
            waitTime: 100,
          },
        },
      },
      opt || {},
    ),
  );
}
export const defHttp = createAxios();
