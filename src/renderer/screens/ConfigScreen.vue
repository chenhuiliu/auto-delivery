<template>
  <div class="config-screen">
    <div class="form-container">
      <p class="title">个人配置</p>
      <form class="form">
        <label for="job-name">职位名称</label>
        <label for="salary-range">薪资范围</label>
        <label for="company-filter">过滤公司</label>
        <label for="HR-filter">过滤HR</label>
        <div class="form-btn-group">
          <button class="form-btn">提交</button>
          <button class="form-btn">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.config-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.form-container {
  width: 350px;
  height: 500px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 20px 30px;
}

.title {
  text-align: center;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  margin: 10px 0 30px 0;
  font-size: 28px;
  font-weight: 800;
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 15px;
}

.input {
  border-radius: 20px;
  border: 1px solid #c0c0c0;
  outline: 0 !important;
  box-sizing: border-box;
  padding: 12px 15px;
}

.input:focus {
  border-color: teal;
}

.form-btn {
  padding: 10px 15px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  border-radius: 20px;
  border: 0 !important;
  outline: 0 !important;
  background: teal;
  color: white;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.form-btn:active {
  box-shadow: none;
}

</style>
