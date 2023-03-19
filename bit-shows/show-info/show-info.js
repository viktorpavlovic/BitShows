const show = JSON.parse(sessionStorage.getItem("clickedShow"));
const title = document.querySelector("h1");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const showDetails = document.querySelector(".show-details");
const imgWrap = document.querySelector("figcaption");
const listOfDate = document.querySelector(".season-cast");
const listOfCast = document.querySelector(".cast");
title.textContent = show.name;

const printContent = (obj) => {
  const mainImg = document.createElement("img");
  mainImg.setAttribute("src", obj.image.original);
  mainImg.classList.add("imgStyle");
  imgWrap.append(mainImg);

  const showDetailsText = document.createElement("p");
  showDetailsText.textContent = obj.summary.replace(/<\/?(p|b|i)>/g, "");
  showDetails.append(showDetailsText);
};

const printSeasons = (obj) => {
  const season = document.createElement("h3");
  season.textContent = `Seasons (${obj.length})`;
  right.prepend(season);
  obj.forEach((element) => {
    const dates = document.createElement("li");
    dates.textContent = `${element.premiereDate} - ${element.endDate}`;
    listOfDate.append(dates);
  });
};

const printCast = (obj) => {
  const filteredCast = obj.filter((e, i) => i < 8);
  filteredCast.forEach((element) => {
    const cast = document.createElement("li");
    cast.textContent = element.person.name;
    listOfCast.append(cast);
  });
};

printContent(show);

const newXmlSeason = new XMLHttpRequest();
newXmlSeason.open("GET", `https://api.tvmaze.com/shows/${show.id}/seasons`);
newXmlSeason.send();
newXmlSeason.onload = () => {
  if (newXmlSeason.status >= 200 && newXmlSeason.status < 400) {
    const response = JSON.parse(newXmlSeason.response);
    printSeasons(response);
  }
};
const newXmlCast = new XMLHttpRequest();
newXmlCast.open("GET", `https://api.tvmaze.com/shows/${show.id}/cast`);
newXmlCast.send();
newXmlCast.onload = () => {
  if (newXmlCast.status >= 200 && newXmlCast.status < 400) {
    const responseCast = JSON.parse(newXmlCast.response);
    printCast(responseCast);
  }
};
