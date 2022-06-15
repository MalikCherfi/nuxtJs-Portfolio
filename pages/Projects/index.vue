<template>
  <div class="Projects">
    <!-- First Project -->
    <mdb-container
      v-if="projects.length > 0"
      class="w-50 position-relative"
      style="margin-top: 100px; z-index: 3"
    >
      <mdb-row>
        <mdb-card reverse>
          <NuxtLink
            :to="{ name: 'Projects-id', params: { id: projects[0].id } }"
          >
            <mdb-view hover cascade>
              <mdb-card-image
                :src="`${baseUrl}${projects[0].images.principal}`"
                :alt="projects[0].title"
              ></mdb-card-image>
              <mdb-mask waves overlay="white-slight"></mdb-mask>
            </mdb-view>
          </NuxtLink>
          <mdb-card-body class="text-center" cascade>
            <mdb-card-title
              ><strong>{{ projects[0].title }}</strong></mdb-card-title
            >
            <a :href="projects[0].link" target="_blank">
              <h5 class="indigo-text">
                <strong>{{ projects[0].link }}</strong>
              </h5>
            </a>
            <mdb-card-text>{{ projects[0].details }}</mdb-card-text>
          </mdb-card-body>
        </mdb-card>
      </mdb-row>
    </mdb-container>
    <!-- First Project -->
    <div class="background">
      <img src="@/static/rocks.png" id="rocks" />
      <img src="@/static/water.png" id="water" />
    </div>
    <!-- Other Projects -->
    <div class="content">
      <mdb-container
        :key="index"
        v-for="(project, index) in projects"
        class="project w-25 position-relative"
        style="margin-top: 100px; z-index: 1000; height: auto"
      >
        <mdb-row>
          <mdb-card reverse>
            <NuxtLink :to="{ name: 'Projects-id', params: { id: project.id } }">
              <mdb-view hover cascade>
                <mdb-card-image
                  :src="`${baseUrl}${project.images.principal}`"
                  :alt="project.title"
                ></mdb-card-image>
                <mdb-mask waves overlay="white-slight"></mdb-mask>
              </mdb-view>
            </NuxtLink>
            <mdb-card-body class="text-center" cascade>
              <mdb-card-title
                ><strong>{{ project.title }}</strong></mdb-card-title
              >
              <a :href="project.link" target="_blank">
                <h5 class="indigo-text">
                  <strong>{{ project.link }}</strong>
                </h5>
              </a>
              <mdb-card-text>{{ project.details }}</mdb-card-text>
            </mdb-card-body>
          </mdb-card>
        </mdb-row>
      </mdb-container>
    </div>
    <!-- /Other Projects -->
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
  name: "index",
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
  },
};
</script>

<style scoped>
img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
}

.background {
  position: static;
  width: 100%;

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

.project:hover {
  transform: translateY(-10px) translateX(-10px);
  transition-duration: 300ms;
}
</style>
