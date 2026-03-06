import { defHttp } from '@/utils/http/axios';

enum Api {
  GET_ALL_GROUP_ELEMENT = '/fsales-core/income-element-group/getAll',
  CREATE_GROUP_ELEMENT = '/fsales-core/income-element-group/create',
  UPDATE_GROUP_ELEMENT = '/fsales-core/income-element-group/update',
  DELETE_GROUP_ELEMENT = '/fsales-core/income-element-group/delete',

  GET_ALL_ELEMENT = '/fsales-core/income-element/getAll',
  CREATE_ELEMENT = '/fsales-core/income-element/create',
  UPDATE_ELEMENT = '/fsales-core/income-element/update',
  DELETE_ELEMENT = '/fsales-core/income-element/delete',

  GET_ALL_METHOD = '/fsales-core/income-method/getAll',
  CREATE_METHOD = '/fsales-core/income-method/create',
  UPDATE_METHOD = '/fsales-core/income-method/update',
  DELETE_METHOD = '/fsales-core/income-method/delete',

  GET_ALL_DATASOURCE = '/fsales-core/income-data-source/getAll',
  CREATE_DATASOURCE = '/fsales-core/income-data-source/create',
  UPDATE_DATASOURCE = '/fsales-core/income-data-source/update',
  DELETE_DATASOURCE = '/fsales-core/income-data-source/delete',

  GET_ALL_TEMPLATE = '/fsales-core/income-template/findAllIncomeTemplate',
  CREATE_TEMPLATE = '/fsales-core/income-template/create',
  UPDATE_TEMPLATE = '/fsales-core/income-template/update',
  DELETE_TEMPLATE = '/fsales-core/income-template/delete',
  GET_DETAIL_TEMPLATE = '/fsales-core/income-template/getByIncomeTemplateId',

  CREATE_OR_UPDATE_ELEMENT_VALUE = '/fsales-core/income-element-value/create-or-update',
  GET_ALL_ELEMENT_VALUE = '/fsales-core/income-element-value/getAll',
  DELETE_ELEMENT_VALUE = '/fsales-core/income-element-value/delete',

  CALCULATE_INCOME = '/fsales-core/calculate/calculate-income-table',
  CALCULATE_TOTAL_VALUE_INCOME = '/fsales-core/calculate/calculate-total-value',
  CREATE_TABLE_INCOME = '/fsales-core/income-table-staff/create',
  DETAIL_TABLE_INCOME = '/fsales-core/income-table-staff/detail',
}

export const getAllGroupElement = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_GROUP_ELEMENT,
    params,
  });
export const createGroupElement = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_GROUP_ELEMENT,
    data,
  });
export const updateGroupElement = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_GROUP_ELEMENT,
    data,
  });
export const deleteGroupElement = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_GROUP_ELEMENT,
    params,
  });

export const getAllElement = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_ELEMENT,
    params,
  });
export const createElement = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_ELEMENT,
    data,
  });
export const updateElement = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_ELEMENT,
    data,
  });
export const deleteElement = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_ELEMENT,
    params,
  });

export const getAllMethod = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_METHOD,
    params,
  });
export const createMethod = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_METHOD,
    data,
  });
export const updateMethod = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_METHOD,
    data,
  });
export const deleteMethod = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_METHOD,
    params,
  });

export const getAllDataSource = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_DATASOURCE,
    params,
  });
export const createDataSource = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_DATASOURCE,
    data,
  });
export const updateDataSource = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_DATASOURCE,
    data,
  });
export const deleteDataSource = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_DATASOURCE,
    params,
  });

export const getAllTemplate = (data: any) =>
  defHttp.post<any>({
    url: Api.GET_ALL_TEMPLATE,
    data,
  });
export const createTemplate = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_TEMPLATE,
    data,
  });
export const updateTemplate = (data: any) =>
  defHttp.put<any>({
    url: Api.UPDATE_TEMPLATE,
    data,
  });
export const deleteTemplate = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_TEMPLATE,
    params,
  });

export const getTemplateById = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_DETAIL_TEMPLATE,
    params,
  });

export const createOrUpdateElementValue = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_OR_UPDATE_ELEMENT_VALUE,
    data,
  });

export const getAllElementValue = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_ELEMENT_VALUE,
    params,
  });

export const deleteElementValue = (params: any) =>
  defHttp.delete<any>({
    url: Api.DELETE_ELEMENT_VALUE,
    params,
  });

export const calculateIncomeTable = (data: any) =>
  defHttp.post<any>({
    url: Api.CALCULATE_INCOME,
    data,
  });

export const calculateTotalValueIncome = (data: any) =>
  defHttp.post<any>({
    url: Api.CALCULATE_TOTAL_VALUE_INCOME,
    data,
  });

export const createTableIncome = (data: any) =>
  defHttp.post<any>({
    url: Api.CREATE_TABLE_INCOME,
    data,
  });

export const detailTableIncome = (params: any) =>
  defHttp.get<any>({
    url: Api.DETAIL_TABLE_INCOME,
    params,
  });
