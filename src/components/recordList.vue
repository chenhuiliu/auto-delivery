<template>
  <div class="list">
    <div class="item" v-for="item in (list as RecordItem[])">
      <span class="time">{{ item.time }}</span>投递了
      <a :href="item.link">{{ item.company }}</a>的
      <a :href="item.link">{{ item.position }}</a>岗位，薪资为
      <span>{{ item.salary }}</span>
    </div>
  </div>

</template>
<script setup lang="tsx">

interface RecordItem {
  time: string;
  link: string;
  company: string;
  salary: string;
  source: string;
  position: string;
}

defineProps({
  list: {
    type: Array,
    default: []
  }
})

</script>
<style scoped lang="less">
.list {
  overflow: auto;
  height: 100vh;
  .item {
    padding: 10px;
    border-radius: 4px;
    background: #f0f0fd;
    margin: 10px 24px 10px 0;
  }
}
</style>
