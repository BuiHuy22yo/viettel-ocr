<template>
  <PageWrapper :contentStyle="{ margin: 0 }">
    <div class="page">
    <div class="page-header">
      <Tooltip :title="t('ocr.reviewDetail.back')">
        <Button type="text" class="back-btn" @click="goBack">
          <Icon icon="ion:arrow-back-outline" :size="18" />
        </Button>
      </Tooltip>
      <div class="header-info">
        <div class="page-title">{{
          t('ocr.reviewDetail.title', { tracking: order.tracking })
        }}</div>
        <div class="page-subtitle">
          {{
            t('ocr.reviewDetail.subtitle', {
              confidence: order.confidence,
              receiver: order.receiver,
            })
          }}
        </div>
      </div>
      <Tag :color="priorityMap[order.priority].color">{{ priorityMap[order.priority].label }}</Tag>
    </div>

    <div class="summary-grid">
      <Card class="summary-card">
        <div class="summary-icon tone-error">!</div>
        <div>
          <div class="summary-value">{{ flaggedCount }}</div>
          <div class="summary-label">{{ t('ocr.reviewDetail.fieldsToReview') }}</div>
        </div>
      </Card>
      <Card class="summary-card">
        <div class="summary-icon tone-warning">✎</div>
        <div>
          <div class="summary-value">{{ correctedCount }}</div>
          <div class="summary-label">{{ t('ocr.reviewDetail.corrected') }}</div>
        </div>
      </Card>
      <Card class="summary-card">
        <div class="summary-icon tone-warning">{{ avgConfidence }}%</div>
        <div>
          <div class="summary-label">{{ t('ocr.reviewDetail.avgConfidence') }}</div>
          <Progress :percent="avgConfidence" size="small" :show-info="false" />
        </div>
      </Card>
      <Card class="summary-card">
        <div class="summary-icon tone-primary">{{ order.processingTime }}</div>
        <div>
          <div class="summary-label">{{ t('ocr.reviewDetail.ocrTime') }}</div>
        </div>
      </Card>
    </div>

    <div class="content-grid">
      <Card class="section-card">
        <div class="card-header">
          <div class="section-title">{{ t('ocr.reviewDetail.originalImage') }}</div>
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
              <div>{{ t('ocr.reviewDetail.preview') }}</div>
            </div>
          </div>
        </div>
      </Card>

      <div class="side-panel">
        <Card class="section-card">
          <Tabs v-model:activeKey="activeTab">
            <Tabs.TabPane key="flagged" :tab="t('ocr.reviewDetail.flaggedTab')">
              <div class="field-list">
                <div v-for="field in flaggedFields" :key="field.key" class="field-item flagged">
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
                      :title="
                        field.editing ? t('ocr.reviewDetail.save') : t('ocr.reviewDetail.edit')
                      "
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
            </Tabs.TabPane>
            <Tabs.TabPane key="all" :tab="t('ocr.reviewDetail.allTab')">
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
                      :title="
                        field.editing ? t('ocr.reviewDetail.save') : t('ocr.reviewDetail.edit')
                      "
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
            </Tabs.TabPane>
            <Tabs.TabPane key="diff" :tab="t('ocr.reviewDetail.diffTab')">
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
            </Tabs.TabPane>
          </Tabs>
        </Card>

        <Card class="section-card">
          <div class="section-title">{{ t('ocr.reviewDetail.reviewNotes') }}</div>
          <Input.TextArea
            v-model:value="reviewNote"
            :rows="4"
            :placeholder="t('ocr.reviewDetail.notePlaceholder')"
          />
        </Card>

        <div class="action-row">
          <Button type="primary" block>{{ t('ocr.reviewDetail.actionApprove') }}</Button>
          <Button danger block>{{ t('ocr.reviewDetail.actionReject') }}</Button>
          <Button block @click="goBack">{{ t('ocr.reviewDetail.actionSkip') }}</Button>
        </div>
      </div>
    </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Button, Card, Input, Progress, Tabs, Tag, Tooltip } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { PageWrapper } from '@/components/Page';

  const router = useRouter();
  const activeTab = ref('flagged');
  const reviewNote = ref('');
  const zoom = ref(1);

  const { t } = useI18n();

  const priorityMap: Record<string, { color: string; label: string }> = {
    high: { color: 'red', label: t('ocr.humanReview.priorityHigh') },
    medium: { color: 'orange', label: t('ocr.humanReview.priorityMedium') },
    low: { color: 'green', label: t('ocr.humanReview.priorityLow') },
  };

  const order = ref({
    tracking: 'VT-1203-AB',
    receiver: 'Tran Thi B',
    confidence: 72,
    processingTime: '4.2s',
    priority: 'high',
  });

  const fields = ref([
    {
      key: 'sender',
      label: t('ocr.humanReview.flagSender'),
      value: 'Nguyen Van A',
      corrected: '',
      confidence: 86,
      editing: false,
    },
    {
      key: 'receiver',
      label: t('ocr.humanReview.colReceiver'),
      value: 'Tran Thi B',
      corrected: '',
      confidence: 72,
      editing: false,
    },
    {
      key: 'address',
      label: t('ocr.humanReview.flagAddress'),
      value: 'Quan 1, TP HCM',
      corrected: '',
      confidence: 68,
      editing: false,
    },
    {
      key: 'phone',
      label: t('ocr.humanReview.flagPhone'),
      value: '0987 123 456',
      corrected: '',
      confidence: 74,
      editing: false,
    },
  ]);

  const normalizeFields = computed(() => {
    return fields.value.map((field) => {
      const tone =
        field.confidence >= 90
          ? 'tone-success'
          : field.confidence >= 75
            ? 'tone-warning'
            : 'tone-error';
      return { ...field, confidenceTone: tone };
    });
  });

  const flaggedFields = computed(() => normalizeFields.value.filter((f) => f.confidence < 80));
  const correctedCount = computed(
    () => normalizeFields.value.filter((f) => f.corrected && f.corrected !== f.value).length,
  );
  const flaggedCount = computed(() => flaggedFields.value.length);
  const avgConfidence = computed(() => {
    if (!normalizeFields.value.length) return 0;
    const total = normalizeFields.value.reduce((sum, f) => sum + f.confidence, 0);
    return Math.round((total / normalizeFields.value.length) * 10) / 10;
  });

  const diffFields = computed(() =>
    normalizeFields.value.filter((f) => f.corrected && f.corrected !== f.value),
  );

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

  const zoomIn = () => {
    zoom.value = Math.min(3, zoom.value + 0.25);
  };

  const zoomOut = () => {
    zoom.value = Math.max(0.5, zoom.value - 0.25);
  };

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

  .summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
  }

  .summary-card {
    border: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .summary-icon {
    min-width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    background: rgba(0, 0, 0, 0.04);
  }

  .summary-value {
    font-size: 20px;
    font-weight: 600;
  }

  .summary-label {
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

  .section-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
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
    margin-top: 12px;
  }

  .field-item {
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 12px;
  }

  .field-item.flagged {
    border-color: rgba(255, 77, 79, 0.4);
    background: rgba(255, 77, 79, 0.05);
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

  .diff-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
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

  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
