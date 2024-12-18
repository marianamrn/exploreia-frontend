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
      <!-- Блоки "Де?", "Для кого?", "Чому?" -->
      <div class="info-blocks">
        <div class="info-block">
          <h2 class="title">Де?</h2>
          <p v-for="(line, index) in splitText(whereTo)" :key="index" class="text">
            <CheckCircleIcon v-if="index !== 0" class="icon filled" />
            {{ line }}
          </p>
        </div>

        <div class="info-block">
          <h2 class="title">Для кого?</h2>
          <p v-for="(line, index) in splitText(forWhom)" :key="index" class="text">
            <CheckCircleIcon v-if="index !== 0" class="icon filled" />
            {{ line }}
          </p>
        </div>

        <div class="info-block">
          <h2 class="title">Чому?</h2>
          <p v-for="(line, index) in splitText(whyGo)" :key="index" class="text">
            <CheckCircleIcon v-if="index !== 0" class="icon filled" />
            {{ line }}
          </p>
        </div>
      </div>

      <!-- Додаткові блоки інформації (Ласкаво просимо, Включено, Цікаві факти) -->
      <div class="extra-info">
        <div class="left-column">
          <div v-if="welcomeTourPhoto" class="section">
            <h2 class="title">Ласкаво просимо у {{ tour.title }}!</h2>
            <p>{{ description }}</p>
            <img :src="welcomeTourPhoto.image_path" :alt="welcomeTourPhoto.alt_text" class="welcome-photo" />
          </div>

          <div v-if="includes" class="section">
            <h2 class="title">Екскурсії у {{ tour.title }} включають</h2>
            <ul>
              <li v-for="(item, index) in splitText(includes)" :key="index">
                <CheckCircleIcon class="icon" /> {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <div class="right-column">
          <!-- Картки ShortTourInfo -->
          <ShortTourInfo
            :durationDays="tour.duration_days"
            :shortInfoTime="tour.short_info_time"
            :price="tour.price"
            :shortInfoPrice="tour.short_info_price"
            :peopleLimit="tour.people_limit"
            :shortInfoPeople="tour.short_info_people"
            :discount="tour.discount"
            :shortInfoDiscount="tour.short_info_discount"
          />

          <div v-if="facts" class="section facts-section">
            <h2 class="title">Цікаві факти про {{ tour.title }}:</h2>
            <p v-for="(line, index) in splitText(facts)" :key="index">
              <CheckCircleIcon class="icon" /> {{ line }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Кнопка "Бронювати тур" -->
    <div class="book-tour-button-container">
      <button class="book-tour-button">
        Бронювати тур
      </button>
    </div>

    <TourCarousel :tours="similarTours" />
  </div>
  <p v-else>Завантаження деталей туру...</p>
</template>

<script>
import axios from "axios";
import Carousel from "@/components/TourImagesCarousel.vue";
import ShortTourInfo from "@/components/ShortTourInfo.vue";
import TourCarousel from "@/components/TourCarousel.vue";
import { CheckCircleIcon } from '@heroicons/vue/24/outline';

export default {
  name: "TourDetail",
  components: {
    Carousel,
    CheckCircleIcon,
    ShortTourInfo,
    TourCarousel,
  },
  data() {
    return {
      tour: null,
      images: [],
      bannerImage: null,
      whereTo: null,
      forWhom: null,
      whyGo: null,
      description: null,
      includes: null,
      facts: null,
      welcomeTourPhoto: null,
      similarTours: [],
    };
  },
  mounted() {
    const tourId = this.$route.params.id;
    this.fetchTourDetails(tourId);
    this.fetchSimilarTours(tourId);
  },
  methods: {
    async fetchTourDetails(tourId) {
      try {
        const baseURL = `${window.location.protocol}//${window.location.hostname}`;
        const tourResponse = await axios.get(
          `${baseURL}/exploreia-backend/getTourDetails.php?id=${tourId}`
        );
        console.log("Tour data:", tourResponse.data);

        this.tour = tourResponse.data.tour;
        this.images = tourResponse.data.images;
        this.bannerImage = tourResponse.data.banner;
        this.whereTo = tourResponse.data.where_to;
        this.forWhom = tourResponse.data.for_whom;
        this.whyGo = tourResponse.data.why_go;
        this.description = tourResponse.data.description;
        this.includes = tourResponse.data.includes;
        this.facts = tourResponse.data.facts;
        this.welcomeTourPhoto = tourResponse.data.welcomeTourPhoto;
      } catch (err) {
        console.error("Помилка при завантаженні деталей туру", err);
      }
    },

    async fetchSimilarTours(tourId) {
      try {
        const baseURL = `${window.location.protocol}//${window.location.hostname}`;
        const response = await axios.get(`${baseURL}/exploreia-backend/getSimilarTours.php?tourId=${tourId}`);
        this.similarTours = response.data;
      } catch (err) {
        console.error("Помилка при завантаженні подібних турів:", err);
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
  padding: 0;
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
  margin-top: 8%;
  padding: 0 2%;
}

.title {
  font-family: 'Ermilov', sans-serif;
  font-size: 32px;
  color: #0077b6;
  margin-bottom: 10px;
  text-align: left;
  max-width: 100%;
}

.text {
  font-family: 'Noto Serif', serif;
  font-weight: 100;
  color: #CAF0FB;
  font-size: 16px;
  margin: 5px 0;
  text-align: justify;
  max-width: 100%;
  margin-right: auto;
}

.info-blocks {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 2%;
  margin-right: 2%;
}

.info-block {
  width: 28%;
  margin-bottom: 20px;
}

.info-block p {
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

.extra-info {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
  max-width: 96%;
  margin-left: 2%;
  margin-right: 2%;
  flex-wrap: wrap;
}

.extra-info .left-column,
.extra-info .right-column {
  width: 45%;
  padding: 0;
}

.extra-info h2 {
  font-family: 'Ermilov', sans-serif;
  font-size: 32px;
  color: #0077b6;
  margin-bottom: 15px;
}

.extra-info p {
  font-family: 'Noto Serif', serif;
  font-size: 16px;
  font-weight: 100;
  color: #CAF0FB;
  text-align: justify;
  line-height: 1.5;
}

.extra-info ul {
  list-style: none;
  padding: 0;
}

.extra-info li {
  font-family: 'Noto Serif', serif;
  font-size: 16px;
  font-weight: 100;
  color: #CAF0FB;
  line-height: 1.5;
  display: flex;
  align-items: center;
}

.extra-info .icon {
  margin-right: 8px;
  color: #0077b6;
  width: 16px;
  height: 16px;
}

.welcome-photo {
  width: 100%;
  height: auto;
  margin-top: 10px;
}

@media (max-width: 900px) {
  .extra-info .left-column,
  .extra-info .right-column {
    width: 100%;
    margin-bottom: 20px;
  }
}

.book-tour-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.book-tour-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 240px;
  height: 56px;
  background-color: #0077B6;
  color: #CAF0FB;
  font-size: 18px;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.book-tour-button:hover {
  background-color: transparent;
  border: 2px solid #0077B6;
}
</style>
