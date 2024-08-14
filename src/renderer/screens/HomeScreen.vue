<!-- <script setup lang="tsx">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleRoute = (path: string): void => {
  router.push(path)
}

</script> -->
<template>
  <div class="home-screen">
    <div class="card">
      <h3 class="card__title">Boss</h3>
      <p class="card__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
      <div class="card__date">
        April 15, 2022
      </div>
      <div class="card__arrow">投递</div>
    </div>
    <div class="card">
      <h3 class="card__title">拉勾</h3>
      <p class="card__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
      <div class="card__date">
        April 15, 2022
      </div>
      <div class="card__arrow">投递</div>
    </div>
    <div class="card">
      <h3 class="card__title">智联</h3>
      <p class="card__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
      <div class="card__date">
        April 15, 2022
      </div>
      <div class="card__arrow">投递</div>
    </div>
  </div>
</template>
<style scoped>
.home-screen {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 20px;
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
}

.card > * + * {
  margin-top: 1.1em;
}

.card .card__content {
  color: var(--secondary-color);
  font-size: 0.86rem;
}

.card .card__title {
  padding: 0;
  font-size: 1.3rem;
  font-weight: bold;
}

.card .card__date {
  color: #6e6b80;
  font-size: 0.8rem;
}

.card .card__arrow {
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

.card svg {
  transition: 0.2s;
}

/* hover */
.card:hover .card__title {
  color: var(--primary-color);
  text-decoration: underline;
}

.card:hover .card__arrow {
  background: #111;
}

.card:hover .card__arrow svg {
  transform: translateX(3px);
}
</style>
