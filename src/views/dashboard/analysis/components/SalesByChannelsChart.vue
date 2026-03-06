<template>
  <Card :loading="loading" class="shadow-md">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { nextTick, onMounted, Ref, ref } from 'vue';
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
    serviceQualityByPeriod: {
      type: Array,
      default: () => [],
    },
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  //
  // watch(
  //   () => props.loading,
  //   () => {
  //     if (props.loading) {
  //       return;
  //     }
  //   },
  //   { immediate: true },
  // );
  onMounted(() => {
    nextTick(() => {
      setOptions({
        title: {
          text: 'Theo dõi chất lượng dịch vụ theo tháng',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: ['Đạt', 'Không đạt'],
          bottom: 0,
        },
        xAxis: {
          type: 'category',
          data: [
            'T01',
            'T02',
            'T03',
            'T04',
            'T05',
            'T06',
            'T07',
            'T08',
            'T09',
            'T10',
            'T11',
            'T12',
          ],
        },
        yAxis: {
          type: 'value',
          max: 2000,
        },
        series: [
          {
            name: 'Đạt',
            type: 'bar',
            data: props?.serviceQualityByPeriod?.map((item: any) => item.achieved),
            itemStyle: {
              color: '#005BAC', // Màu xanh cho 'Đạt'
            },
          },
          {
            name: 'Không đạt',
            type: 'bar',
            data: props?.serviceQualityByPeriod?.map((item: any) => item.notAchieved),
            itemStyle: {
              color: '#e74c3c', // Màu đỏ cho 'Không đạt'
            },
          },
        ],
      });
    });
  });
</script>
