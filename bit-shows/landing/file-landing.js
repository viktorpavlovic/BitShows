const wrapper = document.querySelector("main");

const newXML = new XMLHttpRequest();
newXML.open("GET", `http://api.tvmaze.com/shows`);
newXML.send();

function mapShows(obj) {
  obj.forEach((element) => {
    const cardShow = document.createElement("div");
    cardShow.classList.add("cardShowStyle");
    wrapper.append(cardShow);
    const cardShowImg = document.createElement("img");
    cardShowImg.setAttribute("src", element.image.medium);
    cardShow.append(cardShowImg);
    const cardShowName = document.createElement("p");
    cardShowName.classList.add("cardShowNameStyle");
    cardShowName.textContent = element.name;
    cardShow.append(cardShowName);
    cardShow.addEventListener("click", () => {
      window.sessionStorage.setItem("clickedShow", JSON.stringify(element));
      window.location.href = "../show-info/show-info.html";
    });
  });
}

newXML.onload = () => {
  if (newXML.status >= 200 && newXML.status < 400) {
    const response = JSON.parse(newXML.response);
    const sorteredShows = response.sort(
      (a, b) => b.rating.average - a.rating.average
    );
    const filtereredShows = sorteredShows.filter((e, i) => i < 50);
    mapShows(filtereredShows);
  }
};
