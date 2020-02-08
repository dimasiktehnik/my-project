<template>
  <div class="weather-city-info">
    <div class="flex-container weather-city-info__main">
      <div>
        <div class="weather-city-info__temp">
          {{ getCelsiumTemp(currentCityData.main.temp) }}
        </div>
        <h2 class="weather-city-info__title">
          {{ currentCityData.name }}
        </h2>
      </div>
      <div class="weather-city-info__date">
        {{ date }}
      </div>
    </div>

    <div class="weather-city-info__extra">
      <div class="flex-container weather-city-info__extra-temp">
        <div class="weather-city-info__temp">
          MIN
          <div class="weather-city-info__temp-number">
            {{ getCelsiumTemp(currentCityData.main.temp_min) }}
          </div>
        </div>
        <div class="weather-city-info__temp">
          MAX
          <div class="weather-city-info__temp-number">
            {{ getCelsiumTemp(currentCityData.main.temp_max) }}
          </div>
        </div>
      </div>

      <div class="weather-city-info__specific">
        <div class="flex-container">
          <div class="weather-city-info__specific-title">clouds</div>
          <div class="weather-city-info__specific-info">
            {{ currentCityData.clouds.all }} %
          </div>
        </div>
        <div class="flex-container">
          <div class="weather-city-info__specific-title">wind</div>
          <div class="weather-city-info__specific-info">
            {{ currentCityData.wind.speed }} m/s
          </div>
        </div>
        <div class="flex-container">
          <div class="weather-city-info__specific-title">feels like</div>
          <div class="weather-city-info__specific-info">
            {{ getCelsiumTemp(currentCityData.main.feels_like) }}
          </div>
        </div>
        <div class="flex-container">
          <div class="weather-city-info__specific-title">pressure</div>
          <div class="weather-city-info__specific-info">
            {{ currentCityData.main.pressure }} mbar
          </div>
        </div>
        <div class="flex-container">
          <div class="weather-city-info__specific-title">humidity</div>
          <div class="weather-city-info__specific-info">
            {{ currentCityData.main.humidity }} %
          </div>
        </div>
      </div>

      <div
        class="weather-city-info__update"
        @click="updateInformation($route.params.name)"
      >
        update information
      </div>

      <div class="weather-city-info__update" @click="backToList">
        back to list
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import moment from "moment";

export default {
  mounted() {
    const currentCityName = this.$route.params.name;

    if (!this.currentCityData.length) {
      this.updateInformation(currentCityName);
    }
  },
  computed: {
    ...mapState(["currentCityData", "citiesList"]),
    date() {
      return moment().format("MMM Do");
    }
  },
  methods: {
    ...mapMutations(["updateState", "addCityToState"]),
    getWeatherIcon(iconId) {
      return `http://openweathermap.org/img/wn/${iconId}@2x.png`;
    },
    getCelsiumTemp(kelvinDegrees) {
      const currentTemp = (kelvinDegrees - 273.15).toFixed(0);

      return currentTemp > 0 ? `+${currentTemp}°` : `${currentTemp}°`;
    },
    updateInformation(currentCityName) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${currentCityName}&appid=6f55c5449f0073ab9ad86396396a4bc5`
        )
        .then(response => {
          this.updateState({
            currentCityData: response.data
          });
        });
    },
    backToList() {
      this.$router.push({
        name: "TheWeather",
        params: { name: "/" }
      });
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

.weather-city-info {
  width: 80%;
  background-image: $cardBackground;
  border-radius: 8px;
  color: #fff;
  padding: 16px;

  &__main {
    justify-content: space-around;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 1px solid #fff;
  }

  &__specific {
    margin-bottom: 24px;
  }

  &__specific-title {
    width: 120px;
    margin-bottom: 8px;
  }

  &__title {
    font-size: 24px;
    margin-bottom: 12px;
  }

  &__temp {
    font-size: 32px;
  }

  &__date {
    margin-bottom: 16px;
    font-size: 20px;
    letter-spacing: 1.2px;
  }

  &__extra {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__extra-temp {
    justify-content: space-around;
    width: 100%;
    margin-bottom: 16px;
  }

  &__temp-number {
    margin-top: 12px;
  }

  &__update {
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      color: #ccc;
    }
  }
}
</style>
