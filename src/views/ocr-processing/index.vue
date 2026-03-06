<template>
  <PageWrapper :contentStyle="{ margin: 0 }">
    <div class="page">
    <div class="page-header">
      <div>
        <div class="page-title">{{ t('ocr.ocrProcessing.title') }}</div>
        <div class="page-subtitle">{{ t('ocr.ocrProcessing.subtitle') }}</div>
      </div>
      <div class="header-meta">
        <span class="meta-label">{{ t('ocr.ocrProcessing.model') }}:</span>
        <span class="meta-value">{{ selectedModelLabel }}</span>
      </div>
    </div>

    <Card class="section-card">
      <div class="section-title">{{ t('ocr.ocrProcessing.legendTitle') }}</div>
      <div class="legend">
        <div v-for="item in routingLegend" :key="item.key" class="legend-item">
          <span class="legend-dot" :class="item.dotClass"></span>
          <span class="legend-label">{{ item.label }}</span>
          <span class="legend-desc">{{ item.desc }}</span>
        </div>
      </div>
    </Card>

    <Card class="section-card">
      <div class="model-row">
        <div class="model-label">
          <Tooltip :title="t('ocr.ocrProcessing.model')">
            <Icon icon="ion:scan-outline" :size="18" class="model-icon" />
          </Tooltip>
          {{ t('ocr.ocrProcessing.model') }}
        </div>
        <Select v-model:value="selectedModel" class="model-select" :options="modelOptions" />
      </div>
    </Card>

    <Card class="section-card upload-card">
      <Upload.Dragger :before-upload="() => false" :multiple="true" :show-upload-list="false">
        <div class="upload-inner">
          <Tooltip :title="t('ocr.ocrProcessing.uploadTitle')">
            <div class="upload-icon">
              <Icon icon="ion:cloud-upload-outline" :size="32" />
            </div>
          </Tooltip>
          <div class="upload-title">{{ t('ocr.ocrProcessing.uploadTitle') }}</div>
          <div class="upload-subtitle">{{ t('ocr.ocrProcessing.uploadSubtitle') }}</div>
          <Button type="default" size="small">{{ t('ocr.ocrProcessing.selectFile') }}</Button>
        </div>
      </Upload.Dragger>
    </Card>

    <div class="stat-grid">
      <Card v-for="item in statCards" :key="item.title" class="stat-card">
        <div class="stat-title">{{ item.title }}</div>
        <div class="stat-value" :class="item.tone">{{ item.value }}</div>
        <div class="stat-subtitle">{{ item.subtitle }}</div>
      </Card>
    </div>

    <Card class="section-card">
      <div class="section-title">{{ t('ocr.ocrProcessing.recentResults') }}</div>
      <BasicTable @register="registerTable" />
    </Card>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { computed, h, ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { Card, Upload, Select, Button, Tag, Tooltip } from 'ant-design-vue';
  import { BasicTable, useTable } from '@/components/Table';
  import Icon from '@/components/Icon/Icon.vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { PageWrapper } from '@/components/Page';

  const router = useRouter();

  const { t } = useI18n();

  const routingLegend = computed(() => [
    {
      key: 'auto_approved',
      label: t('ocr.ocrProcessing.legendAuto'),
      desc: t('ocr.ocrProcessing.legendAutoDesc'),
      dotClass: 'dot-success',
    },
    {
      key: 'soft_review',
      label: t('ocr.ocrProcessing.legendSoft'),
      desc: t('ocr.ocrProcessing.legendSoftDesc'),
      dotClass: 'dot-warning',
    },
    {
      key: 'mandatory_review',
      label: t('ocr.ocrProcessing.legendMandatory'),
      desc: t('ocr.ocrProcessing.legendMandatoryDesc'),
      dotClass: 'dot-error',
    },
  ]);

  const modelOptions = computed(() => [
    { label: t('ocr.ocrProcessing.modelAuto'), value: 'auto' },
    { label: t('ocr.ocrProcessing.modelFlashLite'), value: 'flash-lite' },
    { label: t('ocr.ocrProcessing.modelFlash'), value: 'flash' },
    { label: t('ocr.ocrProcessing.modelFlash3'), value: 'flash-3' },
  ]);

  const selectedModel = ref('auto');
  const selectedModelLabel = computed(() => {
    return (
      modelOptions.value.find((item) => item.value === selectedModel.value)?.label ||
      t('ocr.ocrProcessing.modelAuto')
    );
  });

  const statCards = computed(() => [
    {
      title: t('ocr.ocrProcessing.statsProcessed'),
      value: '1,284',
      subtitle: t('ocr.ocrProcessing.statsProcessedSub'),
      tone: 'tone-success',
    },
    {
      title: t('ocr.ocrProcessing.statsReview'),
      value: '68',
      subtitle: t('ocr.ocrProcessing.statsReviewSub'),
      tone: 'tone-warning',
    },
    {
      title: t('ocr.ocrProcessing.statsRunning'),
      value: '12',
      subtitle: t('ocr.ocrProcessing.statsRunningSub'),
      tone: 'tone-primary',
    },
    {
      title: t('ocr.ocrProcessing.statsFailed'),
      value: '9',
      subtitle: t('ocr.ocrProcessing.statsFailedSub'),
      tone: 'tone-error',
    },
  ]);

  const columns = computed(() => [
    { title: t('ocr.ocrProcessing.columnFile'), dataIndex: 'file', width: 220 },
    {
      title: t('ocr.ocrProcessing.columnStatus'),
      dataIndex: 'status',
      customRender: ({ record }) => {
        const map = {
          completed: { color: 'green', text: t('ocr.ocrProcessing.statusCompleted') },
          processing: { color: 'blue', text: t('ocr.ocrProcessing.statusProcessing') },
          review: { color: 'orange', text: t('ocr.ocrProcessing.statusReview') },
          failed: { color: 'red', text: t('ocr.ocrProcessing.statusFailed') },
        };
        const item = map[record.status] || {
          color: 'default',
          text: t('ocr.ocrProcessing.statusQueue'),
        };
        return h(Tag, { color: item.color }, () => item.text);
      },
    },
    { title: t('ocr.ocrProcessing.columnConfidence'), dataIndex: 'confidence', width: 120 },
    { title: t('ocr.ocrProcessing.columnTime'), dataIndex: 'time', width: 120 },
    { title: t('ocr.ocrProcessing.columnRouting'), dataIndex: 'routing', width: 160 },
    {
      title: t('ocr.ocrProcessing.columnAction'),
      dataIndex: 'action',
      width: 140,
      customRender: ({ record }) => {
        return h(
          Button,
          {
            type: 'link',
            size: 'small',
            onClick: () => router.push(`/order-management/${record.orderId}`),
          },
          () => t('ocr.common.viewDetail'),
        );
      },
    },
  ]);

  const [registerTable, { setColumns }] = useTable({
    dataSource: [
      {
        id: 1,
        orderId: 'ORD-9834-AX',
        file: 'waybill_9834.jpg',
        status: 'completed',
        confidence: '96%',
        time: '2.6s',
        routing: t('ocr.ocrProcessing.routingAuto'),
      },
      {
        id: 2,
        orderId: 'ORD-1042-BQ',
        file: 'waybill_1042.png',
        status: 'review',
        confidence: '82%',
        time: '3.8s',
        routing: t('ocr.ocrProcessing.routingSoft'),
      },
      {
        id: 3,
        orderId: 'ORD-5512-CP',
        file: 'waybill_5512.pdf',
        status: 'processing',
        confidence: '—',
        time: '—',
        routing: t('ocr.ocrProcessing.routingProcessing'),
      },
      {
        id: 4,
        orderId: 'ORD-3021-DF',
        file: 'waybill_3021.jpg',
        status: 'failed',
        confidence: '61%',
        time: '5.1s',
        routing: t('ocr.ocrProcessing.routingMandatory'),
      },
    ],
    rowKey: 'id',
    columns: columns.value,
    showIndexColumn: false,
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    pagination: false,
  });

  watch(columns, (next) => {
    setColumns(next);
  });
</script>

<style scoped>
  .page {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: var(--text-color);
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

  .meta-value {
    font-weight: 600;
    color: var(--theme-color);
  }

  .section-card {
    border: 1px solid var(--border-color);
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    font-size: 12px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .legend-label {
    font-weight: 600;
  }

  .legend-desc {
    color: #8b949e;
  }

  .dot-success {
    background: #52c41a;
  }

  .dot-warning {
    background: #faad14;
  }

  .dot-error {
    background: #ff4d4f;
  }

  .model-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .model-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
  }

  .model-icon {
    color: var(--theme-color);
  }

  .model-select {
    min-width: 240px;
  }

  .upload-card :deep(.ant-upload) {
    padding: 0;
  }

  .upload-inner {
    padding: 32px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .upload-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.04);
  }

  .upload-title {
    font-weight: 600;
  }

  .upload-subtitle {
    font-size: 12px;
    color: #8b949e;
  }

  .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
  }

  .stat-card {
    border: 1px solid var(--border-color);
  }

  .stat-title {
    font-size: 12px;
    color: #8b949e;
  }

  .stat-value {
    font-size: 20px;
    font-weight: 600;
  }

  .stat-subtitle {
    font-size: 12px;
    color: #8b949e;
  }

  .tone-success {
    color: #52c41a;
  }

  .tone-warning {
    color: #faad14;
  }

  .tone-primary {
    color: var(--theme-color);
  }

  .tone-error {
    color: #ff4d4f;
  }

  .section-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  @media (max-width: 768px) {
    .page-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .model-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .model-select {
      width: 100%;
    }
  }
</style>
