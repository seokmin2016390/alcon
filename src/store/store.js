import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    common
  }
})
