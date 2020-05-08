<template>
  <div
    class="responseComponent row justify-content-left"
    :style="{order: sortPointsAsc ? total : 0 || sortPointsDesc ? -total : 0 || sortAnswersAsc ? singlePoints : 0 || sortAnswersDesc ? -singlePoints : 0}"
  >
    <div class="col border-right">{{participant.name}}</div>
    <div
      class="col border-right text-white"
      v-for="response in responses"
      :style="{'background-color': heatmap ? response.option.color : 'inherit'}"
      :key="response.id"
    >{{response.option.body}}</div>
    <div class="col text-center" :style="{'color': score ? '#3aa3d8' : 'inherit'}">{{total}}</div>
  </div>
</template>
<script>
import NotificationService from "../NotificationService";
export default {
  name: "responseComponent",
  computed: {
    responses() {
      return this.$store.state.ResultsStore.singleResult.responses.filter(
        r => r.participant == this.participant.name
      );
    },
    total() {
      return this.responses.reduce(
        (total, current) => total + current.option.points,
        0
      );
    },
    singleAnswer() {
      return this.responses.filter(r => r.questionId == this.qId);
    },
    singlePoints() {
      return this.singleAnswer[0].option.points;
    }
  },
  methods: {},
  mounted() {},
  props: [
    "participant",
    "heatmap",
    "score",
    "sortPointsAsc",
    "sortPointsDesc",
    "sortAnswersAsc",
    "sortAnswersDesc",
    "qId"
  ]
};
</script>
<style scoped>
.row {
  background-color: #3aa3d8;
  color: white;
}
.col {
  height: 48px;
  font-weight: bold;
  align-items: center;
  display: flex;
  justify-content: center;
  overflow: hidden;
}
</style>
//, order: sortAnswersAsc ? response.option.points : 0 || sortAnswersDesc ? -response.option.points : 0