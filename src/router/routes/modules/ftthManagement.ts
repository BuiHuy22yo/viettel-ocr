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
      title: t('routes.menu.ocrProcessing'),
    },
    children: [
      {
        path: 'index',
        name: 'OCRProcessingIndex',
        component: () => import('@/views/ocr-processing/index.vue'),
        meta: {
          icon: 'ion:scan-outline',
          title: t('routes.menu.ocrProcessing'),
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
      title: t('routes.menu.humanReview'),
    },
    children: [
      {
        path: 'index',
        name: 'HumanReviewIndex',
        component: () => import('@/views/human-review/index.vue'),
        meta: {
          icon: 'ion:eye-outline',
          title: t('routes.menu.humanReview'),
          hideMenu: true,
        },
      },
    ],
  },
  {
    path: '/human-review/:id',
    name: 'ReviewDetail',
    component: LAYOUT,
    redirect: '/human-review/:id/index',
    meta: {
      hideChildrenInMenu: true,
      hideMenu: true,
      title: 'Review Detail',
    },
    children: [
      {
        path: 'index',
        name: 'ReviewDetailIndex',
        component: () => import('@/views/review-detail/index.vue'),
        meta: {
          hideMenu: true,
          title: 'Review Detail',
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
      title: t('routes.menu.orderManagement'),
    },
    children: [
      {
        path: 'index',
        name: 'OrderManagementIndex',
        component: () => import('@/views/order-management/index.vue'),
        meta: {
          icon: 'ion:cube-outline',
          title: t('routes.menu.orderManagement'),
          hideMenu: true,
        },
      },
    ],
  },
  {
    path: '/order-management/:id',
    name: 'OrderDetail',
    component: LAYOUT,
    redirect: '/order-management/:id/index',
    meta: {
      hideChildrenInMenu: true,
      hideMenu: true,
      title: 'Order Detail',
    },
    children: [
      {
        path: 'index',
        name: 'OrderDetailIndex',
        component: () => import('@/views/order-detail/index.vue'),
        meta: {
          hideMenu: true,
          title: 'Order Detail',
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
      title: t('routes.menu.analytics'),
    },
    children: [
      {
        path: 'index',
        name: 'AnalyticsIndex',
        component: () => import('@/views/analytics/index.vue'),
        meta: {
          icon: 'ion:bar-chart-outline',
          title: t('routes.menu.analytics'),
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
      title: t('routes.menu.fraudDetection'),
    },
    children: [
      {
        path: 'index',
        name: 'FraudDetectionIndex',
        component: () => import('@/views/fraud-detection/index.vue'),
        meta: {
          icon: 'ion:shield-half-outline',
          title: t('routes.menu.fraudDetection'),
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
      title: t('routes.menu.systemMonitoring'),
    },
    children: [
      {
        path: 'index',
        name: 'SystemMonitoringIndex',
        component: () => import('@/views/system-monitoring/index.vue'),
        meta: {
          icon: 'ion:pulse-outline',
          title: t('routes.menu.systemMonitoring'),
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
      title: t('routes.menu.architectureDataFlow'),
    },
    children: [
      {
        path: 'index',
        name: 'ArchitectureDataFlowIndex',
        component: () => import('@/views/architecture-data-flow/index.vue'),
        meta: {
          icon: 'ion:git-network-outline',
          title: t('routes.menu.architectureDataFlow'),
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
      title: t('routes.menu.apiKeys'),
    },
    children: [
      {
        path: 'index',
        name: 'APIManagementIndex',
        component: () => import('@/views/api-management/index.vue'),
        meta: {
          icon: 'ion:key-outline',
          title: t('routes.menu.apiKeys'),
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
      title: t('routes.menu.apiDocs'),
    },
    children: [
      {
        path: 'index',
        name: 'APIDocsIndex',
        component: () => import('@/views/api-docs/index.vue'),
        meta: {
          icon: 'ion:book-outline',
          title: t('routes.menu.apiDocs'),
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
