<template>
  <Card :loading="loading" class="shadow-md">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { useI18n } from '@/hooks/web/useI18n';

  const { t } = useI18n();
  const props = defineProps({
    loading: Boolean,
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '300px',
    },
    listTotalPaidByPeriod: {
      type: Array,
      default: () => [],
    },
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  watch(
    () => props.listTotalPaidByPeriod,
    (val) => {
      if (!val) return;
      setOptions({
        title: {
          text: 'Thanh toán cho đối tác theo tháng',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: ['Hợp đồng', 'Thực tế'],
          bottom: 0,
        },
        xAxis: {
          type: 'category',
          data: val?.map((item: any) => item.period),
        },
        yAxis: {
          type: 'value',
          max: 2000,
        },
        series: [
          {
            name: 'Hợp đồng',
            type: 'bar',
            data: val?.map((item: any) => item.totalValue),
            itemStyle: {
              color: '#005BAC', // Màu xanh cho 'Hợp đồng'
            },
          },
          {
            name: 'Thực tế',
            type: 'bar',
            data: val?.map((item: any) => item.totalValuePaid),
            itemStyle: {
              color: '#e74c3c', // Màu đỏ cho 'Thực tế'
            },
          },
        ],
      });
    },
    { immediate: true, deep: true },
  );
</script>
