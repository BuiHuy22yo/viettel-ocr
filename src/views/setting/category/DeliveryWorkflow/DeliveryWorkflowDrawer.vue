<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="800px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #addShippingStatus>
        <ShippingStatusTable
          ref="attributeTable"
          :data="dataShippingStatus"
          :check-view="isView"
          :check-update="isUpdate"
          @add-del-data="handleDeleteItem"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './deliveryWorkflow.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { message } from 'ant-design-vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import {
    createDeliveryWorkflow,
    getAllShippingByDeliveryId,
    updateDeliveryWorkflow,
  } from '@/api/setting/service-product';
  import ShippingStatusTable from './shippingStatusTable.vue';

  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const isView = ref(false);
  const dataRecord = ref({});
  const dataShippingStatus = ref<any>([]);
  const dataDelShipping = ref<any>([]);
  const attributeTable = ref<any>(null);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 500,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false, destroyOnClose: true });
    isUpdate.value = !!data?.isUpdate;
    isView.value = !!data?.isView;

    if (unref(isUpdate)) {
      dataRecord.value = { ...data.record };
      setFieldsValue({
        ...data.record,
      });
    }

    if (data?.record?.id) {
      await getAllByDeliveryId(data.record.id);
    }
  });

  async function getAllByDeliveryId(text: any) {
    try {
      const data: any = await getAllShippingByDeliveryId({
        deliveryWorkflowId: text,
      });
      dataShippingStatus.value = data || [];
    } finally {
      // setLoading(false);
    }
  }

  function handleDeleteItem(item) {
    dataDelShipping.value.push(item);
  }

  const getTitle = computed(() =>
    !unref(isUpdate)
      ? t('form.setting.createDeliveryWorkflow')
      : t('form.setting.updateDeliveryWorkflow'),
  );

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      dataShippingStatus.value = attributeTable.value?.dataTable;
      console.log('dataShippingStatus.value', dataShippingStatus.value);

      !unref(isUpdate)
        ? await createDeliveryWorkflow({
            ...values,
            addShippingStatus: [...dataShippingStatus.value.filter((item) => item !== null)],
          })
        : await updateDeliveryWorkflow({
            ...dataRecord.value,
            ...values,
            addShippingStatus: [
              ...dataShippingStatus.value.filter((item) => item !== null && item.id == null),
            ],
            delShippingStatus: [...dataDelShipping.value.filter((item) => item !== null)],
          });
      closeDrawer();
      message.success(`${getTitle.value} ${t('common.successfully')}`);
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
