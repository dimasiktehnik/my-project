import Vue from 'vue';
import Vuex from 'vuex';
import VueMask from 'v-mask'

import state from './state';
import mutations from './mutations';

Vue.use(Vuex);
Vue.use(VueMask);

export default new Vuex.Store({
  mutations,
  state,
})