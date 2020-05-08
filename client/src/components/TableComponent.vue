<template>
  <div id="responseTable" class="tableComponent container-fluid">
    <div class="responses-header">
      <div class="row">
        <button class="btn btn-danger text-white" @click="toggleHeatmap">
          <i class="fas fa-fire"></i>
        </button>
        <button class="btn btn-warning text-white ml-2" @click="toggleScore">
          <i class="fas fa-eye-slash"></i>
        </button>
      </div>
      <div class="row justify-content-left table align-items-center">
        <div class="col" @click="sortByName">
          <b>Participants</b>
        </div>
        <div
          class="col text-center th"
          v-for="question in questions"
          :questionProp="question"
          :key="question.id"
        >
          <b>{{question.body}}</b>
          <i class="fas fa-sort-down ml-2 mb-2" @click="sortByAnswerDesc(question.id)"></i>
          <i class="fas fa-sort-up ml-2 mt-1" @click="sortByAnswerAsc(question.id)"></i>
          <i class="fas fa-chart-bar ml-2 mb-2" @click="viewStats(question.id)"></i>
        </div>
        <div class="col">
          <b>Total Points</b>
          <i class="fas fa-sort-down ml-2 mb-2" @click="sortByPointsDesc"></i>
          <i class="fas fa-sort-up ml-2 mt-1" @click="sortByPointsAsc"></i>
        </div>
      </div>
    </div>
    <div class="responses d-flex flex-column">
      <ResponseComponent
        v-for="participant in participants"
        :participant="participant"
        :key="participant._id"
        class="td"
        :heatmap="heatmap"
        :score="score"
        :sortPointsAsc="sortPointsAsc"
        :sortPointsDesc="sortPointsDesc"
        :sortAnswersAsc="sortAnswersAsc"
        :sortAnswersDesc="sortAnswersDesc"
        :qId="qId"
      />
    </div>
  </div>
</template>
<script>
import ResponseComponent from "../components/ResponseComponent";
import NotificationService from "../NotificationService";
import router from "../router";
export default {
  name: "tableComponent",
  data() {
    return {
      heatmap: false,
      score: false,
      sortName: false,
      sortPointsAsc: false,
      sortPointsDesc: false,
      sortAnswersAsc: false,
      sortAnswersDesc: false,
      qId: ""
    };
  },
  computed: {
    questions() {
      return this.$store.state.ResultsStore.singleResult.pollSnapshot.questions;
    },
    responses() {
      return this.$store.state.ResultsStore.singleResult.responses;
    },
    participants() {
      return this.$store.state.ResultsStore.singleResult.participants;
    }
  },
  methods: {
    getSinglePoll() {
      this.$store.dispatch("getSinglePoll", this.$route.params.pollId);
      this.$store.dispatch("getPollQuestions", this.$route.params.pollId);
    },
    viewStats(id) {
      router.push({
        name: "results.stats",
        params: {
          resultId: this.$route.params.id,
          questionId: id
        }
      });
    },
    toggleHeatmap() {
      this.heatmap = !this.heatmap;
    },
    toggleScore() {
      this.score = !this.score;
    },
    sortByName() {
      this.sortName = !this.sortName;
      function compare(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }
      return this.participants.sort(compare);
    },
    sortByPointsAsc() {
      if ((this.sortPointsAsc = !this.sortPointsAsc)) {
        this.sortName = false;
        this.sortPointsDesc = false;
        this.sortAnswersAsc = false;
        this.sortAnswersDesc = false;
      }
    },
    sortByPointsDesc() {
      if ((this.sortPointsDesc = !this.sortPointsDesc)) {
        this.sortName = false;
        this.sortPointsAsc = false;
        this.sortAnswersAsc = false;
        this.sortAnswersDesc = false;
      }
    },
    sortByAnswerAsc(id) {
      this.qId = id;
      if ((this.sortAnswersAsc = !this.sortAnswersAsc)) {
        this.sortName = false;
        this.sortAnswersDesc = false;
        this.sortPointsAsc = false;
        this.sortPointsDesc = false;
      }
    },
    sortByAnswerDesc(id) {
      this.qId = id;
      if ((this.sortAnswersDesc = !this.sortAnswersDesc)) {
        this.sortName = false;
        this.sortAnswersAsc = false;
        this.sortPointsAsc = false;
        this.sortPointsDesc = false;
      }
    }
  },
  mounted() {
    this.getSinglePoll();
  },
  components: { ResponseComponent },
  props: []
};
</script>
<style scoped>
.row {
  margin: 0px;
}
.sort {
  font-size: 0.75rem;
}
.table {
  border-collapse: collapse;
  border: 1px solid #ffffff;
}
.td {
  text-align: left;
  padding: 5px;
  border: 1px solid #ffffff;
}
.col {
  height: 48px;
  background-color: #231e1f;
  color: white;
  border: 1px solid #ffffff;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
