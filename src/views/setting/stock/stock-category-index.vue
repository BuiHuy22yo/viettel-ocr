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
                icon: 'ic:baseline-plus',
                tooltip: t('stock.stockCategory.table.action.addStaffToStock'),
                onClick: handleAddUserToStock.bind(null, record),
              },
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
        <template v-if="column.key === 'stockLevel'">
          {{
            record.stockLevel === 0
              ? t('stock.stockCategory.common.stockTypeList.stockParent')
              : t('stock.stockCategory.common.stockTypeList.affiliatedStock')
          }}
        </template>
      </template>
    </BasicTable>
    <WarehouseAttribute />
    <StockCategoryDrawer @register="registerDrawer" @success="handleSuccess" />
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
  import { computed, onMounted, reactive, ref, unref } from 'vue';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { columns } from './stock-category.data';
  import Icon from '@/components/Icon/Icon.vue';
  import { useDrawer } from '@/components/Drawer';

  import StockCategoryDrawer from './components/stock-category-drawer/stock-category-drawer.vue';
  import WarehouseAttribute from './components/warehouse-attribute/warehouse-attribute-index.vue';

  import { deleteStockCategory, searchStockCategory } from '@/api/setting/stock-category';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useUserStore } from '@/store/modules/user';
  import { useDebounceFn } from '@vueuse/core';
  import { useMessage } from '@/hooks/web/useMessage';
  import dayjs from 'dayjs';
  import { isNullOrEmpty } from '@/utils/is';
  import { findCompany } from '@/api/setting/org';
  import HeaderCell from '@/components/Table/src/components/HeaderCell.vue';

  const dataManagementUnit = ref([]);
  const { createMessage: message } = useMessage();
  const textSearch = ref('');
  const userStore = useUserStore();
  const openModal = ref(false);
  const confirmLoading = ref(false);
  const nameRecord = ref('');
  const id = ref(null);
  const dataRecord = ref({});
  const { t } = useI18n();
  const searchInfo = reactive<Recordable>({});
  const dataSource = ref<any>([]);
  const [registerDrawer, { openDrawer }] = useDrawer();
  const debouncedRequest = useDebounceFn(() => 'response', 1000);

  const [registerTable, { setLoading, getForm, getPaginationRef, setPagination }] = useTable({
    title: t('stock.stockCategory.table.title'),
    subTitle: t('stock.stockCategory.table.subTitle'),
    icon: 'material-symbols:warehouse-outline',
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
    handleSearchInfoFn(info) {
      setPagination({
        current: 1,
      });
      searchStock(getForm().getFieldsValue());
      return info;
    },
    onChange() {
      searchStock(getForm().getFieldsValue());
    },
    actionColumn: {
      width: 140,
      title: t('stock.stockCategory.table.columns.action'),
      dataIndex: 'action',
      align: 'center',
    },
  });
  const onChangeTextSearch = async (val) => {
    const value = await debouncedRequest();
    if (value === 'response') {
      await searchStock(val.target.value.trim());
    }
  };
  const handleCreate = () => {
    openDrawer(true, {
      userStore: userStore,
      isUpdate: false,
      dataManagementUnit: dataManagementUnit.value,
    });
  };
  const handleEdit = (record: Recordable) => {
    openDrawer(true, {
      record,
      isUpdate: true,
      isView: false,
      dataManagementUnit: dataManagementUnit.value,
    });
  };
  const handleView = (record: Recordable) => {
    openDrawer(true, {
      record,
      isView: true,
      dataManagementUnit: dataManagementUnit.value,
    });
  };
  const handleAddUserToStock = (record: Recordable) => {
    openDrawer(true, {
      record,
      isAddStaffToStock: true,
    });
  };
  const handleDelete = (record: Recordable) => {
    openModal.value = true;
    id.value = record?.id;
    nameRecord.value = record?.stockCode;
    dataRecord.value = record;
  };

  const handleOk = async () => {
    try {
      confirmLoading.value = true;
      await deleteStockCategory({
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
      await searchStock(searchInfo);
      openModal.value = false;
      message.success(t('common.deleteSuccess'));
    } finally {
      confirmLoading.value = false;
    }
  };
  const handleSuccess = () => {
    searchStock(searchInfo);
  };
  const getPagination = computed(() => {
    const paginationRef: any = getPaginationRef();
    return {
      currentPage: paginationRef.current,
      pageSize: paginationRef.pageSize || 10,
      pageAllSize: 0,
    };
  });
  const searchStock = async (params: any) => {
    try {
      setLoading(true);
      const result = await searchStockCategory({
        stockCode: params,
        stockName: params,
        ...unref(getPagination),
      });
      setPagination({
        total: result?.totalRecord,
        current: result?.currentPage || 1,
      });
      let dataTable = result.result;
      if (dataTable?.length > 0) {
        dataTable.forEach((item) => {
          const dataFilter = findItemByValue(dataManagementUnit.value || [], item.managementUnit);
          let wardName = dataFilter?.wardName;
          let districtName = dataFilter?.districtName;
          let provinceName = dataFilter?.provinceName;
          item.area = [wardName, districtName, provinceName].filter((part) => part).join(', ');
        });
      }

      dataSource.value = dataTable;
    } finally {
      setLoading(false);
    }
  };
  const findItemByValue = (companies: any[], targetValue: string) => {
    for (const company of companies) {
      if (company.value === targetValue) {
        return company;
      }
      if (company.children) {
        const result = findItemByValue(company.children, targetValue);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };
  onMounted(async () => {
    try {
      setLoading(true);
      dataManagementUnit.value = await findCompany({
        status: 1,
      });
    } finally {
      setLoading(true);
    }
    await searchStock('');
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
