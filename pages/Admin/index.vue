<template>
  <div class="Admin">
    <!-- MENU -->
    <div
      class="d-flex justify-content-around position-relative"
      style="margin-top: 50vh; transform: translateY(-50%); z-index: 3"
    >
      <a @click="(principalModal = true), (choice = 'Add')">
        <h1 class="menu">Ajouter</h1>
      </a>
      <a @click="modalChooseProjectUpdate = true">
        <h1 class="menu">Modifier</h1>
      </a>
    </div>
    <div
      class="d-flex justify-content-center position-relative"
      style="transform: translateY(-50%); z-index: 3"
    >
      <a @click="(principalModal = true), (choice = 'Delete')">
        <h1 class="menu">Supprimer</h1>
      </a>
    </div>
    <!-- /MENU -->

    <!-- principal Modal Choice between Project and Competence -->
    <div>
      <mdb-modal :show="principalModal" @close="principalModal = false">
        <mdb-modal-header>
          <mdb-modal-title>Choisir compétence ou projet</mdb-modal-title>
        </mdb-modal-header>
        <!-- Add Modal -->
        <mdb-modal-footer v-if="choice == 'Add'">
          <mdb-btn
            color="secondary"
            @click.native="(principalModal = false), (modalAddProject = true)"
            >Ajouter Projet</mdb-btn
          >
          <mdb-btn
            color="primary"
            @click.native="
              (principalModal = false), (modalAddTechnologies = true)
            "
            >Ajouter Technologie</mdb-btn
          >
        </mdb-modal-footer>
        <!-- /Add Modal -->
        <!-- Delete Modal -->
        <mdb-modal-footer v-if="choice == 'Delete'">
          <mdb-btn
            color="secondary"
            @click.native="
              (principalModal = false), (modalDeleteProject = true)
            "
            >Supprimer Projet</mdb-btn
          >
          <mdb-btn
            color="primary"
            @click.native="
              (principalModal = false), (modalDeleteTechnologies = true)
            "
            >Supprimer Technologie</mdb-btn
          >
        </mdb-modal-footer>
        <!-- /Delete Modal -->
      </mdb-modal>
    </div>
    <!-- /principal Modal Choice between Project and Competence-->

    <!-- Modal Add Technologies -->
    <mdb-modal
      :show="modalAddTechnologies"
      @close="modalAddTechnologies = false"
    >
      <mdb-modal-header class="text-center">
        <mdb-modal-title tag="h4" bold class="w-100"
          >Ajouter une techno</mdb-modal-title
        >
      </mdb-modal-header>

      <form enctype="multipart/form-data" @submit.prevent="postTechnologies">
        <mdb-modal-body class="mx-3 grey-text">
          <mdb-input
            v-model="technologyName"
            label="Nom"
            type="text"
          ></mdb-input>
        </mdb-modal-body>

        <mdb-modal-footer center>
          <input
            @click="modalAddTechnologies = false"
            class="btn btn-unique"
            type="submit"
          />
        </mdb-modal-footer>
      </form>
    </mdb-modal>
    <!-- /Modal Add Technologies -->

    <!-- Modal Delete Technologies-->
    <mdb-container>
      <mdb-modal
        :show="modalDeleteTechnologies"
        @close="modalDeleteTechnologies = false"
      >
        <mdb-modal-header class="text-center">
          <mdb-modal-title tag="h4" bold class="w-100"
            >Supprimer une technologie</mdb-modal-title
          >
        </mdb-modal-header>

        <mdb-modal-body class="mx-3 grey-text">
          <mdb-container class="d-flex flex-wrap">
            <mdb-card
              :key="index"
              v-for="(technology, index) in technologies"
              style="margin: 10px"
            >
              <mdb-card-body>
                <div class="d-flex flex-column align-items-center">
                  <mdb-card-title>{{ technology.name }}</mdb-card-title>

                  <mdb-btn
                    @click="deleteTechnology(technology.id)"
                    color="primary"
                    >Supprimer</mdb-btn
                  >
                </div>
              </mdb-card-body>
            </mdb-card>
          </mdb-container>
        </mdb-modal-body>
      </mdb-modal>
    </mdb-container>
    <!-- /Modal Delete Technologies-->

    <!-- Modal Add Project-->
    <mdb-container>
      <mdb-modal :show="modalAddProject" @close="modalAddProject = false">
        <mdb-modal-header class="text-center">
          <mdb-modal-title tag="h4" bold class="w-100"
            >Ajouter un projet</mdb-modal-title
          >
        </mdb-modal-header>

        <form enctype="multipart/form-data" @submit.prevent="postProject">
          <mdb-modal-body class="mx-3 grey-text">
            <mdb-input
              v-model="title"
              label="Nom du projet"
              type="text"
              class="mb-5"
            />
            <mdb-input v-model="link" label="Lien vers le projet" type="text" />
            <mdb-input v-model="details" label="Description" type="textarea" />
            <mdb-input v-model="years" label="Année" type="number" />
            <mdb-input
              v-model="technologyName"
              label="Technologie"
              type="text"
            />
            <button @click="addTechnology">Add</button>
            <!-- Input File Principal Img-->
            <div class="w-100 d-flex justify-content-center">
              <label
                for="file1"
                style="
                  cursor: pointer;

                  padding: 2em;
                  border-radius: 0.25em;
                  box-shadow: 0 0 1em rgba(0, 0, 0, 0.25);
                "
              >
                <div class="d-flex justify-content-around align-items-center">
                  <img
                    class="w-25"
                    style="height: auto"
                    v-if="imgPrincipalShow != null"
                    :src="imgPrincipalShow"
                  />
                  <p style="margin: 0px">Sélectionner une image</p>
                </div>
                <input
                  style="display: none"
                  type="file"
                  name="image.principal"
                  id="file1"
                  @change="processPrincipalFile($event), readImage($event)"
                />
              </label>
            </div>
            <!-- /Input File Principal Img-->
            <!-- Input File Secondary Img -->
            <div class="w-100 d-flex justify-content-center">
              <label
                for="file2"
                style="
                  cursor: pointer;
                  padding: 2em;
                  border-radius: 0.25em;
                  box-shadow: 0 0 1em rgba(0, 0, 0, 0.25);
                "
              >
                <div
                  class="d-flex justify-content-around align-items-center flex-wrap"
                >
                  <img
                    :key="index"
                    v-for="(img, index) in imgSecondaryShow"
                    class="w-25"
                    style="height: auto; margin: 5px"
                    :src="img"
                  />
                  <p style="margin: 0px">Sélectionner une image</p>
                </div>
                <input
                  style="margin-top: 20px; display: none"
                  multiple
                  type="file"
                  name="image.secondary"
                  id="file2"
                  @change="processSecondaryFile($event), readImage($event)"
                />
              </label>
            </div>
            <!-- /Input File Secondary Img -->
          </mdb-modal-body>

          <mdb-modal-footer center>
            <input
              @click="modalAddProject = false"
              class="btn btn-unique"
              type="submit"
            />
          </mdb-modal-footer>
        </form>
      </mdb-modal>
    </mdb-container>
    <!-- /Modal Add Project-->

    <!-- Modal Delete Project-->
    <mdb-container>
      <mdb-modal :show="modalDeleteProject" @close="modalDeleteProject = false">
        <mdb-modal-header class="text-center">
          <mdb-modal-title tag="h4" bold class="w-100"
            >Supprimer un projet</mdb-modal-title
          >
        </mdb-modal-header>

        <mdb-modal-body class="mx-3 grey-text">
          <mdb-container class="d-flex flex-wrap">
            <mdb-card
              :key="index"
              v-for="(project, index) in projects"
              style="margin: 10px"
            >
              <mdb-card-image
                :src="`${baseUrl}${project.images.principal}`"
                :alt="project.title"
              ></mdb-card-image>
              <mdb-card-body>
                <div class="d-flex flex-column align-items-center">
                  <mdb-card-title>{{ project.title }}</mdb-card-title>

                  <mdb-btn @click="deleteProject(project.id)" color="primary"
                    >Supprimer</mdb-btn
                  >
                </div>
              </mdb-card-body>
            </mdb-card>
          </mdb-container>
        </mdb-modal-body>
      </mdb-modal>
    </mdb-container>
    <!-- /Modal Delete Project-->

    <!-- Modal Update Project-->
    <!-- Choose Project -->
    <mdb-container>
      <mdb-modal
        :show="modalChooseProjectUpdate"
        @close="modalChooseProjectUpdate = false"
      >
        <mdb-modal-header class="text-center">
          <mdb-modal-title tag="h4" bold class="w-100"
            >Choisir le projet à modifier</mdb-modal-title
          >
        </mdb-modal-header>

        <mdb-modal-body class="mx-3 grey-text">
          <mdb-container class="d-flex flex-wrap">
            <mdb-card
              :key="index"
              v-for="(project, index) in projects"
              style="margin: 10px"
            >
              <mdb-card-image
                :src="`${baseUrl}${project.images.principal}`"
                :alt="project.title"
              ></mdb-card-image>
              <mdb-card-body>
                <div class="d-flex flex-column align-items-center">
                  <mdb-card-title>{{ project.title }}</mdb-card-title>

                  <mdb-btn
                    @click="
                      (modalUpdateProject = true),
                        (modalChooseProjectUpdate = false),
                        (idToUpdate = project.id),
                        resetForm(project)
                    "
                    color="primary"
                    >Modifier</mdb-btn
                  >
                </div>
              </mdb-card-body>
            </mdb-card>
          </mdb-container>
        </mdb-modal-body>
      </mdb-modal>
    </mdb-container>
    <!-- /Choose Project -->
    <mdb-container>
      <mdb-modal :show="modalUpdateProject" @close="modalUpdateProject = false">
        <mdb-modal-header class="text-center">
          <mdb-modal-title tag="h4" bold class="w-100"
            >Modifier un projet</mdb-modal-title
          >
        </mdb-modal-header>

        <form
          enctype="multipart/form-data"
          @submit.prevent="
            updateProject(idToUpdate), (modalUpdateProject = false)
          "
        >
          <mdb-modal-body class="mx-3 grey-text">
            <mdb-input
              name="title"
              v-model="formValue.title"
              label="Nom du projet"
              type="text"
              class="mb-5"
            />
            <mdb-input
              name="link"
              v-model="formValue.link"
              label="Lien vers le projet"
              type="text"
            />
            <mdb-input
              name="details"
              v-model="formValue.details"
              label="Description"
              type="textarea"
            />
            <mdb-input
              name="years"
              v-model="formValue.years"
              label="Année"
              type="number"
            />
            <!-- Input File Principal Img-->
            <div class="w-100 d-flex justify-content-center">
              <label
                for="file1"
                style="
                  cursor: pointer;

                  padding: 2em;
                  border-radius: 0.25em;
                  box-shadow: 0 0 1em rgba(0, 0, 0, 0.25);
                "
              >
                <div class="d-flex justify-content-around align-items-center">
                  <img
                    class="w-25"
                    style="height: auto"
                    v-if="imgPrincipalShow != null"
                    :src="imgPrincipalShow"
                  />
                  <p style="margin: 0px">Sélectionner une image</p>
                </div>
                <input
                  style="display: none"
                  type="file"
                  name="image.principal"
                  id="file1"
                  @change="processPrincipalFile($event), readImage($event)"
                />
              </label>
            </div>
            <!-- /Input File Principal Img-->

            <!-- Input File Secondary Img -->
            <div class="w-100 d-flex justify-content-center">
              <label
                for="file2"
                style="
                  cursor: pointer;
                  padding: 2em;
                  border-radius: 0.25em;
                  box-shadow: 0 0 1em rgba(0, 0, 0, 0.25);
                "
              >
                <div
                  class="d-flex justify-content-around align-items-center flex-wrap"
                >
                  <img
                    :key="index"
                    v-for="(img, index) in imgSecondaryShow"
                    class="w-25"
                    style="height: auto; margin: 5px"
                    :src="img"
                  />
                  <p style="margin: 0px">Sélectionner une image</p>
                </div>
                <input
                  style="margin-top: 20px; display: none"
                  multiple
                  type="file"
                  name="image.secondary"
                  id="file2"
                  @change="processSecondaryFile($event), readImage($event)"
                />
              </label>
            </div>
            <!-- /Input File Secondary Img -->
          </mdb-modal-body>

          <mdb-modal-footer center>
            <input class="btn btn-unique" type="submit" />
          </mdb-modal-footer>
        </form>
      </mdb-modal>
    </mdb-container>
    <!-- /Modal Update Project-->

    <!-- Background Images -->
    <img class="background" src="@/static/forest.png" id="forest" />
    <img class="background" src="@/static/rocks.png" id="rocks" />
    <img class="background" src="@/static/water.png" id="water" />
    <!-- !Background Images -->
  </div>
</template>

<script>
import axios from "@/helper/axios.config.js";
const post = require("@/data/post.js");
const get = require("@/data/get.js");
const destroy = require("@/data/destroy.js");
const update = require("@/data/update.js");
import {
  mdbCard,
  mdbCardImage,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbBtn,
  mdbContainer,
  mdbIcon,
  mdbModal,
  mdbModalHeader,
  mdbModalBody,
  mdbModalFooter,
  mdbInput,
  mdbModalTitle,
} from "mdbvue";

export default {
  name: "Admin",
  components: {
    mdbCard,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbBtn,
    mdbContainer,
    mdbIcon,
    mdbModal,
    mdbModalHeader,
    mdbModalBody,
    mdbModalFooter,
    mdbInput,
    mdbModalTitle,
  },
  data() {
    return {
      // Description Project
      title: null,
      url: null,
      details: null,
      years: null,
      link: null,
      principalImg: null,
      secondaryImg: [],
      technology: [],
      // id of project who is created
      idProject: null,
      //
      technologyName: [],
      projects: [],
      technologies: [],
      // Modal variable
      principalModal: false,
      choice: null,
      modalAddTechnologies: false,
      modalDeleteTechnologies: false,
      modalChooseProjectUpdate: false,
      modalAddProject: false,
      modalDeleteProject: false,
      modalUpdateProject: false,
      idToUpdate: null,
      //
      formValue: {},
      imgPrincipalShow: null,
      imgSecondaryShow: [],
      secondaryImgIsShow: false,
    };
  },

  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_URL;
    },
  },

  mounted() {
    this.getProject();
    this.getTechnologies();
  },

  methods: {
    // RESET FORM FOR UPDATE
    resetForm(project) {
      this.formValue.title = project.title;
      this.formValue.link = project.link;
      this.formValue.details = project.details;
      this.formValue.years = project.years;
      this.imgPrincipalShow = project.imagesPath.principal;
      this.imgSecondaryShow = project.imagesPath.secondary;
      this.secondaryImgIsShow = true;
    },

    readImage(event) {
      // Check if the file is an image.
      if (
        event.target.files[0].type &&
        !event.target.files[0].type.startsWith("image/")
      ) {
        console.log("File is not an image.", event.target.files[0].type, event);
        return;
      }

      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        if (event.target.id === "file1") {
          this.imgPrincipalShow = e.target.result;
        } else {
          if (this.secondaryImgIsShow == true) {
            this.imgSecondaryShow = [];
            this.secondaryImgIsShow = false;
            for (let index = 0; index < event.target.files.length; index++) {
              this.imgSecondaryShow.push(e.target.result);
            }
          } else {
            for (let index = 0; index < event.target.files.length; index++) {
              this.imgSecondaryShow.push(e.target.result);
            }
          }
        }
      });
      reader.readAsDataURL(event.target.files[0]);
      console.log(reader);
    },

    processPrincipalFile(event) {
      this.principalImg = event.target.files[0];
    },

    processSecondaryFile(event) {
      this.secondaryImg.push(event.target.files[0]);
    },

    addTechnology() {
      this.technology.push(this.technologyName);
      this.technologyName = null;
    },

    // API ROUTE FOR PROJECT
    getProject() {
      get.getProject().then((res) => (this.projects = res));
    },

    postProject() {
      var data = {
        title: this.title,
        years: parseInt(this.years),
        link: this.link,
        details: this.details,
      };

      post.postProject(
        data,
        this.principalImg,
        this.secondaryImg,
        this.imgPrincipalShow,
        this.imgSecondaryShow,
        this.technology
      );
    },

    deleteProject(id) {
      destroy.deleteProject(id);
    },

    updateProject(id) {
      var data = {
        title: this.formValue.title,
        years: parseInt(this.formValue.years),
        link: this.formValue.link,
        details: this.formValue.details,
      };

      var project = this.projects.filter((project) => project.id == id);

      update.updateProject(
        id,
        data,
        project,
        this.imgPrincipalShow,
        this.imgSecondaryShow
      );
    },

    // API Route for Technologies
    getTechnologies() {
      get.getTechnologies().then((res) => (this.technologies = res));
    },

    postTechnologies() {
      var data = {
        name: this.technologyName,
      };
      post.postTechnologies(data);
    },

    deleteTechnology(id) {
      destroy.deleteTechnology(id);
    },

    getUsers() {
      axios
        .get("/users")
        .then((res) => {
          this.name = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rancho&family=Roboto&display=swap");

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

.menu {
  font-family: "Rancho", cursive;
  color: white;
  font-size: 5em;
  cursor: pointer;
  text-shadow: 5px 5px black;
  transition-duration: 300ms;
}

.menu:hover {
  transform: translateY(-10px) translateX(-10px);
  transition-duration: 300ms;
}
</style>
