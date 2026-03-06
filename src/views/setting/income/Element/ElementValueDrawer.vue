<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="800px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
    <BasicTable @register="registerTable" @edit-change="handleEditEnd">
      <template #toolbar>
        <div class="flex">
          <a-button type="primary" @click="handleCreate" class="ml-5"
            ><Icon :icon="'ion:add-outline'" />{{ t('common.create') }}
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
    <StaffDrawer
      @register="registerDrawerStaff"
      @success="handleSuccess"
      :list-staff="dataSource"
    />
  </BasicDrawer>
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
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicDrawer, useDrawer, useDrawerInner } from '@/components/Drawer';
  import {
    createOrUpdateElementValue,
    deleteElementValue,
    getAllElementValue,
  } from '@/api/setting/income';
  import { message } from 'ant-design-vue';
  import { BasicTable, useTable, BasicColumn, TableAction } from '@/components/Table';
  import StaffDrawer from './StaffDrawer.vue';

  import Icon from '@/components/Icon/Icon.vue';
  import { useI18n } from '@/hooks/web/useI18n';

  const { t } = useI18n();
  const formSchemaElementValue: any = [
    {
      field: 'elementName',
      label: t('form.setting.name'),
      component: 'Input',
      componentProps: {
        disabled: true,
      },
    },
  ];
  const columns: BasicColumn[] = [
    {
      title: t('form.setting.staffName'),
      dataIndex: 'staffName',
    },
    {
      title: t('form.setting.position'),
      dataIndex: 'position',
    },
    {
      title: 'value',
      dataIndex: 'value',
      edit: true,
      editable: true,
      editRule: true,
      editComponent: 'InputNumber',
      width: 200,
      editComponentProps: ({ text }) => {
        return {
          max: 1000000000000000,
          min: 0,
        };
      },
    },
  ];
  const dataSource = ref<any>([]);
  const openModal = ref(false);
  const confirmLoading = ref(false);

  const nameRecord = ref('');
  const id = ref(null);
  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const dataRecord = ref<any>({});
  const [registerDrawerStaff, { openDrawer }] = useDrawer();

  const [registerForm, { resetFields, setFieldsValue }] = useForm({
    labelWidth: 200,
    baseColProps: { span: 24 },
    schemas: formSchemaElementValue,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false, destroyOnClose: true });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      dataRecord.value = { ...data.record };
      setFieldsValue({
        ...data.record,
      });
    }
    dataSource.value = await getAllElementValue({
      incomeElementId: data.record?.id,
    });
  });
  const [registerTable] = useTable({
    title: '',
    columns: columns,
    showIndexColumn: false,
    bordered: true,
    dataSource,
    actionColumn: {
      width: 70,
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      fixed: 'right',
    },
  });

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEditEnd({ value, index }: Recordable) {
    dataSource.value[index].value = value;
    return true;
  }

  const getTitle = computed(() => t('form.setting.createElementValue'));

  const handleSuccess = (val: any) => {
    const valClick = val.map((item: any) => {
      item.value = 0;
      item.staffId = item?.id;
      delete item?.id;
      return item;
    });
    dataSource.value = [...dataSource.value, ...valClick];
  };

  function handleDelete(record: Recordable) {
    openModal.value = true;
    id.value = record?.id;
    nameRecord.value = record?.staffName;
  }

  const handleOk = async () => {
    try {
      confirmLoading.value = true;
      await deleteElementValue({ id: id.value });
      dataSource.value = await getAllElementValue({
        incomeElementId: unref(dataRecord)?.id,
      });
      openModal.value = false;
      message.success(t('common.deleteSuccess'));
    } finally {
      confirmLoading.value = false;
    }
  };

  async function handleSubmit() {
    try {
      setDrawerProps({ confirmLoading: true });
      const req: any = {
        incomeElementId: dataRecord.value?.id,
        incomeElementValueRequestList: dataSource.value?.map((item: any) => {
          return {
            id: item?.id,
            staffId: item?.staffId,
            value: item?.value,
          };
        }),
      };
      await createOrUpdateElementValue(req);
      closeDrawer();
      message.success(`${getTitle.value} ${t('common.successfully')}`);
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
