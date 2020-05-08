<template>
  <div class="questionComponent col-12 d-flex justify-content-center m-2">
    <div class="card justify-content-center">
      <div class="question-title">{{questionProp.body}}</div>
      <div class="question-actions">
        <button class="btn fab btn-danger" @click="deleteQuestion()" title="delete question">
          <i class="fas fa-fw fa-trash-alt"></i>
        </button>
        <button class="btn fab btn-primary mt-2" @click="selectQuestion(questionProp.id)">
          <i class="fas fa-fw fa-edit" title="edit question"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationService from "../NotificationService";
import router from "../router";
export default {
  name: "questionComponent",
  data() {
    return {};
  },
  computed: {},
  methods: {
    async deleteQuestion() {
      if (await NotificationService.confirmAction()) {
        this.$store.dispatch("deleteQuestion", this.questionProp._id);
      }
    },
    selectQuestion(questionId) {
      router.push({
        name: "account.pollId.question.id",
        params: { pollId: this.questionProp.poll, id: this.questionProp.id }
      });
    }
  },
  props: ["questionProp"]
};
</script>

<style scoped>
.card {
  width: 90%;
  height: 20vh;
  position: relative;
}

.question-actions {
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

.question-title {
  font-size: 3rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  padding: 1rem;
  overflow: hidden;
}
</style>