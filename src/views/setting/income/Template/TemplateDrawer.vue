<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="1200px"
    @ok="handleSubmit"
  >
    <Form
      layout="vertical"
      ref="formRef"
      name="dynamic_form_nest_item"
      :model="dynamicValidateForm"
    >
      <Row :gutter="20">
        <Col :span="12">
          <FormItem
            name="templateName"
            label="Template Name"
            :rules="[{ required: true, message: 'Missing Template Name' }]"
          >
            <Input v-model:value="dynamicValidateForm.templateName" />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem name="description" label="Description">
            <Textarea v-model:value="dynamicValidateForm.description" />
          </FormItem>
        </Col>
      </Row>
      <FormItem>
        <div class="flex justify-end mt-3 mb-3">
          <!--          <a-button type="primary" @click="addSight"-->
          <!--            ><Icon :icon="'ion:add-outline'" /> Add Group Column-->
          <!--          </a-button>-->
          <a-button type="primary" @click="addSight" class="ml-3"
            ><Icon :icon="'ion:add-outline'" /> {{ t('common.create') }}
          </a-button>
        </div>
      </FormItem>
      <Row :gutter="20">
        <Col :span="2">
          <h4>COLUMN</h4>
        </Col>
        <Col :span="3">
          <h4>TITLE</h4>
        </Col>
        <Col :span="3">
          <h4>KEYWORD</h4>
        </Col>
        <Col :span="5">
          <h4>METHOD</h4>
        </Col>
        <Col :span="5">
          <h4>CALCULATE FORMULA</h4>
        </Col>
        <Col :span="4">
          <h4> NUMBER VALUE</h4>
        </Col>
      </Row>
      <div ref="formDrag">
        <Row
          :gutter="20"
          v-for="(item, index) in dynamicValidateForm.templateElementSdis"
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
          <Col :span="2"> <DragOutlined class="drag-column-icon" /> </Col>
          <Col :span="3">
            {{ item.elementName }}
          </Col>
          <Col :span="3">
            {{ item.elementCode }}
          </Col>
          <Col :span="5">
            <FormItem
              :name="['templateElementSdis', index, 'methodId']"
              :rules="{
                required: true,
                message: 'Missing item',
              }"
            >
              <Select
                v-model:value="item.methodId"
                :options="listMethod"
                show-search
                :filter-option="filterOption"
                :field-names="{ label: 'methodName', value: 'id' }"
              />
            </FormItem>
          </Col>
          <Col :span="5">
            <FormItem
              :validateStatus="getRealSalary === undefined ? 'error' : ''"
              :help="getRealSalary === undefined ? 'wrong formula' : null"
              v-if="item.methodId == 1 || item.methodId == 2"
              :name="['templateElementSdis', index, 'calculateFormula']"
              :rules="[
                {
                  required: item.methodId === 2,
                  message: 'Missing CALCULATE FORMULA',
                },
              ]"
            >
              <a-input v-model:value="item.calculateFormula" placeholder="Enter value/formula" />
            </FormItem>
            <FormItem
              v-else
              :name="['templateElementSdis', index, 'incomeDataSourceId']"
              :rules="{
                required: true,
                message: 'Missing incomeDataSourceId',
              }"
            >
              <Select
                allowClear
                :filter-option="filterOptionDataSource"
                :field-names="{ label: 'incomeDataSourceName', value: 'id' }"
                v-model:value="item.incomeDataSourceId"
                :options="getListDataSourceByMethod(item.methodId)"
              />
            </FormItem>
          </Col>
          <Col :span="4">
            <FormItem
              :name="['templateElementSdis', index, 'valueTest']"
              :rules="{
                required: false,
                message: 'Missing valueTest',
              }"
            >
              <InputNumber
                :disabled="item.elementCode === 'TOTAL' || item.methodId === 2"
                v-model:value="item.valueTest"
              />
            </FormItem>
          </Col>
          <Col :span="2"> <MinusCircleOutlined @click="removeItem(item)" /> </Col>
        </Row>
      </div>
      <Row
        :gutter="20"
        style="
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          padding: 15px;
          border: 1px solid #8080805e;
          border-radius: 10px;
        "
      >
        <Col :span="2"> <DragOutlined /> </Col>
        <Col :span="3"> {{ dynamicValidateForm.titleByTotal }} </Col>
        <Col :span="3">
          {{ dynamicValidateForm.keyByTotal }}
        </Col>
        <Col :span="5">
          <FormItem
            name="methodByTotal"
            :rules="{
              required: true,
              message: 'Missing item',
            }"
          >
            <Select
              v-model:value="dynamicValidateForm.methodByTotal"
              :options="listMethod"
              show-search
              :filter-option="filterOption"
              :field-names="{ label: 'methodName', value: 'id' }"
            />
          </FormItem>
        </Col>
        <Col :span="5">
          <FormItem
            name="calculateFormulaByTotal"
            :validateStatus="getRealSalary === undefined ? 'error' : ''"
            :help="getRealSalary === undefined ? 'wrong formula' : null"
            v-if="dynamicValidateForm.methodByTotal == 1 || dynamicValidateForm.methodByTotal == 2"
            :rules="[
              {
                required: dynamicValidateForm.methodByTotal === 2,
                message: 'Missing CALCULATE FORMULA',
              },
            ]"
          >
            <a-input
              v-model:value="dynamicValidateForm.calculateFormulaByTotal"
              placeholder="Enter value/formula"
            />
          </FormItem>
          <FormItem
            v-else
            name="incomeDataSourceIdByTotal"
            :rules="{
              required: true,
              message: 'Missing incomeDataSourceId',
            }"
          >
            <Select
              allowClear
              :filter-option="filterOptionDataSource"
              :field-names="{ label: 'incomeDataSourceName', value: 'id' }"
              v-model:value="dynamicValidateForm.incomeDataSourceIdByTotal"
              :options="getListDataSourceByMethod(dynamicValidateForm.methodByTotal)"
            />
          </FormItem>
        </Col>
        <Col :span="4">
          <FormItem
            name="valueTestTotal"
            :rules="{
              required: false,
              message: 'Missing valueTest',
            }"
          >
            <Input disabled :value="getRealSalary" />
          </FormItem>
        </Col>
      </Row>
    </Form>
  </BasicDrawer>
  <GroupElementDrawer @register="registerDrawerGroupElement" @success="handleSuccess" />
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref, nextTick, onMounted } from 'vue';
  import { DragOutlined, MinusCircleOutlined } from '@ant-design/icons-vue';
  import { BasicDrawer, useDrawer, useDrawerInner } from '@/components/Drawer';
  import {
    createTemplate,
    updateTemplate,
    getAllDataSource,
    getAllMethod,
  } from '@/api/setting/income';
  import {
    Form,
    FormItem,
    Select,
    Input,
    Textarea,
    Row,
    Col,
    InputNumber,
    FormInstance,
    message,
  } from 'ant-design-vue';
  import Sortablejs from 'sortablejs';
  import { isNil } from '@/utils/is';
  import { cloneDeep } from 'lodash-es';
  import Icon from '@/components/Icon/Icon.vue';
  import GroupElementDrawer from './GroupElementDrawer.vue';
  import { useI18n } from '@/hooks/web/useI18n';

  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const dataRecord = ref({});
  interface configTemplates {
    keyword?: string;
    title?: string;
    elementCode?: string;
    elementName?: string;
    methodId?: number;
    methodCode?: string;
    methodName?: string;
    incomeDataSourceId?: number;
    calculateFormula?: string;
    id?: number;
    valueTest?: string;
  }
  const listMethod = ref([]);
  const listDataSource = ref([]);

  const formRef = ref<FormInstance>();
  const formDrag = ref(null);
  const dynamicValidateForm = reactive<{
    templateElementSdis: configTemplates[];
    templateName: string;
    description: string;
    methodByTotal?: number;
    keyByTotal: string;
    titleByTotal: string;
    incomeDataSourceIdByTotal?: number;
    calculateFormulaByTotal?: string;
  }>({
    templateElementSdis: [],
    templateName: '',
    description: '',
    methodByTotal: undefined,
    incomeDataSourceIdByTotal: undefined,
    calculateFormulaByTotal: '',
    keyByTotal: 'TOTAL',
    titleByTotal: 'Total',
  });

  const getRealSalary = computed(() => {
    const values = dynamicValidateForm.templateElementSdis.reduce((acc, obj) => {
      acc[obj?.elementCode] = obj.valueTest;
      return acc;
    }, {});
    console.log(111, values);
    const hasNoNullOrUndefined =
      Object.values(values)?.every((value: any) => value !== null && value !== undefined) || null;

    let formula: any = dynamicValidateForm.calculateFormulaByTotal;

    if (formula && hasNoNullOrUndefined) {
      for (const [key, value] of Object.entries(values)) {
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        formula = formula.replace(regex, value);
      }
      try {
        return Function(`"use strict"; return (${formula})`)();
      } catch (error) {
        return undefined;
      }
    }
    return null;
  });

  const removeItem = (item: configTemplates) => {
    const index = dynamicValidateForm.templateElementSdis.indexOf(item);
    if (index !== -1) {
      dynamicValidateForm.templateElementSdis.splice(index, 1);
    }
  };
  const addSight = () => {
    openDrawer(true, 1);
  };

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false, destroyOnClose: true });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      dataRecord.value = { ...data.record };
      dynamicValidateForm.templateName = data?.record?.templateName;
      dynamicValidateForm.description = data?.record?.description;

      const templateElementSdis =
        data?.record?.templateElementSdis?.map((item: any) => {
          item.elementName = item?.title;
          item.elementCode = item?.keyword;
          return item;
        }) || [];
      dynamicValidateForm.incomeDataSourceIdByTotal =
        templateElementSdis?.[templateElementSdis.length - 1]?.incomeDataSourceId;
      dynamicValidateForm.calculateFormulaByTotal =
        templateElementSdis?.[templateElementSdis.length - 1]?.calculateFormula;
      dynamicValidateForm.methodByTotal =
        templateElementSdis?.[templateElementSdis.length - 1]?.methodId;
      templateElementSdis.pop();
      dynamicValidateForm.templateElementSdis = [...templateElementSdis];
    } else {
      dynamicValidateForm.templateName = '';
      dynamicValidateForm.description = '';
      dynamicValidateForm.templateElementSdis = [];
    }
    await nextTick();
    if (formDrag.value) {
      const el = formDrag.value;
      Sortablejs.create(el, {
        animation: 500,
        delay: 400,
        delayOnTouchOnly: true,
        handle: '.drag-column-icon ',
        dataIdAttr: 'data-no',
        onEnd: (evt) => {
          const { oldIndex, newIndex } = evt;
          if (isNil(oldIndex) || isNil(newIndex) || oldIndex === newIndex) {
            return;
          }

          const options = cloneDeep(dynamicValidateForm.templateElementSdis);

          if (oldIndex > newIndex) {
            options.splice(newIndex, 0, options[oldIndex]);
            options.splice(oldIndex + 1, 1);
          } else {
            options.splice(newIndex + 1, 0, options[oldIndex]);
            options.splice(oldIndex, 1);
          }

          dynamicValidateForm.templateElementSdis = options;
        },
      });
    }
  });
  const [registerDrawerGroupElement, { openDrawer }] = useDrawer();

  const getTitle = computed(() =>
    !unref(isUpdate)
      ? t('form.setting.createTemplateIncome')
      : t('form.setting.updateTemplateIncome'),
  );
  function handleSuccess(e) {
    const listElement = e.reduce((pre, item) => {
      if (item?.incomeElementGroupId) {
        pre.push({
          elementCode: item?.elementCode,
          keyword: item?.elementCode,
          title: item?.elementName,
          elementName: item?.elementName,
          methodCode: item?.methodCode,
          methodName: item?.methodName,
          incomeElementId: item?.id,
          methodId: undefined,
          incomeDataSourceId: undefined,
        });
      }
      return pre;
    }, []);
    dynamicValidateForm.templateElementSdis = [
      ...listElement,
      ...dynamicValidateForm.templateElementSdis,
    ];
  }

  const filterOption = (input: string, option: any) => {
    return option.methodName.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  const filterOptionDataSource = (input: string, option: any) => {
    return option?.incomeDataSourceName.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  async function handleSubmit() {
    try {
      const values = await formRef?.value?.validate();
      if (values) {
        values.templateElementSdis = [
          ...dynamicValidateForm.templateElementSdis,
          ...[
            {
              keyword: dynamicValidateForm.keyByTotal,
              title: dynamicValidateForm.titleByTotal,
              methodId: dynamicValidateForm.methodByTotal,
              incomeDataSourceId: dynamicValidateForm.incomeDataSourceIdByTotal,
              calculateFormula: dynamicValidateForm.calculateFormulaByTotal,
            },
          ],
        ];
      }

      setDrawerProps({ confirmLoading: true });

      !unref(isUpdate)
        ? await createTemplate(values)
        : await updateTemplate({ ...dataRecord.value, ...values });
      closeDrawer();
      message.success(`${getTitle.value} ${t('common.successfully')}`);
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
  const getListDataSourceByMethod = (id) => {
    return listDataSource.value?.filter((item: any) => item.incomeMethodId === id);
  };
  onMounted(async () => {
    listMethod.value = await getAllMethod({ status: 1 });
    listDataSource.value = (await getAllDataSource({})) || [];
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
