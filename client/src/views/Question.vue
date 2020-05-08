<template>
  <div class="question container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 time">
        <h3
          contenteditable="true"
          class="edit-question"
          v-text="this.$store.state.QuestionsStore.singleQuestion.time"
          @keydown.enter="endEdit"
        ></h3>
      </div>
      <div class="timer-text col-2 mt-2">Adjust Time/Question</div>
    </div>
    <div class="row justify-content-center">
      <div class="col-11 card d-flex justify-content-center mx-auto mt-2">
        <div class="question-title">{{this.$store.state.QuestionsStore.singleQuestion.body}}</div>
        <div class="row justify-content-center">
          <OptionComponent
            v-for="option in this.$store.state.QuestionsStore.singleQuestion.options"
            :key="option._id"
            :optionProp="option"
          />
          <div class="question-actions">
            <button
              title="add option"
              class="btn fab btn-primary"
              data-toggle="modal"
              data-target="#AddOptionModal"
              v-if="options < 4"
            >
              <i class="fas fa-fw fa-plus-square"></i>
            </button>
            <AddOptionModal />
            <button class="btn fab btn-danger mt-2">
              <i class="fas fa-fw fa-times-circle"></i>
            </button>
            <button
              title="save question/options"
              class="btn fab btn-success mt-2"
              v-if="options >= 2"
              @click="editQuestion()"
            >
              <i class="fas fa-fw fa-check-square"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NotificationService from "../NotificationService";
import OptionComponent from "../components/OptionComponent";
import AddOptionModal from "../components/AddOptionModal";
export default {
  name: "question",
  data() {
    return {};
  },
  computed: {
    question() {
      return this.$store.state.QuestionsStore.singleQuestion;
    },
    options() {
      return this.$store.state.QuestionsStore.singleQuestion.options.length;
    }
  },
  methods: {
    getSingleQuestion() {
      this.$store.dispatch("getSingleQuestion", this.$route.params.id);
    },
    /**
     *@param {evt} keydown enter triggers event to edit poll name
     */
    endEdit(evt) {
      var src = evt.target.innerText;
      this.$store.state.QuestionsStore.singleQuestion.time = src;
      this.editQuestion();
    },
    editQuestion() {
      this.$store.dispatch(
        "editQuestion",
        this.$store.state.QuestionsStore.singleQuestion
      );
    }
  },
  mounted() {
    this.getSingleQuestion();
  },
  components: { OptionComponent, AddOptionModal }
};
</script>

<style scoped>
.card {
  width: 90%;
  font-size: 3rem;
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
  cursor: pointer;
}
.meter {
  position: relative;
  height: 7px;
  background-color: #3ba5dc;
}

.meter > span {
  display: block;
  height: 100%;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
}

.timer-text {
  font-size: 0.25rem;
}

.time {
  font-size: 1.75rem;
  margin-bottom: -20px;
}
</style>