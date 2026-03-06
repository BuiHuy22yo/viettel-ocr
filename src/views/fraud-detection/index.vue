<template>
  <PageWrapper :contentStyle="{ margin: 0 }">
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-title">{{ t('ocr.fraud.title') }}</div>
          <div class="page-subtitle">{{ t('ocr.fraud.subtitle') }}</div>
        </div>
        <div class="header-meta">
          <span class="meta-label">{{ t('ocr.fraud.pending') }}:</span>
          <span class="meta-value tone-error">{{ pendingCount }}</span>
        </div>
      </div>

      <Row :gutter="[12, 12]" class="section-row">
        <Col v-for="item in kpis" :key="item.label" :xs="24" :sm="12" :lg="6">
          <Card class="section-card">
            <div class="kpi-card">
              <div>
                <div class="kpi-value">{{ item.value }}</div>
                <div class="kpi-label">{{ item.label }}</div>
              </div>
              <div class="kpi-icon" :class="item.tone">
                <Icon :icon="item.icon" :size="20" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row :gutter="[12, 12]" class="section-row">
        <Col :xs="24" :lg="12">
          <Card class="section-card">
            <div class="section-title">{{ t('ocr.fraud.trendTitle') }}</div>
            <div ref="trendChartRef" class="chart-box"></div>
          </Card>
        </Col>
        <Col :xs="24" :lg="12">
          <Card class="section-card">
            <div class="section-title">{{ t('ocr.fraud.regionTitle') }}</div>
            <div ref="regionChartRef" class="chart-box"></div>
          </Card>
        </Col>
      </Row>

      <Card class="section-card">
        <div class="section-title">{{ t('ocr.fraud.alertsTitle') }}</div>
        <div class="alert-list">
          <div v-for="alert in alerts" :key="alert.id" class="alert-item">
            <div class="alert-left">
              <div class="alert-icon" :class="alert.tone">
                <Icon :icon="alert.icon" :size="18" />
              </div>
              <div>
                <div class="alert-title">{{ alert.orderId }}</div>
                <div class="alert-desc">{{ alert.desc }}</div>
              </div>
            </div>
            <Tag :color="alert.risk >= 80 ? 'red' : 'orange'">{{ alert.risk }}%</Tag>
          </div>
        </div>
      </Card>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { computed, nextTick, onMounted, ref, watch } from 'vue';
  import { Card, Col, Row, Tag } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { useI18n } from '@/hooks/web/useI18n';
  import { PageWrapper } from '@/components/Page';

  const { t } = useI18n();

  const pendingCount = 12;

  const kpis = computed(() => [
    {
      label: t('ocr.fraud.kpiPending'),
      value: pendingCount,
      icon: 'ion:alert-circle-outline',
      tone: 'tone-error',
    },
    { label: t('ocr.fraud.kpiCod'), value: 22, icon: 'ion:cash-outline', tone: 'tone-warning' },
    { label: t('ocr.fraud.kpiPhone'), value: 14, icon: 'ion:call-outline', tone: 'tone-primary' },
    {
      label: t('ocr.fraud.kpiRisk'),
      value: '72%',
      icon: 'ion:analytics-outline',
      tone: 'tone-success',
    },
  ]);

  const alerts = computed(() => [
    {
      id: 1,
      orderId: 'ORD-3F8C1A',
      desc: t('ocr.fraud.typeCod'),
      risk: 88,
      icon: 'ion:warning-outline',
      tone: 'tone-error',
    },
    {
      id: 2,
      orderId: 'ORD-7A2D9B',
      desc: t('ocr.fraud.typePhone'),
      risk: 76,
      icon: 'ion:call-outline',
      tone: 'tone-warning',
    },
    {
      id: 3,
      orderId: 'ORD-0C9E21',
      desc: t('ocr.fraud.typeAddress'),
      risk: 82,
      icon: 'ion:location-outline',
      tone: 'tone-error',
    },
  ]);

  const trendData = [
    { date: '03/01', cod: 4, phone: 2, address: 1, total: 7 },
    { date: '03/02', cod: 3, phone: 4, address: 2, total: 9 },
    { date: '03/03', cod: 6, phone: 2, address: 3, total: 11 },
    { date: '03/04', cod: 5, phone: 3, address: 2, total: 10 },
    { date: '03/05', cod: 4, phone: 2, address: 1, total: 7 },
    { date: '03/06', cod: 7, phone: 4, address: 2, total: 13 },
    { date: '03/07', cod: 6, phone: 5, address: 3, total: 14 },
  ];

  const regionData = computed(() => [
    { region: t('ocr.fraud.regionHcm'), cod: 18, phone: 12, address: 8 },
    { region: t('ocr.fraud.regionHanoi'), cod: 16, phone: 10, address: 9 },
    { region: t('ocr.fraud.regionDanang'), cod: 8, phone: 6, address: 5 },
    { region: t('ocr.fraud.regionBinhDuong'), cod: 6, phone: 4, address: 3 },
  ]);

  const trendChartRef = ref<HTMLDivElement | null>(null);
  const regionChartRef = ref<HTMLDivElement | null>(null);
  const trendChart = useECharts(trendChartRef as any);
  const regionChart = useECharts(regionChartRef as any);

  function buildTrendOptions() {
    return {
      grid: { left: 32, right: 20, top: 20, bottom: 30 },
      tooltip: { trigger: 'axis' },
      legend: { top: 0 },
      xAxis: { type: 'category', data: trendData.map((d) => d.date) },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'line',
          data: trendData.map((d) => d.cod),
          smooth: true,
          name: t('ocr.fraud.seriesCod'),
          itemStyle: { color: '#ff4d4f' },
        },
        {
          type: 'line',
          data: trendData.map((d) => d.phone),
          smooth: true,
          name: t('ocr.fraud.seriesPhone'),
          itemStyle: { color: '#faad14' },
        },
        {
          type: 'line',
          data: trendData.map((d) => d.address),
          smooth: true,
          name: t('ocr.fraud.seriesAddress'),
          itemStyle: { color: '#1890ff' },
        },
        {
          type: 'line',
          data: trendData.map((d) => d.total),
          smooth: true,
          name: t('ocr.fraud.seriesTotal'),
          itemStyle: { color: '#13c2c2' },
        },
      ],
    };
  }

  function buildRegionOptions() {
    return {
      grid: { left: 50, right: 20, top: 20, bottom: 30 },
      tooltip: { trigger: 'axis' },
      legend: { top: 0 },
      yAxis: { type: 'category', data: regionData.value.map((d) => d.region) },
      xAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          stack: 'total',
          data: regionData.value.map((d) => d.cod),
          name: t('ocr.fraud.seriesCod'),
          itemStyle: { color: '#ff4d4f' },
        },
        {
          type: 'bar',
          stack: 'total',
          data: regionData.value.map((d) => d.phone),
          name: t('ocr.fraud.seriesPhone'),
          itemStyle: { color: '#faad14' },
        },
        {
          type: 'bar',
          stack: 'total',
          data: regionData.value.map((d) => d.address),
          name: t('ocr.fraud.seriesAddress'),
          itemStyle: { color: '#1890ff' },
        },
      ],
    };
  }

  const renderCharts = () => {
    trendChart.setOptions(buildTrendOptions());
    regionChart.setOptions(buildRegionOptions());
  };

  onMounted(() => {
    nextTick(() => {
      renderCharts();
    });
  });

  watch([regionData], () => {
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

  .header-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
  }

  .meta-label {
    color: #8b949e;
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

  .kpi-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .kpi-value {
    font-size: 20px;
    font-weight: 600;
  }

  .kpi-label {
    font-size: 12px;
    color: #8b949e;
  }

  .kpi-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.03);
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

  .alert-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .alert-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.02);
  }

  .alert-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .alert-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.03);
  }

  .alert-title {
    font-family: monospace;
    font-weight: 600;
  }

  .alert-desc {
    font-size: 12px;
    color: #8b949e;
  }

  @media (max-width: 768px) {
    .page-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
