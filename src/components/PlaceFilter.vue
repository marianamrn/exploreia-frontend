<template>
  <div class="filter-bar">
    <!-- Іконка фільтру -->
    <div class="filter-icon">
      <FunnelIcon class="icon-style" />
    </div>

    <!-- Поле "Область" -->
    <div class="filter-item">
      <input
        v-model="localFilters.region"
        list="region-list"
        placeholder="Оберіть область"
      />
      <datalist id="region-list">
        <option
          v-for="region in regions"
          :key="region.region"
          :value="region.region"
        />
      </datalist>
    </div>

    <div class="filter-separator"></div>

    <!-- Поле "Категорія" -->
    <div class="filter-item">
      <input
        v-model="localFilters.category"
        list="category-list"
        placeholder="Оберіть категорію"
      />
      <datalist id="category-list">
        <option
          v-for="category in categories"
          :key="category.category"
          :value="category.category"
        />
      </datalist>
    </div>

    <div class="filter-separator"></div>

    <!-- Поле "Сезонність" -->
    <div class="filter-item">
      <input
        v-model="localFilters.seasonality"
        list="seasonality-list"
        placeholder="Оберіть сезон"
      />
      <datalist id="seasonality-list">
        <option
          v-for="season in seasons"
          :key="season.seasonality"
          :value="season.seasonality"
        />
      </datalist>
    </div>

    <!-- Кнопка "Знайти" -->
    <button class="filter-button" @click="applyFilters">
      Знайти
    </button>
  </div>
</template>

<script>
import { FunnelIcon } from "@heroicons/vue/24/outline";
import axios from "axios";

export default {
  components: {
    FunnelIcon,
  },
  data() {
    return {
      localFilters: {
        region: "",
        category: "",
        seasonality: "",
      },
      regions: [],
      categories: [],
      seasons: [],
    };
  },
  created() {
    this.fetchFilters();
  },
  methods: {
    async fetchFilters() {
      try {
        const baseURL = `${window.location.protocol}//${window.location.hostname}`;
        const response = await axios.get(`${baseURL}/exploreia-backend/getFilters.php`);
        
        // Завантаження фільтрів із відповіді сервера
        this.regions = response.data.regions;
        this.categories = response.data.categories;
        this.seasons = response.data.seasons;
      } catch (error) {
        console.error("Помилка при завантаженні фільтрів", error);
      }
    },
    applyFilters() {
      this.$emit("filter-places", this.localFilters);
    },
  },
};
</script>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  background-color: #1C1E20;
  border-radius: 8px;
  padding: 0;
  gap: 0;
  height: 60px;
  overflow: hidden;
  margin: 0 4%;
}

.filter-icon {
  background-color: #03045E;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  height: 100%;
}

.icon-style {
  color: #CAF0FB;
  width: 24px;
  height: 24px;
}

.filter-item {
  flex: 1;
  display: flex;
  align-items: center;
}

.filter-item input {
  background: transparent;
  border: none;
  font-family: "Noto Serif", light;
  font-weight: 300;
  font-size: 16px;
  color: #CAF0FB;
  padding: 8px 12px;
  width: 100%;
  outline: none;
  height: 100%;
  box-sizing: border-box;
}

.filter-item input::placeholder {
  color: #CAF0FB;
  opacity: 0.7;
}

.filter-separator {
  width: 2px;
  height: 50%;
  background-color: #0077B6;
}

.filter-button {
  font-family: "Noto Serif", serif;
  font-weight: 300;
  font-size: 18px;
  background-color: #03045E;
  color: #CAF0FB;
  padding: 0 40px;
  border: none;
  cursor: pointer;
  height: 100%;
  white-space: nowrap;
  transition: background-color 0.3s ease;
}

.filter-button:hover {
  background-color: #0077B6;
}
</style>
