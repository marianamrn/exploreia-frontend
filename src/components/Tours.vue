<template>
  <div>
    <h1>Тури</h1>
    <p v-if="loading">Завантаження...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else>Назва туру: {{ tourTitle }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Tours',
  data() {
    return {
      tourTitle: '',
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchTour();
  },
  methods: {
    async fetchTour() {
      try {
        // Заміна localhost на IP-адресу сервера
        const response = await axios.get('http://192.168.0.100/exploreia-backend/getTour.php');
        this.tourTitle = response.data.title;
      } catch (err) {
        this.error = 'Помилка при завантаженні туру';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}
p {
  font-size: 18px;
}
</style>
