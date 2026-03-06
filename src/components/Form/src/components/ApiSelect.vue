<template>
  <Select
    v-if="isShow"
    ref="selectRef"
    @dropdown-visible-change="handleFetch"
    v-bind="$attrs"
    @change="handleChange"
    :options="getOptions"
    v-model:value="state"
    show-search
    @search="handleSearch"
    @popup-scroll="handleScroll"
    :filter-option="props.columns.length > 0 ? false : filterOption"
  >
    <template #dropdownRender v-if="props.columns.length > 0">
      <div @mousedown="(e) => e.preventDefault()">
        <Table
          ref="tableRef"
          :columns="props.columns"
          :data-source="getOptions"
          :pagination="false"
          :scroll="{ y: 400 }"
          :row-class-name="rowClassName"
          :custom-row="
            (record) => {
              return {
                onClick: () => {
                  onClick(record);
                },
              };
            }
          "
          v-bind="$attrs"
        >
          <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'name'">
              <a>{{ text }}</a>
            </template>
          </template>
        </Table>
      </div>
    </template>
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template #suffixIcon v-if="loading">
      <LoadingOutlined spin />
    </template>
    <template #notFoundContent v-if="loading">
      <span>
        <LoadingOutlined spin class="mr-1" />
        {{ t('component.form.apiSelectNotFound') }}
      </span>
    </template>
  </Select>
</template>
<script lang="ts" setup>
  import { PropType, ref, computed, unref, watch } from 'vue';
  import { Select, Table } from 'ant-design-vue';
  import type { SelectValue } from 'ant-design-vue/es/select';
  import { isFunction } from '@/utils/is';
  import { useRuleFormItem } from '@/hooks/component/useFormItem';
  import { get, omit, isEqual } from 'lodash-es';
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { propTypes } from '@/utils/propTypes';
  import { useAttrs } from '@vben/hooks';
  import { useDebounceFn } from '@vueuse/core';

  type OptionsItem = { label?: string; value?: string; disabled?: boolean; [name: string]: any };

  defineOptions({ name: 'ApiSelect', inheritAttrs: false });
  const debouncedRequest = useDebounceFn(() => 'response', 700);
  const attrs = useAttrs();
  const selectRef = ref(null);
  const props = defineProps({
    value: { type: [Array, Object, String, Number] as PropType<SelectValue> },
    numberToString: propTypes.bool,
    api: {
      type: Function as PropType<(arg?: any) => Promise<OptionsItem[] | Recordable<any>>>,
      default: null,
    },
    // api params
    params: propTypes.any.def({}),
    // support xxx.xxx.xx
    resultField: propTypes.string.def(''),
    labelField: propTypes.string.def('label'),
    valueField: propTypes.string.def('value'),
    immediate: propTypes.bool.def(true),
    alwaysLoad: propTypes.bool.def(false),
    isDisableOption: propTypes.bool.def(false),
    isShow: propTypes.bool.def(true),
    isDisplayLabels: propTypes.bool.def(false),
    isLoadMore: propTypes.bool.def(false),
    isSearchByApi: propTypes.bool.def(false),
    isHashOptions: propTypes.bool.def(false),
    valueSelect: {
      type: Array<any>,
      default: [],
    },
    options: {
      type: Array<OptionsItem>,
      default: [],
    },
    columns: {
      type: Array<any>,
      default: [],
    },
    beforeFetch: {
      type: Function as PropType<Fn>,
      default: null,
    },
    afterFetch: {
      type: Function as PropType<Fn>,
      default: null,
    },
  });
  const tableRef = ref(null);
  const page = ref(1);
  const totalItems = ref(0);
  const hasMore = computed(() => totalItems.value > getOptions.value.length);

  const emit = defineEmits(['options-change', 'change', 'update:value', 'changeValue']);

  const optionsRef = ref<OptionsItem[]>([]);
  const inputSearch = ref('');

  const loading = ref(false);
  const isFirstLoaded = ref(false);
  const emitData = ref<OptionsItem[]>([]);
  const { t } = useI18n();
  const filterOption = (input: string, option: any) => {
    return option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  // Embedded in the form, just use the hook binding to perform form verification
  const [state] = useRuleFormItem(props, 'value', 'change', emitData);
  const convertOptions = (arr: any) => {
    const { labelField, valueField, numberToString } = props;
    return arr.reduce((prev, next: any) => {
      if (next) {
        const value = get(next, valueField);
        prev.push({
          ...omit(next, [labelField, valueField]),
          label: get(next, labelField),
          value: numberToString ? `${value}` : value,
        });
      }
      return prev;
    }, [] as OptionsItem[]);
  };

  const getOptions = computed(() => {
    let data = props.isHashOptions
      ? convertOptions(unref(props.options))
      : convertOptions(unref(optionsRef));
    if (props.isDisableOption && props.valueSelect?.length > 0) {
      return data.length > 0
        ? data.reduce((prev, next: any) => {
            if (props.valueSelect.includes(next.value)) {
              next.disabled = true;
            }
            prev.push(next);

            return prev;
          }, [])
        : convertOptions(unref(props.options));
    }
    let dataFilterByColumns: any = [];
    let dataOrg: any = [];
    if (props.columns?.length > 0) {
      if (!props.isSearchByApi) {
        if (!inputSearch.value) {
          dataOrg = data;
        } else {
          const dataIndex = props.columns.map((item) => item.dataIndex);
          dataIndex.map((el) => {
            dataFilterByColumns = data.filter((item: any) =>
              String(item[el]).toLowerCase().includes(inputSearch.value.toLowerCase()),
            );
            if (dataFilterByColumns?.length > 0) {
              dataOrg = [...dataOrg, ...dataFilterByColumns];
              dataOrg = dataOrg.filter(
                (value, index, self) =>
                  index === self.findIndex((t) => JSON.stringify(t) === JSON.stringify(value)),
              );
            }
          });
        }
      } else {
        dataOrg = data;
      }
    }
    return props.columns?.length > 0
      ? dataOrg
      : data.length > 0
        ? data
        : convertOptions(unref(props.options));
  });

  watch(
    () => state.value,
    (v) => {
      emit('update:value', v);
    },
  );

  watch(
    () => props.params,
    (value, oldValue) => {
      if (isEqual(value, oldValue)) return;
      fetch();
    },
    { deep: true, immediate: props.immediate },
  );

  async function fetch(loadMore = false) {
    let { api, beforeFetch, afterFetch, params, resultField } = props;
    if (!api || !isFunction(api) || loading.value) return;

    if (!loadMore) {
      optionsRef.value = [];
      page.value = 1;
    }

    try {
      loading.value = true;

      if (beforeFetch && isFunction(beforeFetch)) {
        params = (await beforeFetch(params)) || params;
      }
      if (props.isLoadMore) {
        params.pageInfo = {
          currentPage: page.value,
          pageSize: 20,
        };
      }
      if (props.isSearchByApi) {
        params.keyword = inputSearch.value;
      }
      let res = await api(params);
      if (afterFetch && isFunction(afterFetch)) {
        res = (await afterFetch(res)) || res;
      }

      isFirstLoaded.value = true;
      if (Array.isArray(res)) {
        optionsRef.value = res;
        emitChange();
        return;
      }

      if (res && res.totalRecord) {
        optionsRef.value = [...optionsRef.value, ...res?.result] || [];
        totalItems.value = res.totalRecord || 0;
        page.value++;
        emitChange();
        return;
      }

      if (resultField) {
        optionsRef.value = get(res, resultField) || [];
      }
      emitChange();
    } catch (error) {
      console.warn(error);
      isFirstLoaded.value = false;
    } finally {
      loading.value = false;
    }
  }

  async function handleFetch(visible: boolean) {
    if (visible) {
      if (props.alwaysLoad) {
        await fetch();
      } else if (!props.immediate && !unref(isFirstLoaded)) {
        await fetch();
      }
    }
  }

  function handleScroll(event) {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop + clientHeight + 1 >= scrollHeight && hasMore.value && !loading.value) {
      props.isLoadMore && fetch(true);
    }
  }
  function emitChange() {
    emit('options-change', unref(getOptions));
  }

  function handleChange(_, ...args) {
    emit('changeValue', _);
    emitData.value = args;
  }
  const rowClassName = (record: any): string => {
    let className = '';
    if (attrs.value.mode === 'multiple') {
      if (state.value?.includes(record.value)) {
        className = 'record-selected';
      }
    } else {
      if (record.value === state.value) {
        className = 'record-selected';
      }
    }

    return className;
  };

  const handleSearch = async (val) => {
    inputSearch.value = val;
    const value = await debouncedRequest();
    if (value === 'response') {
      if (props.isSearchByApi) {
        fetch();
      }
    }
  };
  const onClick = (record) => {
    if (attrs.value.mode !== 'multiple') {
      state.value = record.value;
      if (selectRef.value) {
        selectRef.value.blur();
      }
    } else {
      const currentValue: any = state.value || [];
      if (currentValue?.includes(record.value)) {
        state.value = currentValue?.filter((item) => item !== record.value);
      } else {
        state.value = [...currentValue, record.value];
      }
    }
  };
</script>
<style lang="less">
  .record-selected {
    background: #ece8ff !important;
    color: black !important;
  }

  td.ant-table-cell {
    padding: 5px !important;
  }
</style>
