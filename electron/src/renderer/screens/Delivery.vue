<template>
  <div class="delivery-screen">
    <div class="form-container">
      <p class="title">投递配置</p>
      <a-form class="form" :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-form-item label="职位名称" name="jobName">
          <a-input-group compact style="max-width: 600px">
            <a-input v-model:value="jobName" style="width: calc(100% - 200px)" placeholder="请输入需要投递的职位名称" @press-enter="submitJob" />
            <a-button type="primary" @click="submitJob">提交</a-button>
          </a-input-group>
        </a-form-item>
        <a-form-item label="已选职位" v-if="formState.jobList.length > 0">
          <a-tag v-for="(job, index) in formState.jobList" :key="index" color="cyan" closable>{{ job }}</a-tag>
        </a-form-item>

        <a-form-item label="薪资大于(k)" name="salary">
          <a-input-number v-model:value="formState.salary" :min="1" :max="100" />
        </a-form-item>
        <a-form-item label="屏蔽公司" name="shieldCompany">
          <a-input-group compact style="max-width: 600px">
            <a-input v-model:value="companyName" style="width: calc(100% - 200px)" placeholder="请输入需要屏蔽的公司" @press-enter="submitCompany" />
            <a-button type="primary" @click="submitCompany">提交</a-button>
          </a-input-group>
        </a-form-item>

        <a-form-item label="已屏蔽公司" v-if="formState.companyList.length > 0">
          <a-tag v-for="(company, index) in formState.companyList" :key="index" color="red" closable>{{ company }}</a-tag>
        </a-form-item>

        <a-form-item label="屏蔽HR" name="shieldHR">
          <a-input-group compact style="max-width: 600px">
            <a-input v-model:value="hrName" style="width: calc(100% - 200px)" placeholder="请输入需要屏蔽的HR" @press-enter="submitHR" />
            <a-button type="primary" @click="submitHR">提交</a-button>
          </a-input-group>
        </a-form-item>

        <a-form-item label="已屏蔽HR" v-if="formState.hrList.length > 0">
          <a-tag v-for="(hr, index) in formState.hrList" :key="index" color="red" closable>{{ hr }}</a-tag>
        </a-form-item>

        <a-form-item label="屏蔽猎头" name="shieldHeadhunter">
          <a-checkbox v-model:checked="formState.headhunterChecked" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 4, span: 20 }">
          <a-button style="margin-right: 10px" @click="onReset">重置</a-button>
          <a-button type="primary" @click="onSubmit" @enter="onSubmit">提交</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="delivery-confirm">
      <a-checkbox-group v-model:value="deliveryPlatform" :options="plainOptions" />
      <a-button style="width: 300px; margin-left: 30px;" type="primary">投递</a-button>
    </div>
  </div>
</template>
<script setup lang="tsx">
import { message } from "ant-design-vue";
import { ref, reactive, onMounted } from "vue"
import { useRouter } from 'vue-router'
import { addConfig } from "@/renderer/api/index.js"

const router = useRouter()

const jobName = ref("")
const companyName = ref("")
const hrName = ref("")
const plainOptions = ['拉勾网', 'Boss直聘', '智联招聘'];
const deliveryPlatform = ref([])

interface FormState {
  jobList: string[];
  companyList: string[];
  hrList: string[];
  headhunterChecked: boolean;
  salary: number;
}

let formState = reactive<FormState>({
  jobList: [],
  companyList: [],
  hrList: [],
  headhunterChecked: false,
  salary: 1
});

const submitJob = () => {
  const index = formState.jobList.findIndex((job) => job === jobName.value)
  if (index === -1) {
    formState.jobList.push(jobName.value)
    jobName.value = ""
  } else {
    message.error("该职位已存在")
  }
}

const submitCompany = () => {
  const index = formState.companyList.findIndex((company) => company === companyName.value)
  if (index === -1) {
    formState.companyList.push(companyName.value)
    companyName.value = ""
  } else {
    message.error("该公司已存在")
  }
}

const submitHR = () => {
  const index = formState.hrList.findIndex((hr) => hr === hrName.value)
  if (index === -1) {
    formState.hrList.push(hrName.value)
    hrName.value = ""
  } else {
    message.error("该HR已存在")
  }
}

const onSubmit = () => {
  const data = {
    ...formState
  }
  console.log(data, "data")
  addConfig(data).then((res) => {
    if (res.code !== 200) {
      router.push("/home")
      message.success("保存成功")
    }
  })

  window.localStorage.setItem("DELIVERY_CONFIGITION", JSON.stringify(data))
}

const onReset = () => {
  formState.companyList = []
  formState.hrList = []
  formState.jobList = []
  formState.headhunterChecked = false
  formState.salary = 1
}

onMounted(() => {
  const configition = window.localStorage.getItem("DELIVERY_CONFIGITION")
  if (configition) {
    const newState = JSON.parse(JSON.stringify(configition));
    Object.assign(formState, newState)
  }
})

</script>
<style scoped lang="less">
.delivery-screen {
  display: flex;
  flex-direction: column;
  height: 100%;
  .ant-form-item-control .ant-tag {
    margin-bottom: 4px;
  }
  .form-container {
    flex: 1;
  }
  .delivery-confirm {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    border-radius: 4px;
  }
}
</style>
