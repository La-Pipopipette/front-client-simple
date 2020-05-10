import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import PlayerRegisterView from '@/views/PlayerRegisterView.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'PlayerRegister',
    component: PlayerRegisterView,
    props: (route) => ({ gameIdFromNavigation: route.query.gameId })
  },
  {
    path: '/game/simple',
    name: 'GameManagement',
    component: () => import(/* webpackChunkName: "GameManagementView" */ '@/views/GameManagementView.vue'),
    meta: { requiresUser: true }
  },
  {
    path: '/game/simple/:id',
    name: 'SimpleGameView',
    component: () => import(/* webpackChunkName: "SimpleGameView" */ '@/views/SimpleGameView.vue'),
    meta: { requiresUser: true }
  },
  {
    path: '*',
    name: 'NotFoundView',
    component: () => import(/* webpackChunkName: "NotFoundView" */ '@/views/NotFoundView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresUser && !store.getters['player/userDefined']) {
    next({ name: 'PlayerRegister', query: { gameId: to.params.id } })
  } else {
    next()
  }
})

export default router
