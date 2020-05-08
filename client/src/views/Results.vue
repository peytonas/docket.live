<template>
  <div class="result container-fluid">
    <div class="row">
      <span class="poll-text text-left">
        <b>Poll:</b>
        {{poll.name}}
      </span>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 d-flex justify-content-center m-2">
        <div class="card justify-content-center">
          <span class="date-text text-left">
            <b>Date:</b>
            {{this.date}}
          </span>
          <div class="result-title">
            <b>{{result.name}}</b>
          </div>
          <div class="result-actions">
            <button class="btn fab btn-warning text-white">
              <i class="fas fa-fw fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <TableComponent />
  </div>
</template>
<script>
import NotificationService from "../NotificationService";
import TableComponent from "../components/TableComponent";
import moment from "moment";
export default {
  name: "result",
  data() {
    return {
      date: moment(
        this.$store.state.ResultsStore.singleResult.createdAt,
        "YYYY-MM-DD HH:mm"
      )
    };
  },
  computed: {
    result() {
      return this.$store.state.ResultsStore.singleResult;
    },
    poll() {
      return this.$store.state.PollsStore.singlePoll;
    }
  },
  methods: {
    getSingleResult() {
      this.$store.dispatch("getSingleResult", this.$route.params.id);
    },
    getSinglePoll() {
      this.$store.dispatch("getSinglePoll", this.$route.params.pollId);
    }
  },
  mounted() {
    this.getSingleResult();
    this.getSinglePoll();
  },
  components: { TableComponent }
};
</script>
<style scoped>
.card {
  width: 90%;
  font-size: 3rem;
}
.btn.fab {
  padding: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.result-title {
  font-size: 3rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  padding: 1rem;
  overflow: hidden;
  cursor: pointer;
}
.result-actions {
  position: absolute;
  right: -1rem;
  top: -1rem;
}
.poll-text {
  width: 90%;
  padding-left: 5.5rem;
  font-size: 0.75rem;
}
.date-text {
  width: 90%;
  padding-left: 0.5rem;
  font-size: 0.75rem;
}
table {
  font-family: arial, sans-serif;
  width: 100%;
}
</style>