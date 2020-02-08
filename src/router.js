import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/home",
      name: "Wrap",
      component: () => import("./Wrap.vue"),
      children: [
        {
          path: "/:name",
          name: "WeatherCityInfo",
          component: () => import("./components/WeatherCityInfo.vue")
        }
      ]
    },
    {
      path: "/",
      name: "TheWeather",
      component: () => import("./components/TheWeather.vue")
    }
  ]
});
