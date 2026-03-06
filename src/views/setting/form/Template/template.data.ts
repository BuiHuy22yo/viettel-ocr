import { BasicColumn } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('page.form.template.code'),
    dataIndex: 'code',
  },
  {
    title: t('page.form.template.name'),
    dataIndex: 'name',
  },
  {
    title: t('page.form.template.description'),
    dataIndex: 'description',
  },
  {
    title: t('page.form.template.createdAt'),
    align: 'center',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: t('page.form.template.createdBy'),
    dataIndex: 'createdBy',
  },
  {
    title: t('page.form.template.updatedAt'),
    align: 'center',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: t('page.form.template.updatedBy'),
    dataIndex: 'updatedBy',
  },
  {
    title: t('page.form.template.status'),
    dataIndex: 'status',
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? 'Active' : 'InActive';
      return h(Tag, { color: color }, () => text);
    },
  },
];
