<template>
  <nav>
    <div class="nav-wrapper">
      <div class="logo">
        <div class="logo-container">
          <img src="@/assets/images/logo.png" alt="Logo">
          <h1>Exploreia</h1>
        </div>
      </div>
      <ul class="nav-menu">
        <li><a href="#">Про нас</a></li>
        <li><a href="#">Тури</a></li>
        <li><a href="#">Місцини</a></li>
        <li><a href="#">Відгуки</a></li>
      </ul>
      <div class="nav-icons">
        <a href="#">
          <GlobeAltIcon class="icon" />
        </a>
        <a href="#">
          <PhoneIcon class="icon" />
        </a>
        <a href="#">
          <UserCircleIcon class="icon" />
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import { GlobeAltIcon, PhoneIcon, UserCircleIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'Navigation',
  components: {
    GlobeAltIcon,
    PhoneIcon,
    UserCircleIcon,
  },
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
}

nav {
  background-color: #03045E;
  color: #CAF0FB;
}

.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; 
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo img {
  height: 70px;
  margin: 0;
}

.logo h1 {
  font-family: 'Major Mono Display', monospace;
  font-size: 16px;
  font-weight: 400; 
  color: #CAF0FB;
  margin: 0; 
  line-height: 1;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0; 
  padding: 0; 
}

.nav-menu li {
  margin-right: 20px; 
}

.nav-menu li a {
  color: #CAF0FB;
  text-decoration: none;
  font-family: 'Noto Serif', serif;
  font-size: 16px;
}

.nav-icons {
  display: flex;
  align-items: center;
  margin-right: 4%;
}

.nav-icons a {
  color: #CAF0FB;
  margin-left: 20px; 
}

.icon {
  height: 24px;
  width: 24px;
  color: #CAF0FB;
}
</style>
