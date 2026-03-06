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
          <a-button type="primary" @click="handleCreate" class="ml-5"
            ><Icon :icon="'ion:add-outline'" />
            {{ t('serviceRequest.currency_setting.modalAddTitle') }}
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
    <OrgDrawer @register="registerDrawer" @success="handleSuccess" :global-list-id="globalListId" />
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
  import Icon from '@/components/Icon/Icon.vue';
  import { useDebounceFn } from '@vueuse/core';
  import { onMounted, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';

  import { useDrawer } from '@/components/Drawer';
  import OrgDrawer from './CurrencyDrawer.vue';

  import { columns } from './currency.data';
  import { message } from 'ant-design-vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import {
    deleteGlobalListDetail,
    getListGlobalValueByCode,
    getOptGlobalListByCode,
  } from '@/api/sys/global_list';

  defineOptions({ name: 'FromType' });
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
    title: t('serviceRequest.currency_setting.title'),
    dataSource: dataSource,
    subTitle: t('serviceRequest.currency_setting.subTitle'),
    icon: 'material-symbols-light:request-page-outline',
    columns,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 80,
      title: 'Action',
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
    searchAll('');
  }

  async function getParentId() {
    try {
      const data: any = await getOptGlobalListByCode({
        code: 'REQUEST_CURRENCY',
      });
      globalListId.value = data?.id;
    } catch (err) {
      console.log(err);
    }
  }

  async function searchAll(text: string) {
    try {
      setLoading(true);
      const data: any = await getListGlobalValueByCode({
        code: 'REQUEST_CURRENCY',
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
      searchAll(val.target.value.trim());
    }
  };
  const handleOk = async () => {
    try {
      confirmLoading.value = true;
      await deleteGlobalListDetail({ id: id.value });
      searchAll(textSearch.value);
      openModal.value = false;
      message.success(t('common.deleteSuccess'));
    } finally {
      confirmLoading.value = false;
    }
  };
  onMounted(() => {
    getParentId();
    searchAll(textSearch.value);
  });
</script>
