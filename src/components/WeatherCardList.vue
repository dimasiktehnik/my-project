<template>
  <div class="weather-card-list">
    <div v-for="city in citiesList" :key="city.data.id" class="weather-card">
      <div class="flex-container weather-card__title-container">
        <h2 class="weather-card__title">
          <span
            class="weather-card__title-city"
            @click="setCityNameToState(city)"
          >
            {{ city.data.name }}
          </span>
          /
          <span class="weather-card__title-country">{{
            city.data.sys.country
          }}</span>
        </h2>
        <div class="weather-card__remove" @click="removeCity(city.data.id)">
          &times;
        </div>
      </div>
      <div class="weather-card__hr" />
      <div class="flex-container justify-between align-center">
        <div class="weather-card__temp">
          {{ getCelsiumTemp(city.data.main.temp) }}
        </div>
        <div v-for="(weather, index) in city.data.weather" :key="index">
          <img :src="getWeatherIcon(weather.icon)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "WeatherCardList",

  data: () => ({
    currentCityName: ""
  }),

  mounted() {
    const citiesListFromCookie = JSON.parse(document.cookie);

    if (
      !this.citiesList.length ||
      this.citiesList.length !== citiesListFromCookie.length
    ) {
      this.updateState({
        citiesList: citiesListFromCookie
      });
    }
  },

  computed: {
    ...mapState(["citiesList", "currentCityData"])
  },

  methods: {
    ...mapMutations(["updateState", "deleteCityFromState"]),
    getCelsiumTemp(kelvinDegrees) {
      const currentTemp = (kelvinDegrees - 273.15).toFixed(0);

      return currentTemp > 0 ? `+${currentTemp}°` : `${currentTemp}°`;
    },
    getWeatherIcon(iconId) {
      return `http://openweathermap.org/img/wn/${iconId}@2x.png`;
    },
    setCityNameToState(cityData) {
      this.updateState({
        currentCityData: cityData
      });
      this.$router.push({
        name: "WeatherCityInfo",
        params: { name: cityData.data.name }
      });
    },
    removeCity(cityId) {
      this.deleteCityFromState({
        cityId
      });

      document.cookie = JSON.stringify(this.citiesList);
    }
  }
};
</script>

<style lang="scss">
$cardBackground: radial-gradient(
  circle at 10% 20%,
  rgb(0, 107, 141) 0%,
  rgb(1, 99, 130) 90%
);

.weather-card {
  width: 320px;
  // max-height: 165px;
  margin: 24px;
  padding: 16px;
  border-radius: 12px;
  box-sizing: border-box;
  background-image: $cardBackground;
  color: #fff;

  &__title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    margin: 0;
  }

  &__title-city {
    cursor: pointer;
  }

  &__title-country {
    font-weight: 300;
    text-transform: lowercase;
  }

  &__remove {
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      font-size: 24px;
      color: #f96868;
    }
  }

  &__hr {
    width: 40px;
    height: 2px;
    background: #fff;
  }

  &__temp {
    font-size: 44px;
    font-weight: 300;
  }
}
</style>
