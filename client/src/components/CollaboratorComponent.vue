<template>
  <div class="col CollaboratorComponent float-left d-flex img-area flex-column mt-2">
    <p class="mb-n2" v-if="poll.owner == collabProp.id">
      <b>Owner</b>
    </p>
    <p
      class="p-0 m-0 ml-1 removeCollab"
      @click="removeCollab(collabProp.id)"
      title="remove collaborator"
      v-else-if="poll.isOwner"
    >X</p>
    <img :src="this.picture + collabProp.name" alt="Img" class="align-self-center" />
    <span class="align-content-center d-flex text-center justify-content-center m-1">
      <p class="p-0 m-0 collabName">{{collabProp.name}}</p>
    </span>
  </div>
</template>


<script>
import NotificationService from "../NotificationService";

export default {
  name: "CollaboratorComponent",
  data() {
    return {
      picture: "https://robohash.org/"
    };
  },
  computed: {
    poll() {
      return this.$store.state.PollsStore.singlePoll;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    async removeCollab(collabId) {
      if (await NotificationService.confirmAction()) {
        this.$store.dispatch("removeCollab", {
          collabId: collabId,
          pollId: this.$route.params.pollId
        });
      }
    }
  },
  components: {},
  props: ["collabProp"]
};
</script>


<style scoped>
img {
  border-radius: 50%;
  height: 3rem;
}

.removeCollab {
  color: red;
  cursor: pointer;
}
</style>