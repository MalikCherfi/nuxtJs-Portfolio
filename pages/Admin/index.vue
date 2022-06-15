<template>
  <div class="Admin">
    <!-- MENU -->
    <div
      class="d-flex justify-content-around position-relative"
      style="margin-top: 50vh; transform: translateY(-50%); z-index: 3"
    >
      <a @click="login = true">
        <h1 class="menu">Ajouter</h1>
      </a>
      <h1 class="menu">Modifier</h1>
    </div>
    <div
      class="d-flex justify-content-center position-relative"
      style="transform: translateY(-50%); z-index: 3"
    >
      <h1 class="menu">Supprimer</h1>
    </div>
    <!-- /MENU -->

    <!-- Modal Add -->
    <mdb-container>
      <mdb-modal :show="login" @close="login = false">
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
            <input
              type="file"
              name="image.principal"
              @change="processPrincipalFile($event)"
            />
            <input
              style="margin-top: 20px"
              multiple
              type="file"
              name="image.secondary"
              @change="processSecondaryFile($event)"
            />
          </mdb-modal-body>

          <mdb-modal-footer center>
            <input
              @click="login = false"
              class="btn btn-unique"
              type="submit"
            />
          </mdb-modal-footer>
        </form>
      </mdb-modal>
    </mdb-container>
    <!-- /Modal Add -->

    <!-- Modal Delete -->

    <!-- /Modal Delete -->

    <div style="height: 100vh">
      <div class="view intro-2" style="height: 100vh">
        <div class="full-bg-img">
          <div class="mask rgba-purple-light">
            <div class="container flex-center">
              <div class="white-text text-center">
                <form
                  style="height: 500px; width: 400px"
                  @submit.prevent="postProject"
                  action="/upload"
                  method="post"
                  enctype="multipart/form-data"
                >
                  <p class="h4 text-center mb-4">Ajouter un projet</p>
                  <label for="defaultFormRegisterNameEx" class="grey-text"
                    >Nom du Projet</label
                  >
                  <input
                    v-model="title"
                    type="text"
                    id="defaultFormRegisterNameEx"
                    class="form-control"
                  />
                  <br />
                  <label for="defaultFormRegisterEmailEx" class="grey-text"
                    >lien vers le projet</label
                  >
                  <input
                    v-model="link"
                    type="text"
                    id="defaultFormRegisterEmailEx"
                    class="form-control"
                  />
                  <br />
                  <label for="defaultFormRegisterEmailEx" class="grey-text"
                    >Description</label
                  >
                  <input
                    v-model="details"
                    type="text"
                    id="defaultFormRegisterEmailEx"
                    class="form-control"
                  />
                  <br />
                  <label for="defaultFormRegisterEmailEx" class="grey-text"
                    >Année</label
                  >
                  <input
                    v-model="years"
                    type="number"
                    id="defaultFormRegisterEmailEx"
                    class="form-control"
                  />
                  <br />
                  <!-- INPUT FILE -->

                  <div class="custom-file">
                    <input
                      type="file"
                      name="image.principal"
                      class="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                      @change="processPrincipalFile($event)"
                    />
                    <label class="custom-file-label" for="inputGroupFile01"
                      >Choose file</label
                    >
                  </div>
                  <div class="custom-file">
                    <input
                      multiple
                      type="file"
                      name="image.secondary"
                      class="custom-file-input"
                      id="inputGroupFile02"
                      aria-describedby="inputGroupFileAddon01"
                      @change="processSecondaryFile($event)"
                    />
                    <label class="custom-file-label" for="inputGroupFile02"
                      >Choose file</label
                    >
                  </div>

                  <!-- /INPUT FILE -->
                  <div class="text-center mt-4">
                    <input class="btn btn-unique" type="submit" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mdb-container
      :key="index"
      v-for="(project, index) in projects"
      class="w-25 position-relative"
      style="margin-top: 100px; z-index: 3"
    >
      <mdb-card>
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

    <!-- Background Images -->
    <img class="background" src="@/static/forest.png" id="forest" />
    <img class="background" src="@/static/rocks.png" id="rocks" />
    <img class="background" src="@/static/water.png" id="water" />
    <!-- !Background Images -->
  </div>
</template>

<script>
import axios from "@/helper/axios.config.js";
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
      title: null,
      url: null,
      details: null,
      years: null,
      link: null,
      principalImg: null,
      secondaryImg: [],
      projects: [],
      login: false,
    };
  },

  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_URL;
    },
  },

  mounted() {
    this.getProject();
  },

  methods: {
    processPrincipalFile(event) {
      this.principalImg = event.target.files[0];
    },

    processSecondaryFile(event) {
      this.secondaryImg.push(event.target.files[0]);
    },
    postProject() {
      console.log("salut");
      const imgData = new FormData();

      imgData.append("image.principal", this.principalImg);
      for (let index = 0; index < this.secondaryImg.length; index += 1) {
        imgData.append("image.secondary", this.secondaryImg[index]);
      }

      var data = {
        title: this.title,
        years: parseInt(this.years),
        link: this.link,
        details: this.details,
      };

      for (var value of imgData.values()) {
        console.log(value);
      }

      axios
        .post("/upload", imgData)
        .then((images) => {
          axios
            .post("/post", {
              ...data,
              images: {
                principal: `/images/${images.data[0].principal}`,
                secondary: images.data[1].secondary.map(
                  (imgName) => `/images/${imgName}`
                ),
              },
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getProject() {
      axios
        .get("/post")
        .then((res) => {
          this.projects = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteProject(id) {
      axios
        .delete(`/post/${id}`)
        .then(() => {
          console.log("suppr");
        })
        .catch((err) => {
          console.log(err);
        });
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
}

.menu:hover {
  transform: translateY(-10px) translateX(-10px);
}
</style>
