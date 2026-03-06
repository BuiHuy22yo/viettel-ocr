<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div>
        <div class="dashboard-title">{{ $t('routes.menu.dashboard') }}</div>
        <div class="dashboard-subtitle">Tổng quan hệ thống xử lý vận đơn OCR</div>
      </div>
    </div>

    <Row :gutter="[12, 12]" class="dashboard-section">
      <Col v-for="item in kpis" :key="item.title" :xs="24" :sm="12" :lg="6">
        <Card class="dashboard-card" size="small">
          <div class="kpi-card">
            <div>
              <div class="kpi-title">{{ item.title }}</div>
              <div class="kpi-value">{{ item.value }}</div>
              <div class="kpi-subtitle">{{ item.subtitle }}</div>
            </div>
            <div class="kpi-icon" :class="item.iconBg">
              <Icon :icon="item.icon" :size="24" />
            </div>
          </div>
        </Card>
      </Col>
    </Row>

    <Row :gutter="[12, 12]" class="dashboard-section">
      <Col :xs="24" :lg="16">
        <Card class="dashboard-card">
          <div class="section-title">Phân bố trạng thái đơn hàng</div>
          <div class="status-grid">
            <div
              v-for="status in statusCards"
              :key="status.label"
              class="status-card"
              :class="status.bg"
            >
              <div class="status-count" :class="status.text">{{ status.count }}</div>
              <div class="status-label" :class="status.text">{{ status.label }}</div>
            </div>
          </div>
        </Card>
      </Col>
      <Col :xs="24" :lg="8">
        <Card class="dashboard-card">
          <div class="section-title">Phân loại xử lý</div>
          <div class="processing-list">
            <div v-for="bar in processingBars" :key="bar.label">
              <div class="processing-row">
                <span>{{ bar.label }}</span>
                <span class="processing-value">{{ bar.value }}%</span>
              </div>
              <div class="processing-track">
                <div
                  class="processing-fill"
                  :style="{ width: bar.value + '%', backgroundColor: bar.color }"
                ></div>
              </div>
            </div>
          </div>
          <div class="mini-grid">
            <div v-for="mini in miniStats" :key="mini.label" class="mini-card">
              <Icon :icon="mini.icon" :size="16" :class="mini.text" />
              <div class="mini-value" :class="mini.text">{{ mini.value }}</div>
              <div class="mini-label">{{ mini.label }}</div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>

    <Row :gutter="[12, 12]" class="dashboard-section">
      <Col :xs="24" :lg="24">
        <Card class="dashboard-card fraud-card" :class="fraudBorderClass">
          <div class="fraud-header">
            <div class="fraud-title">
              <Icon icon="alert-outlined" :size="18" class="fraud-alert-icon" />
              <div class="section-title">Cảnh báo Fraud</div>
            </div>
            <a class="fraud-link">Xem tất cả →</a>
          </div>
          <div class="fraud-summary">
            <div v-for="item in fraudSummary" :key="item.label" class="fraud-summary-item">
              <div class="fraud-summary-icon" :class="item.iconBg">
                <Icon :icon="item.icon" :size="14" />
              </div>
              <div>
                <div class="fraud-count">{{ item.count }}</div>
                <div class="fraud-label">{{ item.label }}</div>
              </div>
            </div>
          </div>
          <div v-if="fraudAlerts.length" class="fraud-list">
            <div v-for="alert in fraudAlerts" :key="alert.id" class="fraud-item">
              <div class="fraud-item-info">
                <div class="fraud-order-id">{{ alert.orderId }}</div>
                <div class="fraud-desc">{{ alert.desc }}</div>
              </div>
              <Tag :color="alert.risk >= 80 ? 'red' : 'orange'">{{ alert.risk }}%</Tag>
            </div>
          </div>
          <div v-else class="fraud-empty">Không có cảnh báo fraud</div>
        </Card>
      </Col>
      <Col :xs="24" :lg="24">
        <Card class="dashboard-card">
          <div class="section-title section-title-spaced">Đơn hàng gần đây</div>
          <BasicTable @register="registerTable" />
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script lang="ts" setup>
  import { computed, h, ref } from 'vue';
  import { Card, Col, Row, Tag } from 'ant-design-vue';
  import { BasicTable, useTable } from '@/components/Table';
  import Icon from '@/components/Icon/Icon.vue';
  import { useI18n } from '@/hooks/web/useI18n';

  const kpis = ref([
    {
      title: 'Tổng đơn hàng',
      value: '12,845',
      subtitle: '2,430 hoàn thành',
      icon: 'inbox-outlined',
      iconBg: 'icon-bg-primary',
    },
    {
      title: 'Độ chính xác OCR',
      value: '96.4%',
      subtitle: 'Trung bình tất cả đơn',
      icon: 'check-circle-outlined',
      iconBg: 'icon-bg-success',
    },
    {
      title: 'Thời gian xử lý TB',
      value: '3.2s',
      subtitle: 'SLA: < 5s',
      icon: 'clock-circle-outlined',
      iconBg: 'icon-bg-neutral',
    },
    {
      title: 'Queue đang chờ',
      value: '86',
      subtitle: 'Bình thường',
      icon: 'hourglass-outlined',
      iconBg: 'icon-bg-warning',
    },
  ]);

  const statusCards = ref([
    { label: 'Hoàn thành', count: 8940, bg: 'status-success-bg', text: 'status-success-text' },
    { label: 'Đang review', count: 920, bg: 'status-warning-bg', text: 'status-warning-text' },
    { label: 'Thất bại', count: 380, bg: 'status-error-bg', text: 'status-error-text' },
    { label: 'Đang xử lý', count: 605, bg: 'status-primary-bg', text: 'status-primary-text' },
  ]);

  const { t } = useI18n();

  const processingBars = computed(() => [
    { label: t('ocr.dashboard.autoApproved'), value: 78, color: '#16a34a' },
    { label: t('ocr.dashboard.humanReview'), value: 16, color: '#d97706' },
    { label: t('ocr.dashboard.rejected'), value: 6, color: '#dc2626' },
  ]);

  const miniStats = computed(() => [
    {
      label: t('ocr.dashboard.auto'),
      value: '78%',
      icon: 'check-circle-outlined',
      text: 'status-success-text',
    },
    {
      label: t('ocr.dashboard.review'),
      value: '16%',
      icon: 'exclamation-circle-outlined',
      text: 'status-warning-text',
    },
    {
      label: t('ocr.dashboard.reject'),
      value: '6%',
      icon: 'close-circle-outlined',
      text: 'status-error-text',
    },
  ]);

  const fraudBorderClass = 'fraud-border';
  const fraudSummary = ref([
    { label: 'COD bất thường', count: 12, icon: 'dollar-circle-outlined', iconBg: 'icon-bg-error' },
    { label: 'SĐT trùng lặp', count: 7, icon: 'phone-outlined', iconBg: 'icon-bg-warning' },
    {
      label: 'Địa chỉ hoàn cao',
      count: 4,
      icon: 'environment-outlined',
      iconBg: 'icon-bg-warning',
    },
  ]);

  const fraudAlerts = ref([
    { id: 1, orderId: 'ORD-3F8C1A', desc: 'COD bất thường', risk: 88 },
    { id: 2, orderId: 'ORD-7A2D9B', desc: 'SĐT trùng lặp', risk: 76 },
    { id: 3, orderId: 'ORD-0C9E21', desc: 'Địa chỉ hoàn cao', risk: 82 },
  ]);

  const columns = [
    { title: 'Mã vận đơn', dataIndex: 'tracking', width: 140 },
    { title: 'Người gửi', dataIndex: 'sender' },
    { title: 'Người nhận', dataIndex: 'receiver' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      customRender: ({ record }) => {
        const status = record.status;
        const map = {
          completed: { color: 'green', text: 'Hoàn thành' },
          review: { color: 'orange', text: 'Đang review' },
          failed: { color: 'red', text: 'Thất bại' },
          processing: { color: 'blue', text: 'Đang xử lý' },
        };
        const item = map[status] || { color: 'default', text: 'Chờ xử lý' };
        return h(Tag, { color: item.color }, () => item.text);
      },
    },
    {
      title: 'Confidence',
      dataIndex: 'confidence',
      customRender: ({ record }) => {
        const value = record.confidence;
        const color = value >= 90 ? '#16a34a' : value >= 75 ? '#d97706' : '#dc2626';
        return h('span', { style: { color, fontFamily: 'monospace' } }, `${value}%`);
      },
    },
    { title: 'Thời gian', dataIndex: 'time', width: 120 },
  ];

  const [registerTable] = useTable({
    dataSource: [
      {
        id: 1,
        tracking: 'VT-9382-AB',
        sender: 'Nguyen Van A',
        receiver: 'Tran Thi B',
        status: 'completed',
        confidence: 97,
        time: '2.8s',
      },
      {
        id: 2,
        tracking: 'VT-4821-CD',
        sender: 'Bui Van C',
        receiver: 'Le Thi D',
        status: 'review',
        confidence: 82,
        time: '4.6s',
      },
      {
        id: 3,
        tracking: 'VT-5703-EF',
        sender: 'Pham Van E',
        receiver: 'Hoang Thi F',
        status: 'processing',
        confidence: 75,
        time: '—',
      },
      {
        id: 4,
        tracking: 'VT-1209-GH',
        sender: 'Do Van G',
        receiver: 'Nguyen Thi H',
        status: 'failed',
        confidence: 61,
        time: '5.4s',
      },
      {
        id: 5,
        tracking: 'VT-3320-JK',
        sender: 'Tran Van I',
        receiver: 'Pham Thi K',
        status: 'completed',
        confidence: 94,
        time: '2.2s',
      },
    ],
    rowKey: 'id',
    columns,
    showIndexColumn: false,
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    pagination: false,
  });
</script>

<style scoped>
  .dashboard {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: var(--text-color);
  }

  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .dashboard-title {
    font-size: 20px;
    font-weight: 600;
  }

  .dashboard-subtitle {
    font-size: 12px;
    color: #8b949e;
  }

  .dashboard-section {
    margin: 0;
  }

  .dashboard-card {
    border: 1px solid var(--border-color);
  }

  .kpi-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .kpi-title {
    font-size: 12px;
    color: #8b949e;
  }

  .kpi-value {
    font-size: 20px;
    font-weight: 600;
  }

  .kpi-subtitle {
    font-size: 12px;
    color: #8b949e;
  }

  .kpi-icon {
    width: 48px;
    height: 48px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-bg-primary {
    background: rgba(255, 0, 30, 0.08);
    color: var(--theme-color);
  }

  .icon-bg-success {
    background: rgba(82, 196, 26, 0.12);
    color: #52c41a;
  }

  .icon-bg-warning {
    background: rgba(250, 173, 20, 0.12);
    color: #faad14;
  }

  .icon-bg-error {
    background: rgba(255, 77, 79, 0.12);
    color: #ff4d4f;
  }

  .icon-bg-neutral {
    background: rgba(0, 0, 0, 0.04);
    color: #6b7280;
  }

  .section-title {
    font-size: 14px;
    font-weight: 600;
  }

  .section-title-spaced {
    margin-bottom: 12px;
  }

  .status-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
    margin-top: 12px;
  }

  .status-card {
    border-radius: 10px;
    padding: 12px;
    text-align: center;
  }

  .status-count {
    font-size: 18px;
    font-weight: 600;
  }

  .status-label {
    font-size: 12px;
    margin-top: 4px;
  }

  .status-success-bg {
    background: rgba(82, 196, 26, 0.08);
  }

  .status-warning-bg {
    background: rgba(250, 173, 20, 0.08);
  }

  .status-error-bg {
    background: rgba(255, 77, 79, 0.08);
  }

  .status-primary-bg {
    background: rgba(255, 0, 30, 0.08);
  }

  .status-success-text {
    color: #52c41a;
  }

  .status-warning-text {
    color: #faad14;
  }

  .status-error-text {
    color: #ff4d4f;
  }

  .status-primary-text {
    color: var(--theme-color);
  }

  .processing-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 12px;
  }

  .processing-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 6px;
  }

  .processing-value {
    font-weight: 600;
  }

  .processing-track {
    height: 8px;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 999px;
    overflow: hidden;
  }

  .processing-fill {
    height: 100%;
    border-radius: 999px;
  }

  .mini-grid {
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    text-align: center;
  }

  .mini-card {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
  }

  .mini-value {
    font-size: 14px;
    font-weight: 600;
  }

  .mini-label {
    font-size: 12px;
    color: #8b949e;
  }

  .fraud-card {
    border-left-width: 4px;
  }

  .fraud-border {
    border-left-color: #ff4d4f;
  }

  .fraud-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .fraud-title {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .fraud-alert-icon {
    color: #ff4d4f;
  }

  .fraud-link {
    font-size: 12px;
    color: var(--theme-color);
  }

  .fraud-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
    margin-bottom: 12px;
  }

  .fraud-summary-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.03);
  }

  .fraud-summary-icon {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fraud-count {
    font-size: 16px;
    font-weight: 600;
  }

  .fraud-label {
    font-size: 12px;
    color: #8b949e;
  }

  .fraud-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .fraud-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.03);
    font-size: 12px;
  }

  .fraud-item-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .fraud-order-id {
    font-family: monospace;
  }

  .fraud-desc {
    color: #8b949e;
  }

  .fraud-empty {
    text-align: center;
    padding: 20px 0;
    font-size: 12px;
    color: #8b949e;
  }

  @media (max-width: 768px) {
    .dashboard-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }
</style>
