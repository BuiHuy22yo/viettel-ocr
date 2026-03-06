<template>
  <ConfigProvider :locale="enUS" :theme="themeConfig">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { AppProvider } from '@/components/Application';
  import { useTitle } from '@/hooks/web/useTitle';
  // import { useLocale } from '@/locales/useLocale';
  import { ConfigProvider } from 'ant-design-vue';
  // import viVN from 'ant-design-vue/es/locale/vi_VN';
  import { useDarkModeTheme } from '@/hooks/setting/useDarkModeTheme';
  import 'dayjs/locale/zh-cn';
  import { computed } from 'vue';
  import enUS from 'ant-design-vue/es/locale/en_US';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import { changeTheme } from '@/logics/theme';
  // support Multi-language
  // const { getAntdLocale } = useLocale();

  const { isDark, darkTheme } = useDarkModeTheme();
  const { getThemeColor } = useRootSetting();
  changeTheme(getThemeColor.value);
  const themeConfig = computed(() =>
    Object.assign(
      {
        token: {
          colorPrimary: getThemeColor.value,
          colorSuccess: '#55D187',
          colorWarning: '#EFBD47',
          colorError: '#ED6F6F',
          colorInfo: getThemeColor.value,
        },
      },
      isDark.value ? darkTheme : {},
    ),
  );
  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
