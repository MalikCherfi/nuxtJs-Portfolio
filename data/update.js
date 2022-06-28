import axios from "@/helper/axios.config.js";

export const updateProject = (
  id,
  data,
  project,
  imgPrincipalShow,
  imgSecondaryShow
) => {
  if (
    project[0].imagesPath.principal != imgPrincipalShow ||
    project[0].imagesPath.secondary.filter(
      (path) => path == imgSecondaryShow.map((path) => path)
    ).length == 0
  ) {
    const imgData = new FormData();

    imgData.append("image.principal", principalImg);
    for (let index = 0; index < secondaryImg.length; index += 1) {
      imgData.append("image.secondary", secondaryImg[index]);
    }

    axios
      .post("/upload", imgData)
      .then((images) => {
        axios
          .put(`/post/${id}`, {
            ...data,
            imagesPath: {
              principal: imgPrincipalShow,
              secondary: imgSecondaryShow.map((path) => path),
            },
            images: {
              principal: `/images/${images.data[0].principal}`,
              secondary: images.data[1].secondary.map(
                (imgName) => `/images/${imgName}`
              ),
            },
          })
          .then(() => {
            console.log("project update");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    axios
      .put(`/post/${id}`, {
        ...data,
        imagesPath: {
          principal: imgPrincipalShow,
          secondary: imgSecondaryShow.map((path) => path),
        },
        images: {
          principal: project[0].images.principal,
          secondary: project[0].images.secondary.map((imgPath) => imgPath),
        },
      })
      .then(() => {
        console.log("project update");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
