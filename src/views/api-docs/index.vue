<template>
  <PageWrapper :contentStyle="{ margin: 0 }">
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-title">{{ t('ocr.apiDocs.title') }}</div>
          <div class="page-subtitle">{{ t('ocr.apiDocs.subtitle') }}</div>
        </div>
      </div>

      <Card class="section-card">
        <div class="section-title">{{ t('ocr.apiDocs.overview') }}</div>
        <div class="overview-grid">
          <div>
            <div class="overview-row"
              ><span>{{ t('ocr.apiDocs.baseUrl') }}:</span>
              <code>https://api.viettelpost-ocr.vn</code></div
            >
            <div class="overview-row"
              ><span>{{ t('ocr.apiDocs.protocol') }}:</span> HTTPS</div
            >
            <div class="overview-row"
              ><span>{{ t('ocr.apiDocs.format') }}:</span> JSON</div
            >
            <div class="overview-row"
              ><span>{{ t('ocr.apiDocs.encoding') }}:</span> UTF-8</div
            >
          </div>
          <div>
            <div class="overview-row"
              ><span>{{ t('ocr.apiDocs.rate') }}:</span> {{ rateLimitText }}</div
            >
            <div class="overview-row"
              ><span>{{ t('ocr.apiDocs.maxImage') }}:</span> 10MB</div
            >
            <div class="overview-row"
              ><span>{{ t('ocr.apiDocs.supported') }}:</span>
              {{ t('ocr.apiDocs.supportedFormats') }}</div
            >
            <div class="overview-row"
              ><span>{{ t('ocr.apiDocs.version') }}:</span> v1</div
            >
          </div>
        </div>
      </Card>

      <Card class="section-card">
        <div class="section-title">{{ t('ocr.apiDocs.auth') }}</div>
        <pre class="code-block">Authorization: Bearer vtp_live_sk_YOUR_API_KEY</pre>
        <div class="note">{{ t('ocr.apiDocs.authNote') }}</div>
      </Card>

      <Card class="section-card">
        <div class="section-title">{{ t('ocr.apiDocs.endpoints') }}</div>
        <Tabs v-model:activeKey="activeTab">
          <Tabs.TabPane
            v-for="(ep, idx) in endpoints.value"
            :key="String(idx)"
            :tab="ep.method + ' ' + ep.path"
          >
            <div class="endpoint-title">{{ ep.summary }}</div>
            <div class="endpoint-desc">{{ ep.description }}</div>
            <div class="endpoint-meta">
              <Tag :color="methodColor(ep.method)">{{ ep.method }}</Tag>
              <code>{{ ep.path }}</code>
            </div>
            <div class="endpoint-section">
              <div class="section-subtitle">{{ t('ocr.apiDocs.headers') }}</div>
              <Table
                :columns="headerColumns.value"
                :data-source="ep.headers"
                row-key="name"
                :pagination="false"
              />
            </div>
            <div class="endpoint-section" v-if="ep.body.length">
              <div class="section-subtitle">{{ t('ocr.apiDocs.requestBody') }}</div>
              <Table
                :columns="bodyColumns.value"
                :data-source="ep.body"
                row-key="name"
                :pagination="false"
              />
            </div>
            <div class="endpoint-section">
              <div class="section-subtitle">{{ t('ocr.apiDocs.response') }}</div>
              <pre class="code-block">{{ ep.response }}</pre>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </Card>

      <Card class="section-card">
        <div class="section-title">{{ t('ocr.apiDocs.routing') }}</div>
        <Table
          :columns="routingColumns.value"
          :data-source="routing.value"
          row-key="value"
          :pagination="false"
        />
      </Card>

      <Card class="section-card">
        <div class="section-title">{{ t('ocr.apiDocs.errors') }}</div>
        <Table
          :columns="errorColumns.value"
          :data-source="errors.value"
          row-key="code"
          :pagination="false"
        />
      </Card>

      <div class="footer-note">{{ t('ocr.common.noteMock') }}</div>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { Card, Table, Tabs, Tag } from 'ant-design-vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { PageWrapper } from '@/components/Page';

  const activeTab = ref('0');

  const { t } = useI18n();

  const rateLimitText = computed(() => t('ocr.apiDocs.rateNote'));

  const endpoints = computed(() => [
    {
      method: 'POST',
      path: '/v1/ocr/extract',
      summary: t('ocr.apiDocs.summaryExtract'),
      description: t('ocr.apiDocs.descExtract'),
      headers: [
        { name: 'Authorization', type: 'string', required: true, desc: 'Bearer <API_KEY>' },
        { name: 'Content-Type', type: 'string', required: true, desc: 'application/json' },
      ],
      body: [
        { name: 'image_url', type: 'string', required: true, desc: t('ocr.apiDocs.descImageUrl') },
        {
          name: 'model',
          type: 'string',
          required: false,
          desc: t('ocr.apiDocs.descModel'),
        },
        {
          name: 'webhook_url',
          type: 'string',
          required: false,
          desc: t('ocr.apiDocs.descWebhook'),
        },
      ],
      response: `{
  "success": true,
  "request_id": "req_abc123def456",
  "status": "completed",
  "confidence": 95,
  "model_used": "google/gemini-2.5-flash-lite",
  "processing_time_ms": 1240,
  "extracted_fields": {
    "tracking_number": "VTP123456789",
    "sender_name": "Nguyen Van A",
    "sender_phone": "0901234567",
    "sender_address": "123 Le Loi, Q.1, TP.HCM",
    "receiver_name": "Tran Thi B",
    "receiver_phone": "0987654321",
    "receiver_address": "456 Tran Phu, Q.5, TP.HCM",
    "cod_amount": 350000,
    "weight": 1.5
  },
  "routing": "auto_approved"
}`,
    },
    {
      method: 'GET',
      path: '/v1/ocr/status/{request_id}',
      summary: t('ocr.apiDocs.summaryStatus'),
      description: t('ocr.apiDocs.descStatus'),
      headers: [
        { name: 'Authorization', type: 'string', required: true, desc: 'Bearer <API_KEY>' },
      ],
      body: [],
      response: `{
  "request_id": "req_abc123def456",
  "status": "completed",
  "created_at": "2026-03-03T10:30:00Z",
  "completed_at": "2026-03-03T10:30:01Z",
  "result": { "confidence": 95, "routing": "auto_approved" }
}`,
    },
    {
      method: 'GET',
      path: '/v1/models',
      summary: t('ocr.apiDocs.summaryModels'),
      description: t('ocr.apiDocs.descModels'),
      headers: [
        { name: 'Authorization', type: 'string', required: true, desc: 'Bearer <API_KEY>' },
      ],
      body: [],
      response: `{
  "models": [
    { "id": "auto", "name": "${t('ocr.apiKeys.modelAuto')}", "status": "available", "description": "${t('ocr.apiDocs.modelAutoDesc')}" },
    { "id": "google/gemini-2.5-flash-lite", "name": "${t('ocr.apiKeys.modelFlashLite')}", "status": "available" },
    { "id": "google/gemini-2.5-flash", "name": "${t('ocr.apiKeys.modelFlash')}", "status": "available" },
    { "id": "google/gemini-3-flash-preview", "name": "${t('ocr.apiKeys.modelFlash3')}", "status": "available" },
    { "id": "paddleocr", "name": "${t('ocr.apiKeys.modelPaddle')}", "status": "coming_soon" },
    { "id": "deepseek-ocr", "name": "${t('ocr.apiKeys.modelDeepseek')}", "status": "coming_soon" },
    { "id": "tesseract", "name": "${t('ocr.apiKeys.modelTesseract')}", "status": "coming_soon" }
  ]
}`,
    },
    {
      method: 'GET',
      path: '/v1/usage',
      summary: t('ocr.apiDocs.summaryUsage'),
      description: t('ocr.apiDocs.descUsage'),
      headers: [
        { name: 'Authorization', type: 'string', required: true, desc: 'Bearer <API_KEY>' },
      ],
      body: [],
      response: `{
  "period": "2026-03",
  "total_requests": 12847,
  "successful": 12102,
  "failed": 745,
  "avg_processing_ms": 1380,
  "by_model": {
    "google/gemini-2.5-flash-lite": 8200,
    "google/gemini-2.5-flash": 3100,
    "google/gemini-3-flash-preview": 1547
  }
}`,
    },
  ]);

  const routing = computed(() => [
    { value: 'auto_approved', confidence: '>= 90%', desc: t('ocr.apiDocs.routingAuto') },
    { value: 'soft_review', confidence: '75-89%', desc: t('ocr.apiDocs.routingSoft') },
    { value: 'mandatory_review', confidence: '< 75%', desc: t('ocr.apiDocs.routingMandatory') },
  ]);

  const errors = computed(() => [
    {
      code: 400,
      name: 'Bad Request',
      desc: t('ocr.apiDocs.error400'),
      example: '{ "error": "image_url is required" }',
    },
    {
      code: 401,
      name: 'Unauthorized',
      desc: t('ocr.apiDocs.error401'),
      example: '{ "error": "Invalid or revoked API key" }',
    },
    {
      code: 402,
      name: 'Payment Required',
      desc: t('ocr.apiDocs.error402'),
      example: '{ "error": "AI credits exhausted" }',
    },
    {
      code: 404,
      name: 'Not Found',
      desc: t('ocr.apiDocs.error404'),
      example: '{ "error": "Request not found" }',
    },
    {
      code: 413,
      name: 'Payload Too Large',
      desc: t('ocr.apiDocs.error413'),
      example: '{ "error": "Image exceeds 10MB limit" }',
    },
    {
      code: 422,
      name: 'Unprocessable Entity',
      desc: t('ocr.apiDocs.error422'),
      example: '{ "error": "Unable to extract data from image" }',
    },
    {
      code: 429,
      name: 'Too Many Requests',
      desc: t('ocr.apiDocs.error429'),
      example: '{ "error": "Rate limit exceeded", "retry_after": 60 }',
    },
    {
      code: 500,
      name: 'Internal Server Error',
      desc: t('ocr.apiDocs.error500'),
      example: '{ "error": "Internal server error" }',
    },
    {
      code: 503,
      name: 'Service Unavailable',
      desc: t('ocr.apiDocs.error503'),
      example: '{ "error": "Service temporarily unavailable" }',
    },
  ]);

  const headerColumns = computed(() => [
    { title: t('ocr.apiDocs.colName'), dataIndex: 'name', key: 'name' },
    { title: t('ocr.apiDocs.colType'), dataIndex: 'type', key: 'type' },
    { title: t('ocr.apiDocs.colRequired'), dataIndex: 'required', key: 'required' },
    { title: t('ocr.apiDocs.colDesc'), dataIndex: 'desc', key: 'desc' },
  ]);

  const bodyColumns = computed(() => [
    { title: t('ocr.apiDocs.colName'), dataIndex: 'name', key: 'name' },
    { title: t('ocr.apiDocs.colType'), dataIndex: 'type', key: 'type' },
    { title: t('ocr.apiDocs.colRequired'), dataIndex: 'required', key: 'required' },
    { title: t('ocr.apiDocs.colDesc'), dataIndex: 'desc', key: 'desc' },
  ]);

  const routingColumns = computed(() => [
    { title: t('ocr.apiDocs.colRouting'), dataIndex: 'value', key: 'value' },
    { title: t('ocr.apiDocs.colConfidence'), dataIndex: 'confidence', key: 'confidence' },
    { title: t('ocr.apiDocs.colDesc'), dataIndex: 'desc', key: 'desc' },
  ]);

  const errorColumns = computed(() => [
    { title: t('ocr.apiDocs.colCode'), dataIndex: 'code', key: 'code' },
    { title: t('ocr.apiDocs.colName'), dataIndex: 'name', key: 'name' },
    { title: t('ocr.apiDocs.colDesc'), dataIndex: 'desc', key: 'desc' },
    { title: t('ocr.apiDocs.example'), dataIndex: 'example', key: 'example' },
  ]);

  function methodColor(method: string) {
    if (method === 'POST') return 'green';
    if (method === 'GET') return 'blue';
    return 'default';
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

  .section-card {
    border: 1px solid var(--border-color);
  }

  .section-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .section-subtitle {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    font-size: 12px;
  }

  .overview-row {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .overview-row code {
    background: rgba(0, 0, 0, 0.04);
    padding: 2px 6px;
    border-radius: 6px;
    font-size: 11px;
  }

  .code-block {
    background: rgba(0, 0, 0, 0.04);
    border-radius: 10px;
    padding: 12px;
    font-size: 12px;
    font-family: monospace;
  }

  .endpoint-title {
    font-size: 14px;
    font-weight: 600;
  }

  .endpoint-desc {
    font-size: 12px;
    color: #8b949e;
    margin-bottom: 10px;
  }

  .endpoint-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }

  .endpoint-meta code {
    background: rgba(0, 0, 0, 0.04);
    padding: 2px 6px;
    border-radius: 6px;
    font-size: 11px;
  }

  .endpoint-section {
    margin-top: 12px;
  }

  .note {
    margin-top: 8px;
    font-size: 11px;
    color: #8b949e;
  }

  .footer-note {
    text-align: center;
    font-size: 11px;
    color: #8b949e;
    padding-bottom: 8px;
  }

  @media (max-width: 768px) {
    .page-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
