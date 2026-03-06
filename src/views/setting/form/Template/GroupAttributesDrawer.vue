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
  import { getAllGroupAttributesTree } from '@/api/setting/template';
  import { useI18n } from '@/hooks/web/useI18n';

  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);
  const treeData = ref<TreeItem[]>([]);
  const groupElement = ref([]);
  const listNodeTree = ref([]);
  const templateDetail = ref([]);
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    groupElement.value = [];
    setDrawerProps({ confirmLoading: false, destroyOnClose: true });
    templateDetail.value = data?.templateDetail || [];
    if (unref(treeData).length === 0) {
      treeData.value = [];
    }
    await getListGroupAttributes();
  });

  const getTitle = computed(() => t('page.form.template.modalAddAttributeTitle'));
  const getListGroupAttributes = async () => {
    const res = await getAllGroupAttributesTree({ status: 1 });
    treeData.value = res.map((item: any) => {
      item.children = item.lstAttributes
        .filter(
          (el: any) =>
            templateDetail.value.find((e: any) => e.attributesId === el.id) === undefined,
        )
        .map((el: any) => {
          el.title = el.name;
          el.idx = el.id + 'ATTRIBUTE';
          return el;
        });
      item.title = item.name;
      item.idx = item.id + 'GROUP_ATTRIBUTE';
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
    getListGroupAttributes();
  });
</script>
