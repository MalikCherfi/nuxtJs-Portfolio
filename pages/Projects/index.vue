<template>
  <div class="Projects">
    <div class="background">
      <h2 id="text">My Projects</h2>
      <img src="@/static/bird1.png" id="bird1" />
      <img src="@/static/bird2.png" id="bird2" />
      <img src="@/static/forest.png" id="forest" />
      <img src="@/static/rocks.png" id="rocks" />
      <img src="@/static/water.png" id="water" />
    </div>
    <!-- Other Projects -->
    <div class="content">
      <mdb-container
        :key="index"
        v-for="(project, index) in projects"
        class="project position-relative"
        style="
          margin-top: 100px;
          z-index: 1000;
          height: 500px;
          overflow: hidden;
          border-radius: 5px;
        "
      >
        <!-- Background Images -->
        <img
          style="object-fit: cover"
          :src="`${baseUrl}${project.images.principal}`"
          :alt="project.title"
        />
        <!-- /Background Images -->

        <!-- Div Container -->
        <div
          class="card-animation-container"
          style="position: relative; width: 100%; height: 100%; z-index: 10"
        >
          <!-- Circle Title -->
          <NuxtLink :to="{ name: 'Projects-id', params: { id: project.id } }">
            <div class="principal-circle-title">
              <p
                class="title"
                v-animateOnScroll="{
                  animation: 'bounceIn',
                }"
              >
                {{ project.title }}
              </p>
            </div>
          </NuxtLink>
          <div class="secondary-circle-title"></div>
          <div class="third-circle-title"></div>
          <!-- /Circle Title -->

          <!-- Rectangle Link -->
          <div class="principal-rectangle-link">
            <a :href="project.link" target="_blank">
              <p class="link">
                {{ project.link }}
              </p>
            </a>
          </div>
          <div class="secondary-rectangle-link"></div>
          <div class="third-rectangle-link"></div>
          <div class="four-rectangle-link"></div>
          <!-- /Rectangle Link -->
        </div>
        <!-- /Div Container -->
      </mdb-container>
    </div>
    <!-- /Other Projects -->
  </div>
</template>

<script>
const get = require("@/data/get.js");
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
  animateOnScroll,
} from "mdbvue";

export default {
  name: "index",
  directives: {
    animateOnScroll,
  },
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
      get.getProject().then((res) => (this.projects = res));
    },

    handleScroll() {
      var text = document.getElementById("text");
      var bird1 = document.getElementById("bird1");
      var bird2 = document.getElementById("bird2");
      var forest = document.getElementById("forest");
      var rocks = document.getElementById("rocks");

      window.addEventListener("scroll", () => {
        let value = window.scrollY;

        text.style.top = `${60 + value * -0.5}%`;
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

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.card-animation-container:hover .principal-circle-title {
  width: 200px;
  height: 200px;
  transition-duration: 500ms;
  transform: scale(2);
}

.principal-circle-title {
  box-shadow: 2px 5px 5px black;
  border-radius: 100px;
  background-color: #fffacc;
  position: absolute;
  z-index: 10;
  left: 160px;
  top: 360px;
  width: 0px;
  height: 0px;
  transition-duration: 500ms;
  display: flex;
  justify-content: center;
  align-items: center;
}

.principal-circle-title:hover {
  background-color: #ffefbd;
}

.card-animation-container:hover .secondary-circle-title {
  width: 230px;
  height: 230px;
  transition-duration: 1s;
  transform: translateX(-115px) translateY(-115px);
  box-shadow: 2px 5px 5px black;
}

.secondary-circle-title {
  box-shadow: 0px 0px 0px black;
  border-radius: 150px;
  background-color: #5a464c;
  position: absolute;
  left: 160px;
  top: 360px;
  width: 0px;
  height: 0px;
  transition-duration: 500ms;
  opacity: 0.8;
}

.card-animation-container:hover .third-circle-title {
  width: 230px;
  height: 230px;
  transition-duration: 1s;
  transform: translateX(-115px) translateY(-115px);
  box-shadow: 2px 5px 5px black;
}

.third-circle-title {
  z-index: 11;
  box-shadow: 0px 0px 0px black;
  border-radius: 150px;
  background-color: #53131e;
  position: absolute;
  left: 450px;
  top: 540px;
  width: 0px;
  height: 0px;
  transition-duration: 500ms;
  opacity: 0.8;
}

.card-animation-container:hover .title {
  display: block;
  animation-delay: 500ms;
}

.title {
  color: black;
  display: none;
  font-family: "Rancho", cursive;
  font-size: 2em;
  overflow-wrap: break-word;
}

.card-animation-container:hover .principal-rectangle-link {
  transform: skew(45deg) translate(50px);
  transition-duration: 500ms;
}

.principal-rectangle-link {
  z-index: 10;
  box-shadow: 2px 5px 10px black;
  display: flex;
  align-items: center;
  height: 50px;
  width: 650px;
  background-color: #fffacc;
  position: absolute;
  right: 0px;
  top: 100px;
  transform: skew(45deg) translateX(685px);
  transition-duration: 500ms;
}

.principal-rectangle-link:hover {
  background-color: #ffefbd;
}

.card-animation-container:hover .secondary-rectangle-link {
  transform: skew(45deg) translate(-510px);
  transition-duration: 500ms;
}

.secondary-rectangle-link {
  z-index: 11;
  height: 30px;
  width: 100px;
  background-color: #53131e;
  position: absolute;
  right: 0px;
  top: 140px;
  transform: skew(45deg) translateX(720px);
  transition-duration: 500ms;
  opacity: 0.8;
}

.card-animation-container:hover .third-rectangle-link {
  transform: skew(45deg) translate(-630px);
  transition-duration: 500ms;
}

.third-rectangle-link {
  z-index: 11;
  height: 10px;
  width: 20px;
  background-color: #b5d6b2;
  position: absolute;
  right: 0px;
  top: 120px;
  transform: skew(45deg) translateX(720px);
  transition-duration: 500ms;
  opacity: 0.9;
}

.card-animation-container:hover .four-rectangle-link {
  transform: skew(45deg) translate(-350px);
  transition-duration: 500ms;
}

.four-rectangle-link {
  z-index: 11;
  height: 20px;
  width: 100px;
  background-color: #5a464c;
  position: absolute;
  right: 0px;
  top: 85px;
  transform: skew(45deg) translateX(720px);
  transition-duration: 500ms;
  opacity: 0.8;
}

.link {
  color: black;
  font-family: "Work Sans", sans-serif;
  transform: skew(-45deg);
  margin: 0px;
  padding-left: 30px;
}

a:hover {
  text-decoration: underline;
}
</style>
