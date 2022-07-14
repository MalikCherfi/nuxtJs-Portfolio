<template>
  <div>
    <mdb-navbar position="top" dark transparent scrolling>
      <NuxtLink to="/" style="color: white; margin-right: 10px"
        ><mdb-icon icon="home" size="2x"
      /></NuxtLink>

      <mdb-navbar-toggler class="d-flex justify-content-between">
        <mdb-navbar-nav>
          <NuxtLink to="/">
            <mdb-nav-item waves-fixed class="item">Home</mdb-nav-item></NuxtLink
          >
          <NuxtLink to="/Projects"
            ><mdb-nav-item waves-fixed class="item"
              >Projets</mdb-nav-item
            ></NuxtLink
          >
          <NuxtLink to="/Competences"
            ><mdb-nav-item waves-fixed class="item"
              >Compétences</mdb-nav-item
            ></NuxtLink
          >
          <NuxtLink v-if="$auth.loggedIn" to="/Admin"
            ><mdb-nav-item waves-fixed class="item"
              >Admin</mdb-nav-item
            ></NuxtLink
          >
        </mdb-navbar-nav>
        <div class="item" style="margin-right: 70px">
          <div v-if="$auth.loggedIn">
            <mdb-btn @click="deleteCookie()" class="btn btn-default"
              >Se déconnecter</mdb-btn
            >
          </div>
          <NuxtLink v-else to="/Login"
            ><mdb-nav-item waves-fixed class="item"
              >Se connecter</mdb-nav-item
            ></NuxtLink
          >
        </div>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <div class="view">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import {
  mdbNavbar,
  mdbNavItem,
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbInput,
  mdbNavbarBrand,
  mdbIcon,
} from "mdbvue";

export default {
  components: {
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbInput,
    mdbNavbarBrand,
    mdbIcon,
  },
  methods: {
    deleteCookie() {
      localStorage.setItem("auth._token.local", false);

      document.cookie =
        "auth._token.local" +
        "=" +
        "false" +
        ("/" ? ";path=" + "/" : "") +
        ("localhost" ? ";domain=" + "localhost" : "");

      location.reload();
      window.location.replace("http://localhost:3000");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");

.item {
  font-family: "Roboto Mono", monospace;
  list-style: none;
  color: white;
}

.navbar .dropdown-menu a:hover {
  color: inherit !important;
}

.nav-container {
  margin-top: 100px;
  margin-left: 2%;
  margin-right: 2%;
}

.view {
  background: url("https://mdbootstrap.com/img/Photos/Others/img (40).webp")
    no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  position: static;
}
</style>
