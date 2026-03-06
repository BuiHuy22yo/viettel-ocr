<!--
 * @Author: Vben
 * @Description: logo component
-->
<template>
  <div class="anticon" :class="getAppLogoClass" @click="goHome">
    <!--    <img src="../../../assets/images/logo_bg_white.jpg" v-show="showTitle" />-->
    <!--    <div class="ml-2 truncate md:opacity-100" :class="getTitleClass" v-show="showTitle">-->
    <!--      {{ title }}-->
    <!--    </div>-->
    <div class="flex items-center gap-2 justify-center">
      <div class="w-8 h-8 rounded-md bg-[#ff001e] flex items-center justify-center shrink-0">
        <span class="text-white font-bold text-sm">VP</span>
      </div>
      <div v-show="showTitle" class="overflow-hidden">
        <div class="text-sm font-bold truncate">ViettelPost</div>
        <div class="text-[10px] truncate"> Smart OCR Platform </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import { useGlobSetting } from '@/hooks/setting';
  import { useGo } from '@/hooks/web/usePage';
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
  import { useDesign } from '@/hooks/web/useDesign';
  import { PageEnum } from '@/enums/pageEnum';
  import { useUserStore } from '@/store/modules/user';

  const props = defineProps({
    /**
     * The theme of the current parent component
     */
    theme: { type: String, validator: (v: string) => ['light', 'dark'].includes(v) },
    /**
     * Whether to show title
     */
    showTitle: { type: Boolean, default: true },
    /**
     * The title is also displayed when the menu is collapsed
     */
    alwaysShowTitle: { type: Boolean },
  });

  const { prefixCls } = useDesign('app-logo');
  const { getCollapsedShowTitle } = useMenuSetting();
  const userStore = useUserStore();
  const { title } = useGlobSetting();
  const go = useGo();

  const getAppLogoClass = computed(() => [
    prefixCls,
    props.theme,
    { 'collapsed-show-title': unref(getCollapsedShowTitle) },
  ]);

  const getTitleClass = computed(() => [
    `${prefixCls}__title`,
    {
      'xs:opacity-0': !props.alwaysShowTitle,
    },
  ]);

  function goHome() {
    go(userStore.getUserInfo.homePath || PageEnum.BASE_HOME);
  }
</script>
<style lang="less" scoped>
  .ant-layout .vben-layout-header-logo img {
    width: 120px;
    height: 60px !important;
    margin-right: 2px;
  }
  @prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    padding-left: 7px;
    transition: all 0.2s ease;
    cursor: pointer;

    &.light {
      border-bottom: 1px solid @border-color-base;
    }

    &.collapsed-show-title {
      padding-left: 20px;
    }

    &.light &__title {
      color: @primary-color;
    }

    &.dark &__title {
      color: @white;
    }

    &__title {
      transition: all 0.5s;
      font-size: 30px;
      font-weight: 500;
      line-height: normal;
    }
  }
</style>
