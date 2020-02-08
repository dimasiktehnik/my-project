<template>
  <div>
    <weather-form></weather-form>
    <weather-card-list></weather-card-list>
  </div>
</template>

<script>
import WeatherCardList from "./WeatherCardList";
import WeatherForm from "./WeatherForm";
export default {
  name: "TheWeather",
  components: {
    WeatherForm,
    WeatherCardList
  }
};
</script>
