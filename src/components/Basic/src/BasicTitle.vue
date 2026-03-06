<template>
  <div>
    <div class="IconTable" v-if="icon">
      <Icon :icon="icon" size="30" />
    </div>
    <span :class="getClass">
      <div>
        <slot></slot>
        <BasicHelp :class="`${prefixCls}-help`" v-if="helpMessage" :text="helpMessage" />
      </div>
      <div v-if="subTitle" class="subTitleTable">{{ subTitle }}</div>
    </span>
  </div>
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue';
  import { useSlots, computed } from 'vue';
  import BasicHelp from './BasicHelp.vue';
  import { useDesign } from '@/hooks/web/useDesign';
  import Icon from '@/components/Icon/Icon.vue';

  const props = defineProps({
    /**
     * Help text list or string
     * @default: ''
     */
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    /**
     * Whether the color block on the left side of the title
     * @default: false
     */
    span: { type: Boolean },
    /**
     * Whether to default the text, that is, not bold
     * @default: false
     */
    normal: { type: Boolean },
  });

  const { prefixCls } = useDesign('basic-title');
  const slots = useSlots();
  const getClass = computed(() => [
    prefixCls,
    { [`${prefixCls}-show-span`]: props.span && slots.default },
    { [`${prefixCls}-normal`]: props.normal },
  ]);
</script>
<style lang="less" scoped>
  .subTitleTable {
    color: #808080e8;
    font-size: 14px;
    font-weight: 400;
  }
  @prefix-cls: ~'@{namespace}-basic-title';

  .@{prefix-cls} {
    display: flex;
    position: relative;
    padding-left: 7px;
    color: @text-color-base;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    cursor: pointer;
    user-select: none;

    &-normal {
      font-size: 14px;
      font-weight: 500;
    }

    &-show-span::before {
      content: '';
      position: absolute;
      top: 4px;
      left: 0;
      width: 3px;
      height: 16px;
      margin-right: 4px;
      background-color: @primary-color;
    }

    &-help {
      margin-left: 10px;
    }
  }
  .IconTable {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: @theme-color !important;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
