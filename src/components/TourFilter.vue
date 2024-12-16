<template>
  <div class="filter-bar">
    <!-- Іконка фільтру -->
    <div class="filter-icon">
      <FunnelIcon class="icon-style" />
    </div>

    <!-- Поле "Куди їдемо?" -->
    <div class="filter-item">
      <input 
        v-model="localFilters.destination"
        list="destination-cities"
        placeholder="Куди їдемо?" 
      />
      <datalist id="destination-cities">
        <option 
          v-for="city in cities.destinationCities" 
          :key="city" 
          :value="city"
        />
      </datalist>
    </div>

    <div class="filter-separator"></div>

    <!-- Поле "Звідки виїжджаємо?" -->
    <div class="filter-item">
      <input 
        v-model="localFilters.departure"
        list="departure-cities"
        placeholder="Звідки виїжджаємо?" 
      />
      <datalist id="departure-cities">
        <option 
          v-for="city in cities.departureCities" 
          :key="city" 
          :value="city"
        />
      </datalist>
    </div>

    <div class="filter-separator"></div>

    <!-- Поле "Коли?" -->
    <div class="filter-item">
      <input 
        type="date" 
        v-model="localFilters.date"
      />
    </div>

    <div class="filter-separator"></div>

    <!-- Поле "Скільки днів?" -->
    <div class="filter-item">
      <input 
        type="number"
        v-model="localFilters.days"
        min="1" 
        placeholder="Скільки днів?" 
      />
    </div>

    <!-- Кнопка "Знайти" -->
    <button class="filter-button" @click="applyFilters">
      Знайти
    </button>
  </div>
</template>

<script>
import { FunnelIcon } from "@heroicons/vue/24/outline";

export default {
  components: {
    FunnelIcon,
  },
  props: {
    cities: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localFilters: {
        destination: "",
        departure: "",
        date: "",
        days: "",
      },
    };
  },
  methods: {
    applyFilters() {
      this.$emit("filter-tours", this.localFilters);
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
    margin-bottom: 2%;
  }

  /* Іконка фільтру */
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

  /* Поля вводу */
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
    padding: 10px 15px;
    width: 100%;
    outline: none;
    height: 100%;
    box-sizing: border-box;
  }

  .filter-item input::placeholder {
    color: #CAF0FB;
    opacity: 0.7;
  }

  /* Поле дати */
  .filter-item input[type="date"] {
    font-family: "Noto Serif", light;
    font-weight: 300;
    font-size: 16px;
    color: #CAF0FB;
    padding: 10px 15px;
    background: transparent;
    border: none;
    outline: none;
    box-sizing: border-box;
    height: 100%;
  }

  /* Стилізація іконки календаря */
  .filter-item input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(84%) sepia(11%) saturate(749%) hue-rotate(160deg) brightness(95%) contrast(93%);
    cursor: pointer;
  }

  /* Вертикальні роздільники */
  .filter-separator {
    width: 2px;
    height: 60%;
    background-color: #0077B6;
  }

  /* Кнопка "Знайти" */
  .filter-button {
    font-family: "Noto Serif", serif;
    font-weight: 300;
    font-size: 20px;
    background-color: #03045E;
    color: #CAF0FB;
    padding: 0 25px;
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
