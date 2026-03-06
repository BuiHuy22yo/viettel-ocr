<template>
  <PageWrapper :contentStyle="{ margin: 0 }">
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-title">{{ t('ocr.humanReview.title') }}</div>
          <div class="page-subtitle">{{ t('ocr.humanReview.subtitle') }}</div>
        </div>
        <div class="queue-meta">
          <span class="meta-label">{{ t('ocr.humanReview.queue') }}:</span>
          <span class="meta-value">{{ reviewItems.length }}</span>
          <span class="meta-label">{{ t('ocr.humanReview.queueSuffix') }}</span>
        </div>
      </div>

      <Card class="section-card">
        <div class="section-title">{{ t('ocr.humanReview.legendTitle') }}</div>
        <div class="legend">
          <div v-for="item in confidenceLegend" :key="item.key" class="legend-item">
            <span class="legend-dot" :class="item.dotClass"></span>
            <span>{{ item.label }}</span>
          </div>
        </div>
      </Card>

      <Card class="section-card">
        <div class="section-title">{{ t('ocr.humanReview.queueTitle') }}</div>
        <BasicTable @register="registerTable" />
      </Card>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { computed, h, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { Card, Tag, Button, Tooltip } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { useI18n } from '@/hooks/web/useI18n';
  import { PageWrapper } from '@/components/Page';

  const router = useRouter();

  const { t } = useI18n();

  const confidenceLegend = computed(() => [
    { key: 'high', label: t('ocr.humanReview.legendHigh'), dotClass: 'dot-success' },
    { key: 'medium', label: t('ocr.humanReview.legendMedium'), dotClass: 'dot-warning' },
    { key: 'low', label: t('ocr.humanReview.legendLow'), dotClass: 'dot-error' },
  ]);

  const reviewItems = computed(() => [
    {
      id: 1,
      tracking: 'VT-1203-AB',
      receiver: 'Tran Thi B',
      flagged: t('ocr.humanReview.flagAddress'),
      confidence: 72,
      priority: 'high',
      createdAt: '08/03 09:12',
    },
    {
      id: 2,
      tracking: 'VT-4420-CD',
      receiver: 'Nguyen Van C',
      flagged: t('ocr.humanReview.flagSender'),
      confidence: 85,
      priority: 'medium',
      createdAt: '08/03 08:45',
    },
    {
      id: 3,
      tracking: 'VT-9921-EF',
      receiver: 'Le Thi D',
      flagged: t('ocr.humanReview.flagPhone'),
      confidence: 68,
      priority: 'high',
      createdAt: '08/03 08:05',
    },
  ]);

  const columns = computed(() => [
    { title: t('ocr.humanReview.colTracking'), dataIndex: 'tracking', width: 160 },
    { title: t('ocr.humanReview.colReceiver'), dataIndex: 'receiver' },
    { title: t('ocr.humanReview.colFlagged'), dataIndex: 'flagged' },
    {
      title: t('ocr.humanReview.colConfidence'),
      dataIndex: 'confidence',
      width: 120,
      customRender: ({ record }) => {
        const value = record.confidence || 0;
        const color = value >= 90 ? '#52c41a' : value >= 75 ? '#faad14' : '#ff4d4f';
        return h('span', { style: { color, fontFamily: 'monospace' } }, `${value}%`);
      },
    },
    {
      title: t('ocr.humanReview.colPriority'),
      dataIndex: 'priority',
      width: 120,
      customRender: ({ record }) => {
        const map = {
          high: { color: 'red', text: t('ocr.humanReview.priorityHigh') },
          medium: { color: 'orange', text: t('ocr.humanReview.priorityMedium') },
          low: { color: 'green', text: t('ocr.humanReview.priorityLow') },
        };
        const item = map[record.priority] || map.low;
        return h(Tag, { color: item.color }, () => item.text);
      },
    },
    { title: t('ocr.humanReview.colCreatedAt'), dataIndex: 'createdAt', width: 140 },
    {
      title: t('ocr.humanReview.colAction'),
      dataIndex: 'action',
      width: 200,
      customRender: ({ record }) => {
        return h('div', { style: { display: 'flex', gap: '6px', justifyContent: 'flex-end' } }, [
          h(
            Tooltip,
            { title: t('ocr.common.viewDetail') },
            {
              default: () =>
                h(
                  Button,
                  {
                    size: 'small',
                    type: 'text',
                    onClick: () => router.push(`/human-review/${record.id}`),
                  },
                  () => h(Icon, { icon: 'ion:eye-outline', size: 16 }),
                ),
            },
          ),
          h(
            Tooltip,
            { title: t('ocr.humanReview.actionEdit') },
            {
              default: () =>
                h(
                  Button,
                  {
                    size: 'small',
                    type: 'text',
                    onClick: () => router.push(`/human-review/${record.id}`),
                  },
                  () => h(Icon, { icon: 'ion:pencil-outline', size: 16 }),
                ),
            },
          ),
          h(
            Tooltip,
            { title: t('ocr.humanReview.actionApprove') },
            {
              default: () =>
                h(Button, { size: 'small', type: 'text' }, () =>
                  h(Icon, { icon: 'ion:checkmark-circle-outline', size: 16 }),
                ),
            },
          ),
          h(
            Tooltip,
            { title: t('ocr.humanReview.actionReject') },
            {
              default: () =>
                h(Button, { size: 'small', type: 'text', danger: true }, () =>
                  h(Icon, { icon: 'ion:close-circle-outline', size: 16 }),
                ),
            },
          ),
        ]);
      },
    },
  ]);

  const [registerTable, { setColumns }] = useTable({
    dataSource: reviewItems.value,
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

  .queue-meta {
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

  .section-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 12px;
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

  .dot-success {
    background: #52c41a;
  }

  .dot-warning {
    background: #faad14;
  }

  .dot-error {
    background: #ff4d4f;
  }

  @media (max-width: 768px) {
    .page-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
