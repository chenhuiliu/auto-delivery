<template>
  <div class="home-screen">
    <div class="home-content" v-if="configList.length">
      <div class="home-content-header">
        <div class="header-left">
          <div class="header-left-title">请选择投递平台</div>
          <a-checkbox
            v-model:checked="state.checkAll"
            :indeterminate="state.indeterminate"
            @change="onCheckAllChange"
          >
            全选
          </a-checkbox>
          <a-checkbox-group v-model:value="state.checkedList" :options="plainOptions">
            <template #label="{ label }">
              <span>{{ configTitleMap[label] }}</span>
            </template>
          </a-checkbox-group>
        </div>
        <div class="header-right">
          <a-button type="primary" @click="goDelivery">投递</a-button>
        </div>
      </div>
      <div class="home-content-header">
        <PlatFormSelect />
      </div>
      <div class="card-container">
        <div class="card" v-for="(config, index) in configList" :key="index">
          <div class="card-header">
            <h4 class="card-header-title">{{ configTitleMap[config.id] || "来来来" }}</h4>
            <a-tooltip placement="top">
              <template #title>
                <span>编辑</span>
              </template>
              <EditTwoTone @click="goConfig(config.id)" />
            </a-tooltip>
          </div>
          <div class="card-content">
            <div class="card-content-item">
              <span class="card-content-label">投递职位:</span>
              <div class="card-content-tags">
                <a-tag v-for="(item, index) in config.jobList" :key="index" color="cyan">{{ item }}</a-tag>
              </div>
            </div>
            <div class="card-content-item">
              <span class="card-content-label">期望薪资:</span>
              <div>
                {{ config.salaryMin }} - {{ config.
                salaryMax }}k
              </div>
            </div>
            <div class="card-content-item" v-if="config.companyList && config.companyList.length">
              <span  class="card-content-label">屏蔽公司:</span>
              <div class="card-content-tags">
                <a-tag v-for="(item, index) in config.companyList" :key="index" color="cyan">{{ item }}</a-tag>
              </div>
            </div>
            <div class="card-content-item" v-if="config.hrList && config.hrList.length">
              <span  class="card-content-label">屏蔽HR: </span>
              <div class="card-content-tags">
                <a-tag v-for="(item, index) in config.hrList" :key="index" color="cyan">{{ item }}</a-tag>
              </div>
            </div>
            <div class="card-content-item" v-if="config.headhunterList && config.headhunterList.length">
              <span  class="card-content-label">屏蔽猎头: </span>
              <div class="card-content-tags">
                <a-tag v-for="(item, index) in config.headhunterList" :key="index" color="cyan">{{ item }}</a-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-content-empty" v-else>
      <PlatFormSelect />
    </div>
  </div>
</template>
<script setup lang="tsx">
import { ref, onMounted, reactive, watch } from "vue"
import { EditTwoTone } from "@ant-design/icons-vue"
import { useRouter } from 'vue-router'
import PlatFormSelect from "@/components/platformSelect.vue"

const router = useRouter()

interface config {
  jobList: string[]
  companyList: string[]
  hrList: string[]
  headhunterList: string[]
  salaryMin: string
  salaryMax: string
  id: string
}

const configList = ref<config[]>([])
const state = reactive({
  indeterminate: true,
  checkAll: false,
  checkedList: [],
})
const plainOptions = ['boss', 'lagou', 'zhilian']
const configTitleMap = {
  "boss": "Boss直聘",
  "lagou": "拉勾网",
  "zhilian": "智联招聘"
}

const init = () => {
  const configition = window.localStorage.getItem("DELIVERY_CONFIGITION")
  if (configition) {
    configList.value = JSON.parse(configition)
  }
}

const onCheckAllChange = (e: any) => {
  Object.assign(state, {
    checkedList: e.target.checked ? plainOptions : [],
    indeterminate: false,
  });
};

const goConfig = (type: string) => {
  const path = `/config?type=${type}`
  router.push(path)
}

const goDelivery = () => {
  router.push('/record')
}

watch(
  () => state.checkedList,
  val => {
    state.indeterminate = !!val.length && val.length < plainOptions.length;
    state.checkAll = val.length === plainOptions.length;
  },
);

onMounted(() => {
  init()
})

</script>
<style scoped lang="less">
.home-screen {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
}
.home-content {
  width: 80%;
  margin: auto;
  --border-radius: 0.75rem;
  --primary-color: #7257fa;
  --secondary-color: #3c3852;
  padding: 20px;
  border-radius: var(--border-radius);
  background: #f1f1f3;
  box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 3%);
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
    background: #dfdfee;
    border-radius: 6px;
    padding: 10px;

    .header-left {
      &-title {
        margin-bottom: 10px;
      }
    }
  }
}

.home-content-empty {
  width: 60%;
  --border-radius: 0.75rem;
  margin: auto;
  padding: 14px;
  border-radius: var(--border-radius);
  background: #f1f1f3;
  box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 3%);
}

.card-container {
  display: flex;
}

.card {
  --border-radius: 0.75rem;
  --primary-color: #7257fa;
  --secondary-color: #3c3852;
  min-width: 210px;
  max-width: 300px;
  flex: 1;
  padding: 14px;
  border-radius: var(--border-radius);
  background: #fff;
  box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 3%);
  position: relative;
  margin-top: 40px;
  margin-right: 20px;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-title {
      padding: 0;
      font-size: 1.3rem;
      font-weight: bold;
      margin: 0;
    }
  }


  &-content {
    color: var(--secondary-color);
    font-size: 14px;
    max-height: 400px;
    overflow: auto;
    margin-right: -12px;
    &-item {
      display: flex;
      margin-bottom: 10px;
    }
    &-label {
      margin: 0 10px 0 0;
      min-width: 65px;
      text-align: right;
    }
    &-tags {
      .ant-tag {
        margin-bottom: 4px;
      }
    }
  }
}

.card > * + * {
  margin-top: 1.1em;
}

</style>
