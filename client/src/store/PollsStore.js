import router from '../router'
import { PollsResource } from './AxiosService'
import { toastError } from "@bcwdev/quickvue"
import Poll from '../Models/Poll'

export default {
  state: {
    polls: [],
    singlePoll: {}
  },
  mutations: {
    setPolls(state, polls) {
      state.polls = polls
    },
    addPoll(state, poll) {
      state.polls.push(poll)
    },
    deletePoll(state, pollId) {
      let index = state.polls.findIndex(p => p.id == pollId)
      state.polls.splice(index, 1)
    },
    setSinglePoll(state, poll) {
      if (poll instanceof Poll) {
        state.singlePoll = poll
      }
    },
  },
  actions: {
    async getPolls({ commit, dispatch }) {
      try {
        let polls = await PollsResource.get()
        commit("setPolls", polls)
      } catch (error) {
        console.error(error)
        toastError(error.response.data.error)
      }
    },
    async createPoll({ commit, dispatch }, payload) {
      try {
        let poll = await PollsResource.post(payload)
        commit("addPoll", poll)
        // router.push({ name: "account.poll" })
      } catch (error) {
        console.error(error)
        toastError(error.response.data.error)
      }
    },
    async deletePoll({ commit, dispatch }, pollId) {
      try {
        await PollsResource.delete(pollId)
        commit('deletePoll', pollId);
        router.push({ name: "account.dashboard" });
      } catch (error) {
        console.error(error)
        toastError(error.response.data.error)
      }
    },
    async getSinglePoll({ commit, dispatch, rootState }, id) {
      try {
        commit('setSinglePoll', new Poll({}, rootState.user));
        let poll = await PollsResource.get(id)
        commit('setSinglePoll', new Poll(poll, rootState.user));
      } catch (error) {
        console.error(error)
        toastError(error.response.data.error)
      }
    },

    async editPoll({ commit, dispatch }, poll) {
      try {
        await PollsResource.put(poll)
      } catch (error) {
        console.error(error)
        toastError(error.response.data.error)
      }
    },
  }
}