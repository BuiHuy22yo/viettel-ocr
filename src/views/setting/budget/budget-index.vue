<template>
  <div>
    <ExpensesDocumentIndex />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted } from 'vue';
  import ExpensesDocumentIndex from '@/views/setting/budget/components/expenses-document/expenses-document-index.vue';

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
