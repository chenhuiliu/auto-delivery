<template>
  <a-layout style="height: 100vh">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="80"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <a-menu style="margin-top: 30px;" v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item v-for="item in menuList" :key="item.key" @click="menuClickHandler(item.key)">
          <user-outlined />
          <span class="nav-text">{{ item.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content :style="{ margin: '14px' }">
        <div :style="{ padding: '24px', background: '#fff', height: '100%' }">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const onCollapse = (collapsed: boolean, type: string) => {
  console.log(collapsed, type);
};

const onBreakpoint = (broken: boolean) => {
  console.log(broken);
};

const selectedKeys = ref<string[]>(['1']);
const menuList = [
  {
    key: 'center',
    title: '个人中心'
  },
  {
    key: 'log',
    title: '投递记录',
  },
  {
    key: 'delivery',
    title: '投递',
  }
]

const menuClickHandler = (key) => {
  console.log(key)
  selectedKeys.value = [key]
  switch (key) {
    case 'center':
      router.push("/personal")
      break;
    case 'log':
      router.push("/record")
      break;
    case 'delivery':
      router.push("/delivery")
      break;
  }
}
</script>
<style>
html {
  overflow-y: auto !important;
  user-select: none;
}
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}
/* Do not force capitalization of button text */
.v-btn {
  text-transform: unset !important;
}
</style>
<style lang="less" scoped>
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout-sub-header-background {
  background: #141414;
}
</style>
