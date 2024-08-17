<template>
  <div class="platform">
    <div class="platform-left">
      <div class="platform-left-title">请选择配置平台</div>
      <a-radio-group v-model:value="typeVal">
        <a-radio v-for="(item, index) in plainOptions" :key="index" :value="item">{{ configTitleMap[item] }}</a-radio>
      </a-radio-group>
    </div>
    <div class="platform-right">
      <a-button type="primary" class="platform-right-btn" @click="goConfig(typeVal)">配置</a-button>
    </div>
  </div>

</template>
<script setup lang="tsx">
import { ref } from "vue"
import { useRouter } from 'vue-router'

const router = useRouter()
const plainOptions = ['boss', 'lagou', 'zhilian']
const typeVal = ref("boss")
const configTitleMap = {
  "boss": "Boss",
  "lagou": "拉勾",
  "zhilian": "智联"
}

const goConfig = (type: string) => {
  const path = `/config?type=${type}`
  router.push(path)
}
</script>
<style scoped lang="less">
.platform {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  &-left {
    display: flex;
    flex-direction: column;
    &-title {
      margin-bottom: 6px;
    }
  }
  &-right {
    &-btn {
      margin-left: 20px;
    }
  }
}
</style>
