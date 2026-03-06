<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './type.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { message } from 'ant-design-vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import {
    insertGlobalListDetail,
    insertRequestType,
    updateGlobalListDetail,
    updateRequestType,
  } from '@/api/sys/global_list';

  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);
  const props = defineProps({
    globalListId: {
      type: Number,
      default: null,
    },
  });

  const isUpdate = ref(true);
  const dataRecord = ref({});

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 300,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      dataRecord.value = { ...data.record };
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() =>
    !unref(isUpdate)
      ? t('serviceRequest.type_setting.modalAddTitle')
      : t('serviceRequest.type_setting.modalUpdateTitle'),
  );

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });

      !unref(isUpdate)
        ? await insertRequestType({
            ...values,
            globalListId: props.globalListId,
          })
        : await updateRequestType({
            ...dataRecord.value,
            ...values,
          });
      closeDrawer();
      message.success(`${getTitle.value} ${t('common.successfully')}`);
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
