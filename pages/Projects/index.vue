<template>
  <div class="Projects">
    <div class="background">
      <h2 id="text">My Projects</h2>
      <lottie
        id="mr-cookie"
        :width="300"
        :height="300"
        :options="lottieOptions"
        v-on:animCreated="handleAnimation"
      />
    </div>
    <!-- Other Projects -->
    <div class="content">
      <ProjectCards :projects="projects" :cardColors="cardColors" />
    </div>
    <!-- /Other Projects -->
  </div>
</template>

<script>
const get = require("@/data/get.js");
const scroll = require("@/helper/handleScroll.js");
const color = require("@/helper/colors.js");
import lottie from "vue-lottie/src/lottie.vue";
import * as cookieAnimation from "~/static/animation/mr-cookie.json";

export default {
  name: "index",
  components: {
    lottie,
  },
  data() {
    return {
      projects: [],
      cardColors: [],
      anim: null,
      lottieOptions: {
        animationData: cookieAnimation.default,
        loop: false,
      },
    };
  },
  mounted() {
    this.getProject();
    color.randomColor(this.cardColors);
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
    handleAnimation(anim) {
      this.anim = anim;
    },

    getProject() {
      get.getProject().then((res) => (this.projects = res));
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rancho&family=Roboto&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Work+Sans&display=swap");

#text {
  bottom: 200px;
  position: absolute;
  color: #094b65;
  font-size: 10vw;
  text-align: center;
  line-height: 0.55em;
  font-family: "Rancho", cursive;
}

.background {
  position: static;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to top, #094b65, transparent);
  z-index: 10;
}

.content {
  z-index: 1;
  position: relative;
  padding: 100px;
  background: #094b65;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
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

#mr-cookie {
  z-index: 1;
  position: absolute;
  left: 50px;
  top: 210px;
}
</style>
