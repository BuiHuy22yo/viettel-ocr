<template>
  <div class="mb-5">
    <Steps v-model:current="current" type="navigation" size="small">
      <Step v-for="(step, index) in dataTable" :key="index" :title="step.shippingStatusName" />
    </Steps>
  </div>
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
  import { getAllShippingStatus } from '@/api/setting/service-product';
  import { Steps, Step } from 'ant-design-vue';

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
  const listAttribute = ref([]);
  const nextOrderNumber = ref(1);
  const current = ref<number>(0);

  const emit = defineEmits(['attribute', 'register', 'add-del-data']);
  let dataTable = ref<any>([]);
  const [registerTable, { setLoading, setColumns, getPaginationRef, setPagination }] = useTable({
    title: t('form.setting.processSetup'),
    dataSource: dataTable,
    columns: [
      {
        title: t('form.setting.shippingStatusName'),
        dataIndex: 'shippingStatusId',
        editDynamicDisabled: props.checkView,
        editRow: true,
        editComponent: 'ApiSelect',
        editComponentProps: ({ text, record, index }) => {
          return {
            api: getAllShippingStatus,
            valueField: 'id',
            labelField: 'name',
            resultField: 'body',
            params: { status: 1 },
            onChange: (e, item) => {
              record['shippingStatusName'] = item?.label;
            },
          };
        },
      },
      {
        title: t('contractBuy.value'),
        dataIndex: 'shippingStatusName',
        editDynamicDisabled: props.checkView,
        editComponent: 'Input',
        ifShow: false,
      },
    ],
    pagination: {
      pageSizeOptions: ['10', '20', '50'],
      pageSize: 50,
    },
    rowKey: 'shippingStatusId',
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
        nextOrderNumber.value = item?.orderNumber + 1;
        return {
          id: item?.id,
          editable: true,
          shippingStatusId: item?.id,
          orderNumber: item?.orderNumber,
          shippingStatusName: item?.name,
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
        title: t('form.setting.shippingStatusName'),
        dataIndex: 'shippingStatusId',
        editDynamicDisabled: props.checkView,
        editRow: true,
        editComponent: 'ApiSelect',
        editComponentProps: ({ text, record, index }) => {
          return {
            api: getAllShippingStatus,
            valueField: 'id',
            labelField: 'name',
            resultField: 'body',
            params: { status: 1 },
            onChange: (e, item) => {
              record['shippingStatusName'] = item?.name;
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
        ?.filter((item: any) => item?.shippingStatusId !== record?.shippingStatusId);
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
      let orderNumber = nextOrderNumber.value;
      console.log('orderNumber ', orderNumber);
      setLoading(true);
      await dataTable.value.push({
        shippingStatusId: null,
        shippingStatusName: null,
        orderNumber: orderNumber,
        editable: true,
      });

      nextOrderNumber.value = nextOrderNumber.value + 1;
    } finally {
      setLoading(false);
    }
  };

  onMounted(async () => {
    // try {
    //   const results = await Promise.all([
    //     getAllVariantGroupAttribute({
    //       status: 1,
    //     }),
    //   ]);
    //   listGroupAttribute.value = results?.[0];
    //   const listAttributeByDataTable = dataTable?.value?.map((item) => item?.variantAttributeId);
    //   listGroupAttribute.value?.forEach((item: any) => {
    //     item.disabled = false;
    //     if (listAttributeByDataTable?.includes(item?.id)) {
    //       item.disabled = true;
    //     }
    //   });
    //   if (!props?.checkView && !props?.checkUpdate) {
    //     const listAttributeInit = cloneDeep(listGroupAttribute);
    //     dataTable.value =
    //       listAttributeInit?.value?.map((item) => {
    //         return { variantAttributeId: null, value: '', valueType: '', editable: true };
    //       }) || [];
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
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
