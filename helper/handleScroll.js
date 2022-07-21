export const handleScroll = () => {
  var text = document.getElementById("text");
  var bird1 = document.getElementById("bird1");
  var bird2 = document.getElementById("bird2");
  var forest = document.getElementById("forest");
  var rocks = document.getElementById("rocks");
  var mrCookie = document.getElementById("mr-cookie");

  window.addEventListener("scroll", () => {
    let value = window.scrollY;

    text.style.top = `${60 + value * -0.5}%`;
    bird1.style.top = `${value * -1.5}px`;
    bird2.style.top = `${value * -1.5}px`;
    rocks.style.top = `${value * -0.12}px`;
    forest.style.top = `${value * 0.25}px`;
    mrCookie.style.top = `${210 + value * -0.12}px`;
  });
};
