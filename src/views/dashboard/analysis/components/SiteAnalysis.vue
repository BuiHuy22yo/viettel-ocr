<template>
  <Card v-bind="$attrs" class="shadow-md">
    <VisitAnalysisBar />
  </Card>
</template>
<script lang="ts" setup>
  import { Card } from 'ant-design-vue';
  import VisitAnalysisBar from './TargetActualSalesChart.vue';
</script>
