<template>
  <section class="bg-primary container-fluid">
    <main class="row justify-content-center align-items-center join">
      <div class="col-12 text-center">
        <h1 class="main-title wiggle">Docket.Live</h1>
        <form class="form-row pin-form">
          <input
            type="number"
            v-model="gameToJoin"
            class="form-control text-center"
            placeholder="Enter Docket Pin"
          />
          <button
            v-if="gameToJoin.length > 5"
            type="submit"
            class="btn btn-primary d-flex mt-5 position-absolute"
          >Join</button>
        </form>
      </div>
    </main>
    <footer class="fixed-bottom d-flex">
      <router-link to="/login" class="align-self-end mx-auto">
        <p>Generate your own</p>
      </router-link>
    </footer>
  </section>
</template>


<script>
export default {
  name: "join",
  data() {
    return {
      gameToJoin: ""
    };
  },
  computed: {},
  methods: {},
  components: {}
};
</script>

<style scoped>
.main-title {
  font-family: "Berlin Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 65px;
}

.join {
  min-height: 100vh;
  background-size: cover;
  color: white;
}
p {
  color: white;
}

.pin-form {
  width: 35%;
  margin: auto;
}
@keyframes wiggle {
  0% {
    transform: rotate(0deg);
  }
  80% {
    transform: rotate(0deg);
  }
  85% {
    transform: rotate(5deg);
  }
  95% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

h1.wiggle {
  display: inline-block;
  animation: wiggle 2.5s infinite;
}

h1.wiggle:hover {
  animation: none;
}
</style>
