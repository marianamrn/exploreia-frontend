<template>
  <div class="places-page">
    <!-- Обкладинка сторінки -->
    <div
      class="banner"
      v-if="bannerImage"
      :style="{ backgroundImage: `url(${bannerImage})` }"
    ></div>

    <!-- Фільтр -->
    <PlaceFilter 
      :regions="regions" 
      :categories="categories" 
      :seasonalities="seasonalities" 
      @filter-places="applyFilters"
    />

    <!-- Основний контент сторінки -->
    <div class="content">
      <p v-if="loading">Завантаження...</p>
      <p v-else-if="error">{{ error }}</p>
      <p v-else-if="!places.length">Упс, здається у нас ще немає таких місцин</p>

      <!-- Список місцин -->
      <div class="places-grid">
        <div
          v-for="place in places"
          :key="place.id"
          class="place-card"
          @click="goToPlaceDetails(place.id)"
        >
          <img :src="place.image_path" alt="Банер місцини" class="place-banner" />
          <div class="place-info">
            <h2>{{ place.name }}</h2> <!-- Тепер виводимо name замість location_name -->
            <div class="place-details">
              <div class="place-location">
                <MapPinIcon class="place-icon" />
                <span>{{ place.location_name }}</span>
              </div>
              <div class="place-category">
                <CalendarIcon class="place-icon" />
                <span>{{ place.category }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { MapPinIcon, CalendarIcon } from '@heroicons/vue/24/outline'; // Імпортуємо іконки
import PlaceFilter from './PlaceFilter.vue'; // Імпортуємо PlaceFilter компонент

export default {
  components: {
    MapPinIcon,
    CalendarIcon,
    PlaceFilter,
  },
  data() {
    return {
      bannerImage: null,
      places: [],
      regions: [], // для областей
      categories: [], // для категорій
      seasonalities: [], // для сезонності
      filters: {
        region: '',
        category: '',
        seasonality: '',
      },
      loading: true,
      error: null,
    };
  },
  created() {
    this.fetchData();
    this.fetchFilterData(); // Завантажуємо дані для фільтрів
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true;
        const baseURL = `${window.location.protocol}//${window.location.hostname}`;
        const response = await axios.get(`${baseURL}/exploreia-backend/getPlaces.php`, {
          params: this.filters, // передаємо фільтри в запит
        });

        if (response.data && response.data.banner && Array.isArray(response.data.places)) {
          this.bannerImage = decodeURIComponent(response.data.banner);
          this.places = response.data.places;
        } else {
          this.error = "Не вдалося отримати дані.";
        }
      } catch (error) {
        this.error = "Помилка при завантаженні даних";
      } finally {
        this.loading = false;
      }
    },
    async fetchFilterData() {
      try {
        const baseURL = `${window.location.protocol}//${window.location.hostname}`;
        const response = await axios.get(`${baseURL}/exploreia-backend/getFilters.php`);
        
        if (response.data) {
          this.regions = response.data.regions || [];
          this.categories = response.data.categories || [];
          this.seasonalities = response.data.seasonalities || [];
        }
      } catch (error) {
        console.error("Помилка при завантаженні фільтрів:", error);
      }
    },
    applyFilters(filters) {
      this.filters = { ...filters };
      this.fetchData(); // перезавантажуємо дані з новими фільтрами
    },
    goToPlaceDetails(id) {
      this.$router.push(`/places/${id}`);
    },
  },
};
</script>

<style scoped>
.banner {
  width: 100%;
  height: 60vh;
  background-size: cover;
  background-position: center;
  position: relative;
}

.banner::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(40, 42, 44, 0) 20%, rgba(40, 42, 44, 1) 100%);
}

.places-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
  padding: 2% 4%;
}

.place-card {
  flex: 1 1 calc(25% - 8px);
  max-width: 300px;
  min-width: 280px;
  height: 400px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background-color: #404347;
  transition: background-color 0.2s;
}

.place-card:hover {
  background-color: #1F1F21;
}

.place-banner {
  width: 100%;
  height: 70%;
  object-fit: cover;
}

.place-info {
  padding: 8px;
  color: #CAF0FB;
}

.place-info h2 {
  font-family: 'Yeseva One', regular;
  font-size: 20px;
  color: #0077B6;
  margin: 0;
}

.place-details {
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.place-location,
.place-category {
  display: flex;
  align-items: center;
  gap: 8px;
}

.place-icon {
  color: #90E0EF;
  width: 20px;
  height: 20px;
}

.place-info span {
  font-family: 'Noto Serif', serif;
  font-size: 14px;
}
</style>
