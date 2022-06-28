import axios from "@/helper/axios.config.js";

export const deleteProject = (id) => {
  axios
    .delete(`/post/${id}`)
    .then(() => {
      console.log("suppr");
    })
    .catch((err) => {
      console.log(err);
    });
};
