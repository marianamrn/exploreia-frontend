<template>
  <div class="tour-carousel-container">
    <!-- Надпис над каруселлю -->
    <h2 class="carousel-title">Вам може сподобатись</h2>

    <!-- Кнопка лівої стрілки -->
    <button class="nav-arrow left" @click="prevTour">&#10094;</button>

    <div class="tour-carousel">
      <div
        v-for="tour in filteredTours"
        :key="tour.id"
        class="tour-card"
        @click="goToTourDetails(tour.id)"
      >
        <img :src="tour.image_path" alt="Зображення туру" class="tour-banner" />
        <div class="tour-info">
          <h2>{{ tour.title }}</h2>
          <p><MapPinIcon class="location-icon" /> {{ tour.destination_location }}</p>
          <p><CalendarIcon class="calendar-icon" /> {{ formatDate(tour.start_date) }}</p>
          <p><UsersIcon class="people-icon" /> {{ tour.people_limit }} людей</p>
        </div>
      </div>
    </div>

    <!-- Кнопка правої стрілки -->
    <button class="nav-arrow right" @click="nextTour">&#10095;</button>
  </div>
</template>

<script>
import { MapPinIcon, CalendarIcon, UsersIcon } from '@heroicons/vue/24/outline';
import axios from "axios";

export default {
  name: 'TourCarousel',
  props: {
    tours: {
      type: Array,
      required: true,
    },
    currentTourId: {
      type: Number,
      required: true,
    },
  },
  components: {
    MapPinIcon,
    CalendarIcon,
    UsersIcon,
  },
  computed: {
    filteredTours() {
      return this.tours.filter((tour) => tour.id !== this.currentTourId);
    },
  },
  methods: {
    async fetchTours() {
      const baseURL = `${window.location.protocol}//${window.location.hostname}`;
      try {
        const response = await axios.get(`${baseURL}/exploreia-backend/getSimilarTours.php?tourId=${this.currentTourId}`);
        this.tours = response.data;
      } catch (err) {
        console.error("Помилка при завантаженні турів", err);
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('uk-UA', options);
    },
    goToTourDetails(tourId) {
      this.$router.push({ name: 'TourDetails', params: { id: tourId } });
    },
    nextTour() {
      const currentIndex = this.tours.findIndex((tour) => tour.id === this.currentTourId);
      const nextTour = this.tours[(currentIndex + 1) % this.tours.length];
      this.goToTourDetails(nextTour.id);
    },
    prevTour() {
      const currentIndex = this.tours.findIndex((tour) => tour.id === this.currentTourId);
      const prevTour = this.tours[(currentIndex - 1 + this.tours.length) % this.tours.length];
      this.goToTourDetails(prevTour.id);
    },
  },
  mounted() {
    this.fetchTours();
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overflow-x: hidden;
}

.tour-carousel-container {
  padding: 2%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.carousel-title {
  font-size: 24px;
  color: #0077b6;
  font-family: 'Ermilov', sans-serif;
  margin-bottom: 20px;
  text-align: center;
}

.tour-carousel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 400px));
  gap: 50px;
  position: relative;
  max-width: 100%;
  overflow: hidden;
}

.nav-arrow {
  background: none;
  color: #0077b6;
  border: none;
  cursor: pointer;
  font-size: 48px;
  position: absolute;
  padding: 4%;
  transition: transform 0.2s ease-in-out;
}

.nav-arrow:hover {
  transform: scale(1.1);
}

.nav-arrow.left {
  left: 0px;
}

.nav-arrow.right {
  right: 0px;
}

.tour-card {
  background-color: #404347;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
}

.tour-card:hover {
  transform: scale(1.05);
  background-color: #1f1f21;
}

.tour-banner {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 2px solid #0077b6;
}

.tour-info {
  padding: 16px;
  text-align: left;
  color: #caf0fb;
}

.tour-info h2 {
  font-family: 'Yeseva One', regular;
  font-size: 20px;
  color: #0077b6;
  margin: 0 0 8px;
}

.tour-info p {
  display: flex;
  align-items: center;
  font-family: 'Noto Serif', serif;
  font-size: 14px;
  margin: 8px 0;
}

.location-icon,
.calendar-icon,
.people-icon {
  width: 20px;
  height: 20px;
  color: #90e0ef;
  margin-right: 8px;
}

@media (max-width: 1024px) {
  .tour-card {
    max-width: 250px;
    margin: auto;
  }
}

@media (max-width: 768px) {
  .tour-banner {
    height: 180px;
  }
}

@media (max-width: 480px) {
  .tour-banner {
    height: 150px;
  }
}
</style>
