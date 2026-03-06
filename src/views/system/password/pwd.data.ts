import { FormSchema } from '@/components/Form';

export const formSchema: FormSchema[] = [
  {
    field: 'oldPassword',
    label: 'Current Password',
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'newPwd',
    label: 'New Password',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: 'New Password',
    },
    rules: [
      {
        required: true,
        message: 'Please enter a new password',
      },
    ],
  },
  {
    field: 'confirmPassword',
    label: 'Confirm Password',
    component: 'InputPassword',

    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('password can not be blank');
            }
            if (value !== values.newPwd) {
              return Promise.reject('The passwords entered twice are inconsistent!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
];
