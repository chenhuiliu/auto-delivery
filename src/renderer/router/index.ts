import { LoginScreen, SignUpScreen, ConfigScreen } from '@/renderer/screens'
import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: LoginScreen,
      meta: {
        titleKey: 'title.login'
      }
    },
    {
      path: '/sign_up',
      component: SignUpScreen,
      meta: {
        titleKey: 'title.sign_up'
      }
    },
    {
      path: '/config',
      component: ConfigScreen,
      meta: {
        titleKey: 'title.config'
      }
    },
    {
      path: '/error',
      component: () => import('@/renderer/screens/ErrorScreen.vue'),
      meta: {
        titleKey: 'title.error'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})
