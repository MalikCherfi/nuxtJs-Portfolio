import axios from "@/helper/axios.config.js";

export const deleteProject = (id) => {
  axios
    .delete(`/post/${id}`)
    .then(() => {
      console.log("projet supprimé");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteTechnology = (id) => {
  axios
    .delete(`/technology/${id}`)
    .then(() => {
      console.log("Technologie supprimé");
    })
    .catch((err) => {
      console.log(err);
    });
};
