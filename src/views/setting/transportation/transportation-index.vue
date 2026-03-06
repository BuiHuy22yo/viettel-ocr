<template>
  <div>
    <TransportationAppConfigIndex />
  </div>
</template>
<script lang="ts" setup>
  import TransportationAppConfigIndex from '@/views/setting/transportation/components/transportation-app-config/transportation-app-config-index.vue';
  import { onMounted } from 'vue';

  onMounted(async () => {});
</script>
<style lang="less">
  .custom-table-body
    > .ant-table-wrapper
    > .ant-spin-nested-loading
    > .ant-spin-container
    > .ant-table
    > .ant-table-container
    > .ant-table-body {
    height: auto !important;
  }
</style>
