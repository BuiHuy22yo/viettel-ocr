<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="userName" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.userName"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>

      <FormItem name="email" class="enter-x">
        <Input size="large" v-model:value="formData.email" :placeholder="t('sys.login.email')" />
      </FormItem>
      <FormItem name="otp" class="enter-x">
        <CountdownInput
          size="large"
          v-model:value="formData.otp"
          count="180"
          :sendCodeApi="handleRequestOTP"
          :placeholder="t('sys.login.otp')"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button
          type="primary"
          size="large"
          class="mt-4"
          block
          @click="handleConfirm"
          :disabled="btnResetPwd"
          :loading="loading"
        >
          {{ t('common.resetText') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, message } from 'ant-design-vue';
  import { CountdownInput } from '@/components/CountDown';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useLoginState, useFormRules, LoginStateEnum } from './useLogin';
  import { confirmForgotPwd, requestForgotPwd } from '@/api/sys/user';

  const FormItem = Form.Item;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);
  const btnResetPwd = ref(true);

  const formData = reactive({
    userName: '',
    email: '',
    otp: '',
  });

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);

  const handleRequestOTP = async (): Promise<boolean> => {
    try {
      if (
        formData.userName == null ||
        formData.userName === '' ||
        formData.email == null ||
        formData.email === ''
      ) {
        message.error('Username or email is required');
        throwErrorValidate('Username or email is required');
      }

      let request: any = {};
      request.userName = formData.userName;
      request.email = formData.email;
      await requestForgotPwd(request);
      btnResetPwd.value = false;
    } catch (e) {
      console.error('Send request forgot password error');
      return false;
    }
  };

  async function handleConfirm() {
    if (
      formData.userName == null ||
      formData.userName === '' ||
      formData.email == null ||
      formData.email === '' ||
      formData.otp == null ||
      formData.otp === ''
    ) {
      message.error('Username or email or OTP is required');
      throwErrorValidate('Username or email or OTP is required');
    }
    await confirmForgotPwd(formData);
    message.success('The new password has been sent to your email, please log in again');
    handleBackLogin();
  }

  function throwErrorValidate(message: string) {
    throw new TypeError(message);
  }
</script>
