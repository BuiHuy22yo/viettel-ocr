<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="900px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './fieldKpi.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { createFieldKpi, updateFieldKpi } from '@/api/setting/kpi';
  import { message } from 'ant-design-vue';
  import { useI18n } from '@/hooks/web/useI18n';

  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const dataRecord = ref({});

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 200,
    baseColProps: { span: 12 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false, destroyOnClose: true });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      dataRecord.value = { ...data.record };
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() =>
    !unref(isUpdate) ? t('form.setting.createFieldKPI') : t('form.setting.updateFieldKPI'),
  );

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });

      !unref(isUpdate)
        ? await createFieldKpi(values)
        : await updateFieldKpi({ ...dataRecord.value, ...values });
      closeDrawer();
      message.success(`${getTitle.value} ${t('common.successfully')}`);
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
