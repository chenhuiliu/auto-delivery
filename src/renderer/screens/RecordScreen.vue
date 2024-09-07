<template>
  <div class="record-screen">
    <a-tabs v-model:activeKey="activeKey" tab-position="left" class="record-tabs">
      <a-tab-pane :tab="tab.label" v-for="tab in tabList" :key="tab.value">
        <RecordList :type="tab.value" :list="recordList" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup lang="tsx">
import { ref, onMounted } from "vue"
import RecordList from "@/components/RecordList.vue"
import { getDeliveryList } from "@/renderer/api/index.js"

const activeKey = ref('boss')
const tabList = ref([
  {
    label: "Boss直聘",
    value: "boss"
  },
  {
    label: "拉勾网",
    value: "lagou"
  },
  {
    label: "智联招聘",
    value: "zhilian"
  }
])
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
  height: 100vh;
}
:deep(.record-tabs) {
  .ant-tabs-content {
    height: 100vh;
  }
}

</style>
