<template>
  <div class="stats container-fluid">
    <div class="row justify-content-center">
      <div class="col">{{this.question.body}}</div>
    </div>
    <ChartComponent />
  </div>
</template>
<script>
import ChartComponent from "../components/ChartComponent";
import NotificationService from "../NotificationService";

export default {
  name: "stats",
  computed: {
    question() {
      return this.$store.state.ResultsStore.singleResult.pollSnapshot.questions.find(
        q => q.id == this.$route.params.questionId
      );
    }
  },
  methods: {
    getSingleResult() {
      this.$store.dispatch("getSingleResult", this.$route.params.id);
    }
  },
  mounted() {
    this.getSingleResult();
  },
  components: { ChartComponent }
};
</script>
<style scoped>
</style>