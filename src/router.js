import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/components/Home.vue'; 
import AboutUs from '@/components/AboutUs.vue';
import Tours from '@/components/Tours.vue'; 
import Places from '@/components/Places.vue';
import Reviews from '@/components/Reviews.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about-us', component: AboutUs },
  { path: '/tours', component: Tours },
  { path: '/places', component: Places },
  { path: '/reviews', component: Reviews }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;