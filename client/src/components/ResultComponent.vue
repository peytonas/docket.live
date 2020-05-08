<template>
  <div class="resultComponent col-12 d-flex justify-content-center m-2">
    <div class="card justify-content-center">
      <div class="result-actions">
        <button class="btn fab btn-danger" @click="deleteResult()" title="delete results">
          <i class="fas fa-fw fa-trash-alt"></i>
        </button>
        <button class="btn fab btn-primary mt-1" @click="selectResult()" title="delete results">
          <i class="fas fa-fw fa-align-left"></i>
        </button>
      </div>
      <span class="text-left ml-1">
        <div class="date-text">
          <b>Date:</b>
          {{this.date}}
        </div>
        <div class="date-text">
          <b>Participants:</b>
          {{resultProp.participants.length}}
        </div>
      </span>
      <div class="result-title text-left">
        <b>{{resultProp.name}}</b>
      </div>
    </div>
  </div>
</template>
<script>
import NotificationService from "../NotificationService";
import moment from "moment";
import router from "../router";
export default {
  name: "result",
  data() {
    return {
      date: moment(this.resultProp.createdAt, "YYYY-MM-DD HH:mm")
    };
  },
  methods: {
    selectResult(resultId) {
      router.push({
        name: "account.pollId.results.id",
        params: { pollId: this.resultProp.poll, id: this.resultProp.id }
      });
    },
    async deleteResult() {
      if (await NotificationService.confirmAction()) {
        this.$store.dispatch("deleteResult", this.resultProp._id);
      }
    }
  },
  props: ["resultProp"]
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

.result-title {
  font-size: 3rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  padding: 1rem;
  overflow: hidden;
}
.date-text {
  font-size: 0.25rem;
}
</style>