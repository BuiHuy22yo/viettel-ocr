<template>
  <PageWrapper :contentStyle="{ margin: 0 }">
    <div class="page">
    <div class="page-header">
      <div>
        <div class="page-title">{{ t('ocr.apiKeys.title') }}</div>
        <div class="page-subtitle">{{ t('ocr.apiKeys.subtitle') }}</div>
      </div>
      <Button type="primary" @click="showCreate = true">
        <Icon icon="ion:add-outline" :size="16" class="btn-icon" />
        {{ t('ocr.apiKeys.create') }}
      </Button>
    </div>

    <Row :gutter="[12, 12]" class="section-row">
      <Col v-for="stat in stats" :key="stat.label" :xs="24" :sm="12" :lg="8">
        <Card class="section-card">
          <div class="kpi-card">
            <div>
              <div class="kpi-value">{{ stat.value }}</div>
              <div class="kpi-label">{{ stat.label }}</div>
            </div>
            <Icon :icon="stat.icon" :size="20" />
          </div>
        </Card>
      </Col>
    </Row>

    <Card class="section-card">
      <div class="section-title">{{ t('ocr.apiKeys.listTitle') }}</div>
      <BasicTable
        :columns="columns"
        :dataSource="keys"
        rowKey="id"
        :pagination="false"
        :useSearchForm="false"
        :showTableSetting="false"
        :showIndexColumn="false"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'key'">
            <div class="key-cell">
              <code>{{ record.visible ? record.key : maskKey(record.key) }}</code>
              <Button type="text" size="small" @click="record.visible = !record.visible">
                <Icon
                  :icon="record.visible ? 'ion:eye-off-outline' : 'ion:eye-outline'"
                  :size="14"
                />
              </Button>
              <Button type="text" size="small" @click="copyKey(record.key)">
                <Icon icon="ion:copy-outline" :size="14" />
              </Button>
            </div>
          </template>
          <template v-else-if="column.key === 'status'">
            <Tag :color="record.status === 'active' ? 'green' : 'red'">
              {{
                record.status === 'active'
                  ? t('ocr.apiKeys.statusActive')
                  : t('ocr.apiKeys.statusRevoked')
              }}
            </Tag>
          </template>
          <template v-else-if="column.key === 'model'">
            <Tag>{{ modelLabel(record.model) }}</Tag>
          </template>
          <template v-else-if="column.key === 'rate'">{{
            t('ocr.apiKeys.rateUnit', { rate: record.rate })
          }}</template>
          <template v-else-if="column.key === 'lastUsed'">
            <div class="last-used">
              <Icon icon="ion:time-outline" :size="14" />
              <span>{{ record.lastUsed || t('ocr.apiKeys.lastUsedEmpty') }}</span>
            </div>
          </template>
          <template v-else-if="column.key === 'action'">
            <Button v-if="record.status === 'active'" type="text" danger @click="revokeKey(record)">
              {{ t('ocr.apiKeys.actionRevoke') }}
            </Button>
          </template>
        </template>
      </BasicTable>
    </Card>

    <Card class="section-card">
      <div class="section-title">{{ t('ocr.apiKeys.guideTitle') }}</div>
      <pre class="code-block">
curl -X POST https://api.viettelpost-ocr.vn/v1/ocr/extract \
  -H "Authorization: Bearer vtp_live_sk_YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "image_url": "https://example.com/waybill.jpg",
    "model": "auto"
  }'</pre
      >
      <div class="note">{{ t('ocr.common.noteMock') }}</div>
    </Card>

    <BasicModal v-model:open="showCreate" :title="t('ocr.apiKeys.modalTitle')" @ok="createKey">
      <div class="form-grid">
        <div>
          <div class="form-label">{{ t('ocr.apiKeys.formName') }}</div>
          <Input v-model:value="form.name" :placeholder="t('ocr.apiKeys.formNamePlaceholder')" />
        </div>
        <div>
          <div class="form-label">{{ t('ocr.apiKeys.formRate') }}</div>
          <Input v-model:value="form.rateLimit" type="number" />
        </div>
        <div>
          <div class="form-label">{{ t('ocr.apiKeys.formModel') }}</div>
          <Select v-model:value="form.model" :options="modelOptions" />
        </div>
      </div>
    </BasicModal>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref } from 'vue';
  import { Button, Card, Col, Input, Row, Select, Tag } from 'ant-design-vue';
  import { BasicTable } from '@/components/Table';
  import { BasicModal } from '@/components/Modal';
  import Icon from '@/components/Icon/Icon.vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { PageWrapper } from '@/components/Page';

  const showCreate = ref(false);

  const keys = ref([
    {
      id: 1,
      name: 'Production - Partner A',
      key: 'vtp_live_sk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
      model: 'auto',
      rate: 1000,
      calls: 12847,
      createdAt: '2026-02-15',
      lastUsed: '2026-03-03',
      status: 'active',
      visible: false,
    },
    {
      id: 2,
      name: 'Staging - Internal Test',
      key: 'vtp_test_sk_q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2',
      model: 'google/gemini-2.5-flash-lite',
      rate: 500,
      calls: 3421,
      createdAt: '2026-01-20',
      lastUsed: '2026-03-01',
      status: 'active',
      visible: false,
    },
    {
      id: 3,
      name: 'Legacy - Partner B',
      key: 'vtp_live_sk_g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8',
      model: 'google/gemini-2.5-flash',
      rate: 200,
      calls: 8902,
      createdAt: '2025-11-10',
      lastUsed: '2026-01-15',
      status: 'revoked',
      visible: false,
    },
  ]);

  const { t } = useI18n();

  const activeKeys = computed(() => keys.value.filter((k) => k.status === 'active').length);
  const totalCalls = computed(() => keys.value.reduce((sum, k) => sum + k.calls, 0));

  const stats = computed(() => [
    {
      label: t('ocr.apiKeys.statActive'),
      value: String(activeKeys.value),
      icon: 'ion:key-outline',
    },
    {
      label: t('ocr.apiKeys.statCalls'),
      value: totalCalls.value.toLocaleString(),
      icon: 'ion:bar-chart-outline',
    },
    {
      label: t('ocr.apiKeys.statSecurity'),
      value: t('ocr.apiKeys.statSecurityValue'),
      icon: 'ion:shield-checkmark-outline',
    },
  ]);

  const columns = computed(() => [
    { title: t('ocr.apiKeys.colName'), dataIndex: 'name', key: 'name' },
    { title: t('ocr.apiKeys.colKey'), dataIndex: 'key', key: 'key' },
    { title: t('ocr.apiKeys.colModel'), dataIndex: 'model', key: 'model' },
    { title: t('ocr.apiKeys.colRate'), dataIndex: 'rate', key: 'rate' },
    { title: t('ocr.apiKeys.colCalls'), dataIndex: 'calls', key: 'calls' },
    { title: t('ocr.apiKeys.colCreatedAt'), dataIndex: 'createdAt', key: 'createdAt' },
    { title: t('ocr.apiKeys.colLastUsed'), dataIndex: 'lastUsed', key: 'lastUsed' },
    { title: t('ocr.apiKeys.colStatus'), dataIndex: 'status', key: 'status' },
    { title: t('ocr.apiKeys.colAction'), key: 'action', width: 120 },
  ]);

  const modelLabels = computed<Record<string, string>>(() => ({
    auto: t('ocr.apiKeys.modelAuto'),
    'google/gemini-2.5-flash-lite': t('ocr.apiKeys.modelFlashLite'),
    'google/gemini-2.5-flash': t('ocr.apiKeys.modelFlash'),
    'google/gemini-3-flash-preview': t('ocr.apiKeys.modelFlash3'),
    paddleocr: t('ocr.apiKeys.modelPaddle'),
    'deepseek-ocr': t('ocr.apiKeys.modelDeepseek'),
    tesseract: t('ocr.apiKeys.modelTesseract'),
  }));

  const modelOptions = computed(() => [
    { label: t('ocr.apiKeys.modelAuto'), value: 'auto' },
    { label: t('ocr.apiKeys.modelFlashLite'), value: 'google/gemini-2.5-flash-lite' },
    { label: t('ocr.apiKeys.modelFlash'), value: 'google/gemini-2.5-flash' },
    { label: t('ocr.apiKeys.modelFlash3'), value: 'google/gemini-3-flash-preview' },
    { label: t('ocr.apiKeys.modelPaddle'), value: 'paddleocr' },
    { label: t('ocr.apiKeys.modelDeepseek'), value: 'deepseek-ocr' },
    { label: t('ocr.apiKeys.modelTesseract'), value: 'tesseract' },
  ]);

  const form = reactive({
    name: '',
    rateLimit: '500',
    model: 'auto',
  });

  function maskKey(key: string) {
    return `${key.slice(0, 12)}••••••••••••${key.slice(-4)}`;
  }

  function copyKey(key: string) {
    navigator.clipboard.writeText(key);
  }

  function modelLabel(model: string) {
    return modelLabels.value[model] || model;
  }

  function revokeKey(record: any) {
    record.status = 'revoked';
  }

  function createKey() {
    if (!form.name) return;
    keys.value.unshift({
      id: Date.now(),
      name: form.name,
      key: `vtp_live_sk_${Math.random().toString(36).slice(2, 34)}`,
      model: form.model,
      rate: Number(form.rateLimit),
      calls: 0,
      createdAt: new Date().toISOString().slice(0, 10),
      lastUsed: null,
      status: 'active',
      visible: true,
    });
    showCreate.value = false;
    form.name = '';
  }
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

  .key-cell {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .key-cell code {
    font-family: monospace;
    font-size: 11px;
    background: rgba(0, 0, 0, 0.04);
    padding: 2px 6px;
    border-radius: 6px;
  }

  .last-used {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #8b949e;
  }

  .code-block {
    background: rgba(0, 0, 0, 0.04);
    border-radius: 10px;
    padding: 12px;
    font-size: 12px;
    font-family: monospace;
  }

  .note {
    margin-top: 8px;
    font-size: 11px;
    color: #8b949e;
  }

  .form-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .form-label {
    font-size: 12px;
    margin-bottom: 4px;
    color: #8b949e;
  }

  .btn-icon {
    margin-right: 6px;
  }

  @media (max-width: 768px) {
    .page-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
