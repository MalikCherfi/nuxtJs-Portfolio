export const randomColor = (cardColors) => {
  var color = [
    { first: "#B5D6B2", second: "#53131E", third: "#5A464C" },
    { first: "#F5F749", second: "#F24236", third: "#2E86AB" },
    { first: "#241023", second: "#6B0504", third: "#A3320B" },
    { first: "#75DBCD", second: "#FAA381", third: "#F5CDA7" },
    { first: "#e76f51", second: "#2a9d8f", third: "#f4a261" },
    { first: "#fb8500", second: "#ffb703", third: "#023047" },
    { first: "#293241", second: "#ee6c4d", third: "#e0fbfc" },
    { first: "#5f0f40", second: "#9a031e", third: "#fb8b24" },
    { first: "#355070", second: "#6d597a", third: "#b56576" },
  ];
  for (let index = 0; index < color.length; index++) {
    cardColors.push(color[Math.floor(Math.random() * color.length)]);
  }
};
