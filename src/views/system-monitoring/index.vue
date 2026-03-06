<template>
  <PageWrapper :contentStyle="{ margin: 0 }">
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-title">{{ t('ocr.monitoring.title') }}</div>
          <div class="page-subtitle">{{ t('ocr.monitoring.subtitle') }}</div>
        </div>
        <div class="header-meta">
          <span class="meta-label">{{ t('ocr.common.status') }}:</span>
          <span class="meta-value tone-success">{{ t('ocr.monitoring.statusOnline') }}</span>
        </div>
      </div>

      <Row :gutter="[12, 12]" class="section-row">
        <Col v-for="stat in stats" :key="stat.label" :xs="24" :sm="12" :lg="6">
          <Card class="section-card">
            <div class="stat-card" :class="stat.tone">
              <div>
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
              <Icon :icon="stat.icon" :size="20" />
            </div>
          </Card>
        </Col>
      </Row>

      <Card class="section-card">
        <div class="section-title">{{ t('ocr.monitoring.nodesTitle') }}</div>
        <div class="node-grid">
          <div v-for="node in nodes" :key="node.id" class="node-card">
            <div class="node-header">
              <span class="node-id">{{ node.id }}</span>
              <Tag :color="node.cpu > 85 || node.mem > 85 ? 'orange' : 'green'">
                {{
                  node.cpu > 85 || node.mem > 85
                    ? t('ocr.monitoring.nodeWarning')
                    : t('ocr.monitoring.nodeHealthy')
                }}
              </Tag>
            </div>
            <div class="node-type">{{ node.type }}</div>
            <div class="metric">
              <span>{{ t('ocr.monitoring.metricCpu') }}</span>
              <div class="bar"><span :style="{ width: node.cpu + '%' }"></span></div>
              <span>{{ node.cpu }}%</span>
            </div>
            <div class="metric">
              <span>{{ t('ocr.monitoring.metricMem') }}</span>
              <div class="bar"><span :style="{ width: node.mem + '%' }"></span></div>
              <span>{{ node.mem }}%</span>
            </div>
            <div class="node-meta">{{ t('ocr.monitoring.nodeTasks') }}: {{ node.tasks }}</div>
          </div>
        </div>
      </Card>

      <Card class="section-card">
        <div class="section-title">{{ t('ocr.monitoring.logsTitle') }}</div>
        <div class="log-list">
          <div v-for="log in logs" :key="log.id" class="log-item">
            <span class="log-time">{{ log.time }}</span>
            <span class="log-level" :class="log.levelClass">{{ log.level }}</span>
            <span class="log-service">[{{ log.service }}]</span>
            <span class="log-message">{{ log.message }}</span>
          </div>
        </div>
      </Card>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Card, Col, Row, Tag } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { PageWrapper } from '@/components/Page';

  const { t } = useI18n();

  const stats = computed(() => [
    {
      label: t('ocr.monitoring.statActiveNodes'),
      value: '12',
      icon: 'ion:server-outline',
      tone: 'tone-primary',
    },
    {
      label: t('ocr.monitoring.statAvgCpu'),
      value: '62%',
      icon: 'ion:hardware-chip-outline',
      tone: 'tone-warning',
    },
    {
      label: t('ocr.monitoring.statKafkaLag'),
      value: '238',
      icon: 'ion:git-branch-outline',
      tone: 'tone-error',
    },
    {
      label: t('ocr.monitoring.statThroughput'),
      value: '420 req/s',
      icon: 'ion:flash-outline',
      tone: 'tone-success',
    },
  ]);

  const nodes = computed(() => [
    { id: 'ocr-01', type: t('ocr.architecture.layerOcr'), cpu: 68, mem: 71, tasks: 42 },
    { id: 'ocr-02', type: t('ocr.architecture.layerOcr'), cpu: 52, mem: 60, tasks: 39 },
    { id: 'llm-01', type: t('ocr.architecture.layerLlm'), cpu: 74, mem: 82, tasks: 18 },
    { id: 'api-01', type: t('ocr.architecture.layerGateway'), cpu: 38, mem: 44, tasks: 12 },
  ]);

  const logs = computed(() => [
    {
      id: 1,
      time: '09:12:04',
      level: t('ocr.monitoring.logInfo'),
      levelClass: 'log-info',
      service: 'gateway',
      message: t('ocr.monitoring.logThroughput'),
    },
    {
      id: 2,
      time: '09:10:33',
      level: t('ocr.monitoring.logWarn'),
      levelClass: 'log-warn',
      service: 'autoscaler',
      message: t('ocr.monitoring.logScale'),
    },
    {
      id: 3,
      time: '09:08:21',
      level: t('ocr.monitoring.logInfo'),
      levelClass: 'log-info',
      service: 'ocr-worker',
      message: t('ocr.monitoring.logBatch'),
    },
    {
      id: 4,
      time: '09:05:12',
      level: t('ocr.monitoring.logError'),
      levelClass: 'log-error',
      service: 'kafka',
      message: t('ocr.monitoring.logLag'),
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

  .stat-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .stat-value {
    font-size: 20px;
    font-weight: 600;
  }

  .stat-label {
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

  .node-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 12px;
  }

  .node-card {
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .node-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .node-id {
    font-family: monospace;
    font-weight: 600;
  }

  .node-type {
    font-size: 12px;
    color: #8b949e;
  }

  .metric {
    display: grid;
    grid-template-columns: 36px 1fr 40px;
    align-items: center;
    gap: 6px;
    font-size: 12px;
  }

  .bar {
    height: 6px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .bar span {
    display: block;
    height: 100%;
    background: var(--theme-color);
    border-radius: 999px;
  }

  .node-meta {
    font-size: 12px;
    color: #8b949e;
  }

  .log-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 12px;
    font-family: monospace;
  }

  .log-item {
    display: grid;
    grid-template-columns: 70px 50px 90px 1fr;
    gap: 8px;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.08);
    padding: 6px 0;
  }

  .log-time {
    color: #8b949e;
  }

  .log-service {
    color: var(--theme-color);
  }

  .log-info {
    color: #1890ff;
  }

  .log-warn {
    color: #faad14;
  }

  .log-error {
    color: #ff4d4f;
  }

  @media (max-width: 768px) {
    .page-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .log-item {
      grid-template-columns: 1fr;
    }
  }
</style>
