import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import AuthService from '../AuthService'
import { toastError } from "@bcwdev/quickvue"
import Axios from 'axios'
import Poll from '../Models/Poll'
import CollabStore from './CollabStore.js'
import QuestionsStore from "./QuestionsStore.js"
import PollsStore from "./PollsStore.js"
import ResultsStore from "./ResultsStore.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    resetState(state, user) {
      state.user = {}
    },
  },
  actions: {
    //#region Account Register/Login/Logout
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds)
        commit('setUser', user)
        router.push({ name: "account.dashboard" })
      } catch (e) {
        toastError(e.message)
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds)
        commit('setUser', user)
        router.push({ name: "account.dashboard" })
      } catch (e) {
        toastError(e.message)
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout()
        if (!success) { }
        commit('resetState')
        router.push({ name: "login" })
      } catch (e) {
        toastError(e.message)
      }
    },
    //#endregion
  },
  modules: {
    QuestionsStore, PollsStore, CollabStore, ResultsStore
  }
})
