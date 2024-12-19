<template>
  <div class="places-page">
    <!-- Обкладинка сторінки -->
    <div
      class="banner"
      v-if="bannerImage"
      :style="{ backgroundImage: `url(${bannerImage})` }"
    ></div>

    <!-- Текстовий банер над фільтром -->
    <div class="text-overlay">
      <h1>Відкрий для себе</h1>
      <h2>
        <span class="line1">свою</span>
        <br />
        <span class="line2">Україну</span>
      </h2>
    </div>

    <!-- Карусель місцин -->
    <PlaceCarousel :places="carouselPlaces" v-if="carouselPlaces.length > 0" />

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
            <h2>{{ place.name }}</h2>
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
import { MapPinIcon, CalendarIcon } from "@heroicons/vue/24/outline"; 
import PlaceFilter from "./PlaceFilter.vue"; 
import PlaceCarousel from "./PlaceCarousel.vue"; 

export default {
  components: {
    MapPinIcon,
    CalendarIcon,
    PlaceFilter,
    PlaceCarousel,
  },
  data() {
    return {
      bannerImage: null,
      places: [],
      carouselPlaces: [], // Дані для каруселі
      regions: [],
      categories: [],
      seasonalities: [],
      filters: {
        region: "",
        category: "",
        seasonality: "",
      },
      loading: true,
      error: null,
    };
  },
  created() {
    this.fetchData();
    this.fetchCarouselData(); // Отримуємо дані для каруселі
    this.fetchFilterData(); 
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true;
        const baseURL = `${window.location.protocol}//${window.location.hostname}`;
        const response = await axios.get(`${baseURL}/exploreia-backend/getPlaces.php`, {
          params: this.filters,
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
    async fetchCarouselData() {
      try {
        const baseURL = `${window.location.protocol}//${window.location.hostname}`;
        const response = await axios.get(`${baseURL}/exploreia-backend/getCarouselPlaces.php`);
        
        if (Array.isArray(response.data)) {
          this.carouselPlaces = response.data;
        }
      } catch (error) {
        console.error("Помилка при завантаженні даних для каруселі:", error);
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
      this.fetchData();
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

.text-overlay {
  text-align: center;
  color: #CAF0FB;
  font-family: 'Ermilov', sans-serif;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
}

.text-overlay h1 {
  font-size: 42px;
  font-weight: bold;
  margin: 0;
}

.text-overlay h2 {
  font-size: 42px;
  font-weight: bold;
  margin-top: 2px;
  line-height: 32px;
}

.text-overlay .line1 {
  display: inline-block;
  color: #CAF0FB;
}

.text-overlay .line2 {
  display: inline-block;
  background-color: #03045E; 
  color: #CAF0FB;
  padding: 0.2rem 1rem;
  position: relative;
  top: 10%;
  left: 14%; 
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
