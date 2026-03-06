<template>
  <Card :loading="loading" class="shadow-md">
    <div ref="chartRef" :style="{ height, width }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref, watch, nextTick } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { Card } from 'ant-design-vue';

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
    serviceOrderByStatus: {
      type: Object,
      default: () => {},
    },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  onMounted(() => {
    nextTick(() => {
      setOptions({
        title: {
          text: 'Trạng thái kênh/tuyến',
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
          data: ['Đã hủy', 'Tạm dừng', 'Hoạt động', 'Đang triển khai'],
        },
        legend: {
          data: ['Đã hủy', 'Tạm dừng', 'Hoạt động', 'Đang triển khai'],
          bottom: 0,
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
            name: 'Trạng thái',
            type: 'bar',
            data: [
              props.serviceOrderByStatus?.totalCancel,
              props.serviceOrderByStatus?.totalInactive,
              props.serviceOrderByStatus?.totalDeploy,
              props.serviceOrderByStatus?.totalActive,
            ],
            itemStyle: {
              color: function (params) {
                var colorList = ['#7f8c8d', '#34495e', '#e74c3c', '#005BAC'];
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
