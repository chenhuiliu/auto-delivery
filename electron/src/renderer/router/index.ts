import { LoginScreen, SignUpScreen, HomeScreen } from '@/renderer/screens'
import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: HomeScreen,
      meta: {
        titleKey: 'title.home'
      }
    },
    {
      path: '/personal',
      component: () => import('@/renderer/screens/PersonalCenter.vue'),
      meta: {
        titleKey: 'title.personal'
      }
    },
    {
      path: '/delivery',
      component: () => import('@/renderer/screens/Delivery.vue'),
      meta: {
        titleKey: 'title.delivery'
      }
    },
    {
      path: '/login',
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
      path: '/record',
      component: () => import('@/renderer/screens/RecordScreen.vue'),
      meta: {
        titleKey: 'title.record'
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
