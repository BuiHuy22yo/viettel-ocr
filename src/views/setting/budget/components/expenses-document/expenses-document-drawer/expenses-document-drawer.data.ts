import { removeVietnameseTones, validatorCode } from '@/utils/helper/validatorForm';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
export const drawerFormSchema: any = [
  {
    field: 'isView',
    label: 'isView',
    show: false,
  },
  {
    field: 'isUpdate',
    label: 'isUpdate',
    show: false,
  },
  {
    field: 'code',
    label: t('page.budget.setting.expensesDocument.drawer.code'),
    required: true,
    component: 'Input',
    rules: [
      {
        validator: async (_, value) => {
          return validatorCode(value);
        },
      },
    ],
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isView || formModel.isUpdate,
        maxlength: 50,
        onChange: (e) => {
          if (!formModel.isView) {
            if (e.target?.value) {
              const text = (removeVietnameseTones(e.target?.value) || '').replace(
                /[^a-zA-Z0-9_]/g,
                '',
              );
              formModel.code = text.toUpperCase();
            }
          }
        },
      };
    },
    colProps: { span: 24 },
  },
  {
    field: 'name',
    label: t('page.budget.setting.expensesDocument.drawer.name'),
    required: true,
    component: 'Input',
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isView,
        maxlength: 250,
      };
    },
    colProps: { span: 24 },
  },
  {
    field: 'description',
    label: t('page.budget.setting.expensesDocument.drawer.description'),
    component: 'InputTextArea',
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isView,
        maxlength: 1000,
      };
    },
    colProps: { span: 24 },
  },
  {
    field: 'status',
    label: t('page.budget.setting.expensesDocument.drawer.status'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    colProps: { span: 12 },
    componentProps: ({ formModel }) => {
      return {
        disabled: formModel.isView,
        options: [
          {
            label: t('common.active'),
            value: 1,
          },
          {
            label: t('common.inActive'),
            value: 0,
          },
        ],
      };
    },
  },
];
