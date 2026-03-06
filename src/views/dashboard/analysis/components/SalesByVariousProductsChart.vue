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
          text: t('dashboard.salesByVariousProducts'),
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#005BAC',
            },
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ['Evaporation', 'Sales', 'Target'],
        },
        xAxis: [
          {
            type: 'category',
            data: [
              'Pro1',
              'Pro2',
              'Pro3',
              'Pro4',
              'Pro5',
              'Pro6',
              'Pro7',
              'Pro8',
              'Pro9',
              'Pro10',
              'Pro11',
              'Pro12',
            ],
            axisPointer: {
              type: 'shadow',
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Sales',
            // axisLabel: {
            //   formatter: '{value} ml',
            // },
          },
          {
            type: 'value',
            name: 'Target',
            // axisLabel: {
            //   formatter: '{value} °C',
            // },
          },
        ],
        series: [
          // {
          //   name: 'Evaporation',
          //   type: 'bar',
          //   tooltip: {
          //     valueFormatter: function (value) {
          //       return value + ' ml';
          //     },
          //   },
          //   data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
          // },
          {
            name: 'Sales',
            type: 'bar',
            // tooltip: {
            //   valueFormatter: function (value) {
            //     return value + ' ml';
            //   },
            // },
            itemStyle: {
              color: '#005BAC',
            },
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 201.2, 230.6, 255.6, 203.2],
          },
          {
            name: 'Target',
            type: 'line',
            yAxisIndex: 1,
            // tooltip: {
            //   valueFormatter: function (value) {
            //     return value + ' °C';
            //   },
            // },
            data: [2.0, 2.2, 3.3, 20, 31, 60.2, 100.2, 222.3, 192.3, 221.2, 234, 253],
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
