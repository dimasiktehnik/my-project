<template>
  <div class="flex-container weather-form">
    <input
      type="text"
      placeholder="example: Rio de Janeiro"
      v-model="addedCity"
      class="weather-form__input"
      @keyup.enter="getCity"
    />
    <button
      :disabled="isDisabledBtn"
      class="weather-form__btn"
      @click="getCity"
    >
      search
    </button>
  </div>
</template>
<script>
import axios from "axios";

import { mapMutations, mapState, mapGetters } from "vuex";

export default {
  name: "app",

  data: () => ({
    addedCity: ""
  }),

  mounted() {
    navigator.geolocation.getCurrentPosition(success => {
      this.geo = success;
    });
  },
  computed: {
    ...mapState(["citiesList"]),
    ...mapGetters(["names"]),
    isDisabledBtn() {
      return this.addedCity === "";
    }
  },
  methods: {
    ...mapMutations(["addCityToState", "deleteCityFromState"]),
    getCity() {
      if (this.addedCity !== "") {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.addedCity}&appid=6f55c5449f0073ab9ad86396396a4bc5`
          )
          .then(response => {
            const addedCityId = response.data.id;

            if (this.citiesList.every(item => item.data.id !== addedCityId)) {
              this.addCityToState({
                data: response.data
              });
            }

            document.cookie = JSON.stringify(this.citiesList);
          })
          .finally((this.addedCity = ""));
      }
    }
  }
};
</script>

<style lang="scss">
$lightGrey: #ccc;

.weather-form {
  display: flex;
  justify-content: center;

  &__input {
    padding: 6px;
    margin-right: 8px;
    border: 1px solid $lightGrey;
    border-radius: 4px;
    outline: none;

    &::placeholder {
      color: $lightGrey;
    }
  }

  &__btn {
    border: none;
    padding: 6px 16px;
    border-radius: 3px;
    color: #fff;
    background: #2de888;
    transition: 0.3s;
    cursor: pointer;

    &[disabled] {
      background: #ccc;
      cursor: default;
    }
  }
}
</style>
