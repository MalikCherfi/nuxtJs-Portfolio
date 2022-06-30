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

export const getOneProject = (id) => {
  return axios
    .get(`/post/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTechnologies = () => {
  return axios
    .get("/technology")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
