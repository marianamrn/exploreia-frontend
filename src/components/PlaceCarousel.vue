<template>
  <div class="place-carousel">
    <button class="nav-arrow left" @click="prevSlide">&#10094;</button> 
    <div class="carousel-container">
      

      <div class="carousel-slide">
        <div v-if="currentPlace" class="slide-content">
          <!-- Фото місцини -->
          <div
            class="place-image"
            :style="{ backgroundImage: `url(${currentPlace.image_path})` }"
          >
            <div class="place-title-overlay">
              <h1 class="place-title">{{ currentPlace.name }}</h1>
              <div class="place-location">
                <MapPinIcon class="location-icon" />
                <span>{{ currentPlace.location_name }}</span>
              </div>
            </div>
          </div>

          <!-- Текстова панель -->
          <div class="text-panel">
            <h2 class="place-name">{{ currentPlace.name }}</h2>
            <p class="place-description">{{ currentPlace.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <button class="nav-arrow right" @click="nextSlide">&#10095;</button>
  </div>
</template>

<script>
import { MapPinIcon } from "@heroicons/vue/24/outline";

export default {
  props: {
    places: {
      type: Array,
      required: true,
    },
  },
  components: {
    MapPinIcon,
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    currentPlace() {
      return this.places[this.currentIndex];
    },
  },
  methods: {
    prevSlide() {
      this.currentIndex =
        this.currentIndex === 0 ? this.places.length - 1 : this.currentIndex - 1;
    },
    nextSlide() {
      this.currentIndex =
        this.currentIndex === this.places.length - 1 ? 0 : this.currentIndex + 1;
    },
  },
};
</script>

<style scoped>
.place-carousel {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  padding: 0 4%;
}

.carousel-container {
  display: flex;
  position: relative;
  max-width: 100%;
  width: 100%;
  overflow: hidden;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 40px;
  color: #0077B6;
  cursor: pointer;
  z-index: 10;
}

.nav-arrow.left {
  left: 10px;
}

.nav-arrow.right {
  right: 10px;
}

.carousel-slide {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}

.slide-content {
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 1400px;
  background-color: #404347;
  overflow: hidden;
}

.place-image {
  flex: 2;
  background-size: cover;
  background-position: center;
  position: relative;
  height: 500px;
}

.place-image::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.432);
  z-index: 1;
}

.place-title-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #CAF0FB;
  z-index: 2;
}

.place-title {
  font-size: 24px;
  font-family: 'Yeseva One', regular;
}

.place-location {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Noto Serif', serif;
  font-weight: 100;
  z-index: 2;
}

.location-icon {
  color: #0077B6;
  width: 20px;
  height: 20px;
  z-index: 2;
}

.text-panel {
  flex: 1;
  background-color: #404347;
  padding: 20px;
  color: #CAF0FB;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.place-name {
  font-size: 22px;
  font-weight: bold;
  color: #0077B6;
  font-family: 'Noto Serif', serif;
}

.place-description {
  font-size: 16px;
  line-height: 1.5;
  margin-top: 10px;
  color: #CAF0FB;
  font-family: 'Noto Serif', serif;
  font-weight: 100;
  text-align: justify;
}
</style>