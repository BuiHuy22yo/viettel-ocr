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
          text: t('dashboard.serviceQuantity'),
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'horizontal',
          left: 'center',
          bottom: 0,
          data: ['Kênh dung lượng', 'Kênh Internet', 'Kênh cáp quang'],
        },
        series: [
          {
            name: 'Số lượng',
            type: 'pie',
            radius: ['50%', '70%'], // Điều chỉnh cho hình dạng vòng tròn
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 30, name: 'Kênh dung lượng', itemStyle: { color: '#e74c3c' } }, // Màu đỏ cho 'Kênh dung lượng'
              { value: 40, name: 'Kênh Internet', itemStyle: { color: '#f39c12' } }, // Màu cam cho 'Kênh Internet'
              { value: 70, name: 'Kênh cáp quang', itemStyle: { color: '#005BAC' } }, // Màu xanh cho 'Kênh cáp quang'
            ],
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
