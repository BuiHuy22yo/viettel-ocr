<template>
  <Card :loading="loading" class="shadow-md">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '@/hooks/web/useECharts';

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
          text: 'Thống kê hợp đồng theo trạng thái',
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
          data: [
            'HĐ đã thanh toán',
            'HĐ chờ thanh toán',
            'HĐ đang đối soát cước',
            'HĐ đang đối soát CL',
            'HĐ chuẩn bị gia hạn',
          ],
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
            name: 'Thống kê hợp đồng theo trạng thái',
            type: 'bar',
            data: [16, 10, 12, 20, 14],
            itemStyle: {
              color: function (params) {
                var colorList = ['#7f8c8d', '#e74c3c', '#005BAC', '#0e2a45', '#5baeff'];
                return colorList[params.dataIndex];
              },
            },
            barWidth: 30,
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
