<template>
  <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5 custom-table-body">
    <template #toolbar>
      <div class="flex">
        <a-button v-if="!checkView" type="primary" class="ml-5" @click="addItem"
          ><Icon :icon="'ion:add-outline'" /> {{ t('common.create') }}
        </a-button>
      </div>
    </template>
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'action'">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:delete-outlined',
              tooltip: t('contractBuy.delete'),
              color: 'error',
              disabled: checkView,
              onClick: handelDelete.bind(null, record, index),
            },
          ]"
        />
      </template>
    </template>
  </BasicTable>
</template>
<script lang="ts" setup>
  import { ref, onMounted, watch, nextTick } from 'vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { useI18n } from '@/hooks/web/useI18n';
  import { cloneDeep } from 'lodash-es';
  import {
    getAllVariantAttribute,
    getAllVariantGroupAttribute,
  } from '@/api/setting/service-product';

  const { t } = useI18n();
  const props = defineProps({
    data: {
      type: Array,
      default: () => [],
    },
    checkView: {
      type: Boolean,
      default: false,
    },
    checkUpdate: {
      type: Boolean,
      default: false,
    },
  });
  const listGroupAttribute = ref([]);
  const listAttribute = ref([]);

  const emit = defineEmits(['attribute', 'register', 'add-del-data']);
  let dataTable = ref<any>([]);
  const [registerTable, { setLoading, setColumns, getPaginationRef, setPagination }] = useTable({
    title: t('common.otherInformation'),
    dataSource: dataTable,
    columns: [
      {
        title: t('form.setting.groupAttributeV2'),
        dataIndex: 'variantGroupId',
        editDynamicDisabled: props.checkView,
        editRow: true,
        editComponent: 'ApiSelect',
        editComponentProps: ({ text, record, index }) => {
          return {
            options: listGroupAttribute.value,
            valueField: 'id',
            labelField: 'groupName',
          };
        },
      },
      {
        title: t('form.setting.attribute'),
        dataIndex: 'variantAttributeId',
        editRow: true,
        editDynamicDisabled: props.checkView,
        editComponent: 'ApiSelect',
        editComponentProps: ({ text, record, index }) => {
          return {
            api: getAllVariantAttribute,
            valueField: 'id',
            labelField: 'attributeName',
            resultField: 'body',
            params: { status: 1, variantGroupId: record.variantGroupId },
            onChange: (e, item) => {
              record['variantGroupId'] = item?.variantGroupId;
              // record.variantGroupId = item?.variantGroupId;
            },
          };
        },
      },
    ],
    pagination: {
      pageSizeOptions: ['10', '20', '50'],
      pageSize: 50,
    },
    rowKey: 'variantAttributeId',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 120,
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      fixed: 'right',
    },
  });

  watch(
    () => props.data,
    (value) => {
      dataTable.value = value.map((item: any) => {
        return {
          id: item?.id,
          editable: true,
          variantAttributeId: item?.variantAttributeId,
          variantGroupId: item?.variantGroupId,
        };
      });
    },
    {
      deep: true,
    },
  );
  watch(
    () => dataTable.value,
    (value) => {
      const listAttributeByDataTable = value?.map((item) => item?.variantAttributeId);
      listAttribute.value?.forEach((item: any) => {
        item.disabled = false;
        if (listAttributeByDataTable?.includes(item?.id)) {
          item.disabled = true;
        }
      });
    },
    {
      deep: true,
    },
  );

  watch(
    () => props.checkView,
    (value) => {
      loadColumn();
    },
    {
      deep: true,
    },
  );

  async function loadColumn() {
    setColumns([
      {
        title: t('form.setting.groupAttributeV2'),
        dataIndex: 'variantGroupId',
        editDynamicDisabled: props.checkView,
        editRow: true,
        editComponent: 'ApiSelect',
        editComponentProps: ({ text, record, index }) => {
          return {
            options: listGroupAttribute.value,
            valueField: 'id',
            labelField: 'groupName',
          };
        },
      },
      {
        title: t('form.setting.attribute'),
        dataIndex: 'variantAttributeId',
        editRow: true,
        editDynamicDisabled: props.checkView,
        editComponent: 'ApiSelect',
        editComponentProps: ({ text, record, index }) => {
          return {
            api: getAllVariantAttribute,
            valueField: 'id',
            labelField: 'name',
            resultField: 'body',
            params: { status: 1, variantGroupId: record.variantGroupId },
            onChange: (e, item) => {
              record.variantGroupId = item.variantGroupId;
            },
          };
        },
      },
    ]);
    await nextTick();
  }

  const handelDelete = (record, index) => {
    try {
      setLoading(true);
      dataTable.value = dataTable.value
        ?.map((el: any) => ({ ...el }))
        ?.filter((item: any) => item?.variantAttributeId !== record?.variantAttributeId);
      const paginationRef: any = getPaginationRef();
      const pageSize = paginationRef?.pageSize || 10;
      setPagination({
        current: dataTable.value?.length > 0 ? Math.ceil(dataTable.value?.length / pageSize) : 1,
      });
      if (record?.id) {
        emit('add-del-data', record?.id);
      }
    } catch (err) {
      //
    } finally {
      setLoading(false);
    }
  };

  const addItem = async () => {
    try {
      setLoading(true);
      await dataTable.value.push({
        variantAttributeId: null,
        value: '',
        valueType: '',
        editable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  onMounted(async () => {
    try {
      const results = await Promise.all([
        getAllVariantGroupAttribute({
          status: 1,
        }),
      ]);
      listGroupAttribute.value = results?.[0];
      const listAttributeByDataTable = dataTable?.value?.map((item) => item?.variantAttributeId);
      listGroupAttribute.value?.forEach((item: any) => {
        item.disabled = false;
        if (listAttributeByDataTable?.includes(item?.id)) {
          item.disabled = true;
        }
      });
      if (!props?.checkView && !props?.checkUpdate) {
        const listAttributeInit = cloneDeep(listGroupAttribute);
        dataTable.value =
          listAttributeInit?.value?.map((item) => {
            return { variantAttributeId: null, value: '', valueType: '', editable: true };
          }) || [];
      }
    } catch (error) {
      console.error(error);
    }
  });
  defineExpose({
    dataTable,
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
