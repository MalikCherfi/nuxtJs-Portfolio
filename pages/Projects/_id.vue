<template>
  <div class="Projects-id">
    <div class="container position-relative w-100" style="z-index: 1050">
      <!-- Boutton Retour -->
      <div class="d-flex">
        <NuxtLink to="./">
          <mdb-icon icon="angle-left" style="color: white" />
        </NuxtLink>
        <NuxtLink to="./">
          <p style="font-family: Rancho, cursive; color: white; font-size: 2em">
            Retour
          </p>
        </NuxtLink>
      </div>
      <!-- /Boutton Retour -->

      <!-- Description Modal -->
      <div>
        <mdb-modal
          side
          position="right"
          fullHeight
          direction="right"
          :show="modal"
          @close="modal = false"
        >
          <mdb-modal-header>
            <mdb-modal-title>{{ project.title }}</mdb-modal-title>
          </mdb-modal-header>
          <mdb-modal-body>
            <p>Année: {{ project.years }}</p>
            <h2>Description :</h2>
            <p class="details">
              {{ project.details }}
            </p>
            <h2>Compétences associées :</h2>
            <div
              :key="index"
              v-for="(object, index) in project.technologies"
              style="background-color: red; border-radius: 10px"
            >
              <p>{{ object.technology.name }}</p>
            </div>
          </mdb-modal-body>
          <mdb-modal-footer>
            <a :href="project.link" target="_blank">
              <mdb-btn color="elegant" @click.native="modal = true"
                >Visiter</mdb-btn
              >
            </a>
          </mdb-modal-footer>
        </mdb-modal>
      </div>
      <!-- /Description Modal -->

      <div class="d-flex">
        <!-- Gallery -->
        <div class="w-75">
          <slider
            v-if="!isLoading"
            animation="fade"
            height="450px"
            :stopOnHover="true"
            :interval="5000"
          >
            <slider-item
              v-for="(image, index) in images"
              :key="index"
              :style="image"
            >
              <a @click="show">
                <img
                  class="img-fluid img-thumbnail"
                  :src="`${baseUrl}${image}`"
                  alt="image principal"
                />
              </a>
            </slider-item>
          </slider>
        </div>
        <!-- /Gallery -->

        <!-- Light Box Gallery -->
        <viewer
          v-if="!isLoading"
          :images="images"
          rebuild
          @inited="inited"
          class="viewer"
          ref="viewer"
        >
          <template #default="scope">
            <img
              class="image-viewer"
              v-for="src in scope.images"
              :src="`${baseUrl}${src}`"
              :key="src"
            />
            {{ scope.options }}
          </template>
        </viewer>
        <!-- /Light Box Gallery -->

        <!-- Title And Detail Button -->
        <div
          class="w-25 d-flex flex-column justify-content-around align-items-center"
          style="margin-left: 3em"
        >
          <h1 class="title">{{ project.title }}</h1>
          <mdb-btn color="elegant" @click.native="modal = true"
            >Détails</mdb-btn
          >
        </div>
        <!-- /Title And Detail Button -->
      </div>
    </div>

    <!-- Background Images -->
    <img class="background" src="@/static/forest.png" id="forest" />
    <img class="background" src="@/static/rocks.png" id="rocks" />
    <img class="background" src="@/static/water.png" id="water" />
    <!-- !Background Images -->
  </div>
</template>

<script>
import axios from "@/helper/axios.config.js";
const get = require("@/data/get.js");
import "viewerjs/dist/viewer.css";
import { component as Viewer } from "v-viewer";
import { Slider, SliderItem } from "vue-easy-slider";
import {
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbBtn,
  mdbIcon,
} from "mdbvue";
export default {
  name: "Projects-id",
  components: {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn,
    mdbIcon,
    Slider,
    SliderItem,
    Viewer,
  },
  data() {
    return {
      modal: false,
      id: this.$route.params.id,
      project: [],
      isLoading: true,
    };
  },
  mounted() {
    this.getProject(this.id);
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_URL;
    },
    images() {
      var images = [];
      images.push(this.project.images.principal);
      for (
        let index = 0;
        index < this.project.images.secondary.length;
        index++
      ) {
        images.push(this.project.images.secondary[index]);
      }
      return images;
    },
  },
  methods: {
    inited(viewer) {
      this.$viewer = viewer;
    },
    show() {
      this.$viewer.show();
    },

    getProject(id) {
      get.getOneProject(id).then((res) => (this.project = res));

      setTimeout(() => {
        this.isLoading = false;
      }, 300);
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Work+Sans&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Rancho&family=Roboto&display=swap");

.container {
  margin-top: 100px;
}

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

.title {
  font-family: "Rancho", cursive;
  color: white;
  font-size: 4em;
  width: 100%;
  overflow-wrap: break-word;
  text-align: center;
}

.details {
  font-family: "Work Sans", sans-serif;
}

.image-viewer {
  display: none;
}
</style>
