import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
export const BUDGET_CONSTANT = {
  EXPENSES_STATUS: [
    {
      value: 0,
      label: t('page.budget.expenses.status.create'),
      color: 'yellow',
    },
    {
      value: 1,
      label: t('page.budget.expenses.status.approve'),
      color: 'lightgreen',
    },
    {
      value: 2,
      label: t('page.budget.expenses.status.delete'),
      color: 'gray',
    },
    {
      value: 3,
      label: t('page.budget.expenses.status.reject'),
      color: 'red',
    },
  ],
};
