import { defHttp } from '@/utils/http/axios';

enum API {
  EXPENSES_DOCUMENT_SEARCH = '/fsales-transport-core/expenses-document/search',
  EXPENSES_DOCUMENT_CREATE = '/fsales-transport-core/expenses-document/create',
  EXPENSES_DOCUMENT_UPDATE = '/fsales-transport-core/expenses-document/update',
  EXPENSES_DOCUMENT_DELETE = '/fsales-transport-core/expenses-document/delete',
}
export const expensesDocumentSearchApi = (params: any) =>
  defHttp.post<any>({
    url: API.EXPENSES_DOCUMENT_SEARCH,
    params,
  });
export const expensesDocumentCreateApi = (params: any) =>
  defHttp.post<any>({
    url: API.EXPENSES_DOCUMENT_CREATE,
    params,
  });
export const expensesDocumentUpdateApi = (params: any) =>
  defHttp.post<any>({
    url: API.EXPENSES_DOCUMENT_UPDATE,
    params,
  });
export const expensesDocumentDeleteApi = (params: any) =>
  defHttp.get<any>({
    url: API.EXPENSES_DOCUMENT_DELETE,
    params,
  });
