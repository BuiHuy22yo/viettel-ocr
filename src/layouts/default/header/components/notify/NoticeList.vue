<template>
  <div class="scroll-container" @scroll="onScroll">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="list-item"
      :class="backgroundNotification(item)"
      @click="handleTitleClick(item)"
    >
      <div class="div_avatar">
        <Avatar v-if="item.avatar" class="avatar" :src="item.avatar" />
        <span
          v-else
          class="avatar ant-avatar ant-avatar-circle css-dev-only-do-not-override-5cmklj"
          >{{ item.senderName }}</span
        >
      </div>
      <div class="div_content">
        <div>
          <div class="noti-title" style="margin-right: 3px; font-weight: bold">{{
            item.title
          }}</div>
          <div class="noti-content">{{ item.content }}</div>
        </div>
        <div>
          <span class="noti-time" style="color: #666; font-size: 11px">{{
            formatToDateTime(item.createTime)
          }}</span>
        </div>
      </div>
      <div class="div_status">
        <span class="point" v-if="!item.read"></span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { PropType } from 'vue';
  import { ListItem } from './data';
  import { Avatar } from 'ant-design-vue';
  import { formatToDateTime } from '@/utils/dateUtil';

  const props = defineProps({
    list: {
      type: Array as PropType<ListItem[]>,
      default: () => [],
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    onTitleClick: {
      type: Function as PropType<(Recordable) => void>,
    },
    onLoadNotify: {
      type: Function as PropType<() => void>,
    },
  });

  function handleTitleClick(item: any) {
    props.onTitleClick && props.onTitleClick(item);
  }

  function onScroll(e) {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    // console.log('onScroll', scrollHeight, scrollTop, clientHeight);
    // console.log('onScroll 1', clientHeight);
    // console.log('onScroll 2', scrollHeight - scrollTop);
    const valueScroll = parseInt(scrollHeight - scrollTop);
    const perValueScroll = (scrollHeight - scrollTop) / clientHeight;
    // console.log('onScroll 3', perValueScroll);
    // console.log('onScroll 4', valueScroll);
    if (perValueScroll <= 1 || valueScroll == clientHeight) {
      const { currentPage } = props;
      props.onLoadNotify(currentPage + 1);
    }
  }

  function backgroundNotification(item: any) {
    if (item?.read) {
      return 'background-notification_read';
    } else return 'background-notification_unread';
  }

  // function getRandomColor() {
  //   const letters = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return { backgroundColor: color };
  // }
</script>
<style lang="less" scoped>
  .div_avatar {
    width: 15%;
    margin-right: 5px;
  }

  .div_content {
    width: 83%;

    .noti-title {
      margin-bottom: 5px;
      font-size: 13px;
    }

    .noti-content {
      margin-bottom: 5px;
      font-size: 11px;
    }
  }

  .div_status {
    width: 2%;
    margin-right: 5px;
  }

  .title {
    margin-right: 3px;
    font-weight: bold;
  }

  .scroll-container {
    height: 75vh;
    overflow-y: auto;
  }

  .background-notification_unread {
    background-color: #f5f5f5;
  }

  .background-notification_read {
    background-color: #fff;
  }

  .list-item:hover {
    background-color: #dcdcdc;
  }

  .list-item {
    display: flex;
    margin: 10px;
    padding: 6px;
    overflow: hidden;
    transition: background-color 0.3s ease;
    border: none !important;
    border-radius: 8px;
    cursor: pointer;
  }

  .point {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #3498db;
  }
</style>
