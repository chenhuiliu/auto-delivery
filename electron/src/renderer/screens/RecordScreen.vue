<template>
  <div class="record-screen">
    <div class="search-header">
      <a-date-picker v-model:value="dateVal" />
      <a-select
        ref="select"
        v-model:value="platformVal"
        style="width: 150px; margin-left: 20px;"
        @change="handleChange"
      >
        <a-select-option value="all">全部</a-select-option>
        <a-select-option value="lagoou">拉勾网</a-select-option>
        <a-select-option value="boss">BOSS直聘</a-select-option>
        <a-select-option value="zhilian">智联招聘</a-select-option>
      </a-select>
      <a-button type="primary" style="margin-left: 20px;">确定</a-button>
    </div>
    <div class="serarch-content">
      <div class="item deliveried">
        <span>已投递</span>
        <RecordList :list="recordList" />
      </div>
      <div class="item filtered">
        <span>已过滤</span>
        <RecordList :list="recordList" />
      </div>
    </div>
  </div>
</template>
<script setup lang="tsx">
import { ref, onMounted } from "vue"
import RecordList from "@/components/RecordList.vue"
import { getDeliveryList } from "@/renderer/api/index.js"
import type { Dayjs } from 'dayjs';

const recordList = ref([{
  id: "1",
  link: "https://www.lagou.com/jobs/123456",
  time: "2021-01-01 12:00:00",
  status: "成功",
  company: "A公司",
  salary: "10k-20k",
  source: "拉勾网",
  position: "前端开发",
  remark: "拉勾网",
  type: "boss"
},
{
  id: "2",
  link: "https://www.zhaopin.com/jobs/123456",
  time: "2021-01-01 12:00:00",
  status: "成功",
  company: "B公司",
  salary: "15k-25k",
  source: "拉勾网",
  position: "前端架构师",
  remark: "拉勾网",
  type: "boss"
}])
const dateVal = ref<Dayjs>();
const platformVal = ref("all")

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

onMounted(() => {
  getDeliveryList().then(res => {
    if (res.code == 200) {
      recordList.value = res.data
    }
  })
})

</script>
<style scoped lang="less">
.record-screen {
  height: 100%;
}
.serarch-content {
  display: flex;
  justify-content: space-between;
  height: calc(100% - 30px);
  .item {
    margin-top: 20px;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
}
</style>
