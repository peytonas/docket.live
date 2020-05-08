<template>
  <div class="optionComponent col-5 card bg-primary mx-auto mt-2 mb-2">
    <div contenteditable="true" class="option-title" @keydown.enter="endEdit">{{optionProp.body}}</div>
    <div class="option-actions">
      <button title="delete option" class="btn fab btn-danger mt-2" @click="removeOption()">
        <i class="fas fa-fw fa-times-circle"></i>
      </button>
    </div>
  </div>
</template>


<script>
import NotificationService from "../NotificationService";
import router from "../router";
export default {
  name: "optionComponent",
  data() {
    return {};
  },
  computed: {
    question() {
      return this.$store.state.QuestionsStore.singleQuestion;
    }
  },
  methods: {
    async removeOption() {
      if (await NotificationService.confirmAction()) {
        this.$store.dispatch("removeOption", this.question);
      }
    },
    endEdit(evt) {
      var src = evt.target.innerText;
      this.optionProp.body = src;
      this.editOption();
    },
    editOption() {
      this.$store.dispatch("editQuestion", this.question);
    }
  },
  components: {},
  props: ["optionProp"]
};
</script>


<style scoped>
.card {
  width: 90%;
  height: 10vh;
  position: relative;
}

.option-actions {
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

.option-title {
  font-size: 2rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  padding: 1rem;
  overflow: hidden;
  cursor: pointer;
}
</style>