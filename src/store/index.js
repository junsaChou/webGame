import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import tagsView from './modules/tagsView'
import calendar from './modules/calendar'
import getters from './getter'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    tagsView,
    calendar
  },
  getters
})

export default store
