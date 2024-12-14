<template>
  <div class="tours-container">
    <h1>Тури</h1>
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
        <div
          class="tour-banner"
          :style="{ backgroundImage: 'url(' + tour.image_path + ')' }"
        ></div>

        <!-- Інформація про тур -->
        <div class="tour-info">
          <h2>{{ tour.title }}</h2>
          <p><i class="location-icon"></i> {{ tour.destination_location }}</p>
          <p><i class="calendar-icon"></i> {{ formatDate(tour.start_date) }}</p>
          <p><i class="people-icon"></i> {{ tour.people_limit }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Tours',
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
    // Отримання даних про тури
    async fetchTours() {
      try {
        const baseURL = `${window.location.protocol}//${window.location.hostname}`;
        const response = await axios.get(`${baseURL}/exploreia-backend/getTour.php`);
        this.tours = response.data;
      } catch (err) {
        this.error = 'Помилка при завантаженні турів';
      } finally {
        this.loading = false;
      }
    },

    // Перехід на сторінку деталей туру
    goToTourDetails(id) {
      this.$router.push(`/tours/${id}`);
    },

    // Форматування дати
    formatDate(date) {
      return new Date(date).toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
};
</script>

<style scoped>
.tour-banner {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
}
</style>
