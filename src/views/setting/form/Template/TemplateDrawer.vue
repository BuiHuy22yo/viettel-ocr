<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="90%"
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
          <FormItem name="name" :label="t('page.form.template.name')" :rules="[{ required: true, message: 'Missing Name' }]">
            <Input v-model:value="dynamicValidateForm.name" @change="onChangeName" />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem name="code" :label="t('page.form.template.code')" :rules="[{ required: true, message: 'Missing Code' }]">
            <Input v-model:value="dynamicValidateForm.code" />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem
            name="purposeId"
            :label="t('page.form.template.purpose')"
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
        <Col :span="8">
          <FormItem
            name="typeId"
            :label="t('page.form.template.type')"
            :rules="{
              required: true,
              message: 'Missing type',
            }"
          >
            <Select
              allowClear
              :filter-option="filterOption"
              :field-names="{ label: 'name', value: 'id' }"
              v-model:value="dynamicValidateForm.typeId"
              :options="listType"
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem
            name="status"
            :label="t('page.form.template.status')"

            :rules="{
              required: true,
              message: 'Missing status',
            }"
          >
            <Select
              allowClear
              :filter-option="filterOption"
              :field-names="{ label: 'name', value: 'id' }"
              v-model:value="dynamicValidateForm.status"
              :options="listStatus"
            />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem name="description" :label="t('page.form.template.description')">
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
          ><Icon :icon="'ion:add-outline'" /> {{ t('page.form.attributes.modalAddTitle') }}
          </a-button>
        </div>
      </FormItem>
      <Row :gutter="20">
        <Col :span="2">
          <h4>{{ t('page.form.template.column') }}</h4>
        </Col>
        <Col :span="3">
          <h4>{{ t('page.form.template.titleTable') }}</h4>
        </Col>
        <Col :span="3">
          <h4>{{ t('page.form.template.keyword') }}</h4>
        </Col>
        <Col :span="2">
          <h4>{{ t('page.form.template.dataType') }}</h4>
        </Col>
        <Col :span="2">
          <h4>{{ t('page.form.template.group') }}</h4>
        </Col>
        <Col :span="2">
          <h4>{{ t('page.form.template.groupType') }}</h4>
        </Col>
        <Col :span="3">
          <h4>{{ t('page.form.template.method') }}</h4>
        </Col>
        <Col :span="4">
          <h4>{{ t('page.form.template.calculateFormula') }}</h4>
        </Col>
        <Col :span="2">
          <h4>{{ t('page.form.template.numberValue') }}</h4>
        </Col>
      </Row>
      <div ref="formDrag">
        <Row
          :gutter="24"
          v-for="(item, index) in dynamicValidateForm.templateDetail"
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
          <Col :span="2"> <DragOutlined class="drag-column-icon" />      <Switch
            :checked="item?.isDisplay === 1"
            checked-children="Display"
            un-checked-children="Hide"
            @change="(checked) => { if (item) item.isDisplay = checked ? 1 : 0 }"
          /></Col>
          <Col :span="3" :style="{ wordWrap: 'break-word', wordBreak: 'break-all'}">
            {{ item.title }}
          </Col>
          <Col :span="3" :style="{ wordWrap: 'break-word', wordBreak: 'break-all' }">
            {{ item.keyword }}
          </Col>
          <Col :span="2">
            <FormItem
              :name="['templateDetail', index, 'dataType']"
              :rules="{
                required: true,
                message: 'Missing dataType',
              }"
            >
            <Select
              v-model:value="item.dataType"
              :options="listDataType"
              show-search
              :filter-option="filterOption"
              :field-names="{ label: 'name', value: 'code' }"
              @change="validateMerge(item,'dataType')"
            />
            </FormItem>
          </Col>
          <Col :span="2">
            <FormItem
              :name="['templateDetail', index, 'mergeRow']"
              :rules="{
                required: item.mergeRowDataType ? true:false,
                message: 'Missing mergeRow',
              }"
            >
              <Select
                allowClear
                v-model:value="item.mergeRow"
                :options="listMergeRow"
                show-search
                :filter-option="filterOption"
                :field-names="{ label: 'name', value: 'code' }"
                @change="validateMerge(item,'mergeRow')"
              />
            </FormItem>
          </Col>
          <Col :span="2">
            <FormItem
              :name="['templateDetail', index, 'mergeRowDataType']"
              :rules="{
                required: item.mergeRow == true ? true:false,
                message: 'Missing mergeRowDataType',
              }"
            >
              <Select
                allowClear
                v-model:value="item.mergeRowDataType"
                :options="listMergeRowDataType"
                show-search
                :filter-option="filterOption"
                :field-names="{ label: 'name', value: 'code' }"
              />
            </FormItem>
          </Col>
          <Col :span="3">
            <FormItem
              :name="['templateDetail', index, 'methodCode']"
              :rules="{
                required: true,
                message: 'Missing item',
              }"
            >
              <Select
                v-model:value="item.methodCode"
                :options="listMethod"
                show-search
                :filter-option="filterOption"
                :field-names="{ label: 'name', value: 'code' }"
                @change="validateMerge(item,'methodCode')"
              />
            </FormItem>
          </Col>
          <Col :span="4">
            <FormItem
              :validateStatus="getRealSalary === undefined ? 'error' : ''"
              :help="getRealSalary === undefined ? 'wrong formula' : null"
              v-if="item.methodCode == 'BY_FORMULA' || item.methodCode == 'BY_CONSTANT'"
              :name="['templateDetail', index, 'calculateFormula']"
              :rules="[
                {
                  required: true,
                  message: 'Missing CALCULATE FORMULA',
                },
              ]"
            >
              <a-textarea
                v-model:value="item.calculateFormula"
                placeholder="Enter value/formula"
                @blur="onBlur(item)"
              />
            </FormItem>
            <FormItem
              :validateStatus="getRealSalary === undefined ? 'error' : ''"
              :help="getRealSalary === undefined ? 'wrong formula' : null"
              v-if="item.methodCode == 'BY_EXTRA_DATA'"
              :name="['templateDetail', index, 'calculateFormula']"
              :rules="[
                {
                  required: true,
                  message: 'Missing CALCULATE FORMULA',
                },
              ]"
            >
              <ApiSelect
                v-model:value="item.calculateFormula"
                placeholder="Enter value/formula"
                :api="getAllTreeTemplateExtraDataDetail"
                valueField="extraDataDetailId"
                labelField="name"
                resultField="body"
                :columns="[
                  {
                    title: 'Table Name',
                    dataIndex: 'extraDataName',
                  },
                  {
                    title: 'Colum Name',
                    dataIndex: 'label',
                  },
                ]"
              />
            </FormItem>
          </Col>
          <Col :span="2">
            <FormItem
              :name="['templateDetail', index, 'valueTest']"
              :rules="{
                required: false,
                message: 'Missing valueTest',
              }"
            >
              <Input
                :disabled="item.methodCode === 'BY_FORMULA'"
                v-model:value="item.valueTest"
                @blur="onBlur(item)"
              />
            </FormItem>
          </Col>
          <Col :span="1" v-if="item.isDefault !== 1"> <MinusCircleOutlined @click="removeItem(item)" /> </Col>
        </Row>
      </div>
    </Form>
  </BasicDrawer>
  <GroupAttributesDrawer @register="registerDrawerGroupElement" @success="handleSuccess" />
</template>
<script lang="ts" setup>
import { reactive, ref, computed, unref, nextTick, onMounted } from 'vue';
import { DragOutlined, MinusCircleOutlined } from '@ant-design/icons-vue';
import { BasicDrawer, useDrawer, useDrawerInner } from '@/components/Drawer';
import {
  createTemplate,
  updateTemplate,
  getAllPurpose,
  getAllType,
  getAllTemplate,
  getAllAttributesDefault, getAllTreeTemplateExtraDataDetail,
} from '@/api/setting/template';
import {
  Form,
  FormItem,
  Select,
  Input,
  Textarea,
  Row,
  Col,
  FormInstance,
  message,
  Switch
} from 'ant-design-vue';
import Sortablejs from 'sortablejs';
import { isNil } from '@/utils/is';
import {cloneDeep,isEqual} from 'lodash-es';
import Icon from '@/components/Icon/Icon.vue';
import GroupAttributesDrawer from './GroupAttributesDrawer.vue';
import { Parser } from 'hot-formula-parser';
import {removeVietnameseTones} from "@/utils/helper/validatorForm";
import {useI18n} from "@/hooks/web/useI18n";
import {ApiSelect} from "@/components/Form";
const { t } = useI18n();
const emit = defineEmits(['success', 'register']);
const isUpdate = ref(true);
const parser = new Parser();
interface configTemplates {
  keyword?: string;
  title?: string;
  attributesId?: number;
  calculateFormula?: string;
  id?: number;
  valueTest?: string;
  methodCode?: string
  isDefault: number
  isDisplay: number
  dataType: number;
  mergeRowDataType: number;
  mergeRow: boolean;
}
const listMethod = ref([
  { name: 'By Manual', code: 'BY_MANUAL' },
  { name: 'By Formula', code: 'BY_FORMULA' },
  { name: 'By Constant', code: 'BY_CONSTANT' },
  { name: 'By Extra Data', code: 'BY_EXTRA_DATA' },
]);
const listDataType = ref([
  { name: 'Kiểu số', code: 2 },
  { name: 'Kiểu chữ', code: 1 }
]);
const listMergeRow = ref([
  { name: 'Có', code: true },
  { name: 'Không', code: false }
]);
const listMergeRowDataType = ref([
  { name: 'Tính tổng', code: 1 },
  { name: 'Lấy giá trị đầu tiên', code: 2 }
]);
// const listDataSource = ref([]);
const listPurpose = ref([]);
const listType = ref([]);
const listStatus = ref([
  { name: 'Active', id: 1 },
  { name: 'InActive', id: 0 },
]);

const formRef = ref<FormInstance>();
const formDrag = ref(null);
const dynamicValidateForm = reactive<{
  templateDetail: configTemplates[];
  name: string;
  code: string;
  typeId: number | undefined;
  purposeId: number | undefined;
  status: number | undefined;
  description: string;
  lstDelete: number[];
  id: number | undefined;
  sortId: number | undefined;
}>({
  id: undefined,
  code: '',
  description: '',
  name: '',
  purposeId: undefined,
  status: undefined,
  templateDetail: [],
  typeId: undefined,
  lstDelete: [],
  sortId:undefined
});
const dynamicValidateFormClone = ref(dynamicValidateForm);

const getRealSalary = computed(() => {
  return null;
});

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

const onBlur = (item: configTemplates) => {
  // Đặt các biến vào parser
  const value = isNaN(Number(item.valueTest)) ? 0 : Number(item.valueTest);
  if (item.methodCode === 'BY_MANUAL') {
    parser.setVariable(item.keyword, Number(value));
    calculateFormula(item)
  } else if (item.methodCode === 'BY_FORMULA' &&
    item.calculateFormula) {
    try {
      const result = parser.parse(item.calculateFormula);
      if (result.error) {
        item.valueTest = 'Error';
      } else {
        item.valueTest = result.result;
        parser.setVariable(item.keyword, Number(result.result));
      }
    } catch (error) {
      item.valueTest = 'Error';
    }
  }
};
const calculateFormula = (item: configTemplates) => {
  dynamicValidateForm.templateDetail.forEach((obj) => {
    if (obj.keyword !== undefined && obj.methodCode === 'BY_FORMULA') {
      // Chuyển giá trị về số hoặc 0 nếu không phải số
      if (
        obj.calculateFormula &&
        obj.calculateFormula.includes(<string>item?.keyword)
      ) {
        try {
          const result = parser.parse(obj.calculateFormula);
          if (result.error) {
            obj.valueTest = 'Error';
          } else {
            obj.valueTest = result.result;
            parser.setVariable(obj.keyword, Number(result.result));
          }
        } catch (error) {
          obj.valueTest = 'Error';
        }
      }
    }
  });
};
const onChangeName= (event) => {
  const value = event.target.value;
  if (value) {
    const text = removeVietnameseTones(value) || '';
    dynamicValidateForm.code = text.toUpperCase().replace(/\s+/g, '_');
  }
}
const onChangePurpose= async (value) => {
  console.log(value);
  if (value) {
    const data = (await getAllAttributesDefault({ purposeId: value })) || [];
    if (data.length) {
      dynamicValidateForm.templateDetail = dynamicValidateForm.templateDetail.filter(item => item.isDefault !== 1);
      data.forEach(newItem => {
        const existingItemIndex = dynamicValidateForm.templateDetail.findIndex(item => item.attributesId === newItem.attributesId);
        if (existingItemIndex !== -1) {
          // Đánh dấu các phần tử hiện tại là isDefault = 1
          dynamicValidateForm.templateDetail[existingItemIndex].isDefault = 1;
        } else {
          dynamicValidateForm.templateDetail.push(newItem);
        }
      });
    }else{
      dynamicValidateForm.templateDetail.forEach(item => {
        item.isDefault = 0;
      });
    }
  } else {
    dynamicValidateForm.templateDetail = dynamicValidateForm.templateDetail.filter(item => item.isDefault !== 1);
  }

}
const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
  // resetFields();
  setDrawerProps({ confirmLoading: false, destroyOnClose: true });
  isUpdate.value = !!data?.isUpdate;
  listPurpose.value = (await getAllPurpose({})) || [];
  listType.value = (await getAllType({})) || [];
  await setData(data?.record);

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
        const options = cloneDeep(dynamicValidateForm.templateDetail);
        // Di chuyển phần tử trong mảng
        if (oldIndex > newIndex) {
          options.splice(newIndex, 0, options[oldIndex]);
          options.splice(oldIndex + 1, 1);
        } else {
          options.splice(newIndex + 1, 0, options[oldIndex]);
          options.splice(oldIndex, 1);
        }
        // Cập nhật lại giá trị sortId cho mỗi hàng sau khi di chuyển
        options.forEach((item, index) => {
          item.sortId = index + 1; // sortId sẽ là thứ tự của phần tử sau khi sắp xếp (bắt đầu từ 1)
        });
        // options.forEach((item, index) => {
        //   if (index === 0) {
        //     item.sortId = null; // Hàng đầu tiên sẽ không có sortId
        //   } else {
        //     item.sortId = options[index - 1].id; // Các hàng còn lại lấy id của hàng trước đó làm sortId
        //   }
        // });
        dynamicValidateForm.templateDetail = options; // Cập nhật lại dữ liệu sau khi sắp xếp và cập nhật sortId
      },
    });
  }
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
    dynamicValidateForm.name = dataSource?.name;
    dynamicValidateForm.code = dataSource?.code;
    dynamicValidateForm.purposeId = dataSource?.purposeId;
    dynamicValidateForm.typeId = dataSource?.typeId;
    dynamicValidateForm.status = dataSource?.status;
    dynamicValidateForm.description = dataSource?.description;
    dynamicValidateForm.templateDetail = dataSource?.templateDetail.map(item => {
      if (item.methodCode === "BY_EXTRA_DATA") {
        item.calculateFormula = Number(item.calculateFormula);
      }
      return item;
    });
    console.log("dataSource?.templateDetail; ",dataSource?.templateDetail)
    dynamicValidateForm.lstDelete = [];
    await onChangePurpose(dataSource?.purposeId);
    dynamicValidateFormClone.value = cloneDeep(dynamicValidateForm)
  } else {
    dynamicValidateForm.id = undefined;
    dynamicValidateForm.name = '';
    dynamicValidateForm.code = '';
    dynamicValidateForm.purposeId = undefined;
    dynamicValidateForm.typeId = undefined;
    dynamicValidateForm.status = undefined;
    dynamicValidateForm.description = '';
    dynamicValidateForm.templateDetail = [];
    dynamicValidateForm.lstDelete = [];
  }
};
const [registerDrawerGroupElement, { openDrawer }] = useDrawer();

const getTitle = computed(() => (!unref(isUpdate) ? t('page.form.template.modalAddTitle') : t('page.form.template.modalUpdateTitle')));
function handleSuccess(e) {
  const listElement = e.reduce((pre, item) => {
    if (item?.groupAttributeId) {
      pre.push({
        keyword: item?.code,
        title: item?.name,
        attributesId: item?.id,
        methodCode: 'BY_MANUAL',
        incomeDataSourceId: undefined,
        dataType:2,
        isDisplay:1,
        mergeRow:false
      });
    }
    return pre;
  }, []);
  dynamicValidateForm.templateDetail = [ ...dynamicValidateForm.templateDetail,...listElement];
}

const filterOption = (input: string, option: any) => {
  return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
// const filterOptionDataSource = (input: string, option: any) => {
//   return option?.incomeDataSourceName.toLowerCase().indexOf(input.toLowerCase()) >= 0;
// };
function validateMerge(item: configTemplates,key:string){
  console.log('detail: ',item,item.mergeRow === true,item.dataType != 2,item.methodCode =='BY_MANUAL');
  if(key == 'mergeRow' && item.mergeRow === true && (item.dataType != 2 || item.methodCode =='BY_MANUAL' )){
    message.error(`Gộp dòng thì Kiểu dữ liệu chỉ được chọn Kiểu số và Phương thức khác By Manual`);
    item.mergeRow = false
  }
  if(key == 'dataType' && item.mergeRow === true && (item.dataType != 2 || item.methodCode =='BY_MANUAL' ) ){
    message.error(`Gộp dòng thì Kiểu dữ liệu chỉ được chọn Kiểu số và Phương thức khác By Manual`);
    item.dataType = undefined
  }
  if(key == 'methodCode' && item.mergeRow === true && (item.dataType != 2 || item.methodCode =='BY_MANUAL' )){
    message.error(`Gộp dòng thì Kiểu dữ liệu chỉ được chọn Kiểu số và Phương thức khác By Manual`);
    item.methodCode = undefined
  }

}
async function handleSubmit() {
  try {
    const values = await formRef?.value?.validate();
    // const values = dynamicValidateForm;
    if (values) {
      values.templateDetail = [...dynamicValidateForm.templateDetail];
      values.lstDelete = [...dynamicValidateForm.lstDelete];
      values.id = dynamicValidateForm.id;
    }
    setDrawerProps({ confirmLoading: true });
    if(!unref(isUpdate)){
      await createTemplate(values)
    }else{
      if(!isEqual(dynamicValidateForm, dynamicValidateFormClone.value)){
        if (values && values.templateDetail && dynamicValidateFormClone.value && dynamicValidateFormClone.value.templateDetail) {
          values.templateDetail = values.templateDetail.filter((item, index) => {
            const originalItem = dynamicValidateFormClone.value.templateDetail[index];
            return !isEqual(item, originalItem);
          });
        }
        await updateTemplate(values)
      }

    }
    closeDrawer();
    message.success(`${getTitle.value} successfully`);
    emit('success');
  } finally {
    setDrawerProps({ confirmLoading: false });
  }
}
// const getListDataSourceByMethod = (id) => {
//   return listDataSource.value?.filter((item: any) => item.incomemethodCode === id);
// };
onMounted(async () => {
  listPurpose.value = (await getAllPurpose({})) || [];
  listType.value = (await getAllType({})) || [];
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
