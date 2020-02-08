<template>
  <div class="weather">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "wrap",

  async mounted() {
    navigator.geolocation.getCurrentPosition(success => {
      this.geo = success;
    });
  }
};
</script>

<style lang="scss">
body {
  font-family: Helvetica, Arial, sans-serif;
}

.weather {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
  margin: 0 auto;
  color: #333;
}

.flex-container {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.align-center {
  align-items: center;
}
</style>
