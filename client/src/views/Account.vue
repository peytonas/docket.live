<template>
  <div class="Account">
    <div class="pos-f-t container-fluid">
      <div class="row">
        <nav class="navbar col-12 navbar-dark bg-dark">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse" id="navbarToggleExternalContent">
            <div v-if="this.$route.name != `account.dashboard`" class="pr-3">
              <router-link :to="{name: `account.dashboard`}">Dashboard</router-link>
            </div>
            <div v-if="this.$route.name == `account.pollId.question.id`">
              <router-link :to="{name: `account.poll`}">Back to Poll</router-link>
            </div>
            <div v-if="this.$route.name == `account.pollId.results.id`">
              <router-link :to="{name: `account.poll.results`}">Back to Poll Review</router-link>
            </div>
            <div v-if="this.$route.name == `results.stats`">
              <router-link :to="{name: `account.pollId.results.id`}">Back to Responses</router-link>
            </div>
            <div>
              <h3 @click="Logout()" aria-placeholder="Logout-Button" class="logout">Logout</h3>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import router from "@/router/index.js";
import NotificationService from "../NotificationService.js";
export default {
  name: "Account",
  data() {
    return {};
  },
  computed: {},
  methods: {
    async Logout() {
      if (
        await NotificationService.confirmAction(
          "Are you sure you want to log out?"
        )
      ) {
        this.$store.dispatch("logout");
      }
    },
    goDashboard() {
      this.$router.push({ name: "account.dashboard" });
    }
  },
  components: {}
};
</script>


<style scoped>
/* .navbar-toggler {
} */

.logout {
  color: red;
  cursor: pointer;
  margin-bottom: 5px;
}

button:focus {
  outline: 0;
}

.logout:hover {
  color: white;
  text-decoration: solid underline;
}
.dashboard-link {
  cursor: pointer;
}

.dashboard-link:hover {
  color: white;
  text-decoration: solid underline;
}
</style>