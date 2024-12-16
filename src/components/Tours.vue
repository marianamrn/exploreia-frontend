<template>
  <div class="tours-container">
    <p v-if="loading">Завантаження...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else-if="!tours.length">Упс, здається у нас ще немає такого туру</p>

    <!-- Пошуковий -->
    <TourFilter @filter-tours="fetchToursWithFilters" :cities="cities" />

    <!-- Список турів -->
    <div class="tours-grid">
      <div
        v-for="tour in tours"
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

    <!-- Кнопка "Ще" -->
    <div v-if="hasMoreTours" class="load-more-container">
      <button class="load-more-button" @click="loadMoreTours">Ще</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { MapPinIcon, CalendarIcon, UsersIcon } from '@heroicons/vue/24/outline';
import TourFilter from "@/components/TourFilter.vue";

export default {
  name: "Tours",
  components: {
    TourFilter,
    MapPinIcon,
    CalendarIcon,
    UsersIcon,
  },
  data() {
    return {
      tours: [],
      loading: true,
      error: null,
      filters: {},
      cities: [],
      currentPage: 1,
      hasMoreTours: true, // Визначає, чи є ще тури для завантаження
    };
  },
  mounted() {
    this.fetchCities();
    this.fetchTours();
  },
  methods: {
    async fetchCities() {
      try {
        const baseURL = `${window.location.protocol}//${window.location.hostname}`;
        const response = await axios.get(`${baseURL}/exploreia-backend/getCities.php`);
        this.cities = response.data;
      } catch (err) {
        console.error("Помилка при завантаженні міст:", err);
      }
    },
    async fetchTours(filters = {}) {
      try {
        this.loading = true;
        this.error = null;

        const baseURL = `${window.location.protocol}//${window.location.hostname}`;
        const params = new URLSearchParams({ ...filters, page: this.currentPage }).toString();

        const response = await axios.get(`${baseURL}/exploreia-backend/getTour.php?${params}`);

        if (response.data.length) {
          this.tours = [...this.tours, ...response.data];
        } else {
          this.hasMoreTours = false; // Якщо турів більше немає
        }
      } catch (err) {
        this.error = "Помилка при завантаженні турів";
      } finally {
        this.loading = false;
      }
    },
    fetchToursWithFilters(filters) {
      this.filters = filters;
      this.currentPage = 1; // Скидаємо сторінку до першої при зміні фільтрів
      this.tours = [];
      this.hasMoreTours = true;
      this.fetchTours(this.filters);
    },
    loadMoreTours() {
      this.currentPage += 1;
      this.fetchTours(this.filters);
    },
    goToTourDetails(id) {
      this.$router.push(`/tours/${id}`);
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("uk-UA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>

<style scoped>
.tours-container {
  padding: 5%;
  padding-top: 2%;
}

.tours-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px; 
  justify-content: space-between;
}

.tour-card {
  flex: 1 1 calc(25% - 8px); /* 4 картки в рядку для великих екранів */
  max-width: 300px;
  min-width: 280px;
  height: 400px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 0;
  background-color: #404347;
  transition: background-color 0.2s;
  margin-bottom: 2%; 
}

.tour-card:hover {
  background-color: #1F1F21;
}

.tour-banner {
  width: 100%;
  height: 70%;
  object-fit: cover;
}

.tour-info {
  text-align: left;
  color: #CAF0FB;
  padding: 8px;
  flex-grow: 1;
}

.tour-info h2 {
  font-family: 'Yeseva One', regular;
  font-size: 20px;
  color: #0077B6;
  margin: 0;
}

.tour-info p {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
  font-family: 'Noto Serif', serif;
  font-size: 14px;
}

.tour-info .location-icon,
.tour-info .calendar-icon,
.tour-info .people-icon {
  color: #90E0EF;
  width: 20px;
  height: 20px;
}

.load-more-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.load-more-button {
  width: 140px;
  height: 32px;
  background-color: #0077B6;
  color: #CAF0FB;
  border: none;
  border-radius: 100px;
  font-size: 14px;
  font-family: 'Noto Serif', serif;
  cursor: pointer;
  transition: all 0.3s;
}

.load-more-button:hover {
  background-color: transparent;
  border: 2px solid #0077B6;
  color: #0077B6;
}

/* Медіа-запити для адаптивності */
@media (max-width: 1024px) {
  .tour-card {
    flex: 1 1 calc(33.333% - 8px); /* 3 картки в рядку на екранах середнього розміру */
  }
}

@media (max-width: 768px) {
  .tour-card {
    flex: 1 1 calc(50% - 8px); /* 2 картки в рядку на малих екранах */
  }
}

@media (max-width: 480px) {
  .tour-card {
    flex: 1 1 100%; /* 1 картка в рядку на дуже малих екранах */
  }
}
</style>
