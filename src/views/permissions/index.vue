<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <div class="flex">
          <a-button type="primary" class="ml-5" @click="onCreateRole">
            {{ t('permission.add') }}
          </a-button>
        </div>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: t('permission.edit'),
                disabled: getForm().getFieldsValue().clientCode === 'ubos-admin',
                onClick: onUpdateRole.bind(null, record),
              },
              {
                icon: 'ion:eye-outline',
                tooltip: t('permission.view'),
                onClick: handleView.bind(null, record, false),
              },
              {
                icon: 'ant-design:delete-outlined',
                tooltip: t('permission.delete'),
                color: 'error',
                disabled:
                  !record?.roleId ||
                  record.roleCode === 'ubos-mytel-logistics_admin' ||
                  getForm().getFieldsValue().clientCode === 'ubos-partner' ||
                  getForm().getFieldsValue().clientCode === 'ubos-admin',
                onClick: handleDelete.bind(null, record),
              },
            ]"
          />
        </template>
        <!--        <template v-if="column.key === 'createdDate'">-->
        <!--          {{ formatToDateTime(record.createdDate) }}-->
        <!--        </template>-->
      </template>
    </BasicTable>
  </div>

  <PermissionsDrawer @register="registerDrawer" />

  <RoleDrawer @register="registerRoleDrawer" @success="handleSuccess" />

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

  import { columns } from './permissions.data';
  import { useI18n } from '@/hooks/web/useI18n';
  import { message } from 'ant-design-vue';
  import { deleteRole, searchRole } from '@/api/sys/permission';
  import PermissionsDrawer from '@/views/permissions/PermissionsDrawer.vue';
  import { useDrawer } from '@/components/Drawer';
  import RoleDrawer from '@/views/permissions/RoleDrawer.vue';
  import { searchClient } from '@/api/client';

  const dataSource = ref<any>([]);
  const searchInfo = reactive<Recordable>({});
  const { t } = useI18n();
  const openModal = ref(false);
  const confirmLoading = ref(false);
  const nameRecord = ref('');
  const id = ref(null);
  const type = ref('CREATE');
  const listClient = ref([]);
  const searchFormSchema = ref<any>([]);

  const openModalEdit = ref(false);
  const editLoading = ref(false);
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerRoleDrawer, { openDrawer: openRoleDrawer }] = useDrawer();
  const [registerTable, { setLoading, getForm, getPaginationRef, setPagination }] = useTable({
    dataSource: dataSource,
    columns,
    formConfig: {
      labelWidth: 130,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      baseColProps: { lg: 6, md: 24 },
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
    // rowSelection: {
    //   type: 'checkbox',
    //   onChange: (v, b) => {
    //     selectedRow.value = b;
    //   },
    //   defaultSelectedRowKeys: selectedRow,
    // },
    actionColumn: {
      width: 150,
      title: t('permission.action'),
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
      if (!params.clientCode) return;

      setLoading(true);
      const result = await searchRole({
        ...params,
        ...unref(getPagination),
      });
      setPagination({
        total: result?.totalRecord,
        current: result?.currentPage || 1,
      });

      dataSource.value = result.result;
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleView(record: Recordable, assignUser: boolean = false) {
    let clientCode = getForm().getFieldsValue().clientCode;
    const client = listClient.value.find((item) => item.code === clientCode);

    openDrawer(true, {
      record,
      isAssignUser: assignUser,
      clientId: client.id,
    });
  }

  const onCreateRole = async () => {
    let clientCode = getForm()?.getFieldsValue()?.clientCode;
    if (!clientCode) return;
    const client = listClient.value.find((item) => item.code === clientCode);
    openRoleDrawer(true, {
      isCreate: true,
      clientCode: clientCode,
      clientId: client.id,
    });
  };

  const onUpdateRole = async (record: Recordable) => {
    let clientCode = getForm()?.getFieldsValue()?.clientCode;
    if (!clientCode) return;
    const client = listClient.value.find((item) => item.code === clientCode);
    openRoleDrawer(true, {
      isUpdate: true,
      clientCode: getForm()?.getFieldsValue()?.clientCode,
      clientId: client.id,
      record,
    });
  };

  function handleDelete(record: Recordable) {
    openModal.value = true;
    id.value = record?.roleId;
    nameRecord.value = record?.roleName;
  }

  const handleOk = async () => {
    try {
      confirmLoading.value = true;
      let clientCode = getForm()?.getFieldsValue()?.clientCode;
      const client = listClient.value.find((item) => item.code === clientCode);
      await deleteRole({ roleId: id.value, clientId: client.id });
      await search(getForm().getFieldsValue());
      openModal.value = false;
      message.success(t('common.deleteSuccess'));
    } finally {
      confirmLoading.value = false;
    }
  };

  const handleSuccess = () => {
    search(getForm().getFieldsValue());
  };

  onMounted(async () => {
    const listClientTmp = await searchClient({ currentPage: 1, pageSize: 100000 });
    const firstClient = listClientTmp && listClientTmp.length > 0 ? listClientTmp[0] : null;
    listClient.value = listClientTmp;

    searchFormSchema.value = [
      {
        field: 'clientCode',
        label: t('permission.client'),
        component: 'Select',
        required: true,
        defaultValue: firstClient?.code,
        componentProps: {
          options: listClientTmp,
        },
        colProps: { span: 6 },
      },
      {
        field: 'code',
        label: t('permission.code'),
        component: 'Input',
        colProps: { span: 6 },
      },
      {
        field: 'name',
        label: t('permission.name'),
        component: 'Input',
        colProps: { span: 6 },
      },
      {
        field: 'status',
        label: t('permission.status'),
        component: 'Select',
        colProps: { span: 6 },
        componentProps: {
          options: [
            { label: t('common.active'), value: 1 },
            { label: t('common.inActive'), value: 0 },
          ],
        },
      },
    ];

    search(getForm().getFieldsValue());
  });
</script>
