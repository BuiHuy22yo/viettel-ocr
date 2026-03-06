<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="800px"
    @ok="handleSubmit"
    :showOkBtn="!isView"
  >
    <BasicForm @register="registerForm">
      <template #viewVariant="{ model }" v-if="productId != 0 && productId">
        <div v-if="model?.isVariant">
          <Variant
            :product-id="productId"
            :is-from-product="true"
            :is-view="isView"
            :data-record="dataRecord"
            @exist-variant="existVariant"
          />
        </div>
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, onMounted } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './product.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import {
    createProduct,
    getAllUnitOfMeasure,
    updateProductSetting,
  } from '@/api/setting/service-product';
  import { message } from 'ant-design-vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import Variant from '@/views/setting/category/Variant/index.vue';

  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(false);
  const isView = ref(true);
  const dataRecord = ref({});
  const productId = ref<Object>(0);

  const [registerForm, { resetFields, setFieldsValue, validate, getFieldsValue }] = useForm({
    labelWidth: 300,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    setDrawerProps({ confirmLoading: false, destroyOnClose: true });
    isUpdate.value = !!data?.isUpdate;
    isView.value = !!data?.isView;
    productId.value = data?.productId;

    const listUnit = await getAllUnitOfMeasure({});
    if (unref(isUpdate) || unref(isView)) {
      dataRecord.value = { ...data.record };
      await setFieldsValue({
        ...data.record,
        isVariant: data?.record?.hasVariant,
        isView: data?.isView,
        listUnit,
      });
    } else {
      await setFieldsValue({
        ...getFieldsValue(),
        listUnit,
      });
    }
  });

  const getTitle = computed(() =>
    unref(isView)
      ? t('form.setting.detailProduct')
      : !unref(isUpdate)
        ? t('form.setting.createProduct')
        : t('form.setting.updateProduct'),
  );

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });

      !unref(isUpdate)
        ? await createProduct(values)
        : await updateProductSetting({ ...dataRecord.value, ...values });
      closeDrawer();
      message.success(`${getTitle.value} ${t('common.successfully')}`);
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

  function existVariant() {
    setFieldsValue({
      ...getFieldsValue(),
      isExistVariant: true,
    });
  }
</script>
