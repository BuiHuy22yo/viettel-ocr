<template>
  <PageWrapper>
    <ACard>
      <div>
        <BasicTable @register="registerTable" :searchInfo="searchInfo">
          <template #headerCell="{ column }">
            <slot name="headerCell" v-bind="{ column }">
              <HeaderCell :column="column" align="center" />
            </slot>
          </template>
          <template #toolbar>
            <div class="flex">
              <a-button class="ml-5"><Icon :icon="'ion:download-outline'" /> Export </a-button>
              <a-button type="primary" class="ml-5" @click="handleCreate"
                ><Icon :icon="'ion:add-outline'" /> {{ t('common.create') }}
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
                  // {
                  //   icon: 'ant-design:delete-outlined',
                  //   color: 'error',
                  //   onClick: handleDelete.bind(null, record),
                  // },
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
        <ResourceDrawer @register="registerDrawer" @success="handleSuccess" />
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
    </ACard>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed, onMounted, reactive, ref, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';

  import { columns, searchFormSchema } from './resource.data';
  import Icon from '@/components/Icon/Icon.vue';
  import { searchResource, deleteResource } from '@/api/resource';
  import { formatToDateTime } from '@/utils/dateUtil';
  import ResourceDrawer from './resourceDrawer.vue';
  import { useDrawer } from '@/components/Drawer';
  import { useI18n } from '@/hooks/web/useI18n';
  import { message } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import HeaderCell from '@/components/Table/src/components/HeaderCell.vue';

  const openModal = ref(false);
  const confirmLoading = ref(false);

  const nameRecord = ref('');
  const id = ref(null);
  const { t } = useI18n();
  const dataSource = ref<any>([]);
  const searchInfo = reactive<Recordable>({});
  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { setLoading, getPaginationRef, setPagination, getForm }] = useTable({
    title: t('resource.titleResource'),
    dataSource: dataSource,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      baseColProps: { lg: 6, md: 24 },
    },
    handleSearchInfoFn(info) {
      setPagination({
        current: 1,
      });
      searchAllResource(getForm().getFieldsValue());
      return info;
    },
    onChange(pagination, filters, sorter, extra) {
      searchAllResource(getForm().getFieldsValue());
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 120,
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      // slots: { customRender: 'action' },
    },
  });

  function handleSuccess() {
    getForm().resetFields();
    searchAllResource({});
  }

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
      isView: false,
    });
  }

  function handleDelete(record: Recordable) {
    openModal.value = true;
    id.value = record?.id;
    nameRecord.value = record?.staffName;
  }

  const getPagination = computed(() => {
    const paginationRef: any = getPaginationRef();
    return {
      currentPage: paginationRef.current,
      pageSize: paginationRef.pageSize || 10,
      pageAllSize: 0,
    };
  });

  async function searchAllResource(params: any) {
    try {
      setLoading(true);
      const result = await searchResource({
        ...params,
        pageInfo: {
          ...unref(getPagination),
        },
      });

      setPagination({
        total: result?.totalRecord,
        current: result?.currentPage || 1,
      });

      dataSource.value = result.result;
    } finally {
      setLoading(false);
    }
  }
  const handleOk = async () => {
    try {
      confirmLoading.value = true;
      await deleteResource({ id: id.value });
      searchAllResource(getForm().getFieldsValue());
      openModal.value = false;
      message.success(t('common.deleteSuccess'));
    } finally {
      confirmLoading.value = false;
    }
  };
  onMounted(() => {
    searchAllResource(searchInfo);
  });
</script>
