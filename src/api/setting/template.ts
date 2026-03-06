import { defHttp } from '@/utils/http/axios';
import { companyModel } from '@/api/model/orgModel';

enum Api {
  GET_ALL_PURPOSE = '/fsales-core/template-purpose/getAll',
  CREATE_PURPOSE = '/fsales-core/template-purpose/create',
  UPDATE_PURPOSE = '/fsales-core/template-purpose/update',
  DELETE_PURPOSE = '/fsales-core/template-purpose/delete',

  GET_ALL_TYPE = '/fsales-core/template-type/getAll',
  CREATE_TYPE = '/fsales-core/template-type/create',
  UPDATE_TYPE = '/fsales-core/template-type/update',
  DELETE_TYPE = '/fsales-core/template-type/delete',

  GET_ALL_GROUP_ATTRIBUTES = '/fsales-core/template-gr-attributes/getAll',
  GET_ALL_GROUP_ATTRIBUTES_TREE = '/fsales-core/template-gr-attributes/get-all-tree',
  CREATE_GROUP_ATTRIBUTES = '/fsales-core/template-gr-attributes/create',
  UPDATE_GROUP_ATTRIBUTES = '/fsales-core/template-gr-attributes/update',
  DELETE_GROUP_ATTRIBUTES = '/fsales-core/template-gr-attributes/delete',

  GET_ALL_ATTRIBUTES = '/fsales-core/template-attributes/getAll',
  CREATE_ATTRIBUTES = '/fsales-core/template-attributes/create',
  UPDATE_ATTRIBUTES = '/fsales-core/template-attributes/update',
  DELETE_ATTRIBUTES = '/fsales-core/template-attributes/delete',

  GET_ALL_TEMPLATE = '/fsales-core/template/get-all',
  GET_ALL_TEMPLATE_FILTER = '/fsales-core/template/get-all-template',
  CREATE_TEMPLATE = '/fsales-core/template/create',
  UPDATE_TEMPLATE = '/fsales-core/template/update',
  DELETE_TEMPLATE = '/fsales-core/template/delete',
  COPY_TEMPLATE = '/fsales-core/template/copy-template',

  GET_ALL_TEMPLATE_DETAIL = '/fsales-core/template-detail/getAll',
  CREATE_TEMPLATE_DETAIL = '/fsales-core/template-detail/create',
  UPDATE_TEMPLATE_DETAIL = '/fsales-core/template-detail/update',
  DELETE_TEMPLATE_DETAIL = '/fsales-core/template-detail/delete',

  GET_ALL_TEMPLATE_EXTRA_DATA = '/fsales-core/template-extra-data/getAll',
  CREATE_TEMPLATE_EXTRA_DATA = '/fsales-core/template-extra-data/create',
  UPDATE_TEMPLATE_EXTRA_DATA = '/fsales-core/template-extra-data/update',
  DELETE_TEMPLATE_EXTRA_DATA = '/fsales-core/template-extra-data/delete',

  GET_ALL_TEMPLATE_EXTRA_DATA_DETAIL = '/fsales-core/template-extra-data-detail/getAll',
  GET_TEMPLATE_EXTRA_DATA_DETAIL_BY_CODE = '/fsales-core/template-extra-data-detail/getAllTreeByCode',
  GET_ALL_TREE_TEMPLATE_EXTRA_DATA_DETAIL = '/fsales-core/template-extra-data-detail/get-all-tree',
  CREATE_TEMPLATE_EXTRA_DATA_DETAIL = '/fsales-core/template-extra-data-detail/create',
  UPDATE_TEMPLATE_EXTRA_DATA_DETAIL = '/fsales-core/template-extra-data-detail/update',
  DELETE_TEMPLATE_EXTRA_DATA_DETAIL = '/fsales-core/template-extra-data-detail/delete',

  GET_ALL_ATTRIBUTES_DEFAULT = '/fsales-core/template-attributes-default/getAll',
  CREATE_ATTRIBUTES_DEFAULT = '/fsales-core/template-attributes-default/create',
  // UPDATE_ATTRIBUTES = '/fsales-core/template-attributes/update',
  // DELETE_ATTRIBUTES = '/fsales-core/template-attributes/delete',
}

export const getAllPurpose = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_PURPOSE,
    params,
  });
export const createPurpose = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_PURPOSE,
    data,
  });
export const updatePurpose = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_PURPOSE,
    data,
  });
export const deletePurpose = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_PURPOSE,
    params,
  });

export const getAllType = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_TYPE,
    params,
  });
export const createType = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_TYPE,
    data,
  });
export const updateType = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_TYPE,
    data,
  });
export const deleteType = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_TYPE,
    params,
  });

export const getAllGroupAttributes = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_GROUP_ATTRIBUTES,
    params,
  });
export const getAllGroupAttributesTree = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_GROUP_ATTRIBUTES_TREE,
    params,
  });
export const createGroupAttributes = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_GROUP_ATTRIBUTES,
    data,
  });
export const updateGroupAttributes = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_GROUP_ATTRIBUTES,
    data,
  });
export const deleteGroupAttributes = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_GROUP_ATTRIBUTES,
    params,
  });

export const getAllAttributes = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_ATTRIBUTES,
    params,
  });
export const createAttributes = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_ATTRIBUTES,
    data,
  });
export const updateAttributes = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_ATTRIBUTES,
    data,
  });
export const deleteDataSource = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_ATTRIBUTES,
    params,
  });

export const getAllTemplate = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_TEMPLATE,
    params,
  });

export const getAllTemplateContract = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_TEMPLATE_FILTER,
    params,
  });
export const createTemplate = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_TEMPLATE,
    data,
  });
export const updateTemplate = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_TEMPLATE,
    data,
  });
export const deleteTemplate = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_TEMPLATE,
    params,
  });

export const getAllTemplateDetail = (data: any) =>
  defHttp.post<any>({
    url: Api.GET_ALL_TEMPLATE_DETAIL,
    data,
  });
export const createTemplateDetail = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_TEMPLATE_DETAIL,
    data,
  });
export const updateTemplateDetail = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_TEMPLATE_DETAIL,
    data,
  });
export const deleteTemplateDetail = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_TEMPLATE_DETAIL,
    params,
  });

export const getAllTemplateExtraData = (data: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_TEMPLATE_EXTRA_DATA,
    data,
  });
export const createTemplateExtraData = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_TEMPLATE_EXTRA_DATA,
    data,
  });
export const updateTemplateExtraData = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_TEMPLATE_EXTRA_DATA,
    data,
  });
export const deleteTemplateExtraData = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_TEMPLATE_EXTRA_DATA,
    params,
  });

export const getAllTemplateExtraDataDetail = (data: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_TEMPLATE_EXTRA_DATA_DETAIL,
    data,
  });
export const getTemplateExtraDataDetailByCode = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_TEMPLATE_EXTRA_DATA_DETAIL_BY_CODE,
    params,
  });
export const getAllTreeTemplateExtraDataDetail = (data: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_TREE_TEMPLATE_EXTRA_DATA_DETAIL,
    data,
  });
export const createTemplateExtraDataDetail = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_TEMPLATE_EXTRA_DATA_DETAIL,
    data,
  });
export const updateTemplateExtraDataDetail = (data: any) =>
  defHttp.put<companyModel>({
    url: Api.UPDATE_TEMPLATE_EXTRA_DATA_DETAIL,
    data,
  });
export const deleteTemplateExtraDataDetail = (params: any) =>
  defHttp.delete<companyModel>({
    url: Api.DELETE_TEMPLATE_EXTRA_DATA_DETAIL,
    params,
  });

export const getTemplateByPurpose = async (params: any) => {
  return (
    await getAllTemplate({
      ...params,
      currentPage: 1,
      pageSize: 1000000,
    })
  ).content;
};

export const getAllAttributesDefault = (params: any) =>
  defHttp.get<any>({
    url: Api.GET_ALL_ATTRIBUTES_DEFAULT,
    params,
  });
export const createAttributesDefault = (data: any) =>
  defHttp.post<companyModel>({
    url: Api.CREATE_ATTRIBUTES_DEFAULT,
    data,
  });

export const copyTemplate = (params: any) =>
  defHttp.get<any>({
    url: Api.COPY_TEMPLATE,
    params,
  });
