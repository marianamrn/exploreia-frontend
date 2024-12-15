<template>
  <div class="tours-container">
    <h1>Список турів</h1>
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
          <p><i class="location-icon"></i> {{ tour.destination_location }}</p>
          <p><i class="calendar-icon"></i> {{ formatDate(tour.start_date) }}</p>
          <p><i class="people-icon"></i> {{ tour.people_limit }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Tours",
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
.tour-banner {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}
.tours-container {
  padding: 16px;
}
.tours-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.tour-card {
  flex: 1 1 calc(33.333% - 16px);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
  transition: transform 0.2s;
}
.tour-card:hover {
  transform: scale(1.02);
}
.tour-info {
  text-align: left;
}
</style>
