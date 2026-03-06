import { FormSchema } from '@/components/Table';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: 'Key',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export interface globalListRes {
  code: string;
  name: string;
  description?: string;
  status: string;
  globalListId: number;
  globalListDetails: globalListDetailRes[];
}

export interface globalListDetailRes {
  code: string;
  description?: string;
  displayOrder: number;
  globalListDetailId: number;
  globalListId: number;
  name: string;
  status: string;
  value: string;
}
