<template>
  <PageWrapper
    title="Modify current user password"
    content="After the modification is successful, you will automatically log out of the current login！"
  >
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> Reset </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit"> Confirm </a-button>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import { BasicForm, useForm } from '@/components/Form';

  import { formSchema } from './pwd.data';
  import { changePassword } from '@/api/sys/user';

  export default defineComponent({
    name: 'ChangePassword',
    components: { BasicForm, PageWrapper },
    setup() {
      const [register, { validate, resetFields }] = useForm({
        size: 'large',
        baseColProps: { span: 24 },
        labelWidth: 125,
        showActionButtonGroup: false,
        schemas: formSchema,
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          const { oldPassword, newPwd } = values;

          // TODO custom api
          console.log(oldPassword, newPwd);
          const res = await changePassword({ oldPassword, newPwd });
          console.log('res', res);
          // const { router } = useRouter();
          // router.push(pageEnum.BASE_LOGIN);
        } catch (error) {
          console.log(error);
        }
      }

      return { register, resetFields, handleSubmit };
    },
  });
</script>
