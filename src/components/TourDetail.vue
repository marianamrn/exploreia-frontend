<template>
  <div class="tour-detail-container" v-if="tour">
    <!-- Обкладинка сторінки -->
    <div
      class="banner"
      v-if="bannerImage"
      :style="{ backgroundImage: `url(${bannerImage})` }"
    ></div>

    <!-- Карусель поверх обкладинки -->
    <Carousel :images="images" />

    <!-- Інформація про тур -->
    <div class="tour-info">
      <h1>{{ tour.title }}</h1>
      <p><strong>Локація:</strong> {{ tour.destination_location }}</p>
      <p><strong>Тривалість:</strong> {{ tour.duration_days }} днів</p>
      <p><strong>Ціна:</strong> {{ tour.price }} грн</p>
      <p><strong>Опис:</strong> {{ tour.description }}</p>
    </div>
  </div>
  <p v-else>Завантаження деталей туру...</p>
</template>

<script>
import axios from "axios";
import Carousel from "@/components/TourImagesCarousel.vue";

export default {
  name: "TourDetail",
  components: {
    Carousel,
  },
  data() {
    return {
      tour: null,
      images: [],
      bannerImage: null,
    };
  },
  mounted() {
    const tourId = this.$route.params.id;
    this.fetchTourDetails(tourId);
  },
  methods: {
    async fetchTourDetails(tourId) {
      try {
        const baseURL = `${window.location.protocol}//${window.location.hostname}`;
        const tourResponse = await axios.get(
          `${baseURL}/exploreia-backend/getTourDetails.php?id=${tourId}`
        );
        this.tour = tourResponse.data.tour;
        this.images = tourResponse.data.images;
        this.bannerImage = tourResponse.data.banner;
      } catch (err) {
        console.error("Помилка при завантаженні деталей туру", err);
      }
    },
  },
};
</script>

<style scoped>
.tour-detail-container {
  box-sizing: border-box;
}

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

.tour-info {
  padding: 20px;
  border-radius: 8px;
  margin-top: 6%;
}

.tour-info h1 {
  color: #0077b6;
}

.tour-info p {
  margin: 8px 0;
}
</style>
