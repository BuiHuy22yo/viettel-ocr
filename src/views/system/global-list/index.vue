<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"
          ><Icon :icon="'charm:plus'" />Create</a-button
        >
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="createActions(record)" />
        </template>
      </template>
      <template #expandedRowRender="{ record }">
        <ChildrentGlobalList
          v-model:data-source="record.globalListDetails"
          :id="buildUUID()"
          :global-list-id="record.globalListId"
        />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { buildUUID } from '@/utils/uuid';
  import { insertGlobalList, searchGlobalList, updateGlobalList } from '@/api/sys/global_list';
  import { computed, onMounted, ref, unref } from 'vue';
  import Icon from '@/components/Icon/Icon.vue';
  import {
    BasicTable,
    useTable,
    TableAction,
    BasicColumn,
    ActionItem,
    EditRecordRow,
  } from '@/components/Table';
  import ChildrentGlobalList from './ChildrenGlobalList.vue';

  import { cloneDeep } from 'lodash-es';
  import { useMessage } from '@/hooks/web/useMessage';
  import { globalListRes, searchFormSchema } from './type.data';

  const columns: BasicColumn[] = [
    {
      title: 'Code',
      dataIndex: 'code',
      editRow: true,
      editComponent: 'Input',
      align: 'left',
      width: 150,
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
      align: 'left',
      width: 150,
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
      align: 'left',
      editComponentProps: () => {
        return {
          maxlength: 255,
        };
      },
      width: 300,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      editRow: true,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          {
            label: 'Active',
            value: '1',
          },
          {
            label: 'Inactive',
            value: '0',
          },
          // {
          //   label: 'Deleted',
          //   value: '2',
          // },
        ],
      },
      width: 100,
    },
  ];
  const dataSource = ref<Nullable<globalListRes[]>>([]);

  const { createMessage: msg } = useMessage();
  const [registerTable, { setLoading, getPaginationRef, setPagination }] = useTable({
    title: 'Global List',
    dataSource: dataSource,
    columns: columns,
    showTableSetting: true,
    showIndexColumn: true,
    tableSetting: { fullScreen: true },
    useSearchForm: true,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    actionColumn: {
      width: 160,
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
    },
    onChange: searchGL,
    handleSearchInfoFn(info) {
      console.log('handleSearchInfoFn', info, getPaginationRef());
      return info;
    },
  });

  function handleEdit(record: EditRecordRow<globalListRes>) {
    record.editValueRefs['globalListId'] = record.globalListId;
    record.onEdit?.(true);
  }

  async function handleDelete(record: EditRecordRow<globalListRes>) {
    try {
      setLoading(true);
      record.editValueRefs['globalListId'] = record.globalListId;
      if (record.globalListId) {
        const data = cloneDeep(record.editValueRefs);
        data.status = '2'; // update status -> delete
        const res = await updateGlobalList(data);
        console.log(res);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleCancel(record: EditRecordRow<globalListRes>) {
    if (record.globalListId) {
      record.onEdit?.(false, false);
    } else {
      dataSource.value = dataSource.value.slice(1);
    }
  }

  async function handleSave(record: EditRecordRow<globalListRes>) {
    const valid = await record.onValid?.();
    if (valid) {
      try {
        setLoading(true);
        const data = cloneDeep(record.editValueRefs);
        let res = '';
        //TODO
        if (data.globalListId) {
          res = await updateGlobalList(data);
        } else {
          res = await insertGlobalList(data);
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

  function createActions(record: EditRecordRow<globalListRes>): ActionItem[] {
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

  function handleCreate() {
    dataSource.value = [
      {
        code: '',
        name: '',
        description: '',
        status: '1',
        editable: true,
      },
      ...dataSource.value,
    ];
  }
  async function searchGL() {
    try {
      setLoading(true);
      const data: any = await searchGlobalList({ key: '', ...unref(getPagination) });
      dataSource.value = data?.content;
      setPagination({
        total: data?.totalElements,
      });
    } finally {
      setLoading(false);
    }
  }

  const getPagination = computed(() => {
    const paginationRef = getPaginationRef();
    return {
      page: paginationRef.current - 1,
      size: paginationRef.pageSize,
    };
  });

  onMounted(() => {
    searchGL();
  });
</script>
