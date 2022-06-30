import axios from "@/helper/axios.config.js";

export const postProject = (
  data,
  principalImg,
  secondaryImg,
  imgPrincipalShow,
  imgSecondaryShow,
  technology
) => {
  const imgData = new FormData();

  imgData.append("image.principal", principalImg);
  for (let index = 0; index < secondaryImg.length; index += 1) {
    imgData.append("image.secondary", secondaryImg[index]);
  }

  for (var value of imgData.values()) {
    console.log(value);
  }

  axios
    .post("/upload", imgData)
    .then((images) => {
      axios
        .post("/post", {
          ...data,
          imagesPath: {
            principal: imgPrincipalShow,
            secondary: imgSecondaryShow.map((path) => path),
          },
          images: {
            principal: `/images/${images.data[0].principal}`,
            secondary: images.data[1].secondary.map(
              (imgPath) => `/images/${imgPath}`
            ),
          },
        })
        .then((res) => postTechnologies(technology, res.data.id))
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postTechnologies = (technology, id) => {
  if (typeof technology == "array") {
    for (let i = 0; i < technology.length; i++) {
      var data = { id: id, name: technology[i] };
      axios
        .post("/technology", {
          ...data,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } else {
    axios
      .post("/technology", {
        ...technology,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
