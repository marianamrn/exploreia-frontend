<template>
  <div class="home-cover">
    <div class="text-overlay">
      <h1>
        “Подорожуй. Дивуйся.
      </h1>
      <h2>
        <span class="line1">Закохуйся</span>
        <br />
        <span class="line2">в Україну!”</span>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style>
.home-cover {
  position: relative;
  height: 100vh;
  background: url('@/assets/images/home-bg.png') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-overlay {
  text-align: center;
  color: #CAF0FB;
  font-family: 'Ermilov', sans-serif;
}

.text-overlay h1 {
  font-size: 3.5rem;
  font-weight: bold;
  margin: 0;
}

.text-overlay h2 {
  font-size: 3rem;
  font-weight: bold;
  margin-top: 0.5rem;
  line-height: 1.2;
}

.text-overlay .line1 {
  display: inline-block;
  background-color: #0077B6; 
  color: white;
  padding: 0.2rem 1rem;
  position: relative;
  left: -12%;
}

.text-overlay .line2 {
  display: inline-block;
  background-color: #03045E; 
  color: #CAF0FB;
  padding: 0.2rem 1rem;
  position: relative;
  top: 10%; 
  left: 14%; 
}
</style>
