const wrapper = document.querySelector("main");
const input = document.querySelector("input");
const list = document.querySelector(".dropdown");

const newXmlShows = new XMLHttpRequest();
newXmlShows.open("GET", `http://api.tvmaze.com/shows`);
newXmlShows.send();

const newXmlSearch = new XMLHttpRequest();

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

newXmlShows.onload = () => {
  if (newXmlShows.status >= 200 && newXmlShows.status < 400) {
    const response = JSON.parse(newXmlShows.response);
    const sorteredShows = response.sort(
      (a, b) => b.rating.average - a.rating.average
    );
    const filtereredShows = sorteredShows.filter((e, i) => i < 50);
    mapShows(filtereredShows);
  }
};

input.addEventListener("input", () => {
  list.innerHTML = "";
  newXmlSearch.open(
    "GET",
    `https://api.tvmaze.com/search/shows?q=${input.value}`
  );
  newXmlSearch.send();
  newXmlSearch.onload = () => {
    if (newXmlSearch.status >= 200 && newXmlSearch.status < 400) {
      const responseSearch = JSON.parse(newXmlSearch.responseText);
      PrintList(responseSearch);
      input.addEventListener("change", () => {
        list.innerHTML = "";
      });
    }
  };
});

function PrintList(arr) {
  arr.forEach((element) => {
    const item = document.createElement("li");
    item.textContent = element.show.name;
    item.classList.add("itemStyle");
    list.append(item);
  });
}
