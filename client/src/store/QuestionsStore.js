import { QuestionsResource } from './AxiosService'
import { toastError } from "@bcwdev/quickvue"

export default {
  state: {
    questions: [],
    singleQuestion: {}
  },
  mutations: {
    setSingleQuestion(state, singleQuestion) {
      state.singleQuestion = singleQuestion
    },
    addQuestion(state, question) {
      state.questions.push(question)
    },
    setQuestions(state, questions) {
      state.questions = questions
    },
    deleteQuestion(state, id) {
      let index = state.questions.findIndex(q => q.id == id)
      state.questions.splice(index, 1)
    },
    setOption(state, option) {
      state.singleQuestion.options.push(option)
    },
    removeOption(state, id) {
      let optionToRemove = state.singleQuestion.options.findIndex(o => o._id == id)
      state.singleQuestion.options.splice(optionToRemove, 1)
    }
  },
  actions: {
    async createQuestion({ commit, dispatch }, payload) {
      try {
        let question = await QuestionsResource.post(payload)
        commit("addQuestion", question)
      } catch (error) {
        console.error(error)
        toastError(error.response.data.error)
      }
    },
    async getPollQuestions({ commit, dispatch }, pollId) {
      try {
        let questions = await QuestionsResource.get(`/poll/` + pollId)
        commit("setQuestions", questions)
      } catch (error) {
        console.error(error)
        toastError(error.response.data.error)
      }
    },
    async deleteQuestion({ commit, dispatch }, questionId) {
      try {
        await QuestionsResource.delete(questionId)
        commit('deleteQuestion', questionId)
      } catch (error) {
        console.error(error)
        toastError(error.response.data.error)
      }
    },
    async getSingleQuestion({ commit, dispatch }, questionId) {
      try {
        let question = await QuestionsResource.get(questionId)
        commit('setSingleQuestion', question)
      } catch (error) {
        console.error(error)
        toastError(error.response.data.error)
      }
    },
    async editQuestion({ commit, dispatch }, payload) {
      try {
        await QuestionsResource.put(payload)
      } catch (error) {
        console.error(error)
        toastError(error.response.data.error)
      }
    },
    async addOption({ commit, dispatch }, option) {
      commit('setOption', option)
    },
    async removeOption({ commit, dispatch }, payload) {
      try {
        await QuestionsResource.put(payload)
        commit('removeOption', payload.optId)
      } catch (error) {
        console.error(error)
        toastError(error.response.data.error)
      }
    }
  }
}