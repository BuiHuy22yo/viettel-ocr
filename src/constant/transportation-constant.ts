import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();
export const TRANSPORTATION_CONSTANT = {
  TRANSPORTATION_INDEX_PATH: '/logistic/index',
  TRANSPORTATION_TEMP_PATH: '/temp',
  TRANSPORTATION_STATE: [
    {
      id: 0,
      label: t('transportation.common.transportationStatus.cancel'),
      value: 0,
      color: 'red',
    },
    {
      id: 1,
      label: t('transportation.common.transportationStatus.pending'),
      value: 1,
      color: 'orange',
    },
    {
      id: 2,
      label: t('transportation.common.transportationStatus.waitingDriver'),
      value: 2,
      color: 'yellow',
    },
    {
      id: 3,
      label: t('transportation.common.transportationStatus.accepted'),
      value: 3,
      color: 'lightgreen',
    },
    {
      id: 4,
      label: t('transportation.common.transportationStatus.onTheWay'),
      value: 4,
      color: 'blue',
    },
    {
      id: 5,
      label: t('transportation.common.transportationStatus.completed'),
      value: 5,
      color: 'green',
    },
  ],
  TRANSPORTATION_ACTION: {
    VIEW_LOCATION: 'VIEW_LOCATION',
  },
  LOCATION_TAB_CONFIG: {
    TIME_INTERVAL: 30, //second
    MY_TEL_LOCATION: {
      LATITUDE: 16.7937205,
      LONGITUDE: 96.1345392,
    },
    URL_TEMPLATE: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
};
