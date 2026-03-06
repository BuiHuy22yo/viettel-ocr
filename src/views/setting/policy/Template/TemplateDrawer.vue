<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="1500px"
    @ok="handleSubmit"
  >
    <Form
      layout="vertical"
      ref="formRef"
      name="dynamic_form_nest_item"
      :model="dynamicValidateForm"
    >
      <Row :gutter="20">
        <Col :span="6">
          <FormItem name="name" :label="t('page.form.template.name')" :rules="[{ required: true, message: 'Missing Name' }]">
            <Input v-model:value="dynamicValidateForm.name" />
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem name="code" :label="t('page.form.template.code')" :rules="[{ required: true, message: 'Missing Code' }]">
            <Input v-model:value="dynamicValidateForm.code" />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem name="description" :label="t('page.form.template.description')">
            <Textarea v-model:value="dynamicValidateForm.description" />
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
        <Col :span="5">
          <h4>{{t('policy.elementName')}}</h4>
        </Col>
        <Col :span="5">
          <h4>{{t('policy.symbol')}}</h4>
        </Col>
        <Col :span="5">
          <h4>{{t('policy.referenceData')}}</h4>
        </Col>
        <Col :span="5">
          <h4>{{t('policy.value')}}</h4>
        </Col>
        <Col :span="3">
          <h4>{{t('policy.numberValue')}}</h4>
        </Col>
      </Row>
      <Row
        :gutter="24"
        v-for="(item, index) in dynamicValidateForm.formulaComponentDetails"
        :key="item.id"
        style="
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            padding: 10px;
            border: 1px solid #8080805e;
            border-radius: 10px;
          "
      >
        <Col :span="5" :style="{ wordWrap: 'break-word', wordBreak: 'break-all'}">
          <FormItem
            :name="['formulaComponentDetails', index, 'elementName']"
            :rules="{
                required: false,
                message: t('policy.validElementName'),
              }"
          >
            <Input
              :disabled="item?.key === 'TOTAL'"
              v-model:value="item.elementName"
              @change="onChangeName(item.elementName,index)"
            />
          </FormItem>
        </Col>
        <Col :span="5" :style="{ wordWrap: 'break-word', wordBreak: 'break-all' }">
          <FormItem
            :name="['formulaComponentDetails', index, 'symbol']"
            :rules="{
                required: false,
                message: t('policy.validSymbol'),
              }"
          >
            <Input
              :disabled="item?.key === 'TOTAL'"
              v-model:value="item.symbol"
            />
          </FormItem>
        </Col>
        <Col :span="5">
          <FormItem
            :name="['formulaComponentDetails', index, 'referenceData']"
            :rules="{
                required: true,
                message: t('policy.validReferenceData'),
              }"
          >
            <Select
              :disabled="item?.key === 'TOTAL'"
              v-model:value="item.referenceData"
              :options="listMethod"
              show-search
              :filter-option="filterOption"
              :field-names="{ label: 'name', value: 'code' }"
            />
          </FormItem>
        </Col>
        <Col :span="5">
          <FormItem
            :validateStatus="getRealSalary === undefined ? 'error' : ''"
            :help="getRealSalary === undefined ? 'wrong formula' : null"
            v-if="item.referenceData == 'BY_FORMULA' || item.referenceData == 'BY_CONSTANT'"
            :name="['formulaComponentDetails', index, 'calculationExpression']"
            :rules="[
                {
                  required: true,
                  message: t('policy.validCalculationExpression'),
                },
              ]"
          >
            <a-textarea
              v-model:value="item.calculationExpression"
              placeholder="Enter value/formula"
              @blur="onBlur(item)"
            />
          </FormItem>
          <FormItem
            :validateStatus="getRealSalary === undefined ? 'error' : ''"
            :help="getRealSalary === undefined ? 'wrong formula' : null"
            v-if="item.referenceData == 'BY_EXTRA_DATA'"
            :name="['formulaComponentDetails', index, 'calculationExpression']"
            :rules="[
                {
                  required: true,
                  message: t('policy.validCalculationExpression'),
                },
              ]"
          >
            <ApiSelect
              v-model:value="item.calculationExpression"
              placeholder="Enter value/formula"
              :api="getTemplateExtraDataDetailByCode"
              :params="{
                code : 'ubos_purchase.service_policy_apply_to'
              }"
              valueField="extraDataDetailId"
              labelField="name"
              resultField="body"
            />

          </FormItem>
        </Col>
        <Col :span="3">
          <FormItem
            :name="['formulaComponentDetails', index, 'valueTest']"
            :rules="{
                required: false,
                message: t('policy.validNumberValue'),
              }"
          >
            <InputNumber
              :disabled="item.referenceData === 'BY_FORMULA'"
              v-model:value="item.valueTest"
              @blur="onBlur(item)"
            />
          </FormItem>
        </Col>
        <Col :span="1" v-if="item.isDefault !== 1"> <MinusCircleOutlined @click="removeItem(item)" /> </Col>
      </Row>

    </Form>
  </BasicDrawer>
</template>
<script lang="ts" setup>
import { reactive, ref, computed, unref } from 'vue';
import {  MinusCircleOutlined } from '@ant-design/icons-vue';
import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
import {
  getTemplateExtraDataDetailByCode,
} from '@/api/setting/template';
import {
  createFormula,
  updateFormula,
} from '@/api/setting/policy';
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
import { cloneDeep,isEqual} from 'lodash-es';
import Icon from '@/components/Icon/Icon.vue';
import { Parser } from 'hot-formula-parser';
import {removeVietnameseTones} from "@/utils/helper/validatorForm";
import {useI18n} from "@/hooks/web/useI18n";
import {ApiSelect} from "@/components/Form";
const { t } = useI18n();
const emit = defineEmits(['success', 'register']);
const isUpdate = ref(true);
const parser = new Parser();
interface configTemplates {
  symbol?: string;
  elementName?: string;
  calculationExpression?: string;
  id?: number;
  valueTest?: string;
  referenceData?: string
  isDefault?: number,
  key?: string;

}
const listMethod = ref([
  { name: 'By Formula', code: 'BY_FORMULA' },
  { name: 'By Extra Data', code: 'BY_EXTRA_DATA' },
]);

const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive<{
  formulaComponentDetails: configTemplates[];
  name: string;
  code: string;
  status: number | undefined;
  description: string;
  lstDelete: number[];
  id: number | undefined;
}>({
  id: undefined,
  code: '',
  description: '',
  name: '',
  status: undefined,
  formulaComponentDetails: [
    {
      symbol: 'CALCULATION_FORMULA',
      elementName: 'Calculation formula',
      calculationExpression : '',
      referenceData : 'BY_FORMULA',
      key : 'TOTAL'
    }
  ],
  lstDelete: [],
});
const dynamicValidateFormClone = ref(dynamicValidateForm);

const getRealSalary = computed(() => {
  return null;
});

const removeItem = (item: configTemplates) => {
  const index = dynamicValidateForm.formulaComponentDetails.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.lstDelete = [...dynamicValidateForm.lstDelete, item.id];
    dynamicValidateForm.formulaComponentDetails.splice(index, 1);
  }
};
const addSight = () => {
  dynamicValidateForm.formulaComponentDetails.splice(dynamicValidateForm.formulaComponentDetails?.length -1,0,{
    symbol: '',
    elementName: '',
    calculationExpression : undefined,
    referenceData: undefined,
  })
};

const onBlur = (item: configTemplates) => {
  // Đặt các biến vào parser
  const value = isNaN(Number(item.valueTest)) ? 0 : Number(item.valueTest);
  if (item.referenceData === 'BY_MANUAL') {
    parser.setVariable(item.symbol, Number(value));
    calculationExpression(item)
  } else if (item.referenceData === 'BY_FORMULA' &&
    item.calculationExpression) {
    try {
      const result = parser.parse(item.calculationExpression);
      if (result.error) {
        item.valueTest = 'Error';
      } else {
        item.valueTest = result.result;
        parser.setVariable(item.symbol, Number(result.result));
      }
    } catch (error) {
      item.valueTest = 'Error';
    }
  }
};
const calculationExpression = (item: configTemplates) => {
  dynamicValidateForm.formulaComponentDetails.forEach((obj) => {
    if (obj.symbol !== undefined && obj.referenceData === 'BY_FORMULA') {
      // Chuyển giá trị về số hoặc 0 nếu không phải số
      if (
        obj.calculationExpression &&
        obj.calculationExpression.includes(<string>item?.symbol)
      ) {
        try {
          const result = parser.parse(obj.calculationExpression);
          if (result.error) {
            obj.valueTest = 'Error';
          } else {
            obj.valueTest = result.result;
            parser.setVariable(obj.symbol, Number(result.result));
          }
        } catch (error) {
          obj.valueTest = 'Error';
        }
      }
    }
  });
};
const onChangeName= (value,index) => {
  if (value) {
    const text = removeVietnameseTones(value) || '';
    dynamicValidateForm.formulaComponentDetails[index].symbol = text.toUpperCase().replace(/\s+/g, '_');
  }
}
const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
  setDrawerProps({ confirmLoading: false, destroyOnClose: true });
  isUpdate.value = !!data?.isUpdate;
  await setData(data?.record);

});
const setData = async (data: any) => {
  if (unref(isUpdate)) {

    dynamicValidateForm.id = data?.id;
    dynamicValidateForm.name = data?.name;
    dynamicValidateForm.code = data?.code;
    dynamicValidateForm.status = data?.status;
    dynamicValidateForm.description = data?.description;
    dynamicValidateForm.formulaComponentDetails = data?.formulaComponentDetails.map((item,index) => {
      if (index + 1 === data?.formulaComponentDetails.length) {
        item.key = 'TOTAL'
      }
      if (item.referenceData === "BY_EXTRA_DATA") {
        item.calculationExpression = Number(item.calculationExpression);
      }
      return item;
    });
    dynamicValidateForm.lstDelete = [];
    dynamicValidateFormClone.value = cloneDeep(dynamicValidateForm)
  } else {
    dynamicValidateForm.id = undefined;
    dynamicValidateForm.name = '';
    dynamicValidateForm.code = '';
    dynamicValidateForm.status = undefined;
    dynamicValidateForm.description = '';
    dynamicValidateForm.formulaComponentDetails = [
      {
        symbol: 'CALCULATION_FORMULA',
        elementName: 'Calculation formula',
        calculationExpression : '',
        referenceData : 'BY_FORMULA',
        key : 'TOTAL'
      }
    ];
    dynamicValidateForm.lstDelete = [];
  }
};

const getTitle = computed(() => t('policy.titleFormulaForCalculatingIndicators'),);


const filterOption = (input: string, option: any) => {
  return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

async function handleSubmit() {
  try {
    const values = await formRef?.value?.validate();
    // const values = dynamicValidateForm;
    if (values) {
      values.formulaComponentDetails = [...dynamicValidateForm.formulaComponentDetails];
      values.lstDelete = [...dynamicValidateForm.lstDelete];
      values.id = dynamicValidateForm.id;
      values.status = 1
    }
    setDrawerProps({ confirmLoading: true });
    if(!unref(isUpdate)){
      await createFormula(values)
    }else{
      if(!isEqual(dynamicValidateForm, dynamicValidateFormClone.value)){
        if (values && values.formulaComponentDetails && dynamicValidateFormClone.value && dynamicValidateFormClone.value.formulaComponentDetails) {
          values.formulaComponentDetails = values.formulaComponentDetails.filter((item, index) => {
            const originalItem = dynamicValidateFormClone.value.formulaComponentDetails[index];
            return !isEqual(item, originalItem);
          });
        }
        await updateFormula(values)
      }

    }
    closeDrawer();
    message.success(`${getTitle.value} successfully`);
    emit('success');
  } finally {
    setDrawerProps({ confirmLoading: false });
  }
}
</script>
<style lang="less" scoped>
::v-deep(.ant-form-item) {
  margin: auto !important;
}

::v-deep(span.anticon.anticon-drag.drag-column-icon) {
  cursor: move;
}
</style>
