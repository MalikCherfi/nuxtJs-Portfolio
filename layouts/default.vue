<template>
  <div>
    <mdb-navbar position="top" dark transparent scrolling>
      <mdb-navbar-brand href="#">Your Logo</mdb-navbar-brand>

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
          <NuxtLink to="/Admin"
            ><mdb-nav-item waves-fixed class="item"
              >Admin</mdb-nav-item
            ></NuxtLink
          >
        </mdb-navbar-nav>
        <form>
          <mdb-input
            type="text"
            class="text-white"
            placeholder="Search"
            aria-label="Search"
            label
            navInput
            waves
            waves-fixed
          />
        </form>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <!-- <div class="view">
      <div class="nav-container"> -->
    <div class="view">
      <Nuxt />
    </div>
    <!-- </div>
    </div> -->
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
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");

.item {
  font-family: "Roboto Mono", monospace;
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
