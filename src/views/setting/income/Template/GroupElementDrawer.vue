<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicTree
      search
      defaultExpandAll
      v-model:value="groupElement"
      :treeData="treeData"
      :fieldNames="{ title: 'title', key: 'idx' }"
      checkable
      toolbar
      @check="getNodetree"
    />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, onMounted } from 'vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicTree, TreeItem } from '@/components/Tree';
  import { getAllGroupElement } from '@/api/setting/income';
  import { useI18n } from '@/hooks/web/useI18n';

  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);
  const treeData = ref<TreeItem[]>([]);
  const groupElement = ref([]);
  const listNodeTree = ref([]);

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    groupElement.value = [];

    setDrawerProps({ confirmLoading: false, destroyOnClose: true });
    if (unref(treeData).length === 0) {
      treeData.value = [];
    }
  });

  const getTitle = computed(() => t('form.setting.createElementGroup'));
  const getListGroupElement = async () => {
    const res = await getAllGroupElement({});
    treeData.value = res.map((item: any) => {
      item.children = item.incomeElementDtos.map((el: any) => {
        el.title = el.elementName;
        el.idx = el.id + 'ELEMENT';
        return el;
      });
      item.title = item.groupName;
      item.idx = item.id + 'ELEMENT_GROUP';
      return item;
    });
  };
  const getNodetree = (rawVal, e) => {
    listNodeTree.value = e.checkedNodes;
  };

  async function handleSubmit() {
    try {
      closeDrawer();
      emit('success', listNodeTree.value);
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
  onMounted(() => {
    getListGroupElement();
  });
</script>
