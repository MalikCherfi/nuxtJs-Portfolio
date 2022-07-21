<template>
  <div class="HomeDashboard">
    <div class="section">
      <h2 id="text">
        <span>Discover</span>
        <br />
        My Projects
      </h2>
      <div class="fish-container">
        <lottie
          class="fish-animation"
          :options="lottieOptions.fish"
          v-on:animCreated="handleAnimation($event, 'fishAnim')"
        />
        <lottie
          class="splash-animation-1"
          :width="100"
          :height="100"
          :options="lottieOptions.splash1"
          v-on:animCreated="handleAnimation($event, 'splashAnim1')"
        />
        <lottie
          class="splash-animation-2"
          :width="100"
          :height="100"
          :options="lottieOptions.splash2"
          v-on:animCreated="handleAnimation($event, 'splashAnim2')"
        />
      </div>
    </div>
    <div class="content">
      <div class="d-flex justify-content-around">
        <NuxtLink to="/Projects" class="menu">
          <h2 style="font-size: 5em">Projets</h2>
        </NuxtLink>
        <NuxtLink to="/Competences" class="menu">
          <h2 style="font-size: 5em">Compétences</h2>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
const scroll = require("@/helper/handleScroll.js");
import lottie from "vue-lottie/src/lottie.vue";
import * as fishAnimation from "~/static/animation/fish.json";
import * as splashAnimation1 from "~/static/animation/water-splash-1.json";
import * as splashAnimation2 from "~/static/animation/water-splash-2.json";
import {
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbCard,
  mdbCardImage,
  mdbCardHeader,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbCardFooter,
  mdbCardUp,
  mdbCardAvatar,
  mdbCardGroup,
  mdbBtn,
  mdbView,
  mdbMask,
  mdbIcon,
} from "mdbvue";

export default {
  name: "HomeDashboard",
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardImage,
    mdbCardHeader,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbCardFooter,
    mdbCardUp,
    mdbCardAvatar,
    mdbCardGroup,
    mdbBtn,
    mdbView,
    mdbMask,
    mdbIcon,
    lottie,
  },

  data() {
    return {
      anim: {
        fishAnim: null,
        splashAnim1: null,
        splashAnim2: null,
      },
      lottieOptions: {
        fish: { animationData: fishAnimation.default, loop: false },
        splash1: { animationData: splashAnimation1.default, loop: false },
        splash2: { animationData: splashAnimation2.default, loop: false },
      },
    };
  },

  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_URL;
    },
  },
  created() {
    window.addEventListener("scroll", scroll.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", scroll.handleScroll);
  },

  methods: {
    handleAnimation(anim, type) {
      this.anim[type] = anim;

      setTimeout(() => {
        this.anim["fishAnim"].stop();
      }, 100);
      setTimeout(() => {
        this.anim["fishAnim"].play();
      }, 1500);

      setTimeout(() => {
        this.anim["splashAnim1"].stop();
      }, 100);
      setTimeout(() => {
        this.anim["splashAnim1"].play();
      }, 2800);

      setTimeout(() => {
        this.anim["splashAnim2"].stop();
      }, 100);
      setTimeout(() => {
        this.anim["splashAnim2"].play();
      }, 1500);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rancho&family=Roboto&display=swap");

.section {
  position: static;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.section::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to top, #094b65, transparent);
  z-index: 1;
}

.content {
  z-index: 1;
  position: relative;
  padding: 100px;
  background: #094b65;
  display: flex;
  flex-direction: column;
}

.content::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 400px;
  background: linear-gradient(to top, black, transparent);
  z-index: 10;
}

.menu {
  font-family: "Rancho", cursive;
  color: white;
  cursor: pointer;
  z-index: 1000;
  text-shadow: 5px 5px black;
  transition-duration: 300ms;
}

.menu:hover {
  transform: translateY(-10px) translateX(-10px);
  text-shadow: 10px 10px black;
  transition-duration: 300ms;
}

#text {
  z-index: 0;
  bottom: 170px;
  position: absolute;
  color: #094b65;
  font-size: 10vw;
  text-align: center;
  line-height: 0.55em;
  font-family: "Rancho", cursive;
}
#text span {
  font-size: 0.2em;
  letter-spacing: 2px;
  font-weight: 400;
}

.fish-container {
  z-index: 1;
  position: absolute;
  bottom: 100px;
  width: 400px;
  height: 300px;
}

.fish-animation {
  position: absolute;
}

.splash-animation-1 {
  position: absolute;
  transform: translateY(250px) translateX(50px);
}

.splash-animation-2 {
  position: absolute;
  transform: translateY(250px) translateX(260px);
}
</style>
