<template>
  <div class="HomeDashboard">
    <div class="section">
      <h2 id="text">
        <span>Discover</span>
        <br />
        My Projects
      </h2>
      <img src="../static/bird1.png" id="bird1" />
      <img src="../static/bird2.png" id="bird2" />
      <img src="../static/forest.png" id="forest" />
      <img src="../static/rocks.png" id="rocks" />
      <img src="../static/water.png" id="water" />
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
import axios from "@/helper/axios.config.js";
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
  },
  data() {
    return {
      projects: [],
    };
  },
  mounted() {
    this.getProject();
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_URL;
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    getProject() {
      axios
        .get("/post")
        .then((res) => {
          this.projects = res.data;
          console.log(this.projects);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleScroll() {
      var text = document.getElementById("text");
      var bird1 = document.getElementById("bird1");
      var bird2 = document.getElementById("bird2");
      var forest = document.getElementById("forest");
      var rocks = document.getElementById("rocks");

      window.addEventListener("scroll", () => {
        let value = window.scrollY;

        text.style.top = `${50 + value * -0.5}%`;
        bird1.style.top = `${value * -1.5}px`;
        // bird1.style.left = `${value * 2}px`;
        bird2.style.top = `${value * -1.5}px`;
        // bird2.style.left = `${value * -5}px`;
        rocks.style.top = `${value * -0.12}px`;
        forest.style.top = `${value * 0.25}px`;
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rancho&family=Roboto&display=swap");

.content {
  position: relative;
  padding: 100px;
  background: #094b65;
  display: flex;
  flex-direction: column;
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
  z-index: 10;
}

#text {
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
img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  object-fit: cover;
}
</style>
