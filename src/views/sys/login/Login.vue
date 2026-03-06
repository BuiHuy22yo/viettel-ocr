<template>
  <div :class="prefixCls" class="relative w-full h-full py-5 xl:py-4 xl:my-0">
    <div class="flex items-center absolute right-4 top-4">
      <AppDarkModeToggle class="enter-x mr-2" v-if="!sessionTimeout" />
      <AppLocalePicker
        class="text-white enter-x xl:text-gray-600"
        :show-text="false"
        v-if="!sessionTimeout && showLocale"
      />
    </div>

    <span class="-enter-x md:hidden">
      <AppLogo :alwaysShowTitle="true" />
    </span>

    <div class="relative h-full overflow-auto text-center">
      <div class="flex h-full w-full max-w-sm mx-auto">
        <div class="flex w-full justify-center align-center">
          <div
            :class="`${prefixCls}-form`"
            class="flex flex-1 flex-col items-center justify-center"
          >
            <div style="width: 100%">
              <!--              <Image-->
              <!--                :src="logo"-->
              <!--                :preview="false"-->
              <!--                class="flex justify-center"-->
              <!--                style="width: 250px"-->
              <!--              />-->
              <div class="flex items-center gap-2 justify-center">
                <div
                  class="w-8 h-8 rounded-md bg-[#ff001e] flex items-center justify-center shrink-0"
                >
                  <span class="text-white font-bold text-sm">VP</span>
                </div>
                <div class="overflow-hidden">
                  <div class="text-sm font-bold text-black truncate">ViettelPost</div>
                  <div class="text-[10px] text-black truncate"> Smart OCR Platform </div>
                </div>
              </div>
              <div class="flex justify-center text-2xl font-bold"> Smart OCR Platform </div>
              <div class="text-sm text-muted-foreground mt-1">Đăng nhập để tiếp tục</div>
            </div>
            <LoginForm />
            <ForgetPasswordForm />
            <RegisterForm />
            <MobileForm />
            <QrCodeForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { AppLogo, AppLocalePicker, AppDarkModeToggle } from '@/components/Application';
  import LoginForm from './LoginForm.vue';
  import ForgetPasswordForm from './ForgetPasswordForm.vue';
  import RegisterForm from './RegisterForm.vue';
  import MobileForm from './MobileForm.vue';
  import QrCodeForm from './QrCodeForm.vue';
  import { useGlobSetting } from '@/hooks/setting';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useLocaleStore } from '@/store/modules/locale';
  import { Image } from 'ant-design-vue';
  // import carLogin from '@/assets/images/car_login.png';
  // import logoMobi from '@/assets/images/logoMobi.png';
  import logo from '@/assets/images/logo_bg_white.jpg';
  // import bgSub3 from '@/assets/images/item3.1.png';
  // import bgSub4 from '@/assets/images/item4.1.png';

  import bgLoginNew from '@/assets/images/bg_login_new.jpg';

  defineProps({
    sessionTimeout: {
      type: Boolean,
    },
  });

  const globSetting = useGlobSetting();
  const { prefixCls } = useDesign('login');
  const { t } = useI18n();
  const localeStore = useLocaleStore();
  const showLocale = localeStore.getShowPicker;
  const title = computed(() => globSetting?.title ?? '');
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-login';
  @logo-prefix-cls: ~'@{namespace}-app-logo';
  @countdown-prefix-cls: ~'@{namespace}-countdown-input';
  @dark-bg: #293146;
  //.vben-login {
  //  background-color: #f56f21 !important;
  //}
  .item1 {
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100vh;
      box-sizing: border-box;
    }

    .content {
      max-width: 50%;
    }

    h1 {
      font-size: 48px;
      color: #000;
      margin: 0;
      line-height: 1.2;
    }

    .highlight {
      color: #5b50f2; /* Blue color for uBOS */
    }

    p {
      font-size: 18px;
      color: #333;
      margin: 10px 0 20px;
    }

    .play-button {
      background-color: #5b50f2; /* Blue color for the play button */
      border: none;
      border-radius: 50%;
      width: 45px;
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-left: 40px;
    }
    .triangle-right {
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 15px solid white; /* White triangle inside the play button */
    }

    .image-container {
      max-width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e7dbcf;
      padding: 60px;
      border-top-left-radius: 40px;
    }

    .image-container img {
      max-width: 100%;
      height: auto;
      border-radius: 10px;
    }
  }
  //.custom-dots li button {
  //  width: 12px;
  //  height: 12px;
  //  border-radius: 50%;
  //  background: #e0e0e0;
  //  border: none;
  //}

  .custom-dots li.slick-active button {
    background: #7c4dff !important;
  }

  html[data-theme='dark'] {
    .@{prefix-cls} {
      background-color: @dark-bg;

      //&::before {
      //  background-image: url('@/assets/svg/login-bg-dark.svg');
      //}

      .ant-input,
      .ant-input-password {
        background-color: #232a3b;
      }

      .ant-btn:not(.ant-btn-link, .ant-btn-primary) {
        border: 1px solid #4a5569;
      }

      &-form {
        background: transparent !important;
      }

      .app-iconify {
        color: #fff;
      }
    }

    input.fix-auto-fill,
    .fix-auto-fill input {
      -webkit-text-fill-color: #c9d1d9 !important;
      box-shadow: inherit !important;
    }
  }

  .@{prefix-cls} {
    min-height: 100%;
    overflow: hidden;

    @media (max-width: @screen-xl) {
      //background-color: #293146;

      .@{prefix-cls}-form {
        background-color: #fff;
      }
      .bgImg .ant-image {
        display: none;
      }
    }

    .slick-slide {
      height: 100vh;
      overflow: hidden;
      background-color: #f7f3ef;
      border-top-right-radius: 100px;
      background-repeat: no-repeat;
      background-position: 100%;
      background-size: cover;
      text-align: center;
    }

    .slick-slide h3 {
      color: #fff;
    }

    .slick-slide.slick-active.slick-current {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white !important;
    }

    .ant-image {
      display: flex;
      justify-content: center;
      color: white !important;
    }

    //&::before {
    //  content: '';
    //  position: absolute;
    //  top: 0;
    //  left: 0;
    //  width: 100%;
    //  height: 100%;
    //  margin-left: -48%;
    //  //background-image: url('@/assets/svg/login-bg.svg');
    //  //background-repeat: no-repeat;
    //  //background-position: 100%;
    //  //background-size: auto 100%;
    //
    //  @media (max-width: @screen-xl) {
    //    display: none;
    //  }
    //}

    .@{logo-prefix-cls} {
      position: absolute;
      top: 12px;
      height: 30px;

      &__title {
        color: #fff;
        font-size: 16px;
      }

      img {
        width: 85px;
      }
    }

    .container {
      .@{logo-prefix-cls} {
        display: flex;
        width: 60%;
        height: 80px;

        &__title {
          color: #fff;
          font-size: 24px;
        }

        img {
          width: 48px;
        }
      }
    }

    &-sign-in-way {
      .anticon {
        color: #888;
        font-size: 22px;
        cursor: pointer;

        &:hover {
          color: @primary-color;
        }
      }
    }

    input:not([type='checkbox']) {
      min-width: 360px;

      @media (max-width: @screen-xl) {
        min-width: 320px;
      }

      @media (max-width: @screen-lg) {
        min-width: 260px;
      }

      @media (max-width: @screen-md) {
        min-width: 240px;
      }

      @media (max-width: @screen-sm) {
        min-width: 160px;
      }
    }

    .@{countdown-prefix-cls} input {
      min-width: unset;
    }

    .ant-divider-inner-text {
      color: @text-color-secondary;
      font-size: 12px;
    }
  }
</style>
