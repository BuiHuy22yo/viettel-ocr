import { t } from '@/hooks/web/useI18n';
import { LAYOUT } from '@/router/constant';

const ftthManagements: any = [
  //Dashboard
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: LAYOUT,
    redirect: '/dashboard/index',
    meta: {
      orderNo: 0,
      hideChildrenInMenu: true,
      icon: 'ion:bar-chart-outline',
      title: t('routes.menu.dashboard'),
    },
    children: [
      {
        path: 'index',
        name: 'DashboardIndex',
        component: () => import('@/views/dashboard/analysis/index.vue'),
        meta: {
          icon: 'ion:bar-chart-outline',
          title: t('routes.menu.dashboard'),
          hideMenu: true,
        },
      },
    ],
  },
  {
    path: '/ocr-processing',
    name: 'OCRProcessing',
    component: LAYOUT,
    redirect: '/ocr-processing/index',
    meta: {
      orderNo: 10,
      hideChildrenInMenu: true,
      icon: 'ion:scan-outline',
      title: 'OCR Processing',
    },
    children: [
      {
        path: 'index',
        name: 'OCRProcessingIndex',
        component: () => import('@/views/ocr-processing/index.vue'),
        meta: {
          icon: 'ion:scan-outline',
          title: 'OCR Processing',
          hideMenu: true,
        },
      },
    ],
  },
  {
    path: '/human-review',
    name: 'HumanReview',
    component: LAYOUT,
    redirect: '/human-review/index',
    meta: {
      orderNo: 20,
      hideChildrenInMenu: true,
      icon: 'ion:eye-outline',
      title: 'Human Review',
    },
    children: [
      {
        path: 'index',
        name: 'HumanReviewIndex',
        component: () => import('@/views/human-review/index.vue'),
        meta: {
          icon: 'ion:eye-outline',
          title: 'Human Review',
          hideMenu: true,
        },
      },
    ],
  },
  {
    path: '/order-management',
    name: 'OrderManagement',
    component: LAYOUT,
    redirect: '/order-management/index',
    meta: {
      orderNo: 30,
      hideChildrenInMenu: true,
      icon: 'ion:cube-outline',
      title: 'Order Management',
    },
    children: [
      {
        path: 'index',
        name: 'OrderManagementIndex',
        component: () => import('@/views/order-management/index.vue'),
        meta: {
          icon: 'ion:cube-outline',
          title: 'Order Management',
          hideMenu: true,
        },
      },
    ],
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: LAYOUT,
    redirect: '/analytics/index',
    meta: {
      orderNo: 40,
      hideChildrenInMenu: true,
      icon: 'ion:bar-chart-outline',
      title: 'Analytics',
    },
    children: [
      {
        path: 'index',
        name: 'AnalyticsIndex',
        component: () => import('@/views/analytics/index.vue'),
        meta: {
          icon: 'ion:bar-chart-outline',
          title: 'Analytics',
          hideMenu: true,
        },
      },
    ],
  },
  {
    path: '/fraud-detection',
    name: 'FraudDetection',
    component: LAYOUT,
    redirect: '/fraud-detection/index',
    meta: {
      orderNo: 50,
      hideChildrenInMenu: true,
      icon: 'ion:shield-half-outline',
      title: 'Fraud Detection',
    },
    children: [
      {
        path: 'index',
        name: 'FraudDetectionIndex',
        component: () => import('@/views/fraud-detection/index.vue'),
        meta: {
          icon: 'ion:shield-half-outline',
          title: 'Fraud Detection',
          hideMenu: true,
        },
      },
    ],
  },
  {
    path: '/system-monitoring',
    name: 'SystemMonitoring',
    component: LAYOUT,
    redirect: '/system-monitoring/index',
    meta: {
      orderNo: 60,
      hideChildrenInMenu: true,
      icon: 'ion:pulse-outline',
      title: 'System Monitoring',
    },
    children: [
      {
        path: 'index',
        name: 'SystemMonitoringIndex',
        component: () => import('@/views/system-monitoring/index.vue'),
        meta: {
          icon: 'ion:pulse-outline',
          title: 'System Monitoring',
          hideMenu: true,
        },
      },
    ],
  },
  {
    path: '/architecture-data-flow',
    name: 'ArchitectureDataFlow',
    component: LAYOUT,
    redirect: '/architecture-data-flow/index',
    meta: {
      orderNo: 70,
      hideChildrenInMenu: true,
      icon: 'ion:git-network-outline',
      title: 'Architecture & Data Flow',
    },
    children: [
      {
        path: 'index',
        name: 'ArchitectureDataFlowIndex',
        component: () => import('@/views/architecture-data-flow/index.vue'),
        meta: {
          icon: 'ion:git-network-outline',
          title: 'Architecture & Data Flow',
          hideMenu: true,
        },
      },
    ],
  },
  {
    path: '/api-management',
    name: 'APIManagement',
    component: LAYOUT,
    redirect: '/api-management/index',
    meta: {
      orderNo: 80,
      hideChildrenInMenu: true,
      icon: 'ion:key-outline',
      title: 'API Management',
    },
    children: [
      {
        path: 'index',
        name: 'APIManagementIndex',
        component: () => import('@/views/api-management/index.vue'),
        meta: {
          icon: 'ion:key-outline',
          title: 'API Management',
          hideMenu: true,
        },
      },
    ],
  },
  {
    path: '/api-docs',
    name: 'APIDocs',
    component: LAYOUT,
    redirect: '/api-docs/index',
    meta: {
      orderNo: 90,
      hideChildrenInMenu: true,
      icon: 'ion:book-outline',
      title: 'API Docs',
    },
    children: [
      {
        path: 'index',
        name: 'APIDocsIndex',
        component: () => import('@/views/api-docs/index.vue'),
        meta: {
          icon: 'ion:book-outline',
          title: 'API Docs',
          hideMenu: true,
        },
      },
    ],
  },
  // Setting
  // {
  //   path: '/setting',
  //   name: 'SettingManagement',
  //   component: LAYOUT,
  //   redirect: '/setting/index',
  //   meta: {
  //     orderNo: 90,
  //     hideChildrenInMenu: true,
  //     icon: 'ion:settings-outline',
  //     title: t('routes.menu.setting'),
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'SettingIndex',
  //       component: () => import('@/views/setting/index.vue'),
  //       meta: {
  //         icon: 'ion:settings-outline',
  //         title: t('routes.menu.setting'),
  //         hideMenu: true,
  //       },
  //     },
  //   ],
  // },

  //User
  // {
  //   path: '/resource',
  //   name: 'ResourceManagement',
  //   component: LAYOUT,
  //   redirect: '/resource/index',
  //   meta: {
  //     orderNo: 91,
  //     hideChildrenInMenu: true,
  //     icon: 'ion:people-outline',
  //     title: t('routes.menu.resource'),
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'ResourceIndex',
  //       component: () => import('@/views/resource/index.vue'),
  //       meta: {
  //         icon: 'ion:people-outline',
  //         title: t('routes.menu.resource'),
  //         hideMenu: true,
  //       },
  //     },
  //   ],
  // },
];

export default ftthManagements;
