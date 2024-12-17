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
      <!-- Заголовки та пункти -->
      <div class="columns">
        <div v-if="whereTo" class="column">
          <h2 class="title">Де?</h2>
          <p v-for="(line, index) in splitText(whereTo)" :key="index" class="text">
            <CheckCircleIcon v-if="index !== 0" class="icon filled" />
            {{ line }}
          </p>
        </div>

        <div v-if="forWhom" class="column">
          <h2 class="title">Для кого?</h2>
          <p v-for="(line, index) in splitText(forWhom)" :key="index" class="text">
            <CheckCircleIcon v-if="index !== 0" class="icon filled" />
            {{ line }}
          </p>
        </div>

        <div v-if="whyGo" class="column">
          <h2 class="title">Чому?</h2>
          <p v-for="(line, index) in splitText(whyGo)" :key="index" class="text">
            <CheckCircleIcon v-if="index !== 0" class="icon filled" />
            {{ line }}
          </p>
        </div>
      </div>

      <!-- Перевірка на відсутність даних -->
      <p v-if="!whereTo">Дані для "Де?" відсутні.</p>
      <p v-if="!forWhom">Дані для "Для кого?" відсутні.</p>
      <p v-if="!whyGo">Дані для "Чому?" відсутні.</p>
    </div>
  </div>
  <p v-else>Завантаження деталей туру...</p>
</template>

<script>
import axios from "axios";
import Carousel from "@/components/TourImagesCarousel.vue";
import { CheckCircleIcon } from '@heroicons/vue/24/outline'; // Імпорт іконки

export default {
  name: "TourDetail",
  components: {
    Carousel,
    CheckCircleIcon,
  },
  data() {
    return {
      tour: null,
      images: [],
      bannerImage: null,
      whereTo: null,
      forWhom: null,
      whyGo: null,
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
        console.log('Tour data:', tourResponse.data); // Логування даних для перевірки
        this.tour = tourResponse.data.tour;
        this.images = tourResponse.data.images;
        this.bannerImage = tourResponse.data.banner;
        this.whereTo = tourResponse.data.where_to;
        this.forWhom = tourResponse.data.for_whom;
        this.whyGo = tourResponse.data.why_go;
      } catch (err) {
        console.error("Помилка при завантаженні деталей туру", err);
      }
    },

    splitText(text) {
      return text ? text.split("\n").map(line => line.trim()).filter(line => line.length > 0) : [];
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

    .title {
    font-family: 'Ermilov', sans-serif;
    font-size: 32px;
    color: #0077b6;
    margin-bottom: 10px;
    text-align: left;
    max-width: 80%;
    margin-left: 0;
    }

    .text {
    font-family: 'Noto Serif', serif;
    font-weight: 100;
    color: #CAF0FB;
    font-size: 16px;
    margin: 5px 0;
    text-align: justify;
    max-width: 80%;
    margin-left: 0;
    margin-right: auto;
    }

    .column p {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    }

    .icon {
    margin-right: 10px;
    color: #0077b6;
    width: 16px;
    height: 16px;
    }

    .columns {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    }

    .column {
    flex: 1;
    padding: 0 2%;
    width: calc(33.33% - 4%);
    }

    .column h2 {
    margin-top: 0;
    color: #0077b6;
    font-size: 32px;
    text-align: left;
    max-width: 80%;
    margin-left: 0;
    }

    /* Респонсивність */
    @media (max-width: 400px) {
    .columns {
        flex-direction: column;
    }
    }
</style>
