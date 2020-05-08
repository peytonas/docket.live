<template>
  <div class="review container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 d-flex justify-content-center m-2">
        <div class="card justify-content-center">
          <div class="poll-title">
            <b>{{poll.name}}</b>
          </div>
          <div class="result-actions">
            <button class="btn fab btn-warning text-white">
              <i class="fas fa-fw fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <ResultComponent
      class="poll-title"
      title="view results"
      v-for="result in results"
      :key="result.poll.id"
      :resultProp="result"
    />
  </div>
</template>
<script>
import NotificationService from "../NotificationService";
import ResultComponent from "../components/ResultComponent";
import router from "../router";
export default {
  name: "review",
  computed: {
    poll() {
      return this.$store.state.PollsStore.singlePoll;
    },
    results() {
      return this.$store.state.ResultsStore.results;
    }
  },
  methods: {
    getSinglePoll() {
      this.$store.dispatch("getSinglePoll", this.$route.params.pollId);
    },
    getResults() {
      this.$store.dispatch("getResults", this.$route.params.pollId);
    }
  },
  mounted() {
    this.getSinglePoll();
    this.getResults();
  },
  components: { ResultComponent }
};
</script>
<style scoped>
.card {
  width: 90%;
  height: 20vh;
  position: relative;
}
.result-actions {
  position: absolute;
  right: -1rem;
  top: -1rem;
}
.btn.fab {
  padding: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.poll-title {
  font-size: 3rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  padding: 1rem;
  overflow: hidden;
}
</style>