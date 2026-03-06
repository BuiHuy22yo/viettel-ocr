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
  const labelTop = {
    position: 'top',
  };
  const labelBottom = {
    position: 'bottom',
  };

  watch(
    () => props.loading,
    () => {
      if (props.loading) {
        return;
      }
      setOptions({
        title: {
          text: t('dashboard.salesGrowth'),
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          show: true,
          top: 'bottom',
        },
        grid: {
          top: 80,
          bottom: 30,
        },
        xAxis: {
          type: 'category',
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          data: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
        },
        yAxis: {
          type: 'value',
          position: 'top',
          splitLine: {
            lineStyle: {
              type: 'dashed',
            },
          },
        },
        series: [
          {
            name: 'Cost',
            type: 'bar',
            barWidth: '50%',
            stack: 'Total',
            label: {
              show: true,
              formatter: '{c}%',
            },
            data: [
              { value: -7, label: labelBottom, itemStyle: { color: '#9F9FF2' } },
              { value: -9, label: labelBottom, itemStyle: { color: '#9F9FF2' } },
              { value: 2, label: labelTop, itemStyle: { color: '#716CB2F2' } },
              { value: 44, label: labelTop, itemStyle: { color: '#716CB2F2' } },
              { value: -23, label: labelBottom, itemStyle: { color: '#9F9FF2' } },
              { value: 9, label: labelTop, itemStyle: { color: '#716CB2F2' } },
              { value: -17, label: labelBottom, itemStyle: { color: '#9F9FF2' } },
              { value: 47, label: labelTop, itemStyle: { color: '#716CB2F2' } },
              { value: -36, label: labelBottom, itemStyle: { color: '#9F9FF2' } },
              { value: 18, label: labelTop, itemStyle: { color: '#716CB2F2' } },
              { value: 58, label: labelTop, itemStyle: { color: '#716CB2F2' } },
              { value: 43, label: labelTop, itemStyle: { color: '#716CB2F2' } },
            ],
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
