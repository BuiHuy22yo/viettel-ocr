<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="30%"
    @ok="handleSubmit"
    :showOkBtn="!isView"
  >
    <BasicForm @register="registerForm" class="vben-basic-form--compact" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { computed, onMounted, onUnmounted, ref, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useI18n } from '@/hooks/web/useI18n';
  import { createStockAttributeApi, updateStockAttributeApi } from '@/api/setting/stock-category';
  import { useMessage } from '@/hooks/web/useMessage';
  import { drawerFormSchema } from '@/views/setting/stock/components/warehouse-attribute/warehouse-attribute-drawer/warehouse-attribute-drawer.data';
  import dayjs from 'dayjs';
  import { isNullOrEmpty } from '@/utils/is';

  const { createMessage: message } = useMessage();
  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(false);
  const isView = ref(false);
  const dataRecord = ref<any>({});
  const props = defineProps({
    data: {
      type: Array,
      default: () => [],
    },
  });
  const [registerForm, { resetFields, setFieldsValue, validate, setProps }] = useForm({
    labelWidth: 200,
    schemas: drawerFormSchema,
    showActionButtonGroup: false,
  });
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    setDrawerProps({ confirmLoading: false, destroyOnClose: true });
    isUpdate.value = !!data?.isUpdate;
    isView.value = !!data?.isView;

    await setFieldsValue({
      ...data.record,
      isView: isView,
      isUpdate: isUpdate,
    });
    dataRecord.value = data.record;
  });
  const getTitle = computed(() =>
    unref(isUpdate)
      ? t('stock.stockCategory.warehouseAttribute.drawer.titleUpdate')
      : unref(isView)
        ? t('stock.stockCategory.warehouseAttribute.drawer.titleView')
        : t('stock.stockCategory.warehouseAttribute.drawer.titleCreate'),
  );
  const handleSubmit = async () => {
    try {
      setDrawerProps({ confirmLoading: true });
      const values = await validate();
      setDrawerProps({ loading: true });
      !unref(isUpdate)
        ? await createStockAttributeApi({
            ...values,
          })
        : await updateStockAttributeApi({
            ...dataRecord.value,
            ...values,
            createdAt: dayjs(dataRecord.value.createdAt, 'DD/MM/YYYY HH:mm:ss').format(
              'YYYY-MM-DDTHH:mm:ss.SSS',
            ),
            updatedAt: isNullOrEmpty(dataRecord.value.updatedAt)
              ? null
              : dayjs(dataRecord.value.updatedAt, 'DD/MM/YYYY HH:mm:ss').format(
                  'YYYY-MM-DDTHH:mm:ss.SSS',
                ),
          });
      closeDrawer();
      message.success(`${getTitle.value} ${t('common.successfully')}`);
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
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
</style>
