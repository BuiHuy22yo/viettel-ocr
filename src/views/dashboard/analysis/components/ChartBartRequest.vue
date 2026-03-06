<template>
  <Card :loading="loading" class="shadow-md">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { nextTick, onMounted, Ref, ref, watch } from 'vue';
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
    serviceRequestByType: {
      type: Array,
      default: () => [],
    },
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  onMounted(() => {
    nextTick(() => {
      setOptions({
        title: {
          text: 'Loại yêu cầu',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: 'category',
          data: ['Thay đổi vị trí', 'Nâng cấp', 'Hạ cấp'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          top: '10%',
          containLabel: true,
        },
        series: [
          {
            name: 'Loại yêu cầu',
            type: 'bar',
            data: [6, 8, 12],
            itemStyle: {
              color: function (params) {
                var colorList = ['#7f8c8d', '#e74c3c', '#005BAC'];
                return colorList[params.dataIndex];
              },
            },
            barWidth: 30,
          },
        ],
      });
    });
  });
</script>
