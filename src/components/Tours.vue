<template>
  <div class="tours-container">
    <p v-if="loading">Завантаження...</p>
    <p v-else-if="error">{{ error }}</p>

    <!-- Список турів -->
    <div class="tours-grid">
      <div
        v-for="tour in tours"
        :key="tour.id"
        class="tour-card"
        @click="goToTourDetails(tour.id)"
      >
        <!-- Фото банера -->
        <img :src="tour.image_path" alt="Зображення туру" class="tour-banner" />

        <!-- Інформація про тур -->
        <div class="tour-info">
          <h2>{{ tour.title }}</h2>
          <p><MapPinIcon class="location-icon" /> {{ tour.destination_location }}</p>
          <p><CalendarIcon class="calendar-icon" /> {{ formatDate(tour.start_date) }}</p>
          <p><UsersIcon class="people-icon" /> {{ tour.people_limit }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { MapPinIcon, CalendarIcon, UsersIcon } from '@heroicons/vue/24/outline';

export default {
  name: "Tours",
  components: {
    MapPinIcon,
    CalendarIcon,
    UsersIcon,
  },
  data() {
    return {
      tours: [],
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchTours();
  },
  methods: {
    async fetchTours() {
      try {
        const baseURL = `${window.location.protocol}//${window.location.hostname}`;
        const response = await axios.get(`${baseURL}/exploreia-backend/getTour.php`);
        console.log("Tours fetched:", response.data); // Логуємо отримані дані
        this.tours = response.data;
      } catch (err) {
        this.error = "Помилка при завантаженні турів";
      } finally {
        this.loading = false;
      }
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
  padding: 1.6%;
}

.tours-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
}

.tour-card {
  flex: 1 1 calc(25% - 16px); /* 4 картки в рядку для великих екранів */
  max-width: 300px;
  min-width: 280px;
  height: 400px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 0;
  background-color: #404347;
  transition: background-color 0.2s;
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

/* Медіа-запити для адаптивності */
@media (max-width: 1024px) {
  .tour-card {
    flex: 1 1 calc(33.333% - 16px); /* 3 картки в рядку на екранах середнього розміру */
  }
}

@media (max-width: 768px) {
  .tour-card {
    flex: 1 1 calc(50% - 16px); /* 2 картки в рядку на малих екранах */
  }
}

@media (max-width: 480px) {
  .tour-card {
    flex: 1 1 100%; /* 1 картка в рядку на дуже малих екранах */
  }
}
</style>
