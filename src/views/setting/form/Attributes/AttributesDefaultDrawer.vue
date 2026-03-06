<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="700px"
    @ok="handleSubmit"
  >
    <Form
      layout="vertical"
      ref="formRef"
      name="dynamic_form_nest_item"
      :model="dynamicValidateForm"
    >
      <Row :gutter="20">
        <Col :span="8">
          <FormItem
            name="purposeId"
            label="Purpose"
            :rules="{
              required: true,
              message: 'Missing purpose',
            }"
          >
            <Select
              allowClear
              :filter-option="filterOption"
              :field-names="{ label: 'name', value: 'id' }"
              v-model:value="dynamicValidateForm.purposeId"
              :options="listPurpose"
              @change="onChangePurpose"
            />
          </FormItem>
        </Col>
      </Row>
      <FormItem>
        <div class="flex justify-end mt-3 mb-3">
          <a-button type="primary" @click="addSight" class="ml-3"
            ><Icon :icon="'ion:add-outline'" /> {{ t('page.form.attributes.modalAddTitle') }}
          </a-button>
        </div>
      </FormItem>
      <Row :gutter="20">
        <Col :span="4">
          <h4>COLUMN</h4>
        </Col>
        <Col :span="10">
          <h4>Name</h4>
        </Col>
        <Col :span="10">
          <h4>Code</h4>
        </Col>
        <Col :span="1">
          <!--          <h4>Code</h4>-->
        </Col>
      </Row>
      <div ref="formDrag">
        <Row
          :gutter="20"
          v-for="item in dynamicValidateForm.templateDetail"
          :key="item.id"
          style="
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            padding: 15px;
            border: 1px solid #8080805e;
            border-radius: 10px;
          "
        >
          <Col :span="3"> <DragOutlined class="drag-column-icon" /> </Col>
          <Col :span="10" :style="{ wordWrap: 'break-word', wordBreak: 'break-all' }">
            {{ item.title }}
          </Col>
          <Col :span="10" :style="{ wordWrap: 'break-word', wordBreak: 'break-all' }">
            {{ item.keyword }}
          </Col>
          <Col :span="1"> <MinusCircleOutlined @click="removeItem(item)" /> </Col>
        </Row>
      </div>
    </Form>
  </BasicDrawer>
  <GroupAttributesDrawer @register="registerDrawerGroupElement" @success="handleSuccess" />
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref, onMounted } from 'vue';
  import { DragOutlined, MinusCircleOutlined } from '@ant-design/icons-vue';
  import { BasicDrawer, useDrawer, useDrawerInner } from '@/components/Drawer';
  import {
    createAttributesDefault,
    getAllAttributesDefault,
    getAllPurpose,
    getAllTemplate,
  } from '@/api/setting/template';
  import { Form, FormItem, Select, Row, Col, FormInstance, message } from 'ant-design-vue';
  import { cloneDeep } from 'lodash-es';
  import Icon from '@/components/Icon/Icon.vue';
  import GroupAttributesDrawer from './../Template/GroupAttributesDrawer.vue';
  import { useI18n } from '@/hooks/web/useI18n';

  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  interface configTemplates {
    keyword?: string;
    title?: string;
    attributesId?: number;
    id?: number;
  }
  const listPurpose = ref([]);
  const formRef = ref<FormInstance>();
  const formDrag = ref(null);
  const dynamicValidateForm = reactive<{
    templateDetail: configTemplates[];
    purposeId: number | undefined;
    status: number | undefined;
    lstDelete: number[];
    id: number | undefined;
  }>({
    id: undefined,
    purposeId: undefined,
    status: 1,
    templateDetail: [],
    lstDelete: [],
  });
  const dynamicValidateFormClone = ref(dynamicValidateForm);

  const removeItem = (item: configTemplates) => {
    const index = dynamicValidateForm.templateDetail.indexOf(item);
    if (index !== -1) {
      dynamicValidateForm.lstDelete = [...dynamicValidateForm.lstDelete, item.id];
      dynamicValidateForm.templateDetail.splice(index, 1);
    }
  };
  const addSight = () => {
    openDrawer(true, { templateDetail: dynamicValidateForm.templateDetail });
  };
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    // resetFields();
    setDrawerProps({ confirmLoading: false, destroyOnClose: true });
    isUpdate.value = !!data?.isUpdate;
    listPurpose.value = (await getAllPurpose({})) || [];
    await setData(data?.record);
  });
  const setData = async (data: any) => {
    if (unref(isUpdate)) {
      const dataSearch: any = await getAllTemplate({
        templateId: data?.id,
        currentPage: 1,
        pageSize: 10,
      });
      const dataSource = dataSearch?.content[0] || [];
      dynamicValidateForm.id = dataSource?.id;
      dynamicValidateForm.purposeId = dataSource?.purposeId;
      dynamicValidateForm.status = dataSource?.status;
      dynamicValidateForm.templateDetail = dataSource?.templateDetail;
      dynamicValidateForm.lstDelete = [];
      dynamicValidateFormClone.value = cloneDeep(dynamicValidateForm);
    } else {
      dynamicValidateForm.id = undefined;
      dynamicValidateForm.purposeId = undefined;
      dynamicValidateForm.status = 1;
      dynamicValidateForm.templateDetail = [];
      dynamicValidateForm.lstDelete = [];
    }
  };
  const [registerDrawerGroupElement, { openDrawer }] = useDrawer();

  const getTitle = computed(() =>
    !unref(isUpdate) ? 'Create Attributes Default' : 'Update Template',
  );
  function handleSuccess(e) {
    const listElement = e.reduce((pre, item) => {
      if (item?.groupAttributeId) {
        pre.push({
          keyword: item?.code,
          title: item?.name,
          attributesId: item?.id,
        });
      }
      return pre;
    }, []);
    dynamicValidateForm.templateDetail = [...listElement, ...dynamicValidateForm.templateDetail];
  }

  const filterOption = (input: string, option: any) => {
    return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  async function handleSubmit() {
    try {
      const values = await formRef?.value?.validate();
      if (values) {
        values.templateDetail = [...dynamicValidateForm.templateDetail];
        values.lstDelete = [...dynamicValidateForm.lstDelete];
        values.id = dynamicValidateForm.id;
      }
      setDrawerProps({ confirmLoading: true });
      await createAttributesDefault(values);
      closeDrawer();
      message.success(`${getTitle.value} successfully`);
      // emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
  const onChangePurpose = async (value) => {
    console.log(value);
    if (value) {
      const data = (await getAllAttributesDefault({ purposeId: value })) || [];
      if (data.length) {
        console.log('data: ', data);
        dynamicValidateForm.templateDetail = data;
      } else {
        dynamicValidateForm.templateDetail = [];
      }
    }
  };
  onMounted(async () => {
    listPurpose.value = (await getAllPurpose({})) || [];
  });
</script>
<style lang="less" scoped>
  ::v-deep(.ant-form-item) {
    margin: auto !important;
  }
  ::v-deep(span.anticon.anticon-drag.drag-column-icon) {
    cursor: move;
  }
</style>
