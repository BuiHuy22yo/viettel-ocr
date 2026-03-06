import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
export const KCS_CONSTANT = {
  KCS_OBJECT_TYPE_FILE: 'KCS_DOCUMENT',
  KCS_STATUS: [
    {
      id: 0,
      name: t('kcs.common.status.pendingApproval'),
      color: 'yellow',
      value: 0,
      label: t('kcs.common.status.pendingApproval'),
    },
    {
      id: 1,
      name: t('kcs.common.status.approved'),
      color: 'green',
      value: 1,
      label: t('kcs.common.status.approved'),
    },
    {
      id: 2,
      name: t('kcs.common.status.rejected'),
      color: 'red',
      value: 2,
      label: t('kcs.common.status.rejected'),
    },
  ],
  APPENDIX_KCS_STATUS: {
    READY_KCS: 1,
    PROCESSING_KCS: 2,
  },
};
