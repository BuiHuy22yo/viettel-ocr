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
          text: t('dashboard.qualityRatio'),
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'horizontal',
          left: 'center',
          bottom: 0,
          data: ['Đạt', 'Không đạt'],
        },
        series: [
          {
            name: 'Tỷ lệ',
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
              { value: 70, name: 'Đạt', itemStyle: { color: '#005BAC' } }, // Màu xanh cho 'Đạt'
              { value: 30, name: 'Không đạt', itemStyle: { color: '#e74c3c' } }, // Màu đỏ cho 'Không đạt'
            ],
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
