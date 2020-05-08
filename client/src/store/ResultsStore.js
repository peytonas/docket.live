import { ResultsResource } from './AxiosService'
import { toastError } from "@bcwdev/quickvue"

export default {
  state: {
    results: [],
    singleResult: {
      pollSnapshot: {
        Questions: []
      },
      responses: [],
      participants: []
    }
  },
  mutations: {
    setResults(state, results) {
      state.results = results
    },
    addResult(state, result) {
      state.results.push(result)
    },
    deleteResult(state, id) {
      let index = state.results.findIndex(r => r.id == id)
      state.results.splice(index, 1)
    },
    setSingleResult(state, singleResult) {
      state.singleResult = singleResult
    }
  },
  actions: {
    async getResults({ commit, dispatch }, pollId) {
      try {
        let results = await ResultsResource.get(`/poll/` + pollId)
        commit('setResults', results)
      } catch (error) {
        console.error(error)
        toastError(error.response.data.error)
      }
    },
    async getSingleResult({ commit, dispatch }, resultId) {
      try {
        let result = await ResultsResource.get(resultId)
        commit('setSingleResult', result)
      } catch (error) {
        console.error(error)
        toastError(error.response.data.error)
      }
    },
    async editResult({ commit, dispatch }, payload) {
      try {
        await ResultsResource.put(payload)
      } catch (error) {
        console.error(error)
        toastError(error.response.data.error)
      }
    },
    async deleteResult({ commit, dispatch }, resultId) {
      try {
        await ResultsResource.delete(resultId)
        commit('deleteResult', resultId)
      } catch (error) {
        console.error(error)
        toastError(error.response.data.error)
      }
    }
  }
}