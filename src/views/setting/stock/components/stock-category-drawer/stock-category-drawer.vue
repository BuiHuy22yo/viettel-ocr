<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="80%"
    @ok="handleSubmit"
    :showOkBtn="!isView"
  >
    <BasicForm @register="registerForm" class="vben-basic-form--compact">
      <template #stockAttributeTable>
        <BasicTable
          @register="registerStockAttributeTable"
          :data="dataStockAttribute"
          class="w-4/4 xl:w-5/5 custom-table-body"
        >
          <template #headerCell="{ column }">
            <slot name="headerCell" v-bind="{ column }">
              <HeaderCell :column="column" align="center" />
            </slot>
          </template>
          <template #toolbar>
            <div class="flex">
              <a-button
                :disabled="isView || disableCreateAttribute"
                type="primary"
                class="ml-2"
                @click="addItemStockAttribute"
              >
                <Icon :icon="'ion:add-outline'" />
                {{ t('common.create') }}
              </a-button>
            </div>
          </template>
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'action'">
              <TableAction
                :actions="[
                  {
                    icon: 'ant-design:delete-outlined',
                    tooltip: t('stock.stockExportTab.drawer.productListTable.action.delete'),
                    color: 'error',
                    disabled: unref(isView),
                    onClick: handleDeleteStockAttribute.bind(null, record, index),
                  },
                ]"
              />
            </template>
          </template>
        </BasicTable>
      </template>
      <template #addStaffToStock>
        <BasicTable
          @register="registerTable"
          :data="dataAddStaffToStockTable"
          class="w-4/4 xl:w-5/5 custom-table-body"
        >
          <template #headerCell="{ column }">
            <slot name="headerCell" v-bind="{ column }">
              <HeaderCell :column="column" align="center" />
            </slot>
          </template>
        </BasicTable>
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { computed, h, onMounted, onUnmounted, ref, unref, watch } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { Checkbox } from 'ant-design-vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import {
    createStockCategory,
    getAllStockAttributeApi,
    getAllStockByStatus,
    getAllStockTypeApi,
    updateStockCategory,
  } from '@/api/setting/stock-category';
  import { BasicColumn, BasicTable, TableAction, useTable } from '@/components/Table';
  import { getAllStaff } from '@/api/staff';
  import { createStockStaff, getStockStaffByStockId } from '@/api/stock-staff';
  import { useMessage } from '@/hooks/web/useMessage';
  import Icon from '@/components/Icon/Icon.vue';
  import { cloneDeep, uniqueId } from 'lodash-es';
  import { isNullOrEmpty } from '@/utils/is';
  import dayjs from 'dayjs';
  import {
    removeVietnameseTones,
    validatorCode,
    validatorPhone,
  } from '@/utils/helper/validatorForm';
  import { getListGlobalValueByCode } from '@/api/sys/global_list';
  import { STOCK_CONSTANT } from '@/constant/stock-constant';
  import HeaderCell from '@/components/Table/src/components/HeaderCell.vue';

  const { createMessage: message } = useMessage();
  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(false);
  const isView = ref(false);
  const dataRecord = ref<any>({});
  let dataAddStaffToStockTable = ref<any>([]);
  const isAddStaffToStock = ref(false);
  const selectedRowsData = ref([]);
  const disableCreateAttribute = ref(false);
  let stockAttributeList = ref([]);
  let stockParentList = ref([]);
  const drawerFormSchema: any = [
    {
      field: 'isView',
      label: 'isView',
      show: false,
    },
    {
      field: 'isUpdate',
      label: 'isUpdate',
      show: false,
    },
    {
      field: 'dataManagementUnit',
      show: false,
    },
    {
      field: 'stockCode',
      label: t('stock.stockCategory.drawer.panelInformation.stockCode'),
      required: true,
      component: 'Input',
      rules: [
        {
          validator: async (_, value) => {
            return validatorCode(value);
          },
        },
      ],
      componentProps: ({ formModel }) => {
        return {
          disabled: formModel.isView || formModel.isUpdate,
          maxlength: 20,
          onChange: (e) => {
            if (!formModel.isView && !formModel.isUpdate) {
              if (e.target?.value) {
                const text = (removeVietnameseTones(e.target?.value) || '').replace(
                  /[^a-zA-Z0-9_]/g,
                  '',
                );
                formModel.stockCode = text.toUpperCase();
              }
            }
          },
        };
      },
      colProps: { span: 6 },
    },
    {
      field: 'stockName',
      label: t('stock.stockCategory.drawer.panelInformation.stockName'),
      required: true,
      component: 'Input',
      componentProps: ({ formModel }) => {
        return {
          disabled: formModel.isView,
          maxlength: 200,
        };
      },
      colProps: { span: 6 },
    },
    {
      field: 'stockLevel',
      label: t('stock.stockCategory.drawer.panelInformation.stockLevel'),
      component: 'ApiSelect',
      required: true,
      componentProps: ({ formModel, formActionType }) => {
        return {
          disabled: formModel.isView,
          options: [
            {
              label: t('stock.stockCategory.common.stockTypeList.stockParent'),
              value: 0,
            },
            {
              label: t('stock.stockCategory.common.stockTypeList.affiliatedStock'),
              value: 1,
            },
          ],
          onChange: (val: any) => {
            formModel.stockParent = undefined;
            const { updateSchema } = formActionType;
            updateSchema({
              field: 'stockParent',
              required: val === 1,
              message: t('stock.stockCategory'),
            });
          },
        };
      },
      colProps: { span: 6 },
    },
    {
      field: 'stockParent',
      component: 'ApiSelect',
      label: t('stock.stockCategory.drawer.panelInformation.stockParent'),
      required: false,
      componentProps: ({ formModel }) => {
        return {
          options: stockParentList.value || [],
          valueField: 'id',
          labelField: 'stockName',
          resultField: 'body',
          disabled: formModel.isView || formModel.stockLevel === 0,
        };
      },
      colProps: { span: 6 },
    },
    {
      field: 'serviceType',
      component: 'ApiSelect',
      label: t('stock.stockCategory.drawer.panelInformation.serviceType'),
      required: true,
      componentProps: ({ formModel }) => {
        return {
          api: getListGlobalValueByCode,
          valueField: 'value',
          labelField: 'name',
          resultField: 'body',
          params: { code: 'SERVICE_TYPE_STOCK', name: '', status: 1 },
          disabled: formModel.isView,
        };
      },
      colProps: { span: 6 },
    },
    {
      field: 'phone',
      label: t('stock.stockCategory.drawer.panelInformation.phone'),
      component: 'Input',
      rules: [
        {
          validator: async (_, value) => {
            return validatorPhone(value);
          },
        },
      ],
      componentProps: ({ formModel }) => {
        return {
          disabled: formModel.isView,
          maxlength: 20,
        };
      },
      colProps: { span: 6 },
    },
    {
      field: 'longitude',
      label: t('stock.stockCategory.drawer.panelInformation.longitude'),
      component: 'InputNumberCustom',
      required: true,
      componentProps: ({ formModel }) => {
        return {
          disabled: formModel.isView,
          maxlength: 50,
        };
      },
      colProps: { span: 6 },
    },
    {
      field: 'latitude',
      label: t('stock.stockCategory.drawer.panelInformation.latitude'),
      component: 'InputNumberCustom',
      required: true,
      componentProps: ({ formModel }) => {
        return {
          disabled: formModel.isView,
          maxlength: 500,
        };
      },
      colProps: { span: 6 },
    },
    {
      field: 'address',
      label: t('stock.stockCategory.drawer.panelInformation.address'),
      component: 'Input',
      componentProps: ({ formModel }) => {
        return {
          disabled: formModel.isView,
          maxlength: 500,
        };
      },
      colProps: { span: 24 },
    },
    {
      field: 'managementUnit',
      label: t('stock.stockCategory.drawer.panelInformation.managementUnit'),
      required: true,
      component: 'ApiTreeSelect',
      componentProps: ({ formModel }) => {
        return {
          disabled: formModel.isView,
          treeData: formModel.dataManagementUnit || [],
          valueField: 'value',
          labelField: 'companyName',
          resultField: 'body',
          labelInValue: true,

          onChange: (val, label, extra) => {
            if (!isNullOrEmpty(extra)) {
              let wardName = extra?.triggerNode?.props?.wardName;
              let districtName = extra?.triggerNode?.props?.districtName;
              let provinceName = extra?.triggerNode?.props?.provinceName;
              formModel.area = [wardName, districtName, provinceName]
                .filter((part) => part)
                .join(', ');
            }
          },
        };
      },
      colProps: { span: 12 },
    },
    {
      field: 'area',
      label: t('stock.stockCategory.drawer.panelInformation.area'),
      component: 'Input',
      componentProps: () => {
        return {
          disabled: true,
        };
      },
      colProps: { span: 12 },
    },
    {
      field: 'stockType',
      component: 'ApiSelect',
      label: t('stock.stockCategory.drawer.panelInformation.warehouseType'),
      required: true,
      componentProps: ({ formModel }) => {
        return {
          api: getAllStockTypeApi,
          valueField: 'id',
          labelField: 'name',
          resultField: 'body',
          params: {
            lstStatus: [1],
          },
          disabled: formModel.isView,
        };
      },
      colProps: { span: 6 },
    },
    {
      field: 'formOfOwnership',
      component: 'ApiSelect',
      label: t('stock.stockCategory.drawer.panelInformation.formOfOwnership'),
      required: true,
      componentProps: ({ formModel }) => {
        return {
          options: STOCK_CONSTANT.STOCK_FORM_OF_OWNERSHIP,
          valueField: 'id',
          labelField: 'name',
          resultField: 'body',
          disabled: formModel.isView,
        };
      },
      colProps: { span: 6 },
    },
    {
      field: 'stockManager',
      component: 'ApiSelect',
      label: t('stock.stockCategory.drawer.panelInformation.stockManager'),
      required: true,
      componentProps: ({ formModel }) => {
        return {
          api: getAllStaff,
          valueField: 'id',
          labelField: 'staffName',
          resultField: 'body',
          params: { status: 1 },
          disabled: formModel.isView,
        };
      },
      colProps: { span: 6 },
    },
    {
      field: 'status',
      label: t('stock.stockCategory.drawer.panelInformation.status'),
      component: 'RadioButtonGroup',
      defaultValue: 1,
      colProps: { span: 6 },
      componentProps: ({ formModel }) => {
        return {
          disabled: formModel.isView,
          options: [
            {
              label: t('common.active'),
              value: 1,
            },
            {
              label: t('common.inActive'),
              value: 0,
            },
          ],
        };
      },
    },
    {
      field: 'stockAttributeTable',
      labelWidth: 300,
      slot: 'stockAttributeTable',
      colProps: {
        span: 24,
      },
    },
  ];
  const columns: BasicColumn[] = [
    {
      title: t('stock.stockCategory.drawer.table.columns.staffCode'),
      dataIndex: 'staffCode',
      width: 200,
    },
    {
      title: t('stock.stockCategory.drawer.table.columns.staffName'),
      dataIndex: 'staffName',
      key: 'staffName',
      width: 300,
    },
  ];

  const props = defineProps({
    data: {
      type: Array,
      default: () => [],
    },
    checkView: {
      type: Boolean,
      default: false,
    },
  });
  let dataStockAttribute = ref<any>([]);
  const columnsStockAttribute: BasicColumn[] = [
    {
      title: t('stock.stockCategory.drawer.stockAttribute.columns.stockAttributeId'),
      dataIndex: 'stockAttributeId',
      editComponent: 'ApiSelect',
      editRow: true,
      editDynamicDisabled: () => {
        return unref(isView);
      },
      editComponentProps: () => {
        return {
          options: stockAttributeList.value || [],
          valueField: 'id',
          labelField: 'name',
        };
      },
      width: 200,
    },
    {
      title: t('stock.stockCategory.drawer.stockAttribute.columns.stockAttributeValue'),
      dataIndex: 'stockAttributeValue',
      editRow: true,
      editComponent: 'Input',
      editDynamicDisabled: () => {
        return unref(isView);
      },
      width: 300,
    },
  ];
  const [registerForm, { resetFields, setFieldsValue, validate, setProps }] = useForm({
    labelWidth: 200,
    schemas: [],
    showActionButtonGroup: false,
  });
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await initDrawer();
    isAddStaffToStock.value = !!data?.isAddStaffToStock;
    selectedRowsData.value = [];
    await setProps({
      schemas: isAddStaffToStock.value
        ? [
            {
              field: 'addStaffToStock',
              labelWidth: 300,
              slot: 'addStaffToStock',
              colProps: {
                span: 24,
              },
            },
          ]
        : drawerFormSchema,
    });
    await resetFields();
    disableCreateAttribute.value = false;
    setDrawerProps({ confirmLoading: false, destroyOnClose: true });
    isUpdate.value = !!data?.isUpdate;
    isView.value = !!data?.isView;
    dataStockAttribute.value = [];
    try {
      await actionStockAttributeTable.reload();
    } catch (e) {
      let ignored;
    }
    stockParentList.value = [];
    if (!unref(isView) && !unref(isUpdate) && !unref(isAddStaffToStock)) {
      dataStockAttribute.value =
        stockAttributeList.value?.map((item) => {
          return {
            id: uniqueId(),
            stockAttributeId: item.id,
            stockAttributeValue: null,
            editable: true,
          };
        }) || [];
      await loadParentStockList();
    } else if (unref(isView) || unref(isUpdate)) {
      let dataTable = cloneDeep(data.record.stockAttributeMappings || []);
      dataTable?.forEach((item) => (item.editable = true));
      dataStockAttribute.value = dataTable;
      await loadParentStockList(unref(isUpdate) ? data.record.stockCode : null);
    }
    await setFieldsValue({
      ...data.record,
      isView: data?.isView,
      isUpdate: data?.isUpdate,
      dataManagementUnit: data.dataManagementUnit,
    });
    dataRecord.value = data.record;
    if (isAddStaffToStock.value) {
      await loadAllStaff(data.record);
    }
  });
  const toggleSelectAll = () => {
    selectedRowsData.value =
      selectedRowsData.value?.length === dataAddStaffToStockTable.value?.length
        ? []
        : dataAddStaffToStockTable?.value?.map((r) => r.id);
  };
  const headerCheckbox = computed(() =>
    h(Checkbox, {
      checked: selectedRowsData.value.length > 0,
      indeterminate:
        selectedRowsData.value.length > 0 &&
        selectedRowsData.value.length < dataAddStaffToStockTable.value.length,
      onChange: toggleSelectAll,
    }),
  );
  const [registerTable, { setLoading, setColumns }] = useTable({
    dataSource: dataAddStaffToStockTable,
    columns: columns,
    rowKey: 'id',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: true,
    maxHeight: 300,
    rowSelection: computed(() => {
      return {
        type: 'checkbox',
        selectedRowKeys: selectedRowsData.value,
        columnTitle: headerCheckbox,
        onSelect: (record, selected) => {
          if (selected) {
            selectedRowsData.value.push(record.id);
          } else {
            selectedRowsData.value = selectedRowsData.value.filter((id) => id !== record.id);
          }
        },
      };
    }),
  });
  const [registerStockAttributeTable, actionStockAttributeTable] = useTable({
    title: t('stock.stockCategory.drawer.stockAttribute.title'),
    dataSource: dataStockAttribute,
    columns: columnsStockAttribute,
    rowKey: 'id',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 80,
      title: t('stock.stockExportTab.drawer.productListTable.columns.action'),
      dataIndex: 'action',
      align: 'center',
      fixed: 'right',
    },
    maxHeight: 300,
  });
  const getTitle = computed(() =>
    unref(isUpdate)
      ? t('stock.stockCategory.drawer.titleUpdate')
      : unref(isView)
        ? t('stock.stockCategory.drawer.titleView')
        : unref(isAddStaffToStock)
          ? t('stock.stockCategory.drawer.titleAddStaffToStock')
          : t('stock.stockCategory.drawer.titleCreate'),
  );

  const handleSubmit = async () => {
    try {
      setDrawerProps({ confirmLoading: true, loading: true });
      if (isAddStaffToStock.value) {
        await createStockStaff({
          stockId: dataRecord.value?.id,
          staffIds: selectedRowsData.value || [],
        });
      } else {
        const values = await validate();
        if (dataStockAttribute.value?.length === 0) {
          message.error(t('stock.validate.warehouseAttributeEmpty'));
          return;
        } else {
          const filterAttributeIdEmpty = dataStockAttribute.value?.filter((item) =>
            isNullOrEmpty(item.stockAttributeId),
          );
          if (filterAttributeIdEmpty?.length > 0) {
            message.error(t('stock.validate.attributeIdInTableEmpty'));
            return;
          }
        }
        !unref(isUpdate)
          ? await createStockCategory({
              ...values,
              managementUnit: values?.managementUnit?.value,
              stockAttributeMappings: dataStockAttribute.value,
            })
          : await updateStockCategory({
              ...dataRecord.value,
              ...values,
              managementUnit: isNullOrEmpty(values?.managementUnit?.value)
                ? values?.managementUnit
                : values?.managementUnit?.value,
              stockAttributeMappings: dataStockAttribute.value,
              createdAt: dayjs(dataRecord.value.createdAt, 'DD/MM/YYYY HH:mm:ss').format(
                'YYYY-MM-DDTHH:mm:ss.SSS',
              ),
              updatedAt: isNullOrEmpty(dataRecord.value.updatedAt)
                ? null
                : dayjs(dataRecord.value.updatedAt, 'DD/MM/YYYY HH:mm:ss').format(
                    'YYYY-MM-DDTHH:mm:ss.SSS',
                  ),
            });
      }
      closeDrawer();
      message.success(`${getTitle.value} ${t('common.successfully')}`);
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false, loading: false });
    }
  };
  const loadParentStockList = async (stockCode) => {
    try {
      setDrawerProps({ confirmLoading: true, loading: true });
      stockParentList.value = await getAllStockByStatus({ status: 1 });
      if (!isNullOrEmpty(stockCode)) {
        stockParentList.value = stockParentList.value.filter(
          (item) => item.stockCode !== stockCode,
        );
      }
    } finally {
      setDrawerProps({ confirmLoading: false, loading: false });
    }
  };
  const loadAllStaff = async (data: any) => {
    try {
      setDrawerProps({ confirmLoading: true, loading: true });
      const results = await Promise.all([
        getAllStaff({ status: 1 }),
        getStockStaffByStockId({ stockId: data.id }),
      ]);
      dataAddStaffToStockTable.value = results[0];
      selectedRowsData.value = results[1]?.map((r) => r.staffId) || [];
    } finally {
      setDrawerProps({ confirmLoading: false, loading: false });
    }
  };
  const addItemStockAttribute = async () => {
    try {
      actionStockAttributeTable.setLoading(true);
      await dataStockAttribute.value.push({
        id: uniqueId(),
        stockAttributeId: null,
        stockAttributeValue: null,
        editable: true,
      });
    } finally {
      actionStockAttributeTable.setLoading(false);
    }
  };
  const handleDeleteStockAttribute = (record) => {
    const currentIndexRecord = dataStockAttribute.value.findIndex((item) => item.id === record.id);
    dataStockAttribute.value?.splice(currentIndexRecord, 1);
  };

  watch(
    () => dataStockAttribute.value,
    (value) => {
      const listAttributeByDataTable = value?.map((item) => item?.stockAttributeId);
      stockAttributeList.value?.forEach((item: any) => {
        item.disabled = !!listAttributeByDataTable?.includes(item?.id);
      });
      const checkList = stockAttributeList.value.filter((item) => !item.disabled);
      disableCreateAttribute.value = checkList.length === 0;
    },
    {
      deep: true,
    },
  );
  const initDrawer = async () => {
    try {
      setDrawerProps({ loading: true });
      const results = await Promise.all([
        getAllStockAttributeApi({
          lstStatus: [0, 1],
        }),
      ]);
      stockAttributeList.value = results[0];
    } finally {
      setDrawerProps({ loading: false });
    }
  };
  onUnmounted(() => {
    isView.value = false;
  });
  onMounted(async () => {});
</script>
<style lang="less">
  .ant-checkbox-indeterminate .ant-checkbox-inner {
    background-color: #f0f0f0;
    border-color: #007bff;
  }
  .ant-checkbox-indeterminate .ant-checkbox-inner:after {
    top: 50%;
    inset-inline-start: 50%;
    width: 8px;
    height: 8px;
    background-color: #1677ff;
    border: 0;
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
    content: '';
  }
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
