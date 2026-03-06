<template>
  <PageWrapper :contentStyle="{ margin: 0 }">
    <div class="page">
    <div class="page-header">
      <div>
        <div class="page-title">{{ t('ocr.analytics.title') }}</div>
        <div class="page-subtitle">{{ t('ocr.analytics.subtitle') }}</div>
      </div>
      <div class="header-actions">
        <Button
          size="small"
          :type="activeRange === '7d' ? 'primary' : 'default'"
          @click="setRange('7d')"
        >
          {{ t('ocr.analytics.range7d') }}
        </Button>
        <Button
          size="small"
          :type="activeRange === '30d' ? 'primary' : 'default'"
          @click="setRange('30d')"
        >
          {{ t('ocr.analytics.range30d') }}
        </Button>
        <DatePicker.RangePicker
          v-model:value="customRange"
          size="small"
          @change="setRange('custom')"
        />
      </div>
    </div>

    <Row :gutter="[12, 12]" class="section-row">
      <Col v-for="item in summaryCards" :key="item.label" :xs="24" :sm="12" :lg="6">
        <Card class="section-card">
          <div class="summary-card" :class="item.tone">
            <div>
              <div class="summary-value">{{ item.value }}</div>
              <div class="summary-label">{{ item.label }}</div>
            </div>
            <Icon :icon="item.icon" :size="22" />
          </div>
        </Card>
      </Col>
    </Row>

    <Row :gutter="[12, 12]" class="section-row">
      <Col :xs="24" :lg="12">
        <Card class="section-card">
          <div class="section-title">{{ t('ocr.analytics.chartAccuracy') }} ({{ rangeLabel }})</div>
          <div ref="accuracyChartRef" class="chart-box"></div>
        </Card>
      </Col>
      <Col :xs="24" :lg="12">
        <Card class="section-card">
          <div class="section-title">{{ t('ocr.analytics.chartVolume') }} ({{ rangeLabel }})</div>
          <div ref="volumeChartRef" class="chart-box"></div>
        </Card>
      </Col>
    </Row>

    <Row :gutter="[12, 12]" class="section-row">
      <Col :xs="24" :lg="12">
        <Card class="section-card">
          <div class="section-title">{{ t('ocr.analytics.chartConfidence') }}</div>
          <div ref="confidenceChartRef" class="chart-box"></div>
        </Card>
      </Col>
      <Col :xs="24" :lg="12">
        <Card class="section-card">
          <div class="section-title">{{ t('ocr.analytics.chartProcessing') }}</div>
          <div ref="processingChartRef" class="chart-box"></div>
        </Card>
      </Col>
    </Row>

    <Row :gutter="[12, 12]" class="section-row">
      <Col :xs="24" :lg="12">
        <Card class="section-card">
          <div class="section-title">{{ t('ocr.analytics.chartHourly') }}</div>
          <div ref="hourlyChartRef" class="chart-box"></div>
        </Card>
      </Col>
    </Row>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { computed, nextTick, onMounted, ref, watch } from 'vue';
  import type { Dayjs } from 'dayjs';
  import { Card, Col, DatePicker, Row, Button } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { useI18n } from '@/hooks/web/useI18n';
  import { PageWrapper } from '@/components/Page';

  type RangeKey = '7d' | '30d' | 'custom';

  const activeRange = ref<RangeKey>('7d');
  const customRange = ref<[Dayjs, Dayjs] | null>(null);

  const { t } = useI18n();

  const rangeLabel = computed(() => {
    if (activeRange.value === '30d') return t('ocr.analytics.range30d');
    if (activeRange.value === 'custom' && customRange.value) return t('ocr.analytics.rangeCustom');
    return t('ocr.analytics.range7d');
  });

  const summaryCards = computed(() => [
    {
      label: t('ocr.analytics.summaryTotal'),
      value: '12,845',
      icon: 'ion:layers-outline',
      tone: 'tone-primary',
    },
    {
      label: t('ocr.analytics.summaryCompleted'),
      value: '9,420',
      icon: 'ion:checkmark-circle-outline',
      tone: 'tone-success',
    },
    {
      label: t('ocr.analytics.summaryReview'),
      value: '920',
      icon: 'ion:alert-circle-outline',
      tone: 'tone-warning',
    },
    {
      label: t('ocr.analytics.summaryFailed'),
      value: '380',
      icon: 'ion:close-circle-outline',
      tone: 'tone-error',
    },
  ]);

  const trendData = ref([
    { date: '03/01', accuracy: 95.2, volume: 1200, processing: 1300 },
    { date: '03/02', accuracy: 96.1, volume: 1380, processing: 1250 },
    { date: '03/03', accuracy: 95.6, volume: 1490, processing: 1400 },
    { date: '03/04', accuracy: 96.4, volume: 1650, processing: 1180 },
    { date: '03/05', accuracy: 96.8, volume: 1720, processing: 1100 },
    { date: '03/06', accuracy: 95.9, volume: 1550, processing: 1320 },
    { date: '03/07', accuracy: 96.3, volume: 1810, processing: 1200 },
  ]);

  const confidenceData = computed(() => [
    { name: t('ocr.analytics.confidenceLt50'), value: 3, color: '#ff4d4f' },
    { name: t('ocr.analytics.confidence50to75'), value: 12, color: '#faad14' },
    { name: t('ocr.analytics.confidence75to90'), value: 24, color: '#1890ff' },
    { name: t('ocr.analytics.confidenceGte90'), value: 61, color: '#52c41a' },
  ]);

  const hourlyAccuracy = ref([
    { hour: '00:00', accuracy: 94.8 },
    { hour: '02:00', accuracy: 95.1 },
    { hour: '04:00', accuracy: 95.6 },
    { hour: '06:00', accuracy: 96.2 },
    { hour: '08:00', accuracy: 96.8 },
    { hour: '10:00', accuracy: 97.1 },
    { hour: '12:00', accuracy: 96.4 },
    { hour: '14:00', accuracy: 96.9 },
    { hour: '16:00', accuracy: 96.1 },
    { hour: '18:00', accuracy: 95.7 },
    { hour: '20:00', accuracy: 95.3 },
    { hour: '22:00', accuracy: 94.9 },
  ]);

  const accuracyChartRef = ref<HTMLDivElement | null>(null);
  const volumeChartRef = ref<HTMLDivElement | null>(null);
  const confidenceChartRef = ref<HTMLDivElement | null>(null);
  const processingChartRef = ref<HTMLDivElement | null>(null);
  const hourlyChartRef = ref<HTMLDivElement | null>(null);

  const accuracyChart = useECharts(accuracyChartRef as any);
  const volumeChart = useECharts(volumeChartRef as any);
  const confidenceChart = useECharts(confidenceChartRef as any);
  const processingChart = useECharts(processingChartRef as any);
  const hourlyChart = useECharts(hourlyChartRef as any);

  function setRange(range: RangeKey) {
    activeRange.value = range;
  }

  function buildAccuracyOptions() {
    return {
      grid: { left: 32, right: 20, top: 20, bottom: 30 },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: trendData.value.map((d) => d.date) },
      yAxis: { type: 'value', min: 90, max: 100 },
      series: [
        {
          type: 'line',
          smooth: true,
          data: trendData.value.map((d) => d.accuracy),
          lineStyle: { color: '#ff4d4f', width: 2 },
          itemStyle: { color: '#ff4d4f' },
          areaStyle: { color: 'rgba(255, 77, 79, 0.12)' },
        },
      ],
    };
  }

  function buildVolumeOptions() {
    return {
      grid: { left: 32, right: 20, top: 20, bottom: 30 },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: trendData.value.map((d) => d.date) },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          data: trendData.value.map((d) => d.volume),
          itemStyle: { color: '#1890ff' },
          barWidth: 18,
        },
      ],
    };
  }

  function buildConfidenceOptions() {
    return {
      tooltip: { trigger: 'item' },
      legend: { bottom: 0 },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          data: confidenceData.value.map((d) => ({
            value: d.value,
            name: d.name,
            itemStyle: { color: d.color },
          })),
          label: { fontSize: 11 },
        },
      ],
    };
  }

  function buildProcessingOptions() {
    return {
      grid: { left: 32, right: 20, top: 20, bottom: 30 },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: trendData.value.map((d) => d.date) },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          data: trendData.value.map((d) => d.processing),
          itemStyle: { color: '#13c2c2' },
          barWidth: 18,
        },
      ],
    };
  }

  function buildHourlyOptions() {
    return {
      grid: { left: 32, right: 20, top: 20, bottom: 30 },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: hourlyAccuracy.value.map((d) => d.hour) },
      yAxis: { type: 'value', min: 90, max: 100 },
      series: [
        {
          type: 'bar',
          data: hourlyAccuracy.value.map((d) => d.accuracy),
          itemStyle: { color: '#52c41a' },
          barWidth: 18,
        },
      ],
    };
  }

  const renderCharts = () => {
    accuracyChart.setOptions(buildAccuracyOptions());
    volumeChart.setOptions(buildVolumeOptions());
    confidenceChart.setOptions(buildConfidenceOptions());
    processingChart.setOptions(buildProcessingOptions());
    hourlyChart.setOptions(buildHourlyOptions());
  };

  onMounted(() => {
    nextTick(renderCharts);
  });

  watch([trendData, confidenceData, hourlyAccuracy], () => {
    renderCharts();
  });
</script>

<style scoped>
  .page {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  .page-title {
    font-size: 20px;
    font-weight: 600;
  }

  .page-subtitle {
    font-size: 12px;
    color: #8b949e;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .section-row {
    margin: 0;
  }

  .section-card {
    border: 1px solid var(--border-color);
  }

  .section-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .summary-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .summary-value {
    font-size: 20px;
    font-weight: 600;
  }

  .summary-label {
    font-size: 12px;
    color: #8b949e;
  }

  .tone-primary {
    color: var(--theme-color);
  }

  .tone-success {
    color: #52c41a;
  }

  .tone-warning {
    color: #faad14;
  }

  .tone-error {
    color: #ff4d4f;
  }

  .chart-box {
    height: 280px;
    width: 100%;
  }

  @media (max-width: 768px) {
    .page-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
