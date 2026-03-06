<template>
  <InputNumber
    v-bind="$attrs"
    :formatter="(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
    :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
    :controls="false"
  />
</template>
<script lang="ts" setup>
  import { InputNumber } from 'ant-design-vue';

  defineOptions({ name: 'InputNumberCustom', inheritAttrs: false });

  // const props = defineProps({});
</script>
<style lang="less"></style>
