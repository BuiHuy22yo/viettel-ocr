<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" @click="handleCreate"><Icon :icon="'charm:plus'" /></a-button>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <TableAction :actions="createActions(record)" />
      </template>
    </template>
  </BasicTable>
</template>
<script lang="ts" setup>
  import { cloneDeep } from 'lodash-es';
  import { ref, watch } from 'vue';
  import {
    BasicTable,
    useTable,
    TableAction,
    BasicColumn,
    ActionItem,
    EditRecordRow,
  } from '@/components/Table';
  import Icon from '@/components/Icon/Icon.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { globalListDetailRes } from './type.data';
  import { insertGlobalListDetail, updateGlobalListDetail } from '@/api/sys/global_list';

  const columns: BasicColumn[] = [
    {
      title: 'Value',
      dataIndex: 'value',
      editRow: true,
      editComponent: 'Input',
      editRule: true,
      editComponentProps: () => {
        return {
          maxlength: 500,
        };
      },
    },
    {
      title: 'Code',
      dataIndex: 'code',
      editRow: true,
      editComponent: 'Input',
      editRule: true,
      editComponentProps: () => {
        return {
          maxlength: 100,
        };
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      editRow: true,
      editComponent: 'Input',
      editRule: true,
      editComponentProps: () => {
        return {
          maxlength: 255,
        };
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      editRow: true,
      editComponent: 'Input',
      editComponentProps: () => {
        return {
          maxlength: 255,
        };
      },
    },
    {
      title: 'DisplayOrder',
      dataIndex: 'order',
      editRow: true,
      editComponent: 'InputNumber',
      editRule: true,
      editComponentProps: () => {
        return {
          min: 0,
          max: 1000,
        };
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      editRow: true,
      editComponent: 'Select',
      editRule: true,
      editComponentProps: {
        options: [
          {
            label: 'Active',
            value: '1',
          },
          {
            label: 'Inactive',
            value: '2',
          },
        ],
      },
    },
  ];
  const dataTable = ref<globalListDetailRes[]>([]);
  const props = defineProps({
    dataSource: {
      type: Array as globalListDetailRes[],
      default: () => [],
    },
    id: {
      type: String,
      default: '',
    },
    globalListId: {
      type: Number,
      default: 0,
    },
  });
  const emit = defineEmits(['update:dataSource']);
  const { createMessage: msg } = useMessage();
  const [registerTable, { setLoading }] = useTable({
    pagination: false,
    title: '',
    dataSource: dataTable,
    columns: columns,
    showIndexColumn: false,
    showTableSetting: false,
    tableSetting: { fullScreen: false },
    useSearchForm: false,
    scroll: { y: 700 },
    actionColumn: {
      width: 160,
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
    },
  });

  function handleEdit(record: EditRecordRow<globalListDetailRes>) {
    record.editValueRefs['globalListDetailId'] = record.globalListDetailId;
    record.editValueRefs['globalListId'] = record.globalListId;
    record.onEdit?.(true);
  }

  async function handleCancel(record: EditRecordRow<globalListDetailRes>) {
    if (record && record.globalListDetailId) {
      record.onEdit?.(false, false);
    } else {
      dataTable.value = dataTable.value.slice(1);
    }
  }

  async function handleSave(record: EditRecordRow<globalListDetailRes>) {
    record.editValueRefs['globalListId'] = record.globalListId;
    const valid = await record.onValid?.();
    if (valid) {
      try {
        setLoading(true);
        const data = cloneDeep(record.editValueRefs);
        let res = '';
        //TODO
        if (data.globalListDetailId) {
          res = await updateGlobalListDetail(data);
        } else {
          res = await insertGlobalListDetail(data);
        }
        const pass = res && (await record.onEdit?.(false, true));
        if (pass) {
          msg.success({ content: 'Data saved', key: 'saving' });
        }
      } catch (error) {
        msg.error({ content: 'Save failed', key: 'saving' });
      } finally {
        setLoading(false);
      }
    } else {
      msg.error({ content: 'Please fill in the correct data', key: 'saving' });
    }
  }

  function createActions(record: EditRecordRow<globalListDetailRes>): ActionItem[] {
    if (!record.editable) {
      return [
        {
          icon: 'clarity:note-edit-line',
          tooltip: 'Edit Global List',
          onClick: handleEdit.bind(null, record),
        },
        {
          icon: 'ant-design:delete-outlined',
          color: 'error',
          tooltip: 'Delete Global List',
          popConfirm: {
            title: 'Do you confirm deletion?',
            placement: 'left',
            confirm: handleDelete.bind(null, record),
          },
        },
      ];
    }
    return [
      {
        label: 'Save',
        onClick: handleSave.bind(null, record),
      },
      {
        label: 'Cancel',
        popConfirm: {
          title: 'Whether to cancel editing',
          confirm: handleCancel.bind(null, record),
        },
      },
    ];
  }

  async function handleDelete(record: EditRecordRow<globalListDetailRes>) {
    try {
      setLoading(true);
      record.editValueRefs['globalListId'] = record.globalListId;
      record.editValueRefs['globalListDetailId'] = record.globalListDetailId;
      if (record.globalListId) {
        const data = cloneDeep(record.editValueRefs);
        data.status = '2'; // update status -> delete
        // const res = await updateGlobalListDetail(data);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleCreate() {
    emit('update:dataSource', [
      {
        code: '',
        name: '',
        description: '',
        status: '1',
        editable: true,
        displayOrder: 0,
        value: '',
        globalListId: props.globalListId,
      },
      ...props.dataSource,
    ]);
  }
  watch(
    () => props,
    async (value) => {
      dataTable.value = value?.dataSource;
    },
    { deep: true },
  );
</script>
<style lang="less">
  .ant-table.ant-table-layout-fixed.ant-table-fixed-header.ant-table-fixed-column.ant-table-scroll-horizontal.ant-table-has-fix-right.ant-table-middle {
    margin-block: 0 !important;
    margin-inline: 0 0 !important;
  }
</style>
