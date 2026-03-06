<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="33%"
    @ok="handleSubmit"
    :showOkBtn="!isView"
  >
    <BasicForm @register="registerForm" class="vben-basic-form--compact" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { computed, onUnmounted, ref, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useI18n } from '@/hooks/web/useI18n';
  import {
    createImportExportStockType,
    generateCode,
    updateImportExportStockType,
  } from '@/api/setting/import-export-stock-type';
  import { useMessage } from '@/hooks/web/useMessage';
  import { STOCK_CONSTANT } from '@/constant/stock-constant';

  const { createMessage: message } = useMessage();
  const { t } = useI18n();
  const drawerFormSchema: any = [
    {
      field: 'type',
      label: t('stock.importExportStockType.drawer.panelInformation.type'),
      component: 'ApiSelect',
      required: true,
      defaultValue: 0,
      componentProps: ({ formModel }) => {
        return {
          disabled: !(!unref(isUpdate) && !unref(isView)),
          options: [
            {
              label: t('stock.importExportStockType.common.typeList.export'),
              value: 0,
            },
            {
              label: t('stock.importExportStockType.common.typeList.import'),
              value: 1,
            },
          ],
          onChange: async () => {
            if (!unref(isUpdate) && !unref(isView)) {
              setDrawerProps({ loading: true });
              formModel.code = await generateCode({ type: formModel.type });
              setDrawerProps({ loading: false });
            }
          },
        };
      },
      colProps: { span: 24 },
    },
    {
      field: 'code',
      label: t('stock.importExportStockType.drawer.panelInformation.code'),
      required: true,
      component: 'Input',
      componentProps: () => {
        return {
          disabled: true,
          maxlength: 20,
        };
      },
      colProps: { span: 24 },
    },
    {
      field: 'name',
      label: t('stock.importExportStockType.drawer.panelInformation.name'),
      required: true,
      component: 'Input',
      componentProps: () => {
        return {
          disabled: unref(isView),
          maxlength: 250,
        };
      },
      colProps: { span: 24 },
    },
    {
      field: 'status',
      label: t('stock.importExportStockType.drawer.panelInformation.status'),
      component: 'RadioButtonGroup',
      defaultValue: 1,
      colProps: { span: 24 },
      componentProps: ({ formModel }) => {
        return {
          disabled:
            unref(isView) ||
            formModel.code === STOCK_CONSTANT.IMPORT_FROM_EXPORT_TYPE ||
            formModel.code === STOCK_CONSTANT.IMPORT_FROM_KCS_TYPE,
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
  ];
  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(false);
  const isView = ref(false);
  const loading = ref(false);
  const dataRecord = ref<any>({});
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
  const [registerForm, { resetFields, setFieldsValue, getFieldsValue, validate }] = useForm({
    labelWidth: 200,
    schemas: drawerFormSchema,
    showActionButtonGroup: false,
  });
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    setDrawerProps({ confirmLoading: false, destroyOnClose: true });
    isUpdate.value = !!data?.isUpdate;
    isView.value = !!data?.isView;
    let initCreateCode;
    setDrawerProps({ loading: true });
    if (!unref(isUpdate) && !unref(isView)) {
      initCreateCode = await generateCode({ type: getFieldsValue().type });
    }
    await setFieldsValue({
      ...data.record,
      code: !unref(isUpdate) && !unref(isView) ? initCreateCode : data.record.code,
      isView: data?.isView,
    });
    dataRecord.value = data.record;

    setDrawerProps({ loading: false });
  });

  const getTitle = computed(() =>
    unref(isUpdate)
      ? t('stock.importExportStockType.drawer.titleUpdate')
      : unref(isView)
        ? t('stock.importExportStockType.drawer.titleView')
        : t('stock.importExportStockType.drawer.titleCreate'),
  );
  const handleSubmit = async () => {
    try {
      setDrawerProps({ confirmLoading: true });
      const values = await validate();
      !unref(isUpdate)
        ? await createImportExportStockType({
            ...values,
          })
        : await updateImportExportStockType({
            ...dataRecord.value,
            ...values,
          });
      closeDrawer();
      message.success(`${getTitle.value} ${t('common.successfully')}`);
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  };
  onUnmounted(() => {
    isView.value = false;
  });
</script>
