<template>
  <div class="home-screen">
    <div class="home-content">
      <div class="home-content-header">
        <div class="header-left">
          <a-checkbox
            v-model:checked="state.checkAll"
            :indeterminate="state.indeterminate"
            @change="onCheckAllChange"
          >
            全选
          </a-checkbox>
          <a-checkbox-group v-model:value="state.checkedList" :options="plainOptions" />
        </div>
        <div class="header-right">
          <a-button type="primary">投递</a-button>
        </div>
      </div>
      <div class="card" v-for="(config, index) in configList" :key="index">
        <h3 class="card-title">{{ config.id }}</h3>
        <div class="card-content">
          <p class="card-content-item">
            <span>投递职位:</span>
            <span v-for="(item, index) in config.jobList" :key="index">{{ item }}</span>
          </p>
          <p class="card-content-item">
            薪资: {{ config.salaryMin }} - {{ config.
            salaryMax }}
          </p>
          <p class="card-content-item">
            <span>屏蔽公司:</span>
            <span v-for="(item, index) in config.companyList" :key="index">{{ item }}</span>
          </p>
          <p class="card-content-item">
            <span>屏蔽HR: </span>
            <span v-for="(item, index) in config.hrList" :key="index">{{ item }}</span>
          </p>
        </div>
        <div class="card__arrow">编辑</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="tsx">
import { ref, onMounted, reactive, watch } from "vue"

interface config {
  jobList: string[]
  companyList: string[]
  hrList: string[]
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
const plainOptions = ['Boss', '拉勾', '智联']

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
  padding: 20px;
}

.card {
  --border-radius: 0.75rem;
  --primary-color: #7257fa;
  --secondary-color: #3c3852;
  width: 210px;
  font-family: "Arial";
  padding: 1rem;
  cursor: pointer;
  border-radius: var(--border-radius);
  background: #f1f1f3;
  box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 3%);
  position: relative;

  &-title {
    padding: 0;
    font-size: 1.3rem;
    font-weight: bold;
    margin: 0;
  }

  &-content {
    color: var(--secondary-color);
    font-size: 0.86rem;
  }

  &-arrow {
    position: absolute;
    background: var(--primary-color);
    padding: 0.4rem;
    border-top-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    bottom: 0;
    right: 0;
    transition: 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }

  &:hover {
    &-title {
      color: var(--primary-color);
      text-decoration: underline;
    }
    &-arrow {
      background: #111;
    }
  }
}

.card > * + * {
  margin-top: 1.1em;
}

</style>
