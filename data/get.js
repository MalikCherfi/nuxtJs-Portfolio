import axios from "@/helper/axios.config.js";

export const getProject = () => {
  return axios
    .get("/post")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
