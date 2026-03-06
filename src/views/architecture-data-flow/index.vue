<template>
  <PageWrapper :contentStyle="{ margin: 0 }">
    <div class="page">
    <div class="page-header">
      <div>
        <div class="page-title">{{ t('ocr.architecture.title') }}</div>
        <div class="page-subtitle">{{ t('ocr.architecture.subtitle') }}</div>
      </div>
    </div>

    <Card class="section-card">
      <div class="section-title">{{ t('ocr.architecture.dfLevel0') }}</div>
      <div class="flow-row">
        <div class="flow-box primary">{{ t('ocr.architecture.flowMobile') }}</div>
        <div class="flow-arrow">→</div>
        <div class="flow-box">{{ t('ocr.architecture.flowGateway') }}</div>
        <div class="flow-arrow">→</div>
        <div class="flow-box warning">{{ t('ocr.architecture.flowKafka') }}</div>
        <div class="flow-arrow">→</div>
        <div class="flow-box danger">{{ t('ocr.architecture.flowOcr') }}</div>
        <div class="flow-arrow">→</div>
        <div class="flow-box">{{ t('ocr.architecture.flowLlm') }}</div>
        <div class="flow-arrow">→</div>
        <div class="flow-box">{{ t('ocr.architecture.flowValidation') }}</div>
        <div class="flow-arrow">→</div>
        <div class="flow-box">{{ t('ocr.architecture.flowOrder') }}</div>
        <div class="flow-arrow">→</div>
        <div class="flow-box">{{ t('ocr.architecture.flowDb') }}</div>
      </div>
    </Card>

    <Card class="section-card">
      <div class="section-title">{{ t('ocr.architecture.dfLevel1') }}</div>
      <div class="flow-grid">
        <div v-for="step in flowSteps" :key="step.id" class="flow-step">
          <div class="step-index">{{ step.id }}</div>
          <div>
            <div class="step-title">{{ step.title }}</div>
            <div class="step-desc">{{ step.desc }}</div>
          </div>
          <Tag :color="step.type === 'async' ? 'orange' : 'blue'">{{ step.typeLabel }}</Tag>
        </div>
      </div>
    </Card>

    <Card class="section-card">
      <div class="section-title">{{ t('ocr.architecture.systemArchitecture') }}</div>
      <div class="layer-list">
        <div v-for="layer in layers" :key="layer.title" class="layer-item">
          <div class="layer-title">{{ layer.title }}</div>
          <div class="layer-grid">
            <div v-for="item in layer.items" :key="item.name" class="layer-card">
              <div class="layer-name">{{ item.name }}</div>
              <div class="layer-desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <Card class="section-card">
      <div class="section-title">{{ t('ocr.architecture.throughput') }}</div>
      <div class="scale-grid">
        <div v-for="metric in throughput" :key="metric.title" class="scale-card">
          <div class="scale-title">{{ metric.title }}</div>
          <div class="scale-value">{{ metric.value }}</div>
          <div class="scale-unit">{{ metric.unit }}</div>
        </div>
      </div>
      <div class="capacity-grid">
        <div v-for="cap in capacity" :key="cap.title" class="capacity-card">
          <div class="capacity-title">{{ cap.title }}</div>
          <div class="capacity-desc">{{ cap.desc }}</div>
          <div class="capacity-meta">{{ cap.meta }}</div>
        </div>
      </div>
    </Card>

    <Card class="section-card">
      <div class="section-title">{{ t('ocr.architecture.confidenceModel') }}</div>
      <div class="confidence-flow">
        <div class="flow-box danger">{{ t('ocr.architecture.flowOcr') }}</div>
        <div class="flow-arrow">→</div>
        <div class="flow-box warning">{{ t('ocr.architecture.flowLlm') }}</div>
        <div class="flow-arrow">→</div>
        <div class="flow-box">{{ t('ocr.architecture.flowValidation') }}</div>
        <div class="flow-arrow">→</div>
        <div class="flow-box">{{ t('ocr.architecture.confidenceScore') }}</div>
      </div>
      <div class="confidence-grid">
        <div class="confidence-card tone-success">
          <div class="confidence-value">>= 90%</div>
          <div class="confidence-label">{{ t('ocr.architecture.confidenceAuto') }}</div>
          <div class="confidence-meta">{{ t('ocr.architecture.confidenceAutoMeta') }}</div>
        </div>
        <div class="confidence-card tone-warning">
          <div class="confidence-value">75 - 90%</div>
          <div class="confidence-label">{{ t('ocr.architecture.confidenceSoft') }}</div>
          <div class="confidence-meta">{{ t('ocr.architecture.confidenceSoftMeta') }}</div>
        </div>
        <div class="confidence-card tone-error">
          <div class="confidence-value">&lt; 75%</div>
          <div class="confidence-label">{{ t('ocr.architecture.confidenceMandatory') }}</div>
          <div class="confidence-meta">{{ t('ocr.architecture.confidenceMandatoryMeta') }}</div>
        </div>
      </div>
    </Card>

    <Card class="section-card">
      <div class="section-title">{{ t('ocr.architecture.retraining') }}</div>
      <div class="retrain-flow">
        <div class="flow-box primary">{{ t('ocr.architecture.retrainHuman') }}</div>
        <div class="flow-arrow">→</div>
        <div class="flow-box">{{ t('ocr.architecture.retrainData') }}</div>
        <div class="flow-arrow">→</div>
        <div class="flow-box warning">{{ t('ocr.architecture.retrainDataset') }}</div>
        <div class="flow-arrow">→</div>
        <div class="flow-box">{{ t('ocr.architecture.retrainTrain') }}</div>
        <div class="flow-arrow">→</div>
        <div class="flow-box">{{ t('ocr.architecture.retrainTest') }}</div>
        <div class="flow-arrow">→</div>
        <div class="flow-box danger">{{ t('ocr.architecture.retrainDeploy') }}</div>
      </div>
      <div class="retrain-note">
        {{ t('ocr.architecture.retrainNote') }}
      </div>
    </Card>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Card, Col, Row, Tag } from 'ant-design-vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { PageWrapper } from '@/components/Page';

  const { t } = useI18n();

  const layerDesc = computed(() => ({
    web: t('ocr.architecture.layerWebDesc'),
    review: t('ocr.architecture.layerReviewDesc'),
    admin: t('ocr.architecture.layerAdminDesc'),
    gateway: t('ocr.architecture.layerGatewayDesc'),
    auth: t('ocr.architecture.layerAuthDesc'),
    socket: t('ocr.architecture.layerSocketDesc'),
    ocr: t('ocr.architecture.layerOcrDesc'),
    llm: t('ocr.architecture.layerLlmDesc'),
    validation: t('ocr.architecture.layerValidationDesc'),
    human: t('ocr.architecture.layerHumanDesc'),
    kafka: t('ocr.architecture.layerKafkaDesc'),
    dlq: t('ocr.architecture.layerDlqDesc'),
    postgres: t('ocr.architecture.layerPostgresDesc'),
    storage: t('ocr.architecture.layerStorageDesc'),
    analytics: t('ocr.architecture.layerAnalyticsDesc'),
    redis: t('ocr.architecture.layerRedisDesc'),
    prom: t('ocr.architecture.layerPromDesc'),
    elk: t('ocr.architecture.layerElkDesc'),
    alert: t('ocr.architecture.layerAlertDesc'),
  }));

  const flowSteps = computed(() => [
    {
      id: 1,
      title: t('ocr.architecture.stepUpload'),
      desc: t('ocr.architecture.stepUploadDesc'),
      type: 'sync',
      typeLabel: t('ocr.architecture.stepTypeSync'),
    },
    {
      id: 2,
      title: t('ocr.architecture.stepStorage'),
      desc: t('ocr.architecture.stepStorageDesc'),
      type: 'sync',
      typeLabel: t('ocr.architecture.stepTypeSync'),
    },
    {
      id: 3,
      title: t('ocr.architecture.stepKafka'),
      desc: t('ocr.architecture.stepKafkaDesc'),
      type: 'async',
      typeLabel: t('ocr.architecture.stepTypeAsync'),
    },
    {
      id: 4,
      title: t('ocr.architecture.stepOcr'),
      desc: t('ocr.architecture.stepOcrDesc'),
      type: 'async',
      typeLabel: t('ocr.architecture.stepTypeAsync'),
    },
    {
      id: 5,
      title: t('ocr.architecture.stepLlm'),
      desc: t('ocr.architecture.stepLlmDesc'),
      type: 'sync',
      typeLabel: t('ocr.architecture.stepTypeSync'),
    },
    {
      id: 6,
      title: t('ocr.architecture.stepValidation'),
      desc: t('ocr.architecture.stepValidationDesc'),
      type: 'sync',
      typeLabel: t('ocr.architecture.stepTypeSync'),
    },
    {
      id: 7,
      title: t('ocr.architecture.stepRouting'),
      desc: t('ocr.architecture.stepRoutingDesc'),
      type: 'sync',
      typeLabel: t('ocr.architecture.stepTypeSync'),
    },
    {
      id: 8,
      title: t('ocr.architecture.stepSave'),
      desc: t('ocr.architecture.stepSaveDesc'),
      type: 'sync',
      typeLabel: t('ocr.architecture.stepTypeSync'),
    },
  ]);

  const layers = computed(() => [
    {
      title: t('ocr.architecture.layerPresentation'),
      items: [
        { name: t('ocr.architecture.layerWeb'), desc: layerDesc.value.web },
        { name: t('ocr.architecture.layerReview'), desc: layerDesc.value.review },
        { name: t('ocr.architecture.layerAdmin'), desc: layerDesc.value.admin },
      ],
    },
    {
      title: t('ocr.architecture.layerApi'),
      items: [
        { name: t('ocr.architecture.layerGateway'), desc: layerDesc.value.gateway },
        { name: t('ocr.architecture.layerAuth'), desc: layerDesc.value.auth },
        { name: t('ocr.architecture.layerSocket'), desc: layerDesc.value.socket },
      ],
    },
    {
      title: t('ocr.architecture.layerProcessing'),
      items: [
        { name: t('ocr.architecture.layerOcr'), desc: layerDesc.value.ocr },
        { name: t('ocr.architecture.layerLlm'), desc: layerDesc.value.llm },
        { name: t('ocr.architecture.layerValidation'), desc: layerDesc.value.validation },
        { name: t('ocr.architecture.layerHuman'), desc: layerDesc.value.human },
      ],
    },
    {
      title: t('ocr.architecture.layerMessaging'),
      items: [
        { name: t('ocr.architecture.layerKafka'), desc: layerDesc.value.kafka },
        { name: t('ocr.architecture.layerDlq'), desc: layerDesc.value.dlq },
      ],
    },
    {
      title: t('ocr.architecture.layerData'),
      items: [
        { name: t('ocr.architecture.layerPostgres'), desc: layerDesc.value.postgres },
        { name: t('ocr.architecture.layerStorage'), desc: layerDesc.value.storage },
        { name: t('ocr.architecture.layerAnalytics'), desc: layerDesc.value.analytics },
        { name: t('ocr.architecture.layerRedis'), desc: layerDesc.value.redis },
      ],
    },
    {
      title: t('ocr.architecture.layerMonitoring'),
      items: [
        { name: t('ocr.architecture.layerProm'), desc: layerDesc.value.prom },
        { name: t('ocr.architecture.layerElk'), desc: layerDesc.value.elk },
        { name: t('ocr.architecture.layerAlert'), desc: layerDesc.value.alert },
      ],
    },
  ]);

  const throughput = computed(() => [
    {
      title: t('ocr.architecture.metricMonthly'),
      value: '10,000,000',
      unit: t('ocr.architecture.metricMonthlyUnit'),
    },
    {
      title: t('ocr.architecture.metricDaily'),
      value: '333,333',
      unit: t('ocr.architecture.metricDailyUnit'),
    },
    {
      title: t('ocr.architecture.metricPeak'),
      value: '~1,000,000',
      unit: t('ocr.architecture.metricPeakUnit'),
    },
    {
      title: t('ocr.architecture.metricOcr'),
      value: '~12',
      unit: t('ocr.architecture.metricOcrUnit'),
    },
  ]);

  const capacity = computed(() => [
    {
      title: t('ocr.architecture.capacityOcr'),
      desc: t('ocr.architecture.capacityOcrDesc'),
      meta: t('ocr.architecture.capacityOcrMeta'),
    },
    {
      title: t('ocr.architecture.capacityLlm'),
      desc: t('ocr.architecture.capacityLlmDesc'),
      meta: t('ocr.architecture.capacityLlmMeta'),
    },
    {
      title: t('ocr.architecture.capacitySla'),
      desc: t('ocr.architecture.capacitySlaDesc'),
      meta: t('ocr.architecture.capacitySlaMeta'),
    },
  ]);
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

  .section-card {
    border: 1px solid var(--border-color);
  }

  .section-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .flow-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    font-size: 12px;
  }

  .flow-box {
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid var(--border-color);
    background: rgba(0, 0, 0, 0.02);
  }

  .flow-box.primary {
    background: rgba(255, 0, 30, 0.08);
    color: var(--theme-color);
  }

  .flow-box.warning {
    background: rgba(250, 173, 20, 0.12);
    color: #faad14;
  }

  .flow-box.danger {
    background: rgba(255, 77, 79, 0.12);
    color: #ff4d4f;
  }

  .flow-arrow {
    color: #8b949e;
  }

  .flow-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 10px;
  }

  .flow-step {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid var(--border-color);
  }

  .step-index {
    width: 28px;
    height: 28px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 0, 30, 0.08);
    color: var(--theme-color);
    font-weight: 600;
  }

  .step-title {
    font-weight: 600;
    font-size: 12px;
  }

  .step-desc {
    font-size: 11px;
    color: #8b949e;
  }

  .layer-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .layer-item {
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 12px;
    background: rgba(0, 0, 0, 0.02);
  }

  .layer-title {
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .layer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 8px;
  }

  .layer-card {
    background: #fff;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 10px;
  }

  .layer-name {
    font-size: 12px;
    font-weight: 600;
  }

  .layer-desc {
    font-size: 11px;
    color: #8b949e;
  }

  .scale-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 8px;
  }

  .capacity-grid {
    margin-top: 12px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 8px;
  }

  .capacity-card {
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 10px;
  }

  .capacity-title {
    font-size: 12px;
    font-weight: 600;
  }

  .capacity-desc {
    font-size: 11px;
    color: #8b949e;
  }

  .capacity-meta {
    margin-top: 4px;
    font-size: 11px;
    color: #8b949e;
  }

  .confidence-flow {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    font-size: 12px;
    margin-bottom: 12px;
  }

  .confidence-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 8px;
  }

  .confidence-card {
    border: 2px solid transparent;
    border-radius: 12px;
    padding: 12px;
    text-align: center;
    background: rgba(0, 0, 0, 0.02);
  }

  .confidence-value {
    font-size: 18px;
    font-weight: 700;
  }

  .confidence-label {
    font-size: 12px;
    font-weight: 600;
    margin-top: 4px;
  }

  .confidence-meta {
    font-size: 11px;
    color: #8b949e;
    margin-top: 4px;
  }

  .confidence-card.tone-success {
    border-color: rgba(82, 196, 26, 0.35);
    background: rgba(82, 196, 26, 0.08);
  }

  .confidence-card.tone-warning {
    border-color: rgba(250, 173, 20, 0.35);
    background: rgba(250, 173, 20, 0.08);
  }

  .confidence-card.tone-error {
    border-color: rgba(255, 77, 79, 0.35);
    background: rgba(255, 77, 79, 0.08);
  }

  .retrain-flow {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    font-size: 12px;
  }

  .retrain-note {
    margin-top: 12px;
    padding: 8px 12px;
    border-radius: 999px;
    border: 1px solid var(--border-color);
    font-size: 11px;
    color: #8b949e;
    text-align: center;
  }

  .scale-card {
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 10px;
    text-align: center;
  }

  .scale-title {
    font-size: 11px;
    color: #8b949e;
  }

  .scale-value {
    font-size: 18px;
    font-weight: 600;
  }

  .scale-unit {
    font-size: 11px;
    color: #8b949e;
  }

  .routing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 8px;
  }

  .routing-card {
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 10px;
  }

  .routing-label {
    font-weight: 600;
    font-size: 12px;
  }

  .routing-desc {
    font-size: 11px;
    color: #8b949e;
  }

  .tone-success {
    border-color: rgba(82, 196, 26, 0.35);
  }

  .tone-warning {
    border-color: rgba(250, 173, 20, 0.35);
  }

  .tone-error {
    border-color: rgba(255, 77, 79, 0.35);
  }

  @media (max-width: 768px) {
    .page-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
