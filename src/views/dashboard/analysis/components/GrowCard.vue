<template>
  <Row :gutter="[12, 12]" class="mt-1">
    <template v-for="item in listData" :key="item.title">
      <Col :xs="24" :sm="8" :lg="4">
        <Card
          size="small"
          :loading="loading"
          class="shadow"
          :style="{ background: item.backgroundColor, color: item.color }"
        >
          <div class="p-2 flex justify-start font-bold">
            <span>{{ item.title }}</span>
          </div>

          <div class="py-4 px-4 flex justify-between items-center">
            <CountTo :suffix="item.suffix" :startVal="1" :endVal="item.value" class="text-2xl" />
            <Icon :icon="item.icon" :size="60" v-show="item.icon" />
          </div>
        </Card>
      </Col>
    </template>
  </Row>
</template>
<script lang="ts" setup>
  import { CountTo } from '@/components/CountTo';
  import Icon from '@/components/Icon/Icon.vue';
  import { Card, Col, Row } from 'ant-design-vue';
  import { watch } from 'vue';
  import { useI18n } from '@/hooks/web/useI18n';

  const { t } = useI18n();
  let listData = [
    {
      title: t('dashboard.partner'),
      icon: 'partner|svg',
      value: 0,
      total: 120000,
      type: 'totalPartner',
      action: '月',
      isHover: false,
      suffix: '',
    },
    {
      title: t('dashboard.contract'),
      icon: 'contract|svg',
      value: 0,
      total: 500000,
      type: 'totalContract',
      action: '月',
      isHover: false,
      suffix: '',
    },
    {
      title: t('dashboard.channel'),
      icon: 'channel|svg',
      type: 'totalServiceOrder',
      value: 0,
      total: 120000,
      action: '周',
      isHover: false,
      suffix: '',
    },
    {
      title: t('dashboard.totalContract'),
      icon: 'totalContract|svg',
      type: 'totalValue',
      value: 0,
      total: 50000,

      action: '',
      isHover: false,
      suffix: '',
    },
    {
      title: t('dashboard.paymentValue'),
      icon: 'paymentValue|svg',
      type: 'totalValuePaid',
      value: 0,
      total: 50000,

      action: '',
      isHover: false,
      suffix: '',
    },
    {
      title: t('dashboard.debt'),
      // icon: 'debt|svg',
      value: 0,
      total: 50000,
      action: '',
      isHover: false,
      suffix: '',
      backgroundColor: 'var(--theme-color)',
      type: 'totalRemainAmount',
      color: 'white',
    },
  ];

  const props = defineProps({
    loading: {
      type: Boolean,
    },
    data: {
      type: Object,
      default: () => null,
    },
  });

  watch(
    () => props.data,
    (val) => {
      if (val && Object.keys(val).length !== 0) {
        listData.forEach((item) => {
          item.value = val[item.type] || 0;
        });
      }
    },
    {
      deep: true,
    },
  );
</script>
