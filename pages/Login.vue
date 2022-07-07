<template>
  <div class="Login">
    <!-- Material form login -->
    <div
      class="d-flex justify-content-center align-items-center"
      style="height: 100vh"
    >
      <form class="w-25 h-50" @submit.prevent="loginUser">
        <p class="h4 text-center mb-4">Sign in</p>
        <div class="grey-text">
          <mdb-input
            v-model="email"
            label="Your email"
            icon="envelope"
            type="email"
          />
          <mdb-input
            v-model="password"
            label="Your password"
            icon="lock"
            type="password"
          />
        </div>
        <div class="text-center">
          <mdb-btn type="submit" class="btn btn-primary">Login</mdb-btn>
        </div>
      </form>
    </div>
    <!-- Material form login -->
  </div>
</template>

<script>
import { mdbInput, mdbBtn, mdbContainer } from "mdbvue";
export default {
  name: "Login",
  components: {
    mdbInput,
    mdbBtn,
    mdbContainer,
  },
  data() {
    return {
      email: null,
      password: null,
    };
  },

  methods: {
    loginUser() {
      this.$auth.loginWith("local", {
        data: { email: this.email, password: this.password },
      });
    },
  },
};
</script>

<style scoped></style>
