<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="700px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, onMounted } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './resource.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { createResource, updateResource } from '@/api/resource';
  import { message } from 'ant-design-vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { searchRole } from '@/api/sys/permission';

  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const dataRecord = ref({});
  const listRole = ref([]);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false, destroyOnClose: true });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      dataRecord.value = { ...data.record };
      const roleOld: any = listRole.value.find(
        (item: any) => item.roleId === data.record.keycloakRoleId,
      );
      if (roleOld != null) {
        dataRecord.value.keycloakRoleCodeOld = roleOld.roleCode;
        data.record.keycloakRoleCode = roleOld.roleCode;
        dataRecord.value.keycloakRoleIdOld = data.record.keycloakRoleId;
      }
      setFieldsValue({
        ...data.record,
        isView: true,
      });
    }
  });

  const getTitle = computed(() =>
    !unref(isUpdate) ? t('resource.createResource') : t('resource.updateResource'),
  );

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });

      !unref(isUpdate)
        ? await createResource(values)
        : await updateResource({ ...dataRecord.value, ...values });
      closeDrawer();
      message.success(`${getTitle.value} ${t('common.successfully')}`);
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

  onMounted(async () => {
    try {
      const results = await Promise.all([
        searchRole({
          currentPage: 1,
          pageSize: 10000,
          pageAllSize: 0,
          clientCode: 'ubos-mytel-logistics',
        }),
      ]);
      listRole.value = results?.[0].result;
    } catch (error) {
      // console.error(error);
    }
  });
</script>
