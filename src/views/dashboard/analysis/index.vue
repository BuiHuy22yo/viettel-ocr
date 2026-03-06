<template>
  <div class="p-4">
    <div class="text-start mb-4">
      <div class="text-2xl font-bold">{{ $t('routes.menu.dashboard') }}</div>
      <div class="text-sm">Tổng quan hệ thống xử lý vận đơn OCR</div>
    </div>
<!--    <BasicForm @register="registerForm" />-->

    <Row :gutter="24">
      <Col :span="24">
        <GrowCard :loading="loading" class="enter-y" :data="listGrowCard" />
      </Col>
    </Row>

    <Row :gutter="[12, 12]" class="mt-4">
      <Col :xs="24" :sm="12" :lg="4">
        <ChartPieChannel class="w-full enter-y" :loading="loading" />
      </Col>
      <Col :xs="24" :sm="12" :lg="8">
        <ChartBartRequest
          v-if="serviceRequestByType.length > 0"
          class="enter-y"
          :loading="loading"
          :service-request-by-type="serviceRequestByType"
        />
      </Col>
      <Col :xs="24" :sm="12" :lg="12">
        <ChartBartPayment
          class="w-full enter-y"
          :loading="loading"
          :list-total-paid-by-period="listTotalPaidByPeriod"
        />
      </Col>
      <Col :xs="24" :sm="12" :lg="4">
        <ChartPieCountService class="w-full enter-y" :loading="loading" />
      </Col>
      <Col :xs="24" :sm="12" :lg="6">
        <ChartPieCountService class="w-full enter-y" :loading="loading" />
      </Col>
      <Col :xs="24" :sm="12" :lg="6">
        <ChartBartValueByServiceType class="w-full enter-y" :loading="loading" />
      </Col>
      <Col :xs="24" :sm="12" :lg="6">
        <ChartBartPaymentGate class="w-full enter-y" :loading="loading" />
      </Col>
      <Col :xs="24" :sm="12" :lg="6">
        <ChartBartPaymentByService class="w-full enter-y" :loading="loading" />
      </Col>
      <Col :xs="24" :sm="12" :lg="12">
        <ChartBartContractByStatus class="w-full enter-y" :loading="loading" />
      </Col>
      <Col :xs="24" :sm="12" :lg="12">
        <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5" />
      </Col>
    </Row>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import GrowCard from './components/GrowCard.vue';
  import GrowCardSecond from './components/GrowCardSecond.vue';
  import TargetActualSalesChart from './components/TargetActualSalesChart.vue';
  import SalesByChannelsChart from './components/SalesByChannelsChart.vue';
  import { Col, Row } from 'ant-design-vue';
  import ChartPieChannel from '@/views/dashboard/analysis/components/ChartPieChannel.vue';
  import ChartBartRequest from '@/views/dashboard/analysis/components/ChartBartRequest.vue';
  import ChartBartPayment from '@/views/dashboard/analysis/components/ChartBartPayment.vue';
  import ChartPieCountService from '@/views/dashboard/analysis/components/ChartPieCountService.vue';
  import ChartBartValueByServiceType from '@/views/dashboard/analysis/components/ChartBartValueByServiceType.vue';
  import ChartBartPaymentGate from '@/views/dashboard/analysis/components/ChartBartPaymentGate.vue';
  import ChartBartPaymentByService from '@/views/dashboard/analysis/components/ChartBartPaymentByService.vue';
  import ChartBartContractByStatus from '@/views/dashboard/analysis/components/ChartBartContractByStatus.vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, formSchema } from './data';
  import { BasicForm, useForm } from '@/components/Form';
  import {
    getDashBoardInfoChart,
    getServiceOrderByStatusChart,
    getServiceQualityByPeriodChart,
    getServiceRequestByTypeChart,
    getTotalPaidByPeriod,
  } from '@/api/dashboard';
  import { t } from '@/hooks/web/useI18n';

  const listGrowCard = ref([]);
  const serviceOrderByStatus = ref([]);
  const listTotalPaidByPeriod = ref([]);
  const serviceQualityByPeriod = ref([]);
  const serviceRequestByType = ref([]);

  const loading = ref(true);
  const [registerTable] = useTable({
    title: 'Contract',
    dataSource: [
      {
        code: '1',
        partner: 'FPT',
        signedDate: '01/02/2024',
        expireDate: '08/03/2024',
        status: 1,
      },
      {
        code: '2',
        partner: 'FPT',
        signedDate: '11/11/2024',
        expireDate: '08/12/2024',
        status: 2,
      },
      {
        code: '3',
        partner: 'FPT',
        signedDate: '01/02/2024',
        expireDate: '08/03/2024',
        status: 3,
      },
      {
        code: '4',
        partner: 'FPT',
        signedDate: '01/02/2024',
        expireDate: '08/03/2024',
        status: 4,
      },
    ],
    rowKey: 'id',
    columns,
    showIndexColumn: true,
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
  });
  const [registerForm] = useForm({
    labelWidth: 200,
    baseColProps: { span: 6 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  setTimeout(() => {
    loading.value = false;
  }, 1500);
  onMounted(async () => {
    try {
      const results = await Promise.all([
        getDashBoardInfoChart({}),
        getServiceOrderByStatusChart({}),
        getTotalPaidByPeriod({}),
        getServiceQualityByPeriodChart({}),
        getServiceRequestByTypeChart({}),
      ]);
      listGrowCard.value = results?.[0] || {};
      serviceOrderByStatus.value = results?.[1] || [];
      listTotalPaidByPeriod.value = results?.[2] || [];
      serviceQualityByPeriod.value = results?.[3] || [];
      serviceRequestByType.value = results?.[4] || [];
    } catch (error) {
      console.error(error);
    }
  });
</script>
