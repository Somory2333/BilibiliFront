// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import test from '@/pages/test.vue';
import Person from '@/components/Person.vue';
import Container from '@/components/Container.vue';
import PersonLike from '@/pages/PersonLike.vue';
import PersonCoin from '@/pages/PersonCoin.vue';
import Hot from '@/pages/Hot.vue';
import PersonComment from '@/pages/PersonComment.vue';
const routes = [
  {
    path: '/Home',
    name: 'home',
    component: Container,
  },
  {
    path: '/Person',
    name: 'person',
    component: Person
  },
  {
    path:'/Test',
    name:'test',
    component:test
  },
  {
    path: '/Person/Like',
    name: 'personLike',
    component: PersonLike
  },
  {
    path: '/Person/Coin',
    name: 'personCoin',
    component: PersonCoin
  },
  {
    path:'/Hot',
    name:'hot',
    component:Hot
  },
  {
    path:'/Person/Comment',
    name:'comment',
    component:PersonComment
  }
  // 添加更多路由...
];

const router = createRouter({
  history: createWebHistory(""),
  routes,
});

export default router;
