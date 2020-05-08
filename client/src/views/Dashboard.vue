<template>
  <div class="dashboard container-fluid">
    <div class="row justify-content-center">
      <PollComponent v-for="poll in polls" :key="poll.id" :pollProp="poll" />

      <div class="pollComponent col-12 d-flex justify-content-center m-2">
        <form class="w-100 justify-content-center" @submit.prevent="createPoll">
          <input
            type="text"
            class="form-control col-12 card d-flex text-center mx-auto"
            placeholder="Enter Name of the Poll"
            v-model.trim="newPoll.name"
            required
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PollComponent from "../components/PollComponent";
export default {
  name: "dashboard",
  data() {
    return {
      newPoll: {}
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    polls() {
      return this.$store.state.PollsStore.polls;
    }
  },
  components: { PollComponent },
  methods: {
    getPolls() {
      this.$store.dispatch("getPolls", this.user.id);
    },
    createPoll() {
      this.$store.dispatch("createPoll", {
        name: this.newPoll.name
      });
      this.newPoll.name = "";
    }
    /**
     * @params
     *takes in an event frmo keydown enter to set new poll name
     */
    // endEdit(evt) {
    //   var src = evt.target.innerText;
    //   this.newPoll.name = src;
    //   this.createPoll();
    //   this.newPoll.name = "New Polls here";
    // }
  },
  mounted() {
    this.getPolls();
  }
};
</script>

<style>
input.card {
  width: 90%;
  height: 20vh;
  font-size: 3rem;
}
</style>
