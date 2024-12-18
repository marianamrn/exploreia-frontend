<template>
  <div class="short-tour-info">
    <div class="info-card">
      <ClockIcon class="icon" />
      <div class="card-text">
        <p class="title">
          <span class="highlight">{{ durationDays }} дні</span>
          <span class="sub-text">туру</span>
        </p>
        <p class="description">{{ shortInfoTime }}</p>
      </div>
    </div>

    <div class="info-card">
      <CurrencyDollarIcon class="icon" />
      <div class="card-text">
        <p class="title">
          <span class="highlight">{{ price }} грн</span>
          <span class="sub-text">на особу</span>
        </p>
        <p class="description">{{ shortInfoPrice }}</p>
      </div>
    </div>

    <div class="info-card">
      <UserGroupIcon class="icon" />
      <div class="card-text">
        <p class="title">
          <span class="highlight">{{ peopleLimit }}</span>
          <span class="sub-text">людей</span>
        </p>
        <p class="description">{{ shortInfoPeople }}</p>
      </div>
    </div>

    <div class="info-card">
      <TagIcon class="icon" />
      <div class="card-text">
        <p class="title">
          <span class="highlight">{{ discount }}%</span>
          <span class="sub-text">знижка</span>
        </p>
        <p class="description">{{ shortInfoDiscount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ClockIcon, CurrencyDollarIcon, UserGroupIcon, TagIcon } from '@heroicons/vue/24/outline';

export default {
  name: "ShortTourInfo",
  props: {
    durationDays: Number,
    shortInfoTime: String,
    price: Number,
    shortInfoPrice: String,
    peopleLimit: String,
    shortInfoPeople: String,
    discount: Number,
    shortInfoDiscount: String
  },
  components: {
    ClockIcon,
    CurrencyDollarIcon,
    UserGroupIcon,
    TagIcon
  }
};
</script>

<style scoped>
.short-tour-info {
  display: grid;
  grid-template-columns: repeat(2, 46%);
  gap: 48px;
  margin-top: 5%;
}

.info-card {
  width: 255px;
  height: 150px;
  background-color: #404347;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.icon {
  width: 30px;
  height: 30px;
  color: #CAF0FB;
  margin-bottom: 10px;
}

.card-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.title {
  font-family: 'Ermilov', sans-serif;
  font-size: 20px;
  margin: 0;
}

.highlight {
  color: #0077B6;
  font-weight: bold;
}

.sub-text {
  color: #CAF0FB;
  margin-left: 5px;
}

.description {
  font-family: 'Noto Serif', serif;
  font-size: 14px;
  font-weight: 100;
  color: #CAF0FB;
  margin-top: 5px;
}
</style>