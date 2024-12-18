import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/components/Home.vue'; 
import AboutUs from '@/components/AboutUs.vue';
import Tours from '@/components/Tours.vue'; 
import TourFilter from '@/components/TourFilter.vue';
import TourDetail from "@/components/TourDetail.vue";
import ShortTourInfo from '@/components/ShortTourInfo.vue';
import TourCarousel from '@/components/TourCarousel.vue'; // Додано
import Places from '@/components/Places.vue';
import Reviews from '@/components/Reviews.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about-us', component: AboutUs },
  { path: '/tours', component: Tours },
  { path: '/tour-filter', component: TourFilter },
  { path: "/tours/:id", component: TourDetail },
  { path: '/short-tour-info', component: ShortTourInfo },
  { path: '/tour-carousel', component: TourCarousel },
  { path: '/places', component: Places },
  { path: '/reviews', component: Reviews }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
