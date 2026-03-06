<template>
  <div>
    <FileList :dataSource="fileListRef" :columns="columns" :actionColumn="actionColumn" />
    <Modal v-model:visible="isModalVisible" title="Xem ảnh" :footer="false" @cancel="handleCancel">
      <img :src="imageUrl" alt="Image Preview" style="max-width: 100%" />
    </Modal>
  </div>
</template>
<script lang="ts" setup>
  import { watch, ref } from 'vue';
  import FileList from './FileList.vue';
  import { handleFnKey, previewProps } from '../props';
  import { BaseFileItem, FileBasicColumn, PreviewFileItem } from '../types/typing';
  import { downloadByData, viewPDF } from '@/utils/file/download';
  import { Modal, message } from 'ant-design-vue';
  import {
    createPreviewColumns,
    createPreviewActionColumn,
    createPreviewColumnsNotViewImg,
  } from './data';
  import { useI18n } from '@/hooks/web/useI18n';
  import { isArray, isFunction } from '@/utils/is';
  import { BasicColumn } from '@/components/Table';
  import { useMessage } from '@/hooks/web/useMessage';
  import { buildUUID } from '@/utils/uuid';
  import { downloadFile } from '@/api/uploadTransport';

  const { createMessage } = useMessage();

  const props = defineProps(previewProps);

  const emit = defineEmits(['list-change', 'delete']);
  const isModalVisible = ref(false);
  const imageUrl = ref('');

  let columns: BasicColumn[] | FileBasicColumn[] = createPreviewColumns();
  let actionColumn: any;

  const { t } = useI18n();

  const fileListRef = ref<BaseFileItem[] | Array<any>>([]);
  watch(
    () => props,
    () => {
      if (Array.isArray(props.previewColumns) && props.previewColumns.length) {
        columns = props.previewColumns;
        actionColumn = null;
      } else if (isFunction(props.previewColumns)) {
        columns = props.previewColumns({ handleRemove, handleAdd });
      } else {
        columns = props.isViewImg ? createPreviewColumns() : createPreviewColumnsNotViewImg();
        actionColumn = createPreviewActionColumn(
          { handleRemove, handleDownload, handleView },
          props.isView,
        );
      }
    },
    { immediate: true },
  );

  watch(
    () => props.isView,
    (val) => {
      actionColumn = createPreviewActionColumn({ handleRemove, handleDownload, handleView }, val);
    },
    { immediate: true },
  );

  watch(
    () => props.value,
    (value) => {
      if (!isArray(value)) value = [];
      if (props.beforePreviewData) {
        value = props.beforePreviewData(value) as any;
        fileListRef.value = value;
        return;
      }
      fileListRef.value = value
        .filter((item) => !!item)
        .map((item) => {
          if (typeof item != 'object') {
            console.error('return value should be object');
            return;
          }
          return {
            ...{
              uid: buildUUID(),
              url: item?.url,
              type: item?.contentType,
              name: item?.fileName,
              id: item?.id,
            },
            ...item,
          };
        });
    },
    { immediate: true },
  );

  watch(
    () => props.isView,
    (value) => {},
    { immediate: true },
  );
  function handleRemove(obj: Record<handleFnKey, any>) {
    let { record = {}, valueKey = 'url', uidKey = 'uid' } = obj;
    const index = fileListRef.value.findIndex((item) => item[uidKey] === record[uidKey]);
    if (index !== -1) {
      const removed = fileListRef.value.splice(index, 1);
      emit('delete', removed[0][uidKey]);
      emit('list-change', fileListRef.value, valueKey);
    }
    message.success(t('common.deleteSuccess'));
  }
  function handleAdd(obj: Record<handleFnKey, any>) {
    let { record = {}, valueKey = 'url', uidKey = 'uid' } = obj;
    const { maxNumber } = props;
    if (fileListRef.value.length + fileListRef.value.length > maxNumber) {
      return createMessage.warning(t('component.upload.maxNumber', [maxNumber]));
    }
    record[uidKey] = record[uidKey] ?? buildUUID();
    fileListRef.value = [...fileListRef.value, record];
    emit('list-change', fileListRef.value, valueKey);
  }
  async function handleDownload(record: any) {
    const res = await downloadFile({ id: record?.id });
    downloadByData(res?.data, record.name);
  }

  async function handleView(record: any) {
    const validType = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'image/jpg'];
    const res = await downloadFile({ id: record?.id });
    if (validType.includes(record?.type)) {
      if (record.type === 'application/pdf') {
        viewPDF(res?.data);
      } else {
        viewImageInModal(res?.data);
      }
    } else {
      downloadByData(res?.data, record.name);
    }
  }
  function viewImageInModal(data) {
    const mime = 'image/jpeg';
    const blob = new Blob([data], { type: mime });

    imageUrl.value = URL.createObjectURL(blob);

    isModalVisible.value = true;
  }

  function handleCancel() {
    isModalVisible.value = false;

    if (imageUrl.value) {
      URL.revokeObjectURL(imageUrl.value);
      imageUrl.value = '';
    }
  }
</script>
<style lang="less">
  .upload-preview-modal {
    .ant-upload-list {
      display: none;
    }

    .ant-table-wrapper .ant-spin-nested-loading {
      padding: 0;
    }
  }
</style>
