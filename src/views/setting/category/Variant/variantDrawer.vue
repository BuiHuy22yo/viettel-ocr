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
      <template #addAttribute>
        <VariantAttributeTable
          ref="attributeTable"
          :data="dataAttributeId"
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
  import { formSchema } from './variant.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import {
    createVariant,
    getAllVariantAttributeById,
    updateVariant,
  } from '@/api/setting/service-product';
  import { message } from 'ant-design-vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import VariantAttributeTable from './variantAttributeTable.vue';

  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);
  const isView = ref(false);
  const isUpdate = ref(true);
  const dataRecord = ref({});
  let dataAttributeId = ref<any>([]);
  let dataDelAttribute = ref<any>([]);
  const attributeTable = ref<any>(null);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 300,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    setDrawerProps({ confirmLoading: false, destroyOnClose: true });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      dataRecord.value = { ...data.record };
      await setFieldsValue({
        ...data.record,
        fromProduct: !!data?.productId,
        serviceId: data.record?.serviceId,
        managementMethod: data.record?.managementMethodName,
        unitOfMeasure: data.record?.measurementUnitName,
        conversionUnit: data.record?.conversionUnitName,
        conversionRate: data.record?.conversionRate,
      });
    }

    if (data?.productId) {
      await setFieldsValue({
        ...data.record,
        productId: data?.productId,
        fromProduct: true,
        serviceId: data.record?.serviceId,
        managementMethod: data.record?.managementMethodName,
        unitOfMeasure: data.record?.measurementUnitName,
        conversionUnit: data.record?.conversionUnitName,
        conversionRate: data.record?.conversionRate,
      });
    }

    if (data?.record?.id) {
      await findVariantAttributeById(data.record.id);
    }
  });

  const getTitle = computed(() =>
    !unref(isUpdate) ? t('form.setting.createVariant') : t('form.setting.updateVariant'),
  );

  async function findVariantAttributeById(text: any) {
    try {
      const data: any = await getAllVariantAttributeById({
        variantId: text,
      });
      dataAttributeId.value = data || [];
    } finally {
      // setLoading(false);
    }
  }

  function handleDeleteItem(item) {
    dataDelAttribute.value.push(item);
  }

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      dataAttributeId.value = attributeTable.value?.dataTable;
      console.log('dataAttributeId ', dataAttributeId.value);

      const listAddAttribute = [...dataAttributeId.value.filter((item) => item !== null)];
      if (!listAddAttribute || listAddAttribute.length == 0) {
        message.error({ content: 'Other information is required', key: 'saving' });
        return;
      }

      !unref(isUpdate)
        ? await createVariant({
            ...values,
            listAddAttribute,
          })
        : await updateVariant({
            ...dataRecord.value,
            ...values,
            listAddAttribute: [...dataAttributeId.value.filter((item) => item !== null)],
            listDelAttribute: [...dataDelAttribute.value.filter((item) => item !== null)],
          });
      closeDrawer();
      message.success(`${getTitle.value} ${t('common.successfully')}`);
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
