<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <div class="flex">
          <a-input
            :placeholder="t('common.inputText')"
            v-model="textSearch"
            @change="onChangeTextSearch"
            allow-clear
          />
          <a-button type="primary" @click="handleCreate" class="ml-5"
            ><Icon :icon="'ion:add-outline'" /> {{ t('common.create') }}
          </a-button>
        </div>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                onClick: handleDelete.bind(null, record),
              },
            ]"
          />
        </template>
        <template v-if="column.key === 'createdAt'">
          {{ formatToDateTime(record.createdAt) }}
        </template>
        <template v-if="column.key === 'updatedAt'"
          >{{ formatToDateTime(record.updatedAt) }}
        </template>
      </template>
    </BasicTable>
    <SegmentDrawer @register="registerDrawer" @success="handleSuccess" />
    <AModal
      v-model:open="openModal"
      :title="t('common.confirmDelete')"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      :ok-text="t('common.delText')"
      okType="error"
    >
      <p class="p-5">{{ t('common.isDelete') + nameRecord + '?' }}</p>
    </AModal>
  </div>
</template>
<script lang="ts" setup>
  import Icon from '@/components/Icon/Icon.vue';
  import { useDebounceFn } from '@vueuse/core';
  import { onMounted, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';

  import { useDrawer } from '@/components/Drawer';
  import SegmentDrawer from './SegmentDrawer.vue';

  import { columns } from './segment.data';
  import { deleteSegment, getAllSegment } from '@/api/setting/resources';
  import { formatToDateTime } from '@/utils/dateUtil';
  import { message } from 'ant-design-vue';
  import { useI18n } from '@/hooks/web/useI18n';

  defineOptions({ name: 'Segment' });
  const openModal = ref(false);
  const confirmLoading = ref(false);

  const nameRecord = ref('');
  const id = ref(null);
  const { t } = useI18n();
  const textSearch = ref('');
  const dataSource = ref<any>([]);
  const debouncedRequest = useDebounceFn(() => 'response', 1000);

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { setLoading }] = useTable({
    title: t('form.setting.segment'),
    dataSource: dataSource,
    subTitle: t('form.setting.subTitleSegment'),
    icon: 'oui:app-users-roles',
    columns,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 80,
      title: t('common.action'),
      dataIndex: 'action',
      align: 'center',
      fixed: 'right',
    },
  });

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    openModal.value = true;
    id.value = record?.id;
    nameRecord.value = record?.segmentName;
  }

  function handleSuccess() {
    textSearch.value = '';
    searchAllSegment(textSearch.value);
  }
  async function searchAllSegment(text: string) {
    try {
      setLoading(true);
      const data: any = await getAllSegment({
        keyword: text,
      });
      dataSource.value = data || [];
    } finally {
      setLoading(false);
    }
  }
  const onChangeTextSearch = async (val) => {
    const value = await debouncedRequest();
    if (value === 'response') {
      searchAllSegment(val.target.value.trim());
    }
  };
  const handleOk = async () => {
    try {
      confirmLoading.value = true;
      await deleteSegment({ id: id.value });
      searchAllSegment(textSearch.value);
      openModal.value = false;
      message.success(t('common.deleteSuccess'));
    } finally {
      confirmLoading.value = false;
    }
  };
  onMounted(() => {
    searchAllSegment(textSearch.value);
  });
</script>
