import Vue from "vue"
import { toastError } from "@bcwdev/quickvue"
import { DynamicResource } from './AxiosService'
import PollsStore from "./PollsStore"

export default {
  mutations: {
    setPollCollabs(state, collabs) {
      Vue.set(PollsStore.state.singlePoll, "collaborators", collabs)
    },
    removeCollab(state, collabId) {
      let collabs = PollsStore.state.singlePoll.collaborators.filter(c => c.id != collabId)
      Vue.set(PollsStore.state.singlePoll, "collaborators", collabs)
    }
  },
  actions: {
    async addCollaboratorByEmail({ commit, dispatch }, payload) {
      try {
        let resource = DynamicResource("api/polls/" + payload.pollId)
        let poll = await resource.put({ email: payload.email, id: "collabs" })
        commit('setPollCollabs', poll)
      } catch (error) {
        toastError(error.response.data.error)
      }
    },
    async removeCollab({ commit, dispatch }, payload) {
      try {
        let resource = DynamicResource("api/polls/" + payload.pollId)
        let poll = await resource.put({ ...payload, id: "removeCollab" })
        if (poll) {
          commit('removeCollab', payload.collabId)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}