import Vue from 'vue'
import Vuex from 'vuex'
import {toyStore} from './toy.store.js'
import {i18nService} from '../services/i18n.service.js'

import {main} from '../main.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang:'en'
  },
  getters:{
    lang(state){
      return state.lang
    },
    direction(state){
      if(state.lang==='he')return{direction:'rtl'}
        return{direction:'ltr'} 
    } 
  },
  mutations: {
    setLang(state, {lang}){
      i18nService.setLang(lang)
      state.lang = lang
    }
  },
  actions: {
  },
  modules: {
    toyStore
  }
})
