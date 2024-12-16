<template>
  <div class="carousel-wrapper">
    <button class="nav-arrow left" @click="prevImage">&#10094;</button>
    <div class="carousel">
      <div
        v-for="(image, index) in visibleImages"
        :key="index"
        class="carousel-item"
        :class="{ active: index === 1 }"
      >
        <img
          :src="image.image_path"
          :alt="image.alt_text"
          class="carousel-image"
        />
      </div>
    </div>
    <button class="nav-arrow right" @click="nextImage">&#10095;</button>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  props: {
    images: Array,
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    visibleImages() {
      const total = this.images.length;
      if (total < 3) return this.images;

      const prevIndex = (this.currentIndex - 1 + total) % total;
      const nextIndex = (this.currentIndex + 1) % total;

      return [
        this.images[prevIndex],
        this.images[this.currentIndex],
        this.images[nextIndex],
      ];
    },
  },
  methods: {
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevImage() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
  },
};
</script>

<style scoped>
.carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute; 
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  z-index: 10;
}

.nav-arrow {
  background: none;
  color: #0077b6;
  border: none;
  cursor: pointer;
  font-size: 48px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.nav-arrow.left {
  left: 2%;
}

.nav-arrow.right {
  right: 2%;
}

.carousel {
  display: flex;
  gap: 10px;
  width: 96%;
  justify-content: center;
  overflow: hidden;
}

.carousel-item {
  flex: 0 0 25%;
  transition: all 0.5s ease;
  transform: scale(0.8);
  position: relative;
}

.carousel-item::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.432);
  transition: background 0.8s ease;
}

.carousel-item.active::after {
  background: rgba(40, 42, 44, 0);
}

.carousel-item.active {
  flex: 0 0 45%;
  opacity: 1;
  transform: scale(1);
}

.carousel-image {
  width: 100%;
  height: 50vh;
  object-fit: cover;
}
</style>
