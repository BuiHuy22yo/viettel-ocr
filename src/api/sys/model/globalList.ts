export interface globalListParams {
  code: string;
  name: string;
  description?: string;
  status: string;
  globalListId: number;
}

export interface globalListDetailParams {
  globalListId: number;
  globalListDetailId: number;
  value: string;
  code: string;
  name: string;
  description?: string;
  status: string;
  displayOrder: number;
}
