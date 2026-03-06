<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <div class="flex">
          <a @click="downloadFile">Download Template</a>
          <input
            id="fileUpload"
            :value="selectedFile"
            type="file"
            @change="handleChangeImport($event)"
            hidden
          />
          <a-button type="primary" @click="chooseFiles" class="ml-5">
            {{ t('page.monitoring.import') }}
          </a-button>
        </div>
        <div class="flex">
          <a-button type="primary" class="ml-5" @click="handleAdd">
            <Icon :icon="'ion:add-outline'" /> {{ t('country.add') }}
          </a-button>
        </div>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: t('country.edit'),
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                tooltip: t('country.delete'),
                color: 'error',
                onClick: handleDelete.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
  <AModal
    :title="titleAModal"
    v-model:open="openModalEdit"
    :confirm-loading="editLoading"
    @ok="handleSubmit"
    :ok-text="t('country.add')"
    :cancel-text="t('country.cancel')"
  >
    <p class="p-5">
      <BasicForm @register="editForm" />
    </p>
  </AModal>
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
</template>
<script lang="ts" setup>
  import { computed, onMounted, reactive, ref, unref } from 'vue';
  import { BasicTable, TableAction, useTable } from '@/components/Table';

  import { columns, searchFormSchema, formEdit } from './country.data';
  import { useI18n } from '@/hooks/web/useI18n';
  import { BasicForm, useForm } from '@/components/Form';
  import {
    searchCountry,
    create,
    update,
    deleteCountry,
    importFile,
    downlFile,
  } from '@/api/setting/country';
  import Icon from '@/components/Icon/Icon.vue';

  const dataSource = ref<any>([]);
  const searchInfo = reactive<Recordable>({});
  const { t } = useI18n();
  const openModal = ref(false);
  const confirmLoading = ref(false);
  const nameRecord = ref('');
  const id = ref(null);
  const type = ref('CREATE');
  const titleAModal = ref('');

  const openModalEdit = ref(false);
  const editLoading = ref(false);
  const selectedFile = ref<File | null>(null);
  const [editForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formEdit,
    showActionButtonGroup: false,
  });

  const [registerTable, { setLoading, getForm, getPaginationRef, setPagination }] = useTable({
    dataSource: dataSource,
    columns,
    formConfig: {
      labelWidth: 130,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      showAdvancedButton: false,
      actionColOptions: {
        span: 6,
      },
    },
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    handleSearchInfoFn(info) {
      search(getForm().getFieldsValue());
      return info;
    },
    onChange(pagination, filters, sorter, extra) {
      search(getForm().getFieldsValue());
    },
    actionColumn: {
      width: 150,
      title: t('country.action'),
      dataIndex: 'action',
      align: 'center',
    },
  });

  const getPagination = computed(() => {
    const paginationRef: any = getPaginationRef();
    return {
      currentPage: paginationRef.current,
      pageSize: paginationRef.pageSize || 10,
      pageAllSize: 0,
    };
  });

  async function search(params: any) {
    try {
      setLoading(true);
      let dataRequest = {};
      if (params) {
        dataRequest = {
          code: params.keySearch,
          name: params.keySearch,
        };
      }
      const result = await searchCountry({
        ...dataRequest,
      });
      dataSource.value = result;
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    openModalEdit.value = true;
    type.value = 'CREATE';
    titleAModal.value = t('country.create');
    await resetFields();
  }

  async function handleEdit(record: Recordable) {
    openModalEdit.value = true;
    type.value = 'UPDATE';
    await resetFields();
    titleAModal.value = t('country.update');
    record.isView = true;
    await setFieldsValue({ ...record });
  }

  function handleDelete(record: Recordable) {
    openModal.value = true;
    id.value = record?.id;
    nameRecord.value = record?.name;
  }

  const handleOk = async () => {
    try {
      confirmLoading.value = true;
      await deleteCountry({ id: id.value });
      await search(searchInfo);
      openModal.value = false;
      console.log(t('common.deleteSuccess'));
    } finally {
      confirmLoading.value = false;
    }
  };

  async function handleSubmit() {
    try {
      editLoading.value = true;
      const values = await validate();
      console.log(values);
      if (type.value === 'CREATE') {
        await create({ ...values });
      } else {
        await update({ ...values });
      }
      openModalEdit.value = false;
      console.log(t('common.updatedSuccess'));
      await search(searchInfo);
    } finally {
      editLoading.value = false;
    }
  }

  function chooseFiles() {
    let a = document.getElementById('fileUpload');
    if (a) {
      a.click();
    }
  }
  async function handleChangeImport($event: Event) {
    const target = $event.target as HTMLInputElement;
    let file: any = {};
    if (target && target.files) {
      file = target.files[0];
    }
    try {
      const response = await importFile({
        file: file,
      });
      // console.log('response: ', response.data.size);
      // if (response.data.size == 4) {
      //   message.success(t('page.monitoring.importSuccess'));
      // } else {
      //   message.error('Có lỗi dữ liệu không hợp lệ');
      //   handleExportExcel(response.data, 'Import_file_er', '.xlsx');
      // }
      await search(searchInfo);
    } finally {
      selectedFile.value = null;
    }
  }

  async function downloadFile() {
    try {
      const params = getForm().getFieldsValue();
      const response = await downlFile({
        ...params,
        pageInfo: {
          ...unref(getPagination),
        },
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const fileName = `template_country.xlsx`;
      link.setAttribute('download', fileName); // Đặt tên file cho file tải về
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }

  onMounted(() => {
    search(searchInfo);
  });
</script>
