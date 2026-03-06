<template>
  <BasicModal
    :footer="null"
    :title="t('layout.header.resetPasswordBtn')"
    v-bind="$attrs"
    :class="prefixCls"
    @register="register"
  >
    <div>
      <BasicForm @register="registerForm" />

      <div :class="`${prefixCls}__footer`">
        <a-button type="primary" block class="mt-2" @click="handleResetPassword">
          {{ t('layout.header.resetPasswordBtn') }}
        </a-button>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import { useDesign } from '@/hooks/web/useDesign';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { useUserStore } from '@/store/modules/user';
  import { resetPassword } from '@/api/sys/user';
  import { message } from 'ant-design-vue';

  defineOptions({ name: 'LockModal' });

  const { t } = useI18n();
  const { prefixCls } = useDesign('header-lock-modal');

  const [register, { closeModal }] = useModalInner();
  const userStore = useUserStore();

  const [registerForm, { validate, resetFields }] = useForm({
    showActionButtonGroup: false,
    schemas: [
      {
        field: 'oldPassword',
        label: t('layout.header.oldPassword'),
        colProps: {
          span: 24,
        },
        component: 'InputPassword',
        required: true,
      },
      {
        field: 'newPassword',
        label: t('layout.header.newPassword'),
        colProps: {
          span: 24,
        },
        component: 'InputPassword',
        required: true,
      },
    ],
  });

  const handleResetPassword = async () => {
    let data = await validate();
    if (data.oldPassword == data.newPassword) {
      message.error('The old password and the new password must not be the same.');
      throwErrorValidate('The old password and the new password must not be the same.');
    }

    await resetPassword(data);
    userStore.logout(true);
  };

  function throwErrorValidate(message: string) {
    throw new TypeError(message);
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-lock-modal';

  .@{prefix-cls} {
    &__footer {
      text-align: center;
    }
  }
</style>
