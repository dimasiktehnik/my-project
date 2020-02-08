export default {
  addCityToState(state, city) {
    state.citiesList.push(city);
  },
  deleteCityFromState(state, data) {
    state.citiesList = state.citiesList.filter(city => city.data.id !== data.cityId);
  },
  updateState(state, data) {
    Object.assign(state, data);
  }
}