<template>
  <PageWrapper :contentStyle="{ margin: 0 }">
    <div class="page">
    <div class="page-header">
      <div>
        <div class="page-title">{{ t('ocr.orderManagement.title') }}</div>
        <div class="page-subtitle">{{ t('ocr.orderManagement.subtitle') }}</div>
      </div>
      <Tooltip :title="t('ocr.orderManagement.export')">
        <Button type="default" size="small">
          <Icon icon="ion:download-outline" :size="16" class="btn-icon" />
          {{ t('ocr.orderManagement.export') }}
        </Button>
      </Tooltip>
    </div>

    <Card class="section-card">
      <div class="filter-row">
        <Input
          v-model:value="search"
          :placeholder="t('ocr.orderManagement.searchPlaceholder')"
          class="filter-input"
        />
        <div class="filter-actions">
          <Button
            v-for="item in statusOptions"
            :key="item.value"
            size="small"
            :type="statusFilter === item.value ? 'primary' : 'default'"
            @click="statusFilter = item.value"
          >
            {{ item.label }}
          </Button>
        </div>
      </div>
    </Card>

    <Card class="section-card">
      <div class="section-title">{{
        t('ocr.orderManagement.resultCount', { count: filteredOrders.length })
      }}</div>
      <BasicTable @register="registerTable" />
    </Card>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { computed, h, ref, watch, nextTick } from 'vue';
  import { useRouter } from 'vue-router';
  import { Button, Card, Input, Tag, Tooltip } from 'ant-design-vue';
  import { BasicTable, useTable } from '@/components/Table';
  import Icon from '@/components/Icon/Icon.vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { PageWrapper } from '@/components/Page';

  const router = useRouter();
  const search = ref('');
  const statusFilter = ref('all');

  const { t } = useI18n();

  const statusOptions = computed(() => [
    { label: t('ocr.orderManagement.statusAll'), value: 'all' },
    { label: t('ocr.orderManagement.statusCompleted'), value: 'completed' },
    { label: t('ocr.orderManagement.statusProcessing'), value: 'processing' },
    { label: t('ocr.orderManagement.statusReview'), value: 'review' },
    { label: t('ocr.orderManagement.statusFailed'), value: 'failed' },
  ]);

  const orders = ref([
    {
      id: 1,
      tracking: 'VT-9382-AB',
      sender: 'Nguyen Van A',
      receiver: 'Tran Thi B',
      route: 'Ha Noi -> Da Nang',
      status: 'completed',
      confidence: 97,
      time: '2.8s',
    },
    {
      id: 2,
      tracking: 'VT-4821-CD',
      sender: 'Bui Van C',
      receiver: 'Le Thi D',
      route: 'Hai Phong -> Hue',
      status: 'review',
      confidence: 82,
      time: '4.6s',
    },
    {
      id: 3,
      tracking: 'VT-5703-EF',
      sender: 'Pham Van E',
      receiver: 'Hoang Thi F',
      route: 'Ha Noi -> Nam Dinh',
      status: 'processing',
      confidence: 0,
      time: '—',
    },
    {
      id: 4,
      tracking: 'VT-1209-GH',
      sender: 'Do Van G',
      receiver: 'Nguyen Thi H',
      route: 'Da Nang -> Quang Nam',
      status: 'failed',
      confidence: 61,
      time: '5.4s',
    },
    {
      id: 5,
      tracking: 'VT-3320-JK',
      sender: 'Tran Van I',
      receiver: 'Pham Thi K',
      route: 'Bac Ninh -> Thai Binh',
      status: 'completed',
      confidence: 94,
      time: '2.2s',
    },
  ]);

  const filteredOrders = computed(() => {
    return orders.value.filter((order) => {
      const matchSearch =
        search.value === '' ||
        order.tracking.toLowerCase().includes(search.value.toLowerCase()) ||
        order.sender.toLowerCase().includes(search.value.toLowerCase()) ||
        order.receiver.toLowerCase().includes(search.value.toLowerCase());
      const matchStatus = statusFilter.value === 'all' || order.status === statusFilter.value;
      return matchSearch && matchStatus;
    });
  });

  const columns = computed(() => [
    { title: t('ocr.orderManagement.colTracking'), dataIndex: 'tracking', width: 140 },
    { title: t('ocr.orderManagement.colSender'), dataIndex: 'sender' },
    { title: t('ocr.orderManagement.colReceiver'), dataIndex: 'receiver' },
    { title: t('ocr.orderManagement.colRoute'), dataIndex: 'route' },
    {
      title: t('ocr.orderManagement.colStatus'),
      dataIndex: 'status',
      customRender: ({ record }) => {
        const map = {
          completed: { color: 'green', text: t('ocr.orderManagement.statusCompleted') },
          processing: { color: 'blue', text: t('ocr.orderManagement.statusProcessing') },
          review: { color: 'orange', text: t('ocr.orderManagement.statusReview') },
          failed: { color: 'red', text: t('ocr.orderManagement.statusFailed') },
        };
        const item = map[record.status] || {
          color: 'default',
          text: t('ocr.orderManagement.statusQueue'),
        };
        return h(Tag, { color: item.color }, () => item.text);
      },
    },
    {
      title: t('ocr.orderManagement.colConfidence'),
      dataIndex: 'confidence',
      width: 120,
      customRender: ({ record }) => {
        const value = record.confidence || 0;
        const color = value >= 90 ? '#52c41a' : value >= 75 ? '#faad14' : '#ff4d4f';
        return value ? h('span', { style: { color, fontFamily: 'monospace' } }, `${value}%`) : '—';
      },
    },
    { title: t('ocr.orderManagement.colTime'), dataIndex: 'time', width: 120 },
    {
      title: t('ocr.orderManagement.colAction'),
      dataIndex: 'action',
      width: 120,
      customRender: ({ record }) => {
        return h(
          Tooltip,
          { title: t('ocr.common.viewDetail') },
          {
            default: () =>
              h(
                Button,
                {
                  type: 'text',
                  size: 'small',
                  onClick: () => router.push(`/order-management/${record.id}`),
                },
                () => h(Icon, { icon: 'ion:eye-outline', size: 16 }),
              ),
          },
        );
      },
    },
  ]);

  const [registerTable, { setTableData, setColumns }] = useTable({
    dataSource: filteredOrders.value,
    rowKey: 'id',
    columns: columns.value,
    showIndexColumn: false,
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    pagination: false,
  });

  watch(
    filteredOrders,
    (next) => {
      nextTick(() => {
        setTableData(next);
      });
    },
    { immediate: true },
  );

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
    align-items: center;
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

  .btn-icon {
    margin-right: 6px;
  }

  .section-card {
    border: 1px solid var(--border-color);
  }

  .section-title {
    font-size: 12px;
    color: #8b949e;
    margin-bottom: 12px;
  }

  .filter-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .filter-input {
    flex: 1 1 260px;
  }

  .filter-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    .page-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
