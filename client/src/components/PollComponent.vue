<template>
  <div class="pollComponent col-12 d-flex justify-content-center m-2">
    <div class="card justify-content-center" title="edit poll">
      <div class="poll-title" @click="selectPoll(pollProp.id)">{{pollProp.name}}</div>
      <div class="poll-actions">
        <button class="btn fab btn-success mb-1" title="give poll">
          <i class="fas fa-fw fa-play"></i>
        </button>
        <button
          class="btn fab btn-warning text-white"
          title="review poll"
          @click="reviewPoll(pollProp.id)"
        >
          <i class="fas fa-fw fa-align-left"></i>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import NotificationService from "../NotificationService";
import router from "../router";
export default {
  name: "pollComponent",
  data() {
    return {};
  },
  computed: {},
  methods: {
    selectPoll(pollId) {
      router.push({ path: `/account/` + pollId });
    },
    reviewPoll(pollId) {
      router.push({ path: `/account/` + pollId + `/results` });
    }
  },
  components: {},
  props: ["pollProp"]
};
</script>

<style scoped>
.card {
  width: 90%;
  height: 20vh;
  position: relative;
}

.poll-actions {
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

.poll-title {
  font-size: 3rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  padding: 1rem;
  overflow: hidden;
  cursor: pointer;
}
</style>