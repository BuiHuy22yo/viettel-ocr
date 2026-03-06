<template>
  <BasicModal
    width="800px"
    :title="t('component.upload.upload')"
    :okText="t('component.upload.save')"
    v-bind="$attrs"
    @register="register"
    @ok="handleOk"
    :closeFunc="handleCloseFunc"
    :maskClosable="false"
    :keyboard="false"
    class="upload-modal"
    :okButtonProps="getOkButtonProps"
    :cancelButtonProps="{ disabled: isUploadingRef }"
  >
    <template #centerFooter>
      <a-button
        @click="handleStartUpload"
        color="success"
        :disabled="!getIsSelectFile"
        :loading="isUploadingRef"
      >
        {{ getUploadBtnText }}
      </a-button>
    </template>

    <div class="upload-modal-toolbar">
      <Alert :message="getHelpText" type="info" banner class="upload-modal-toolbar__text" />

      <Upload
        :accept="getStringAccept"
        :multiple="multiple"
        :before-upload="beforeUpload"
        :show-upload-list="false"
        class="upload-modal-toolbar__btn"
      >
        <a-button type="primary">
          {{ t('component.upload.choose') }}
        </a-button>
      </Upload>
    </div>
    <FileList
      v-model:dataSource="fileListRef"
      :columns="columns"
      :actionColumn="actionColumn"
      :openDrag="fileListOpenDrag"
      :dragOptions="fileListDragOptions"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, toRefs, unref, computed, PropType } from 'vue';
  import { Upload, Alert } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  // hooks
  import { useUploadType } from '../hooks/useUpload';
  import { useMessage } from '@/hooks/web/useMessage';
  //   types
  import { FileItem, UploadResultStatus } from '../types/typing';
  import { basicProps } from '../props';
  import { createTableColumns, createActionColumn } from './data';
  // utils
  import { checkImgType, getBase64WithFile } from '../helper';
  import { buildUUID } from '@/utils/uuid';
  import { isFunction } from '@/utils/is';
  import { warn } from '@/utils/log';
  import FileList from './FileList.vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { get } from 'lodash-es';

  const props = defineProps({
    ...basicProps,
    previewFileList: {
      type: Array as PropType<string[] | any[]>,
      default: () => [],
    },
  });

  const emit = defineEmits(['change', 'register', 'delete']);

  const columns = createTableColumns();
  const actionColumn = createActionColumn(handleRemove);

  const isUploadingRef = ref(false);
  const fileListRef = ref<FileItem[]>([]);
  const { accept, helpText, maxNumber, maxSize } = toRefs(props);

  const { t } = useI18n();
  const [register, { closeModal }] = useModalInner();

  const { getStringAccept, getHelpText } = useUploadType({
    acceptRef: accept,
    helpTextRef: helpText,
    maxNumberRef: maxNumber,
    maxSizeRef: maxSize,
  });

  const { createMessage } = useMessage();

  const getIsSelectFile = computed(() => {
    return (
      fileListRef.value.length > 0 &&
      !fileListRef.value.every((item) => item.status === UploadResultStatus.SUCCESS)
    );
  });

  const getOkButtonProps = computed(() => {
    const someSuccess = fileListRef.value.some(
      (item) => item.status === UploadResultStatus.SUCCESS,
    );
    return {
      disabled: isUploadingRef.value || fileListRef.value.length === 0 || !someSuccess,
    };
  });

  const getUploadBtnText = computed(() => {
    const someError = fileListRef.value.some((item) => item.status === UploadResultStatus.ERROR);
    return isUploadingRef.value
      ? t('component.upload.uploading')
      : someError
        ? t('component.upload.reUploadFailed')
        : t('component.upload.startUpload');
  });

  function beforeUpload(file: File) {
    const { size, name } = file;
    const { maxSize } = props;
    if (maxSize && file.size / 1024 / 1024 >= maxSize) {
      createMessage.error(t('component.upload.maxSizeMultiple', [maxSize]));
      return false;
    }

    const commonItem = {
      uuid: buildUUID(),
      file,
      size,
      name,
      percent: 0,
      type: name.split('.').pop(),
    };
    if (checkImgType(file)) {
      // file.thumbUrl = await getBase64(file);
      getBase64WithFile(file).then(({ result: thumbUrl }) => {
        fileListRef.value = [
          ...unref(fileListRef),
          {
            thumbUrl,
            ...commonItem,
          },
        ];
      });
    } else {
      fileListRef.value = [...unref(fileListRef), commonItem];
    }
    return false;
  }

  function handleRemove(record: any) {
    const index = fileListRef.value.findIndex((item) => item.uuid === record?.record.uuid);
    index !== -1 && fileListRef.value.splice(index, 1);
    isUploadingRef.value = fileListRef.value.some(
      (item) => item.status === UploadResultStatus.UPLOADING,
    );
    emit('delete', record);
  }

  async function uploadApiByItem(item: FileItem) {
    const { api } = props;
    if (!api || !isFunction(api)) {
      return warn('upload api must exist and be a function');
    }
    try {
      item.status = UploadResultStatus.UPLOADING;
      const ret = await props.api?.(
        {
          data: {
            ...(props.uploadParams || {}),
          },
          file: item.file,
          name: props.name,
          filename: props.filename,
        },
        function onUploadProgress(progressEvent: ProgressEvent) {
          const complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
          item.percent = complete;
        },
      );
      const { data } = ret;
      item.status = UploadResultStatus.SUCCESS;
      item.response = data;
      if (props.resultField) {
        item.response = {
          code: 0,
          message: 'upload Success!',
          url: get(ret, props.resultField),
        };
      }
      return {
        success: true,
        error: null,
      };
    } catch (e) {
      console.log(e);
      item.status = UploadResultStatus.ERROR;
      return {
        success: false,
        error: e,
      };
    }
  }

  async function handleStartUpload() {
    const { maxNumber } = props;
    if (fileListRef.value.length + props.previewFileList.length > maxNumber) {
      return createMessage.warning(t('component.upload.maxNumber', [maxNumber]));
    }
    try {
      isUploadingRef.value = true;
      const uploadFileList =
        fileListRef.value.filter((item) => item.status !== UploadResultStatus.SUCCESS) || [];
      await Promise.all(
        uploadFileList.map((item) => {
          return uploadApiByItem(item);
        }),
      );
      // const data = await Promise.all(
      //   uploadFileList.map((item) => {
      //     return uploadApiByItem(item);
      //   }),
      // );
      isUploadingRef.value = false;
      // const errorList = data.filter((item: any) => !item.success);
      // if (errorList.length > 0) throw errorList;
    } catch (e) {
      isUploadingRef.value = false;
      throw e;
    }
  }

  function handleOk() {
    const { maxNumber } = props;

    if (fileListRef.value.length > maxNumber) {
      return createMessage.warning(t('component.upload.maxNumber', [maxNumber]));
    }
    if (isUploadingRef.value) {
      return createMessage.warning(t('component.upload.saveWarn'));
    }
    const fileList: any = [];

    for (const item of fileListRef.value) {
      const { status, response } = item;
      if (status === UploadResultStatus.SUCCESS && response) {
        fileList.push(response);
      }
    }
    if (fileList.length <= 0) {
      return createMessage.warning(t('component.upload.saveError'));
    }
    fileListRef.value = [];
    closeModal();
    emit('change', fileList);
  }

  async function handleCloseFunc() {
    if (!isUploadingRef.value) {
      fileListRef.value = [];
      return true;
    } else {
      createMessage.warning(t('component.upload.uploadWait'));
      return false;
    }
  }
</script>
<style lang="less">
  .upload-modal {
    .ant-upload-list {
      display: none;
    }

    .ant-table-wrapper .ant-spin-nested-loading {
      padding: 0;
    }

    &-toolbar {
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      &__btn {
        flex: 1;
        margin-left: 8px;
        text-align: right;
      }
    }
  }
</style>
