<template>
  <PageWrapper :contentStyle="{ margin: 0 }">
    <div class="page">
    <div class="page-header">
      <Tooltip :title="t('ocr.orderDetail.back')">
        <Button type="text" class="back-btn" @click="goBack">
          <Icon icon="ion:arrow-back-outline" :size="18" />
        </Button>
      </Tooltip>
      <div class="header-info">
        <div class="page-title">{{ order.tracking }}</div>
        <div class="page-subtitle">{{
          t('ocr.orderDetail.subtitle', { time: order.processingTime })
        }}</div>
      </div>
      <Tag :color="statusMap[order.status].color">{{ statusMap[order.status].label }}</Tag>
    </div>

    <div class="content-grid">
      <Card class="section-card">
        <div class="card-header">
          <div class="section-title">{{ t('ocr.orderDetail.originalImage') }}</div>
          <div class="zoom-controls">
            <Button size="small" @click="zoomOut">-</Button>
            <span class="zoom-value">{{ Math.round(zoom * 100) }}%</span>
            <Button size="small" @click="zoomIn">+</Button>
          </div>
        </div>
        <div class="image-wrapper">
          <div class="image-inner" :style="{ transform: `scale(${zoom})` }">
            <div class="image-placeholder">
              <Icon icon="ion:image-outline" :size="28" />
              <div>{{ t('ocr.orderDetail.preview') }}</div>
            </div>
          </div>
        </div>
      </Card>

      <div class="side-panel">
        <Card class="section-card">
          <div class="section-title">{{ t('ocr.orderDetail.ocrResult') }}</div>
          <div class="field-list">
            <div v-for="field in fields" :key="field.key" class="field-item">
              <div class="field-meta">
                <span class="field-label">{{ field.label }}</span>
                <span class="field-confidence" :class="field.confidenceTone"
                  >{{ field.confidence }}%</span
                >
              </div>
              <div class="field-value">
                <Input v-if="field.editing" v-model:value="field.corrected" size="small" />
                <span v-else>{{ field.corrected || field.value }}</span>
              </div>
              <div class="field-actions">
                <Tooltip
                  :title="field.editing ? $t('ocr.reviewDetail.save') : $t('ocr.reviewDetail.edit')"
                >
                  <Button size="small" type="text" @click="toggleEdit(field)">
                    <Icon
                      :icon="field.editing ? 'ion:checkmark-outline' : 'ion:pencil-outline'"
                      :size="16"
                    />
                  </Button>
                </Tooltip>
                <Tooltip v-if="field.corrected" :title="t('ocr.reviewDetail.revert')">
                  <Button size="small" type="text" @click="revertField(field)">
                    <Icon icon="ion:refresh-outline" :size="16" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </Card>

        <Card class="section-card">
          <div class="section-title">{{ t('ocr.orderDetail.comparison') }}</div>
          <div v-if="diffFields.length === 0" class="empty-state">{{
            t('ocr.reviewDetail.noChanges')
          }}</div>
          <div v-else class="diff-list">
            <div v-for="item in diffFields" :key="item.key" class="diff-item">
              <div class="diff-label">{{ item.label }}</div>
              <div class="diff-old">{{ item.value }}</div>
              <div class="diff-new">{{ item.corrected }}</div>
            </div>
          </div>
        </Card>

        <div class="action-row">
          <Button type="primary" block>{{ t('ocr.orderDetail.actionSave') }}</Button>
          <Button block @click="goBack">{{ t('ocr.orderDetail.back') }}</Button>
        </div>
      </div>
    </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Button, Card, Input, Tag, Tooltip } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { PageWrapper } from '@/components/Page';

  const router = useRouter();

  const { t } = useI18n();

  const statusMap: Record<string, { color: string; label: string }> = {
    completed: { color: 'green', label: t('ocr.orderManagement.statusCompleted') },
    review: { color: 'orange', label: t('ocr.orderManagement.statusReview') },
    failed: { color: 'red', label: t('ocr.orderManagement.statusFailed') },
    processing: { color: 'blue', label: t('ocr.orderManagement.statusProcessing') },
  };

  const order = ref({
    tracking: 'VT-9382-AB',
    status: 'review',
    processingTime: '3.4s',
  });

  const zoom = ref(1);
  const zoomIn = () => {
    zoom.value = Math.min(3, zoom.value + 0.25);
  };
  const zoomOut = () => {
    zoom.value = Math.max(0.5, zoom.value - 0.25);
  };

  const fields = ref([
    {
      key: 'tracking',
      label: t('ocr.orderManagement.colTracking'),
      value: 'VT-9382-AB',
      corrected: '',
      confidence: 94,
      confidenceTone: 'tone-success',
      editing: false,
    },
    {
      key: 'sender',
      label: t('ocr.orderManagement.colSender'),
      value: 'Nguyen Van A',
      corrected: '',
      confidence: 88,
      confidenceTone: 'tone-warning',
      editing: false,
    },
    {
      key: 'receiver',
      label: t('ocr.orderManagement.colReceiver'),
      value: 'Tran Thi B',
      corrected: '',
      confidence: 72,
      confidenceTone: 'tone-error',
      editing: false,
    },
    {
      key: 'address',
      label: t('ocr.humanReview.flagAddress'),
      value: 'Quan 1, TP HCM',
      corrected: '',
      confidence: 78,
      confidenceTone: 'tone-warning',
      editing: false,
    },
  ]);

  const toggleEdit = (field: any) => {
    if (field.editing) {
      field.editing = false;
      return;
    }
    field.editing = true;
    if (!field.corrected) {
      field.corrected = field.value;
    }
  };

  const revertField = (field: any) => {
    field.corrected = '';
  };

  const diffFields = computed(() =>
    fields.value.filter((f) => f.corrected && f.corrected !== f.value),
  );

  const goBack = () => {
    router.back();
  };
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
    align-items: center;
    gap: 12px;
  }

  .back-btn {
    padding: 0 8px;
  }

  .header-info {
    flex: 1;
  }

  .page-title {
    font-size: 20px;
    font-weight: 600;
  }

  .page-subtitle {
    font-size: 12px;
    color: #8b949e;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 16px;
  }

  .section-card {
    border: 1px solid var(--border-color);
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .section-title {
    font-size: 14px;
    font-weight: 600;
  }

  .zoom-controls {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .zoom-value {
    font-size: 12px;
    color: #8b949e;
  }

  .image-wrapper {
    border: 1px dashed var(--border-color);
    border-radius: 8px;
    padding: 12px;
    overflow: auto;
    max-height: 520px;
  }

  .image-inner {
    transform-origin: top left;
  }

  .image-placeholder {
    height: 420px;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.03);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #8b949e;
  }

  .side-panel {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .field-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .field-item {
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 12px;
  }

  .field-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 6px;
  }

  .field-label {
    color: #8b949e;
  }

  .field-value {
    font-weight: 600;
    margin-bottom: 6px;
  }

  .field-actions {
    display: flex;
    gap: 8px;
  }

  .field-confidence {
    font-family: monospace;
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

  .diff-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .diff-item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    font-size: 12px;
  }

  .diff-label {
    color: #8b949e;
  }

  .diff-old {
    text-decoration: line-through;
    background: rgba(255, 77, 79, 0.08);
    padding: 4px 6px;
    border-radius: 6px;
  }

  .diff-new {
    background: rgba(82, 196, 26, 0.12);
    padding: 4px 6px;
    border-radius: 6px;
    font-weight: 600;
  }

  .empty-state {
    text-align: center;
    padding: 24px 0;
    color: #8b949e;
    font-size: 12px;
  }

  .action-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
