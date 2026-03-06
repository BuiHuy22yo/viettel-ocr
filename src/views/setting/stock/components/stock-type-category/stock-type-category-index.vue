<template>
  <div>
    <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5 custom-table-body">
      <template #headerCell="{ column }">
        <slot name="headerCell" v-bind="{ column }">
          <HeaderCell :column="column" align="center" />
        </slot>
      </template>
      <template #toolbar>
        <div class="flex">
          <a-input
            :placeholder="t('common.inputText')"
            v-model="textSearch"
            @change="onChangeTextSearch"
            allow-clear
          />
          <a-button type="primary" class="ml-2" @click="handleCreate"
            ><Icon :icon="'ion:add-outline'" /> {{ t('common.create') }}
          </a-button>
        </div>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ion:eye-outline',
                tooltip: t('stock.stockCategory.table.action.view'),
                onClick: handleView.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: t('stock.stockCategory.table.action.edit'),
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                tooltip: t('stock.stockCategory.table.action.delete'),
                color: 'error',
                onClick: handleDelete.bind(null, record),
              },
            ]"
          />
        </template>
        <template v-if="column.key === 'stockType'">
          {{
            record.stockType === 0
              ? t('stock.stockCategory.common.stockTypeList.stockParent')
              : t('stock.stockCategory.common.stockTypeList.affiliatedStock')
          }}
        </template>
      </template>
    </BasicTable>
    <stockTypeCategoryDrawer @register="registerDrawer" @success="handleSuccess" />
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
  import { computed, onMounted, reactive, ref } from 'vue';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { columns } from './stock-type-category.data';
  import Icon from '@/components/Icon/Icon.vue';
  import { useDrawer } from '@/components/Drawer';
  import { deleteStockTypeApi, getAllStockTypeApi } from '@/api/setting/stock-category';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useUserStore } from '@/store/modules/user';
  import { useDebounceFn } from '@vueuse/core';
  import { useMessage } from '@/hooks/web/useMessage';
  import stockTypeCategoryDrawer from '@/views/setting/stock/components/stock-type-category/stock-type-category-drawer/stock-type-category-drawer.vue';
  import dayjs from 'dayjs';
  import { isNullOrEmpty } from '@/utils/is';
  import HeaderCell from '@/components/Table/src/components/HeaderCell.vue';

  const { createMessage: message } = useMessage();
  const textSearch = ref('');
  const userStore = useUserStore();
  const openModal = ref(false);
  const confirmLoading = ref(false);
  const nameRecord = ref('');
  const dataRecord = ref({});
  const { t } = useI18n();
  const searchInfo = reactive<Recordable>('');
  const dataSource = ref<any>([]);
  const [registerDrawer, { openDrawer }] = useDrawer();
  const debouncedRequest = useDebounceFn(() => 'response', 1000);

  const [registerTable, { setLoading, getForm, getPaginationRef, setPagination }] = useTable({
    title: t('stock.stockCategory.stockTypeCategory.table.title'),
    subTitle: t('stock.stockCategory.stockTypeCategory.table.subTitle'),
    icon: 'la:warehouse',
    dataSource: dataSource,
    rowKey: 'id',
    columns,
    formConfig: {
      labelWidth: 150,
      autoSubmitOnEnter: true,
      baseColProps: { lg: 6, md: 24 },
    },
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    actionColumn: {
      width: 100,
      title: t('stock.stockCategory.table.columns.action'),
      dataIndex: 'action',
      align: 'center',
    },
  });
  const onChangeTextSearch = async (val) => {
    const value = await debouncedRequest();
    if (value === 'response') {
      await searchStockType(val.target.value.trim());
    }
  };
  const handleCreate = () => {
    openDrawer(true, {
      userStore: userStore,
      isUpdate: false,
    });
  };
  const handleEdit = (record: Recordable) => {
    openDrawer(true, {
      record,
      isUpdate: true,
      isView: false,
    });
  };
  const handleView = (record: Recordable) => {
    openDrawer(true, {
      record,
      isView: true,
    });
  };
  const handleDelete = (record: Recordable) => {
    openModal.value = true;
    dataRecord.value = record;
    nameRecord.value = record?.code;
  };

  const handleOk = async () => {
    try {
      confirmLoading.value = true;
      await deleteStockTypeApi({
        ...dataRecord.value,
        createdAt: dayjs(dataRecord.value.createdAt, 'DD/MM/YYYY HH:mm:ss').format(
          'YYYY-MM-DDTHH:mm:ss.SSS',
        ),
        updatedAt: isNullOrEmpty(dataRecord.value.updatedAt)
          ? null
          : dayjs(dataRecord.value.updatedAt, 'DD/MM/YYYY HH:mm:ss').format(
              'YYYY-MM-DDTHH:mm:ss.SSS',
            ),
      });
      await searchStockType(searchInfo);
      openModal.value = false;
      message.success(t('common.deleteSuccess'));
    } finally {
      confirmLoading.value = false;
    }
  };
  const handleSuccess = () => {
    searchStockType(searchInfo);
  };
  const getPagination = computed(() => {
    const paginationRef: any = getPaginationRef();
    return {
      currentPage: paginationRef.current,
      pageSize: paginationRef.pageSize || 10,
      pageAllSize: 0,
    };
  });
  const searchStockType = async (params: any) => {
    try {
      setLoading(true);
      dataSource.value = await getAllStockTypeApi({
        keyword: params,
        lstStatus: [0, 1],
      });
    } finally {
      setLoading(false);
    }
  };

  onMounted(() => {
    searchStockType('');
  });
</script>
<style lang="less">
  .custom-table-body
    > .ant-table-wrapper
    > .ant-spin-nested-loading
    > .ant-spin-container
    > .ant-table
    > .ant-table-container
    > .ant-table-body {
    height: auto !important;
  }
</style>
