import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
export const PARTNER_CONSTANT = {
  PARTNER_GROUP: [
    {
      id: 1,
      name: t('partner.logistic'),
    },
    {
      id: 2,
      name: t('partner.supplier'),
    },
  ],
};
