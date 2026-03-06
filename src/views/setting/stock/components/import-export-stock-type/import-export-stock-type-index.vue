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
          <a-button type="primary" class="ml-2" @click="handleDownloadTemplate"
            ><Icon :icon="'material-symbols:download'" /> {{ t('common.downloadTemplate') }}
          </a-button>
          <input
            id="fileUpload"
            :value="fileText"
            type="file"
            @change="handleChangeImport($event)"
            hidden
            accept=".xlsx"
          />
          <a-button type="primary" @click="chooseFiles" class="ml-2">
            <Icon :icon="'material-symbols:upload'" />{{ t('page.monitoring.import') }}
          </a-button>
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
                tooltip: t('stock.stockImportTab.table.action.view'),
                onClick: handleView.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: t('stock.stockImportTab.table.action.edit'),
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                tooltip: t('stock.stockImportTab.table.action.delete'),
                color: 'error',
                disabled:
                  record.code === STOCK_CONSTANT.IMPORT_FROM_EXPORT_TYPE ||
                  record.code === STOCK_CONSTANT.IMPORT_FROM_KCS_TYPE,
                onClick: handleDelete.bind(null, record),
              },
            ]"
          />
        </template>
        <template v-if="column.key === 'createdAt'">
          {{ formatToDateTime(record.createdAt) }}
        </template>
        <template v-if="column.key === 'updatedAt'">
          {{ formatToDateTime(record.updatedAt) }}
        </template>
      </template>
    </BasicTable>
    <ImportExportStockTypeDrawer @register="registerDrawer" @success="handleSuccess" />
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
  import { onMounted, ref } from 'vue';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { columns } from './import-export-stock-type.data';
  import Icon from '@/components/Icon/Icon.vue';
  import { useDrawer } from '@/components/Drawer';

  import ImportExportStockTypeDrawer from './components/import-export-stock-type-drawer/import-export-stock-type-drawer.vue';

  import {
    deleteImportExportStockType,
    importGoodsReceiptIssueType,
    searchImportExportStockType,
  } from '@/api/setting/import-export-stock-type';
  import { formatToDateTime } from '@/utils/dateUtil';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useDebounceFn } from '@vueuse/core';
  import { useMessage } from '@/hooks/web/useMessage';
  import HeaderCell from '@/components/Table/src/components/HeaderCell.vue';
  import { STOCK_CONSTANT } from '@/constant/stock-constant';
  import { downloadTemplateFileApi } from '@/api/common-transport-core';

  const { createMessage: message } = useMessage();
  const textSearch = ref('');
  const openModal = ref(false);
  const confirmLoading = ref(false);

  const nameRecord = ref('');
  const id = ref(null);
  const { t } = useI18n();
  const dataSource = ref<any>([]);
  const [registerDrawer, { openDrawer }] = useDrawer();
  const debouncedRequest = useDebounceFn(() => 'response', 1000);
  const fileText = ref<File | null>(null);
  const [registerTable, { setLoading, getForm }] = useTable({
    title: t('stock.importExportStockType.table.title'),
    subTitle: t('stock.importExportStockType.table.subTitle'),
    icon: 'ic:outline-import-export',
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
      width: 120,
      title: t('stock.importExportStockType.table.columns.action'),
      dataIndex: 'action',
      align: 'center',
    },
  });
  const onChangeTextSearch = async (val) => {
    const value = await debouncedRequest();
    if (value === 'response') {
      await search(val.target.value.trim());
    }
  };
  const handleCreate = () => {
    openDrawer(true, {
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
    id.value = record?.id;
    nameRecord.value = record?.name;
  };
  const handleOk = async () => {
    try {
      confirmLoading.value = true;
      await deleteImportExportStockType({ id: id.value });
      await search(textSearch.value);
      openModal.value = false;
      message.success(t('common.deleteSuccess'));
    } finally {
      confirmLoading.value = false;
    }
  };

  function handleSuccess() {
    search(textSearch.value);
  }
  const search = async (text: string) => {
    try {
      setLoading(true);
      const data: any = await searchImportExportStockType({
        keyword: text,
      });
      dataSource.value = data || [];
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    setLoading(true);
    try {
      let filename = 'template_import_goods_receipt_issue_type.xlsx';
      const response: any = await downloadTemplateFileApi({
        fileName: filename,
      });

      const file = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const fileURL = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = fileURL;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      setLoading(false);
    }
  };
  const chooseFiles = () => {
    let a = document.getElementById('fileUpload');
    if (a) {
      a.click();
    }
  };
  const handleChangeImport = async ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    let file: any = {};
    if (target && target.files) {
      file = target.files[0];
    }
    if (file === null) {
      message.error(t('stock.validate.fileEmpty'));
      return;
    } else {
      if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        message.error(t('stock.validate.fileNotXlsx'));
        return;
      }
    }
    setLoading(true);
    try {
      await importGoodsReceiptIssueType({
        files: file,
      });
      await search(textSearch.value);
    } finally {
      setLoading(false);
      fileText.value = null;
    }
  };
  onMounted(() => {
    search(textSearch.value);
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
