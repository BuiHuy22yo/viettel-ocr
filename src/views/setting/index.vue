<template>
  <PageWrapper v-loading="loading">
    <ACard>
      <Tabs v-model:activeKey="activeKey" tab-position="left">
        <TabPane v-for="item in filteredTabs" :key="item.key">
          <template #tab>
            <Icon :icon="'ion:' + item.icon" />
            <span>
              {{ item.name }}
            </span>
          </template>
          <div v-for="comp in getNameComp(item.key)" :key="comp.name">
            <component :is="comp" />
          </div>
        </TabPane>
      </Tabs>
    </ACard>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watch, defineAsyncComponent, computed } from 'vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useRoute } from 'vue-router';
  import { createUserAccessLog } from '@/api/userAccessLog';
  import { Tabs } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import { FormSchema, UseFormReturnType } from '@/components/Form';
  import TypeOfCompany from './org/TypeOrg/index.vue';
  import Company from './org/Company/index.vue';
  import Division from './org/Division/index.vue';
  import SubUnit from './org/SubUnit/index.vue';
  import Unit from './org/Unit/index.vue';
  import Station from './org/Station/index.vue';
  import { usePermission } from '@/hooks/web/usePermission';

  const Domain = defineAsyncComponent(() => import('@/views/setting/category/Domain/index.vue'));
  const Segment = defineAsyncComponent(() => import('./resources/Segment/index.vue'));
  const RoleTitle = defineAsyncComponent(() => import('./resources/RoleTitle/index.vue'));
  // const Channel = defineAsyncComponent(() => import('./resources/Channel/index.vue'));
  const Service = defineAsyncComponent(() => import('./category/Service/index.vue'));
  const Product = defineAsyncComponent(() => import('./category/Product/index.vue'));
  const Variant = defineAsyncComponent(() => import('./category/Variant/index.vue'));
  const VariantAttribute = defineAsyncComponent(
    () => import('./category/VariantAttribute/index.vue'),
  );
  const VariantGroupAttribute = defineAsyncComponent(
    () => import('./category/VariantGroupAttribute/index.vue'),
  );
  const ManagementMethod = defineAsyncComponent(
    () => import('@/views/setting/category/ManagementMethod/index.vue'),
  );
  const UnitOfMeasure = defineAsyncComponent(() => import('./category/UnitOfMeasure/index.vue'));
  const DeliveryWorkflow = defineAsyncComponent(
    () => import('./category/DeliveryWorkflow/index.vue'),
  );
  const ShippingStatus = defineAsyncComponent(() => import('./category/ShippingStatus/index.vue'));
  // const GroupIndicator = defineAsyncComponent(() => import('./category/GroupIndicator/index.vue'));
  // const ServiceIndicator = defineAsyncComponent(
  //   () => import('./category/ServiceIndicator/index.vue'),
  // );
  // const GroupProductAttribute = defineAsyncComponent(
  //   () => import('./category/GroupAttribute/index.vue'),
  // );
  // const ProductAttribute = defineAsyncComponent(
  //   () => import('./category/ProductAttribute/index.vue'),
  // );
  const TypeOfKpi = defineAsyncComponent(() => import('./kpi/TypeOfKpi/index.vue'));
  const TypeOfValue = defineAsyncComponent(() => import('./kpi/TypeOfValue/index.vue'));
  const FiledOfKpi = defineAsyncComponent(() => import('./kpi/FiledOfKpi/index.vue'));
  const TypeOfPolicy = defineAsyncComponent(() => import('./policy/TypeOfPolicy/index.vue'));
  const TypeOfSubPolicy = defineAsyncComponent(() => import('./policy/TypeOfSubPolicy/index.vue'));
  const TypeOfPolicyValue = defineAsyncComponent(
    () => import('./policy/TypeOfPolicyValue/index.vue'),
  );
  const TemplatePolicy = defineAsyncComponent(() => import('./policy/Template/index.vue'));
  const ExtendedParameter = defineAsyncComponent(
    () => import('./policy/ExtendedParameter/index.vue'),
  );
  // const Nation = defineAsyncComponent(() => import('./location/Nation/index.vue'));
  const Province = defineAsyncComponent(() => import('./location/Province/index.vue'));
  const Township = defineAsyncComponent(() => import('./location/Township/index.vue'));
  const Ward = defineAsyncComponent(() => import('./location/Ward/index.vue'));
  const PaymentPeriod = defineAsyncComponent(() => import('./payment/PaymentPeriod/index.vue'));
  const PaymentDebtAge = defineAsyncComponent(() => import('./payment/PaymentDebtAge/index.vue'));
  const PaymentDebtType = defineAsyncComponent(() => import('./payment/PaymentDebtType/index.vue'));
  const PaymentDocument = defineAsyncComponent(() => import('./payment/PaymentDocument/index.vue'));
  const Currency = defineAsyncComponent(() => import('./payment/Currency/index.vue'));
  // const StatusCommission = defineAsyncComponent(() => import('./commission/Status/index.vue'));
  const ContractTerm = defineAsyncComponent(() => import('./contract/ContractTerm/index.vue'));
  const Renewal = defineAsyncComponent(() => import('./contract/RenewalReminder/index.vue'));
  const ContractAttributeValueType = defineAsyncComponent(
    () => import('./contract/ContractAttributeValueType/index.vue'),
  );
  const ContractStatus = defineAsyncComponent(() => import('./contract/Status/index.vue'));
  const ContractType = defineAsyncComponent(() => import('./contract/ContractType/index.vue'));
  const AppendixType = defineAsyncComponent(() => import('./contract/AppendixType/index.vue'));
  const ContractAttribute = defineAsyncComponent(
    () => import('./contract/ContractAttribute/index.vue'),
  );
  const GroupContractAttribute = defineAsyncComponent(
    () => import('./contract/GroupAttribute/index.vue'),
  );
  const GroupOfCustomer = defineAsyncComponent(
    () => import('./customer/GroupOfCustomer/index.vue'),
  );
  const TypeOfCustomer = defineAsyncComponent(() => import('./customer/TypeOfCustomer/index.vue'));
  const FieldOfCustomer = defineAsyncComponent(
    () => import('./customer/FieldOfCustomer/index.vue'),
  );
  // const ElementGroup = defineAsyncComponent(() => import('./income/ElementGroup/index.vue'));
  // const Element = defineAsyncComponent(() => import('./income/Element/index.vue'));
  // const TemplateIncome = defineAsyncComponent(() => import('./income/Template/index.vue'));
  // const Method = defineAsyncComponent(() => import('./income/Method/index.vue'));
  // const DataSource = defineAsyncComponent(() => import('./income/DataSource/index.vue'));
  const TypeOfPartner = defineAsyncComponent(() => import('./partner/TypeOfPartner/index.vue'));
  const RatingLevel = defineAsyncComponent(() => import('./partner/RatingLevel/index.vue'));
  const RatingIndicator = defineAsyncComponent(() => import('./partner/RatingIndicator/index.vue'));
  const AttributePartner = defineAsyncComponent(() => import('./partner/Attribute/index.vue'));
  const DebtPeriod = defineAsyncComponent(
    () => import('@/views/setting/billing/DebtPeriod/index.vue'),
  );
  const TypeOfDebt = defineAsyncComponent(
    () => import('@/views/setting/billing/TypeOfDebt/index.vue'),
  );
  const Icon = defineAsyncComponent(() => import('@/components/Icon/Icon.vue'));
  const FromPurpose = defineAsyncComponent(() => import('@/views/setting/form/Purpose/index.vue'));
  const FromType = defineAsyncComponent(() => import('@/views/setting/form/Type/index.vue'));
  const FromGroupAttributes = defineAsyncComponent(
    () => import('@/views/setting/form/GroupAttributes/index.vue'),
  );
  const FromAttributes = defineAsyncComponent(
    () => import('@/views/setting/form/Attributes/index.vue'),
  );
  const FromExtraData = defineAsyncComponent(
    () => import('@/views/setting/form/ExtraData/index.vue'),
  );
  const FromExtradataDetail = defineAsyncComponent(
    () => import('@/views/setting/form/ExtradataDetail/index.vue'),
  );
  const Template = defineAsyncComponent(() => import('@/views/setting/form/Template/index.vue'));
  const RequestPurpose = defineAsyncComponent(
    () => import('@/views/setting/request/Purpose/index.vue'),
  );
  const RequestType = defineAsyncComponent(() => import('@/views/setting/request/Type/index.vue'));
  const RequestGroupAttributes = defineAsyncComponent(
    () => import('@/views/setting/request/GroupAttributes/index.vue'),
  );
  const RequestAttributes = defineAsyncComponent(
    () => import('@/views/setting/request/Attributes/index.vue'),
  );
  const RequestPriority = defineAsyncComponent(
    () => import('@/views/setting/request/Priority/index.vue'),
  );
  const RequestCurrency = defineAsyncComponent(
    () => import('@/views/setting/request/Currency/index.vue'),
  );
  const Permissions = defineAsyncComponent(() => import('@/views/permissions/index.vue'));
  const Country = defineAsyncComponent(() => import('@/views/setting/country/index.vue'));
  const Manufacturer = defineAsyncComponent(() => import('@/views/setting/manufacturer/index.vue'));

  const StockCategory = defineAsyncComponent(
    () => import('@/views/setting/stock/stock-category-index.vue'),
  );
  const ImportExportStockType = defineAsyncComponent(
    () =>
      import(
        '@/views/setting/stock/components/import-export-stock-type/import-export-stock-type-index.vue'
      ),
  );
  const StockTypeCategory = defineAsyncComponent(
    () =>
      import('@/views/setting/stock/components/stock-type-category/stock-type-category-index.vue'),
  );
  const OpenBidCondition = defineAsyncComponent(() => import('./rfq/OpenBidCondition/index.vue'));
  const Transportation = defineAsyncComponent(
    () => import('@/views/setting/transportation/transportation-index.vue'),
  );
  const Budget = defineAsyncComponent(() => import('@/views/setting/budget/budget-index.vue'));
  const route = useRoute();
  const { hasPermission } = usePermission();

  defineOptions({ name: 'TabsFormDemo' });
  const { t } = useI18n();
  const TabPane = Tabs.TabPane;
  type TabsFormType = {
    key: string;
    tab: string;
    name: string;
    icon: string;
    forceRender?: boolean;
    Form?: UseFormReturnType;
    permission: string;
  };

  const activeKey = ref('tabs0');
  const loading = ref(false);
  const tabsFormSchema: TabsFormType[] = [];

  const filteredTabs = computed(() => {
    return tabsFormSchema.filter((item) => hasPermission(item.permission));
  });

  const mockDefaultValue: Recordable = {};

  const tabsItem = [
    {
      name: t('form.setting.tabs.Organization'),
      icon: 'briefcase-outline',
      key: '0',
      permission: 'ORGANIZATION_SETTING',
    },
    {
      name: t('form.setting.tabs.Location'),
      icon: 'location-outline',
      key: '1',
      permission: 'LOCATION_SETTING',
    },
    {
      name: t('form.setting.tabs.Resources'),
      icon: 'cog-outline',
      key: '2',
      permission: 'RESOURCES_SETTING',
    },
    {
      name: t('form.setting.tabs.ServiceProduct'),
      icon: 'server-outline',
      key: '3',
      permission: 'PRODUCTS_SERVICES_SETTING',
    },
    {
      name: t('form.setting.tabs.Partner'),
      icon: 'infinite-outline',
      key: '4',
      permission: 'PARTNERS_SETTING',
    },
    {
      name: t('form.setting.tabs.Contract'),
      icon: 'contract-outline',
      key: '5',
      permission: 'CONTRACTS_SETTING',
    },
    // {
    //   name: t('form.setting.tabs.Customer'),
    //   icon: 'person-outline',
    // key: '6',
    // },
    // {
    //   name: t('form.setting.tabs.KPI'),
    //   icon: 'ribbon-outline',
    //   key: '7',
    //   permission: 'KPIS_SETTING',
    // },
    {
      name: t('form.setting.tabs.Policy'),
      icon: 'medical-outline',
      key: '8',
      permission: 'POLICIES_SETTING',
    },
    // {
    //   name: t('form.setting.tabs.Commission'),
    //   icon: 'ribbon-outline',
    //   key: '9',
    // },
    // {
    //   name: t('form.setting.tabs.IncomeSalary'),
    //   icon: 'cash-outline',
    //   key: '10',
    // },
    // {
    //   name: t('form.setting.tabs.EvaluationMethod'),
    //   icon: 'grid-outline',
    //   key: '11',
    // },
    {
      name: t('form.setting.tabs.Payment'),
      icon: 'card-outline',
      key: '12',
      permission: 'PAYMENTS_SETTING',
    },
    // {
    //   name: t('form.setting.tabs.Billing'),
    //   icon: 'cash-outline',
    //   key : '13'
    // },
    {
      name: t('form.setting.tabs.Form'),
      icon: 'card-outline',
      key: '14',
      permission: 'FORMS_SETTING',
    },
    {
      name: t('form.setting.tabs.ServiceRequest'),
      icon: 'browsers-outline',
      key: '15',
      permission: 'SERVICE_REQUESTS_SETTING',
    },
    {
      name: t('routes.menu.permission'),
      icon: 'reader-outline',
      key: '16',
      permission: 'ROLES_PERMISSIONS_SETTING',
    },
    {
      name: t('routes.menu.country'),
      icon: 'reader-outline',
      key: '17',
    },
    {
      name: t('routes.menu.manufacturer'),
      icon: 'reader-outline',
      key: '18',
    },
    // {
    //   name: t('routes.menu.managementMethod'),
    //   icon: 'reader-outline',
    //   key: '19',
    // },
    {
      name: t('routes.menu.unitOfMeasure'),
      icon: 'reader-outline',
      key: '20',
    },
    {
      name: t('routes.menu.stock'),
      icon: 'home',
      key: '21',
      permission: 'ROLES_PERMISSIONS_SETTING',
    },
    {
      name: t('routes.menu.deliveryWorkflow'),
      icon: 'reader-outline',
      key: '22',
    },
    {
      name: t('routes.menu.rfq'),
      icon: 'reader-outline',
      key: '23',
    },
    {
      name: t('routes.menu.transportation'),
      icon: 'reader-outline',
      key: '24',
    },
    {
      name: t('routes.menu.budget'),
      icon: 'reader-outline',
      key: '25',
    },
  ];

  // const getNameComp = computed(() => {
  //   let name: any;
  //   switch (activeKey.value) {
  //     case 'tabs0':
  //       name = TypeOfCompany;
  //       break;
  //     default:
  //       name = '';
  //   }
  //   return name;
  // });

  const getNameComp = (key: string) => {
    switch (key) {
      case 'tabs0':
        return [TypeOfCompany, Company, Division, Station, Unit, SubUnit];
      case 'tabs1':
        return [Province, Township, Ward];
      case 'tabs2':
        return [Segment, RoleTitle];
      case 'tabs3':
        return [
          Domain,
          Service,
          Product,
          Variant,
          VariantGroupAttribute,
          VariantAttribute,
          // GroupProductAttribute,
          // ProductAttribute,
          // GroupIndicator,
          // ServiceIndicator,
        ];
      case 'tabs4':
        return [TypeOfPartner, RatingLevel, RatingIndicator, AttributePartner];
      case 'tabs5':
        return [
          ContractTerm,
          ContractStatus,
          ContractType,
          GroupContractAttribute,
          ContractAttribute,
          ContractAttributeValueType,
          Renewal,
          Currency,
          AppendixType,
        ];
      case 'tabs6':
        return [GroupOfCustomer, TypeOfCustomer, FieldOfCustomer];
      case 'tabs7':
        return [TypeOfKpi, TypeOfValue, FiledOfKpi];
      case 'tabs8':
        return [
          TypeOfPolicy,
          TypeOfSubPolicy,
          TypeOfPolicyValue,
          TemplatePolicy,
          ExtendedParameter,
        ];
      // case 'tabs9':
      //   return [StatusCommission];
      // case 'tabs10':
      //   return [ElementGroup, Element, Method, DataSource, TemplateIncome];
      // case 'tabs11':
      //   return [];
      case 'tabs13':
        return [DebtPeriod, TypeOfDebt];
      case 'tabs14':
        return [
          FromPurpose,
          FromType,
          FromGroupAttributes,
          FromAttributes,
          // FromAttributesDefault,
          FromExtraData,
          FromExtradataDetail,
          Template,
        ];
      case 'tabs15':
        return [
          RequestPurpose,
          RequestType,
          RequestGroupAttributes,
          RequestAttributes,
          RequestPriority,
          RequestCurrency,
        ];
      case 'tabs16':
        return [Permissions];
      case 'tabs17':
        return [Country];
      case 'tabs18':
        return [Manufacturer];
      // case 'tabs19':
      //   return [ManagementMethod];
      case 'tabs20':
        return [UnitOfMeasure];
      case 'tabs21':
        return [StockCategory, StockTypeCategory, ImportExportStockType];
      case 'tabs22':
        return [ShippingStatus, DeliveryWorkflow];
      case 'tabs23':
        return [OpenBidCondition];
      case 'tabs24':
        return [Transportation];
      case 'tabs25':
        return [Budget];
      default:
        return [PaymentPeriod, PaymentDebtAge, PaymentDebtType, PaymentDocument];
    }
  };

  for (let i = 0; i < tabsItem.length; ++i) {
    const tabsKey = `tabs${tabsItem[i].key}`;
    const tabsName = tabsItem[i].name;
    const tabsIcon = tabsItem[i].icon;
    const tabsPermission = tabsItem[i].permission;

    const schemas: FormSchema[] = [];
    const row: Recordable = {};

    for (let j = 1; j <= 8; ++j) {
      schemas.push({
        field: `${tabsKey}.field${j}`,
        label: `${tabsKey}-field${j}`,
        component: 'Input',
        colProps: { span: 24 },
      });
      row[`field${j}`] = `field: ${tabsKey}.field${j}, default value`;
    }

    mockDefaultValue[tabsKey] = row;

    tabsFormSchema.push({
      key: tabsKey,
      tab: tabsKey,
      name: tabsName,
      icon: tabsIcon,
      forceRender: true,
      permission: tabsPermission,
    });
  }

  const createAccessLog = (key: any) => {
    const currentPath = route.path;

    createUserAccessLog({
      uri: currentPath + '/' + key,
    });
  };

  onMounted(() => {
    createAccessLog(activeKey.value);
  });

  watch(activeKey, () => {
    createAccessLog(activeKey.value);
  });
</script>
