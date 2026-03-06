<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <div class="flex">
          <a-input
            :placeholder="t('common.inputText')"
            v-model="textSearch"
            @change="onChangeTextSearch"
            allow-clear
          />
          <a-button type="primary" @click="handleCreate" class="ml-5">
            <Icon :icon="'ion:add-outline'" /> {{ t('rfqSetting.openBidCondition.button.add') }}
          </a-button>
        </div>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                onClick: handleDelete.bind(null, record),
              },
            ]"
          />
        </template>
        <template v-if="column.key === 'createdAt'">
          {{ formatToDateTime(record.createdAt) }}
        </template>
        <template v-if="column.key === 'updatedAt'"
          >{{ formatToDateTime(record.updatedAt) }}
        </template>
      </template>
    </BasicTable>
    <ConditionDrawer
      @register="registerDrawer"
      @success="handleSuccess"
      :global-list-id="globalListId"
    />
    <AModal
      v-model:open="openModal"
      :title="t('common.confirmDelete')"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      :ok-text="t('common.delText')"
      okType="error"
    >
      <p class="p-5">{{ t('common.isDelete') + nameRecord + '?' }}</p>
    </AModal>
  </div>
</template>
<script lang="ts" setup>
  import { formatToDateTime } from '@/utils/dateUtil';
  import {
    getListGlobalValueByCode,
    deleteGlobalListDetail,
    getOptGlobalListByCode,
  } from '@/api/sys/global_list';
  import Icon from '@/components/Icon/Icon.vue';
  import { useDebounceFn } from '@vueuse/core';
  import { onMounted, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';

  import { useDrawer } from '@/components/Drawer';
  import ConditionDrawer from './ConditionDrawer.vue';

  import { columns } from './data';
  import { message } from 'ant-design-vue';
  import { useI18n } from '@/hooks/web/useI18n';

  defineOptions({ name: 'Open Bid Condition' });
  const openModal = ref(false);
  const confirmLoading = ref(false);

  const nameRecord = ref('');
  const id = ref(null);
  const { t } = useI18n();
  const textSearch = ref('');
  const dataSource = ref<any>([]);
  const globalListId = ref(0);
  const debouncedRequest = useDebounceFn(() => 'response', 1000);

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { setLoading }] = useTable({
    title: t('rfqSetting.openBidCondition.title'),
    dataSource: dataSource,
    subTitle: t('rfqSetting.openBidCondition.subTitle'),
    icon: 'material-symbols:cycle',
    columns,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 80,
      title: t('common.action'),
      dataIndex: 'action',
      align: 'center',
      // slots: { customRender: 'action' },
      fixed: 'right',
    },
  });

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    openModal.value = true;
    id.value = record?.id;
    nameRecord.value = record?.name;
  }

  function handleSuccess() {
    textSearch.value = '';
    searchAllPaymentPeriod(textSearch.value);
  }
  async function getParentId() {
    try {
      const data: any = await getOptGlobalListByCode({
        code: 'REQUEST_QUOTA.OPEN_BID_CONDITION',
      });

      globalListId.value = data?.id;
    } catch (err) {
      console.log(err);
    }
  }
  async function searchAllPaymentPeriod(text: string) {
    try {
      setLoading(true);
      const data: any = await getListGlobalValueByCode({
        code: 'REQUEST_QUOTA.OPEN_BID_CONDITION',
        name: text,
      });
      dataSource.value = data?.body || [];
    } finally {
      setLoading(false);
    }
  }
  const onChangeTextSearch = async (val) => {
    const value = await debouncedRequest();
    if (value === 'response') {
      searchAllPaymentPeriod(val.target.value.trim());
    }
  };
  const handleOk = async () => {
    try {
      confirmLoading.value = true;
      await deleteGlobalListDetail({ id: id.value });
      searchAllPaymentPeriod(textSearch.value);
      openModal.value = false;
      message.success(t('common.deleteSuccess'));
    } finally {
      confirmLoading.value = false;
    }
  };
  onMounted(() => {
    getParentId();
    searchAllPaymentPeriod(textSearch.value);
  });
</script>
