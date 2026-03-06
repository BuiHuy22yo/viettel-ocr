<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="30%"
    @ok="() => {}"
  >
    <BasicForm @register="registerForm" />

    <template #footer>
      <a-button @click="closeDrawer">
        <Icon :icon="'ion:close-outline'" />
        {{ t('component.drawer.cancelText') }}
      </a-button>
      <a-button type="primary" class="mr-2" :onclick="onSave">
        <Icon :icon="'ion:checkmark-done-outline'" />
        {{ t('common.saveText') }}
      </a-button>
    </template>
  </BasicDrawer>
</template>

<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { computed, ref, unref } from 'vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { BasicForm, useForm } from '@/components/Form';
  import Icon from '@/components/Icon/Icon.vue';
  import { message } from 'ant-design-vue';
  import { createRole, updateRole } from '@/api/sys/permission';

  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(false);
  const isCreate = ref(false);
  const isView = ref(false);
  const clientCode = ref('');
  const formSchema = ref([]);
  const id = ref<any>(null);
  const clientId = ref('');

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false, destroyOnClose: true });

    isUpdate.value = !!data?.isUpdate;
    isCreate.value = !!data?.isCreate;
    isView.value = !!data?.isView;
    clientCode.value = data?.clientCode;
    clientId.value = data?.clientId;

    formSchema.value = [
      {
        field: 'roleCode',
        label: t('permission.code'),
        component: 'Input',
        required: true,
        colProps: { span: 24 },
        componentProps: {
          prefix: `${clientCode.value}_`,
          disabled: isUpdate.value,
        },
      },
      {
        field: 'roleName',
        label: t('permission.name'),
        component: 'Input',
        required: true,
        colProps: { span: 24 },
      },
      {
        field: 'status',
        label: t('permission.status'),
        component: 'ApiSelect',
        required: true,
        defaultValue: '1',
        componentProps: {
          options: [
            { label: t('common.active'), value: '1' },
            { label: t('common.inActive'), value: '0' },
          ],
        },
      },
    ];

    if (isUpdate.value || isView.value) {
      id.value = data.record.roleId;

      let roleCode = data.record.roleCode;
      data.record = {
        ...data.record,
        roleCode: roleCode.startsWith(clientCode.value)
          ? roleCode.substring(clientCode.value.length + 1)
          : roleCode,
      };

      await setFieldsValue(data.record);
    }
  });
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const getTitle = computed(() => {
    if (unref(isView)) return t('permission.roleDrawer.viewTitle');
    if (unref(isCreate)) return t('permission.roleDrawer.createTitle');
    if (unref(isUpdate)) return t('permission.roleDrawer.updateTitle');
    return '';
  });

  const onSave = async () => {
    try {
      setDrawerProps({ loading: true });

      let data = await validate();
      data = {
        ...data,
        roleCode: `${clientCode.value}_${data.roleCode}`,
        clientId: clientId.value,
        roleId: id.value,
      };

      if (isUpdate.value) {
        await updateRole(data);

        message.success(t('permission.roleDrawer.updateSuccessMessage'));
      } else {
        await createRole(data);

        message.success(t('permission.roleDrawer.createSuccessMessage'));
      }

      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ loading: false });
    }
  };
</script>

<style scoped lang="less"></style>
