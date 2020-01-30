import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    Token: localStorage.getItem('token')
  },
  mutations: {

  }

})


export default store
