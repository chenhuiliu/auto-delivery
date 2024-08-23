<template>
  <div class="config-screen">
    <div class="form-container">
      <p class="title">{{ plainOptionsMap[deliveryType] }}招聘配置</p>
      <a-form class="form" :model="formState" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="职位名称" name="jobName">
          <a-input-group compact style="width: 400px">
            <a-input v-model:value="jobName" style="width: calc(100% - 200px)" placeholder="请输入需要投递的职位名称" @press-enter="submitJob" />
            <a-button type="primary" @click="submitJob">提交</a-button>
          </a-input-group>
        </a-form-item>
        <a-form-item label="已选职位" v-if="formState.jobList.length > 0">
          <a-tag v-for="(job, index) in formState.jobList" :key="index" color="cyan" closable>{{ job }}</a-tag>
        </a-form-item>

        <a-form-item label="薪资范围" name="salaryRange">
          <a-input-group compact>
            <a-input
              v-model:value="formState.salaryMin"
              style="width: 100px; text-align: center"
              placeholder="最低薪资"
            />
            <a-input
              class="site-input-split"
              style="width: 30px; border-left: 0; pointer-events: none"
              placeholder="~"
              disabled
            />
            <a-input
              v-model:value="formState.salaryMax"
              class="site-input-right"
              style="width: 100px; text-align: center"
              placeholder="最高薪资"
            />
            <span class="salary-unit">k</span>
          </a-input-group>
        </a-form-item>
        <a-form-item label="屏蔽公司" name="shieldCompany">
          <a-input-group compact style="width: 400px">
            <a-input v-model:value="companyName" style="width: calc(100% - 200px)" placeholder="请输入需要屏蔽的公司" @press-enter="submitCompany" />
            <a-button type="primary" @click="submitCompany">提交</a-button>
          </a-input-group>
        </a-form-item>

        <a-form-item label="已屏蔽公司" v-if="formState.companyList.length > 0">
          <a-tag v-for="(company, index) in formState.companyList" :key="index" color="red" closable>{{ company }}</a-tag>
        </a-form-item>

        <a-form-item label="屏蔽HR" name="shieldHR">
          <a-input-group compact style="width: 400px">
            <a-input v-model:value="hrName" style="width: calc(100% - 200px)" placeholder="请输入需要屏蔽的HR" @press-enter="submitHR" />
            <a-button type="primary" @click="submitHR">提交</a-button>
          </a-input-group>
        </a-form-item>

        <a-form-item label="已屏蔽HR" v-if="formState.hrList.length > 0">
          <a-tag v-for="(hr, index) in formState.hrList" :key="index" color="red" closable>{{ hr }}</a-tag>
        </a-form-item>

        <a-form-item label="屏蔽猎头" name="shieldHeadhunter">
          <a-input-group compact style="width: 400px">
            <a-input v-model:value="headhunter" style="width: calc(100% - 200px)" placeholder="请输入需要屏蔽的猎头" @press-enter="submitHeadhunter" />
            <a-button type="primary" @click="submitHeadhunter">提交</a-button>
          </a-input-group>
        </a-form-item>

        <a-form-item label="已屏蔽猎头" v-if="formState.headhunterList.length > 0">
          <a-tag v-for="(headhunter, index) in formState.headhunterList" :key="index" color="red" closable>{{ headhunter }}</a-tag>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button style="margin-right: 10px" @click="onCancel">取消</a-button>
          <a-button type="primary" @click="onSubmit" @enter="onSubmit">提交</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup lang="tsx">
import { message } from "ant-design-vue";
import { ref, reactive, onMounted } from "vue"
import { useRouter } from 'vue-router'
import { useRoute } from "vue-router"

const router = useRouter()
const route = useRoute()

const jobName = ref("")
const companyName = ref("")
const hrName = ref("")
const headhunter = ref("")
const deliveryType = (route.query.type || "boss") as string

const plainOptionsMap = {
  "boss": "Boss直聘",
  "lagou": "拉勾网",
  "zhilian": "智联招聘"
} as Record<string, string>

interface FormState {
  jobList: string[];
  companyList: string[];
  hrList: string[];
  headhunterList: string[];
  salaryMin: string;
  salaryMax: string;
}

let formState = reactive<FormState>({
  jobList: [],
  companyList: [],
  hrList: [],
  headhunterList: [],
  salaryMin: "",
  salaryMax: ""
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
const submitHeadhunter = () => {
  const index = formState.headhunterList.findIndex((hd) => hd === headhunter.value)
  if (index === -1) {
    formState.headhunterList.push(headhunter.value)
    headhunter.value = ""
  } else {
    message.error("该猎头已存在")
  }
}

const onSubmit = () => {
  const data = {
    ...formState,
    id: deliveryType
  }
  const configition = window.localStorage.getItem("DELIVERY_CONFIGITION")

  if (configition) {
    const list = JSON.parse(configition)
    const index = list.findIndex((item) => item.id === deliveryType)
    if (index === -1) {
      list.push(data)
    } else {
      list[index] = data
    }
    window.localStorage.setItem("DELIVERY_CONFIGITION", JSON.stringify(list))
  } else {
    window.localStorage.setItem("DELIVERY_CONFIGITION", JSON.stringify([data]))
  }

}

const onCancel = () => {
  router.push("/home")
}

onMounted(() => {
  const configition = window.localStorage.getItem("DELIVERY_CONFIGITION")
  if (configition) {
    const list = JSON.parse(configition)
    const index = list.findIndex((item) => item.id === deliveryType)
    if (index !== -1) {
      const newState = JSON.parse(JSON.stringify(list[index]));
      Object.assign(formState, newState)
      console.log(formState, "formState")
    }
  }
})

</script>
<style scoped lang="less">
.config-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.form-container {
  width: 80%;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 20px 30px;
}
.ant-form-item-control .ant-tag {
  margin-bottom: 4px;
}
.salary-unit {
  padding-left: 6px;
  line-height: 2.2;
}

</style>
