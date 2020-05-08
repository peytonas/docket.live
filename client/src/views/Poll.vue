<template>
  <div class="poll container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 d-flex">
        <div class="row d-flex">
          <div class="col position-absolute">
            <small>Collaborators</small>
          </div>
          <CollaboratorComponent
            v-for="collab in collaborators"
            :key="collab.id"
            :collabProp="collab"
          />
          <i
            class="fas col fa-user-plus addImg d-flex float-left align-items-center mt-2 ml-2"
            title="add collaborator"
            @click="showSearch = !showSearch"
            v-if="poll.isOwner"
          ></i>
          <form @submit.prevent="addCollaborator" v-if="showSearch" class="d-flex col ml-5 my-auto">
            <input
              type="text"
              class="form-control"
              id="collab"
              placeholder="Enter Collaborator Email"
              v-model="collaboratorToAdd"
            />
            <button class="btn btn-info" type="submit">+</button>
          </form>
        </div>
      </div>
      <div class="col-12 card d-flex justify-content-center mx-auto mt-2">
        <h3 :contenteditable="poll.isOwner" v-text="poll.name" @keydown.enter="endEdit"></h3>
        <i class="fas fa-times" title="delete poll" @click="deletePoll" v-if="poll.isOwner"></i>
      </div>
      <div>
        <QuestionComponent
          v-for="question in questions"
          :key="question.poll.id"
          :questionProp="question"
        />
        <input
          type="text"
          class="form-control col-12 card d-flex text-center mx-auto mt-2"
          id="questionName"
          placeholder="Enter Name of the Question"
          v-model="newQuestion.body"
          @keydown.enter="createQuestion"
        />
      </div>
    </div>
  </div>
</template>


<script>
import NotificationService from "../NotificationService";
import CollaboratorComponent from "../components/CollaboratorComponent";
import QuestionComponent from "../components/QuestionComponent";

export default {
  name: "poll",
  data() {
    return {
      showSearch: false,
      collaboratorToAdd: "",
      newQuestion: {}
    };
  },
  computed: {
    poll() {
      return this.$store.state.PollsStore.singlePoll;
    },
    questions() {
      return this.$store.state.QuestionsStore.questions;
    },
    collaborators() {
      return this.$store.state.PollsStore.singlePoll.collaborators;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    getSinglePoll() {
      this.$store.dispatch("getSinglePoll", this.$route.params.pollId);
      this.$store.dispatch("getPollQuestions", this.$route.params.pollId);
    },
    async deletePoll() {
      if (await NotificationService.confirmAction()) {
        this.$store.dispatch("deletePoll", this.poll.id);
      }
    },
    createQuestion() {
      this.$store.dispatch("createQuestion", {
        body: this.newQuestion.body,
        poll: this.poll.id
      });
    },
    /**
     *@param {evt} keydown enter triggers event to edit poll name
     */
    endEdit(evt) {
      var src = evt.target.innerText;
      this.poll.name = src;
      this.editPoll();
    },
    editPoll() {
      this.$store.dispatch("editPoll", this.poll);
    },
    addCollaborator() {
      this.$store.dispatch("addCollaboratorByEmail", {
        email: this.collaboratorToAdd,
        pollId: this.$route.params.pollId
      });
      this.collaboratorToAdd = "";
    }
  },
  mounted() {
    this.getSinglePoll();
  },
  components: { QuestionComponent, CollaboratorComponent }
};
</script>


<style scoped>
.fas {
  cursor: pointer;
}
.addImg {
  border-radius: 50%;
  font-size: 2rem;
  cursor: pointer;
}
</style>