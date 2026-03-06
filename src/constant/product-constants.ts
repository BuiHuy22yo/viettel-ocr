import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
export const PRODUCT_CONSTANT = {
  TAX_APPLIED: [
    { label: t('contractBuy.productVariant.zeroPercent'), value: 0 },
    { label: t('contractBuy.productVariant.fivePercent'), value: 5 },
    { label: t('contractBuy.productVariant.eightPercent'), value: 8 },
    { label: t('contractBuy.productVariant.tenPercent'), value: 10 },
    { label: t('contractBuy.productVariant.noTaxApplied'), value: -1 },
  ],
};
