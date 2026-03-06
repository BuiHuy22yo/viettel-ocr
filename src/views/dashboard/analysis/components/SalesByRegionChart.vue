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
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  watch(
    () => props.loading,
    () => {
      if (props.loading) {
        return;
      }
      setOptions({
        title: {
          text: t('dashboard.salesByRegion'),
        },
        legend: {
          show: true,
          top: 'bottom',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '8%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'value',
          },
        ],
        yAxis: [
          {
            type: 'category',
            data: ['North', 'South', 'West', 'East'],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        series: [
          {
            name: 'Actual Target',
            type: 'bar',
            barWidth: '30%',
            data: [3, 2, 6, 8],
            itemStyle: {
              color: '#005BAC',
            },
          },
          {
            name: 'Target',
            type: 'bar',
            barWidth: '30%',
            data: [3, 2, 6, 8],
            itemStyle: {
              color: '#E6E6FA',
            },
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
