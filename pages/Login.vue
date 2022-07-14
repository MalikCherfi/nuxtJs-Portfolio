<template>
  <div class="Login">
    <!-- Material form login -->
    <div
      class="d-flex justify-content-center align-items-center"
      style="height: 100vh"
    >
      <!-- Card -->
      <mdb-card style="z-index: 3">
        <mdb-card-body>
          <form @submit.prevent="loginUser">
            <p class="h4 text-center py-4">Connexion</p>
            <div class="grey-text">
              <mdb-input
                v-model="email"
                label="Email"
                icon="envelope"
                type="email"
              />
              <mdb-input
                v-model="password"
                label="Mot de passe"
                icon="lock"
                type="password"
                validate
              />
            </div>
            <div class="text-center py-4 mt-3">
              <mdb-btn color="cyan" type="submit">Se connecter</mdb-btn>
            </div>
          </form>
        </mdb-card-body>
      </mdb-card>
      <!-- Card -->
    </div>
    <!-- Material form login -->

    <!-- Background Images -->
    <img class="background" src="@/static/forest.png" id="forest" />
    <img class="background" src="@/static/rocks.png" id="rocks" />
    <img class="background" src="@/static/water.png" id="water" />
    <!-- !Background Images -->
  </div>
</template>

<script>
import { mdbInput, mdbBtn, mdbCard, mdbCardBody, mdbContainer } from "mdbvue";
export default {
  name: "Login",
  components: {
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbContainer,
  },
  data() {
    return {
      email: null,
      password: null,
    };
  },

  methods: {
    async loginUser() {
      await this.$auth
        .loginWith("local", {
          data: { email: this.email, password: this.password },
        })
        .then((res) => {
          console.log(res);
        })
        .catch(() => {
          this.$toast.error("Email ou mot de passe incorrect", {
            duration: 3000,
            position: "top-center",
          });
          setTimeout(() => {
            this.$toast.show(
              "Cette partie est réservée à l'administrateur du site",
              { duration: 3000, position: "top-center" }
            );
          }, 3001);
        });
    },
  },
};
</script>

<style scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  object-fit: cover;
  z-index: 2;
}
</style>
