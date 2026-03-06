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
          <a-button type="primary" @click="handleCreate" class="ml-5" v-if="!props?.isView"
            ><Icon :icon="'ion:add-outline'" /> {{ t('common.create') }}
          </a-button>
          <!--          <a-button type="primary" @click="handleCreate" class="ml-5" v-if="!props?.isFromProduct"-->
          <!--            ><Icon :icon="'ion:add-outline'" /> {{ t('common.create') }}-->
          <!--          </a-button>-->
        </div>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                disabled: props?.isView,
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                disabled: props?.isView,
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
    <VariantDrawer @register="registerDrawer" @success="handleSuccess" />
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
  import { onMounted, ref, watch } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';

  import { useDrawer } from '@/components/Drawer';
  import VariantDrawer from './variantDrawer.vue';

  import { columns } from './variant.data';
  import { deleteVariant, getAllVariant } from '@/api/setting/service-product';
  import { formatToDateTime } from '@/utils/dateUtil';
  import { message } from 'ant-design-vue';
  import { useI18n } from '@/hooks/web/useI18n';

  defineOptions({ name: 'Product' });
  const openModal = ref(false);
  const confirmLoading = ref(false);

  const nameRecord = ref('');
  const id = ref(null);
  const { t } = useI18n();
  const textSearch = ref('');
  const dataSource = ref<any>([]);
  const debouncedRequest = useDebounceFn(() => 'response', 1000);
  const emit = defineEmits(['exist-variant']);

  const props = defineProps({
    productId: {
      type: Object,
      default: null,
    },
    dataRecord: {
      type: Object,
      default: null,
    },
    isFromProduct: {
      type: Boolean,
      default: false,
    },
    isView: {
      type: Boolean,
      default: false,
    },
  });
  const isView1 = ref(false);

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { setLoading, setProps }] = useTable({
    title: props?.isFromProduct ? t('form.setting.variantLst') : t('form.setting.variant'),
    dataSource: dataSource,
    subTitle: props?.isFromProduct ? '' : t('form.setting.subTitleProduct'),
    icon: props?.isFromProduct ? '' : 'material-symbols:tab-group-outline',
    columns,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 80,
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      fixed: 'right',
    },
    maxHeight: 300,
  });

  watch(
    () => props.productId,
    (val) => {
      searchAllProduct(textSearch.value);
    },
    {
      deep: true,
    },
  );

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
      productId: props.productId,
      record: props.dataRecord,
    });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      productId: props.productId,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    openModal.value = true;
    id.value = record?.id;
    nameRecord.value = record?.productName;
  }

  function handleSuccess() {
    textSearch.value = '';
    searchAllProduct(textSearch.value);
  }
  async function searchAllProduct(text: string) {
    try {
      setLoading(true);

      const data: any = await getAllVariant({
        keyword: text,
        productId: props.productId,
      });
      dataSource.value = data || [];
      if (data?.length > 0) {
        emit('exist-variant');
      }
    } finally {
      setLoading(false);
    }
  }
  const onChangeTextSearch = async (val) => {
    const value = await debouncedRequest();
    if (value === 'response') {
      searchAllProduct(val.target.value.trim());
    }
  };
  const handleOk = async () => {
    try {
      confirmLoading.value = true;
      await deleteVariant({ id: id.value });
      searchAllProduct(textSearch.value);
      openModal.value = false;
      message.success(t('common.deleteSuccess'));
    } finally {
      confirmLoading.value = false;
    }
  };
  onMounted(() => {
    isView1.value = props?.isView;
    if (props?.isFromProduct) {
      setProps({
        title: t('form.setting.variantLst'),
        dataSource: dataSource,
        subTitle: '',
        icon: '',
      });
    }
    searchAllProduct(textSearch.value);
  });
</script>
