<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="90%"
    @ok="handleSubmit"
  >
    <Space direction="vertical">
      <div v-if="!getAssignUser">
        <Collapse class="md-5" v-for="menu in menuPermissions" :key="menu?.resourceId">
          <Collapse-panel :header="menu?.displayName">
            <Table
              :columns="columns"
              :data-source="menu?.children"
              :pagination="false"
              :show-expand-column="false"
            >
              <template #headerCell="{ column }">
                <slot name="headerCell" v-bind="{ column }">
                  <td class="checkbox-cell">
                    <HeaderCell :column="column" />
                  </td>
                </slot>
              </template>
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'create'">
                  <td class="checkbox-cell" v-if="isHasPermission(record.permissions, 'CREATE')">
                    <Checkbox
                      :checked="isHasActive(record, record.permissions, 'CREATE')"
                      @change="onPermissionChange(record, record.permissions, 'CREATE')"
                    />
                  </td>
                </template>
                <template v-if="column.key === 'read'">
                  <td class="checkbox-cell" v-if="isHasPermission(record.permissions, 'READ')">
                    <Checkbox
                      :checked="isHasActive(record, record.permissions, 'READ')"
                      @change="onPermissionChange(record, record.permissions, 'READ')"
                    />
                  </td>
                </template>
                <template v-if="column.key === 'update'">
                  <td class="checkbox-cell" v-if="isHasPermission(record.permissions, 'UPDATE')">
                    <Checkbox
                      :checked="isHasActive(record, record.permissions, 'UPDATE')"
                      @change="onPermissionChange(record, record.permissions, 'UPDATE')"
                    />
                  </td>
                </template>
                <template v-if="column.key === 'delete'">
                  <td class="checkbox-cell" v-if="isHasPermission(record.permissions, 'DELETE')">
                    <Checkbox
                      :checked="isHasActive(record, record.permissions, 'DELETE')"
                      @change="onPermissionChange(record, record.permissions, 'DELETE')"
                    />
                  </td>
                </template>
                <template v-if="column.key === 'report'">
                  <td class="checkbox-cell" v-if="isHasPermission(record.permissions, 'REPORT')">
                    <Checkbox
                      :checked="isHasActive(record, record.permissions, 'REPORT')"
                      @change="onPermissionChange(record, record.permissions, 'REPORT')"
                    />
                  </td>
                </template>
                <template v-if="column.key === 'approve'">
                  <td class="checkbox-cell" v-if="isHasPermission(record.permissions, 'APPROVE')">
                    <Checkbox
                      :checked="isHasActive(record, record.permissions, 'APPROVE')"
                      @change="onPermissionChange(record, record.permissions, 'APPROVE')"
                    />
                  </td>
                </template>
                <template v-if="column.key === 'reject'">
                  <td class="checkbox-cell" v-if="isHasPermission(record.permissions, 'REJECT')">
                    <Checkbox
                      :checked="isHasActive(record, record.permissions, 'REJECT')"
                      @change="onPermissionChange(record, record.permissions, 'REJECT')"
                    />
                  </td>
                </template>
                <template v-if="column.key === 'cancel'">
                  <td class="checkbox-cell" v-if="isHasPermission(record.permissions, 'CANCEL')">
                    <Checkbox
                      :checked="isHasActive(record, record.permissions, 'CANCEL')"
                      @change="onPermissionChange(record, record.permissions, 'CANCEL')"
                    />
                  </td>
                </template>
                <template v-if="column.key === 'lock'">
                  <td class="checkbox-cell" v-if="isHasPermission(record.permissions, 'LOCK')">
                    <Checkbox
                      :checked="isHasActive(record, record.permissions, 'LOCK')"
                      @change="onPermissionChange(record, record.permissions, 'LOCK')"
                    />
                  </td>
                </template>
                <template v-if="column.key === 'submit'">
                  <td class="checkbox-cell" v-if="isHasPermission(record.permissions, 'SUBMIT')">
                    <Checkbox
                      :checked="isHasActive(record, record.permissions, 'SUBMIT')"
                      @change="onPermissionChange(record, record.permissions, 'SUBMIT')"
                    />
                  </td>
                </template>
                <template v-if="column.key === 'register'">
                  <td class="checkbox-cell" v-if="isHasPermission(record.permissions, 'REGISTER')">
                    <Checkbox
                      :checked="isHasActive(record, record.permissions, 'REGISTER')"
                      @change="onPermissionChange(record, record.permissions, 'REGISTER')"
                    />
                  </td>
                </template>
                <template v-if="column.key === 'send'">
                  <td class="checkbox-cell" v-if="isHasPermission(record.permissions, 'SEND')">
                    <Checkbox
                      :checked="isHasActive(record, record.permissions, 'SEND')"
                      @change="onPermissionChange(record, record.permissions, 'SEND')"
                    />
                  </td>
                </template>
                <template v-if="column.key === 'open'">
                  <td class="checkbox-cell" v-if="isHasPermission(record.permissions, 'OPEN')">
                    <Checkbox
                      :checked="isHasActive(record, record.permissions, 'OPEN')"
                      @change="onPermissionChange(record, record.permissions, 'OPEN')"
                    />
                  </td>
                </template>
                <template v-if="column.key === 'complete'">
                  <td class="checkbox-cell" v-if="isHasPermission(record.permissions, 'COMPLETE')">
                    <Checkbox
                      :checked="isHasActive(record, record.permissions, 'COMPLETE')"
                      @change="onPermissionChange(record, record.permissions, 'COMPLETE')"
                    />
                  </td>
                </template>
                <template v-if="column.key === 'accept'">
                  <td class="checkbox-cell" v-if="isHasPermission(record.permissions, 'ACCEPT')">
                    <Checkbox
                      :checked="isHasActive(record, record.permissions, 'ACCEPT')"
                      @change="onPermissionChange(record, record.permissions, 'ACCEPT')"
                    />
                  </td>
                </template>
                <template v-if="column.key === 'assign'">
                  <td class="checkbox-cell" v-if="isHasPermission(record.permissions, 'ASSIGN')">
                    <Checkbox
                      :checked="isHasActive(record, record.permissions, 'ASSIGN')"
                      @change="onPermissionChange(record, record.permissions, 'ASSIGN')"
                    />
                  </td>
                </template>
              </template>
            </Table>
          </Collapse-panel>
        </Collapse>
      </div>

      <div v-if="getAssignUser">
        <BasicTable @register="registerTable">
          <template #toolbar>
            <div class="flex">
              <!--              <a-input-->
              <!--                :placeholder="t('common.inputText')"-->
              <!--                v-model="textSearch"-->
              <!--                @change="onChangeTextSearch"-->
              <!--                allow-clear-->
              <!--              />-->
              <a-button type="primary" class="ml-5" @click="handleAdd">
                {{ t('permission.addUserToRole') }}
              </a-button>
            </div>
          </template>
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <TableAction
                :actions="[
                  {
                    icon: 'ant-design:delete-outlined',
                    color: 'error',
                    onClick: handleDelete.bind(null, record),
                  },
                ]"
              />
            </template>
          </template>
        </BasicTable>
        <AModal
          :title="t('permission.addUserToRole')"
          v-model:open="openModalEdit"
          :confirm-loading="editLoading"
          @ok="handleCreate"
          :ok-text="t('permission.addUserToRole')"
          :cancel-text="t('permission.cancel')"
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
      </div>
    </Space>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { computed, ref, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { Checkbox, Collapse, CollapsePanel, message, Space, Table } from 'ant-design-vue';
  import HeaderCell from '@/components/Table/src/components/HeaderCell.vue';
  import {
    assignPermissionsToRole,
    getPermissionByRoleId,
    getPermissionByRoleIdAndClientId,
    getPermissionTree,
    getUserByRole,
    roleUser,
  } from '@/api/sys/permission';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { roleUserColumns, searchUserFormSchema } from '@/views/permissions/permissions.data';
  import { BasicForm, useForm } from '@/components/Form';
  import { useI18n } from '@/hooks/web/useI18n';
  // import { useDebounceFn } from '@vueuse/core';

  const emit = defineEmits(['success', 'register']);

  const { t } = useI18n();
  const roleId = ref('');
  const roleName = ref('');
  const roleCode = ref('');
  const title = ref('');
  const isAssignUser = ref(false);
  const lstPermissionRoleRoot = ref<string[]>([]);
  const lstPermissionRole = ref<string[]>([]);
  // const textSearch = ref('');
  // const debouncedRequest = useDebounceFn(() => 'response', 500);

  const openModal = ref(false);
  const confirmLoading = ref(false);
  const menuPermissions = ref<Recordable>([]);
  const dataSource = ref<any>([]);
  const nameRecord = ref('');
  const id = ref(null);
  const clientId = ref('');

  const openModalEdit = ref(false);
  const editLoading = ref(false);

  const columns = [
    {
      title: '',
      dataIndex: 'displayName',
    },
    {
      title: 'CREATE',
      key: 'create',
    },
    {
      title: 'READ',
      key: 'read',
    },
    {
      title: 'UPDATE',
      key: 'update',
    },
    {
      title: 'DELETE',
      key: 'delete',
    },
    {
      title: 'REPORT',
      key: 'report',
    },
    {
      title: 'APPROVE',
      key: 'approve',
    },
    {
      title: 'REJECT',
      key: 'reject',
    },
    {
      title: 'CANCEL',
      key: 'cancel',
    },
    {
      title: 'LOCK',
      key: 'lock',
    },
    {
      title: 'SUBMIT',
      key: 'submit',
    },
    {
      title: 'REGISTER',
      key: 'register',
    },
    {
      title: 'SEND',
      key: 'send',
    },
    {
      title: 'OPEN',
      key: 'open',
    },
    {
      title: 'COMPLETE',
      key: 'complete',
    },
    {
      title: 'ASSIGN',
      key: 'assign',
    },
    {
      title: 'ACCEPT',
      key: 'accept',
    },
  ];

  const [editForm, { resetFields, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: searchUserFormSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false, destroyOnClose: true });
    isAssignUser.value = data?.isAssignUser;
    roleId.value = data?.record?.roleId;
    roleName.value = data?.record?.roleName;
    roleCode.value = data?.record?.roleCode;
    clientId.value = data?.clientId;

    if (isAssignUser.value) {
      title.value = 'Assign an account to a role ' + roleName.value;
      await search({});
    } else {
      title.value = 'Assign permissions to a role ' + roleName.value;
      await getPermissionRole();
      await loadPermissionTree();
    }
  });

  const [registerTable, { getForm, setLoading, getPaginationRef, setPagination }] = useTable({
    title: '',
    dataSource: dataSource,
    columns: roleUserColumns,
    bordered: true,
    showTableSetting: false,
    actionColumn: {
      width: 60,
      title: t('permission.action'),
      dataIndex: 'action',
      align: 'center',
      // slots: { customRender: 'action' },
      fixed: 'right',
    },
    handleSearchInfoFn(info) {
      search(getForm().getFieldsValue());
      return info;
    },
    onChange(pagination, filters, sorter, extra) {
      search(getForm().getFieldsValue());
    },
  });

  const getTitle = computed(() => title.value);
  const getAssignUser = computed(() => isAssignUser.value);

  function isHasActive(record: Recordable, permissionArr: string[], type: string) {
    const isTab = 'TAB' === record.type && permissionArr.length === 1;
    const permissions: string[] = permissionArr.filter((p) => p.startsWith(type));
    if (permissions.length > 0) {
      let per = permissions[0];
      if (isTab) {
        per = per.replace('READ_', '');
      }
      return lstPermissionRole?.value?.includes(per);
    }
    return false;
  }

  function isHasPermission(permissionArr: string[], type: string) {
    return permissionArr.some((p) => p.startsWith(type));
  }

  function onPermissionChange(record: Recordable, permissionArr: string[], type: string) {
    const isTab = 'TAB' === record.type && permissionArr.length === 1;

    const permissions = permissionArr.filter((p) => p.startsWith(type));
    if (permissions.length > 0) {
      let per = permissions[0];
      if (isTab) {
        per = per.replace('READ_', '');
      }

      if (!lstPermissionRole?.value?.includes(per)) {
        lstPermissionRole?.value?.push(per);
        // console.log('add', lstPermissionRole.value);
      } else {
        lstPermissionRole.value = lstPermissionRole?.value?.filter((p) => p !== per);
        // console.log('remove', lstPermissionRole.value);
      }
    }
  }

  async function getPermissionRole() {
    try {
      const result = await getPermissionByRoleIdAndClientId({
        roleId: roleId.value,
        clientId: clientId.value,
      });

      lstPermissionRole.value = [...result.permissions];
      lstPermissionRoleRoot.value = [...result.permissions];
    } catch (e) {
      console.log(e);
    }
  }

  async function loadPermissionTree() {
    try {
      menuPermissions.value = await getPermissionTree({ clientId: clientId.value });
    } catch (e) {
      console.log(e);
    }
  }

  async function handleSubmit() {
    try {
      const newItems = lstPermissionRole?.value?.filter(
        (item) => !lstPermissionRoleRoot?.value?.includes(item),
      );

      const deletedItems = lstPermissionRoleRoot?.value?.filter(
        (item) => !lstPermissionRole?.value?.includes(item),
      );

      await assignPermissionsToRole({
        roleId: roleId.value,
        clientId: clientId.value,
        addPolicies: newItems,
        delPolicies: deletedItems,
      });

      closeDrawer();
      message.success(`${getTitle.value} successfully`);
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

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
      const result = await getUserByRole({
        ...params,
        roleId: roleId.value,
        pageInfo: {
          ...unref(getPagination),
        },
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

  // const onChangeTextSearch = async (val: any) => {
  //   const value = await debouncedRequest();
  //   if (value === 'response') {
  //     await search({ keyword: val.target.value });
  //   }
  // };

  async function handleAdd() {
    openModalEdit.value = true;
    await resetFields();
  }

  async function handleCreate() {
    try {
      setLoading(true);
      const params = await validate();
      await roleUser({
        roleId: roleId.value,
        roleName: roleCode.value,
        addUsers: [params?.userId],
      });
      await search({});
      openModalEdit.value = false;
    } finally {
      setLoading(false);
    }
  }

  function handleDelete(record: Recordable) {
    openModal.value = true;
    id.value = record?.id;
    nameRecord.value = record?.name;
  }

  const handleOk = async () => {
    try {
      confirmLoading.value = true;

      await roleUser({ roleId: roleId.value, roleName: roleCode.value, delUsers: [id.value] });
      await search({});
      openModal.value = false;
      message.success(t('common.deleteSuccess'));
    } finally {
      confirmLoading.value = false;
    }
  };
</script>
<style lang="less" scoped>
  .checkbox-cell {
    display: flow;
    text-align: center;
  }

  .ant-space {
    width: 100%;
  }

  ::v-deep(.ant-checkbox .ant-checkbox-input) {
    opacity: 100 !important;
  }
</style>
