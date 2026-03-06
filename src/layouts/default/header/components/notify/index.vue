<template>
  <Popover
    class="prefixCls"
    title=""
    trigger="click"
    :overlayClassName="`${prefixCls}__overlay`"
    :visible="visible"
    @visible-change="handleVisibleChange"
  >
    <Badge :count="badgeCount" size="small" :numberStyle="numberStyle" prefixCls="noti-badge">
      <BellOutlined />
    </Badge>
    <template #content>
      <div class="header">
        <span class="title">Notification</span>
        <div
          @click="markAllAsReadNotify"
          :class="showMarkAllAsReadNotify()"
          class="mark_all_as_read"
        >
          {{ getTitle }}
        </div>
      </div>
      <NoticeList
        :list="listData"
        @title-click="onNoticeClick"
        :currentPage="page"
        :onLoadNotify="getNotifications"
      />
    </template>
  </Popover>
</template>
<script lang="ts" setup>
  import { computed, h, onMounted, ref } from 'vue';
  import { Badge, notification, Popover } from 'ant-design-vue';
  import { BellOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';
  import NoticeList from './NoticeList.vue';
  import { useDesign } from '@/hooks/web/useDesign';
  import { getConnection, subscribe } from '@/mqtt/mqttUtil';
  import { useUserStore } from '@/store/modules/user';
  import {
    getNotification,
    notificationRead,
    notificationReadAll,
    numberUnreadNotification,
  } from '@/api/noti';

  const { prefixCls } = useDesign('header-notify');
  const userStore = useUserStore();
  const topic = 'user/inbox/userid';
  const listData = ref([]);
  const numberOfUnread = ref(0);
  const numberStyle = {};
  const page = ref(0);
  const size = ref(10);
  const host = window.location.hostname;
  const protocol = window.location.protocol;
  const port = window.location.port;
  const domain = protocol + '//' + host + ':' + port;
  const visible = ref(false);
  const badgeCount = ref('');

  const getTitle = computed(() => 'Read all (' + numberOfUnread.value + ')');

  const openNotification = (message: any) => {
    notification.open({
      message: message.title,
      description: message.content,
      icon: h(InfoCircleOutlined, { style: 'color: #108ee9' }),
      onClick: () => {
        // console.log('Notification Clicked!');
        onNoticeClick(message.notification);
      },
      class: 'notification-custom-cls',
      duration: 5,
    });
  };

  function onNoticeClick(record: any) {
    if (!record.read) {
      const notificationIds = [];
      notificationIds.push(record.id);
      const request = {};
      request.notificationIds = notificationIds;
      try {
        notificationRead(request);
        getNumberUnreadNotifications();
        let item = listData.value.find((item) => item.id === record.id);
        if (item) {
          item.read = true;
        }
      } catch (ex) {}
    }
    if (
      record.referenceLink !== undefined &&
      (record.referenceLink.includes('http') || record.referenceLink.includes('https'))
    ) {
      window.location.href = record.referenceLink;
      visible.value = false;
    } else if (record.referenceLink !== undefined) {
      window.location.href = domain + '#' + record.referenceLink;
      visible.value = false;
    }
  }

  async function markAllAsReadNotify() {
    await notificationReadAll({});
    await getNumberUnreadNotifications();
    listData.value.map((i) => (i.read = true));
  }

  async function getNotifications(currentPage?: number) {
    try {
      const result = await getNotification({
        page: currentPage === undefined ? page.value : currentPage,
        size: size.value,
      });
      if (currentPage !== undefined && result.content.length > 0) {
        page.value = currentPage;
      }
      if (currentPage !== undefined && currentPage == 0) {
        listData.value = [];
      }
      listData.value.push(...result.content);
      listData.value = listData.value.filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id),
      );
      const avatar =
        'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png';
      listData.value.forEach((item) => {
        item.avatar = avatar;
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function getNumberUnreadNotifications() {
    try {
      const result = await numberUnreadNotification({});
      numberOfUnread.value = result;
      badgeCount.value = result;
      if (numberOfUnread.value > 9) {
        badgeCount.value = '9+';
      }
    } catch (e) {
      console.error(e);
    }
  }

  onMounted(() => {
    getNotifications(0);
    getNumberUnreadNotifications();
    const mqttClient = getConnection();
    const topicSubscribe = topic.replace('userid', userStore.getLoginResponse?.userInfo?.sub);
    subscribe(mqttClient, topicSubscribe);
    mqttClient?.on('message', (topicSubscribe, message) => {
      try {
        const newMessage = JSON.parse(message.toString());
        const avatar =
          'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png';
        listData.value.unshift({ ...newMessage.notification, avatar: avatar });
        openNotification(newMessage);
        numberOfUnread.value = numberOfUnread.value + 1;
      } catch (e) {
        console.log('Received message error:', e);
      }
    });
  });

  function showMarkAllAsReadNotify() {
    return numberOfUnread.value === 0 ? 'show_button_mark_all' : '';
  }

  function handleVisibleChange(value: any) {
    visible.value = value;
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-notify';

  .@{prefix-cls} {
    padding-bottom: 1px;

    &__overlay {
      max-width: 360px;
      width: 25vw;
    }

    .ant-tabs-content {
      width: 300px;
    }

    .ant-badge {
      display: flex;
      align-items: center;
      font-size: 18px;

      .ant-badge-multiple-words {
        padding: 0 4px;
      }

      svg {
        width: 0.9em;
      }
    }
  }

  .header {
    padding-bottom: 4%;
    padding-top: 2%;
  }

  .title {
    margin-bottom: 5px;
    margin-left: 15px;
    font-weight: bold;
    font-size: 15px;
    padding-top: 2%;
  }
  .mark_all_as_read {
    float: right;
    margin-right: 10px;
    color: #0063d1;
    cursor: pointer;
  }

  .noti-badge-count {
    position: absolute !important;
    top: 10px !important;
    //left: 20px !important;
    transform: translate(25%, 0%) !important;
    padding: 0 5px !important;
  }

  .notification-custom-cls {
    opacity: 0.9;
    border-left: 8px solid #4b80cd;

    .ant-notification-notice-icon {
      font-size: 20px;

      [role='img'] {
        color: #4b80cd !important;
      }
    }

    .ant-notification-notice-message {
      font-weight: bold;
    }
    .ant-notification-notice-description {
      margin-left: 0px !important;
    }
  }

  .show_button_mark_all {
    display: none;
  }

  :where(.css-dev-only-do-not-override-5cmklj).badge123 .badge123-count {
    transform: translate(25%, 55%) !important;
    padding: 0 5px !important;
  }
</style>
