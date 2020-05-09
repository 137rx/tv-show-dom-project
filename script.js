//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();

  // episodeSearchBar(allEpisodes)
  // makePageForEpisodes(allEpisodes);
  // selectBoxEpisode(allEpisodes)
  // matchEpisode(allEpisodes)

  const allShows = getAllShows();
  selectBoxShow(allShows);
  displayShows(allShows);
}

const rootElem = document.getElementById("root");

let everyEpisode = document.createElement("div");
everyEpisode.className = "allEpisodes";
rootElem.appendChild(everyEpisode);
everyEpisode.innerHTML = "";

function episodeInfo(episode) {
  let eachEpisode = document.createElement("div");
  eachEpisode.className = "oneEpisode col-12 sm-col-12 md-col-5 lg-col-3";
  everyEpisode.appendChild(eachEpisode);

  let seasonNumber =
    episode.season > 10 ? episode.season : "0" + episode.season;
  let episodeNumber =
    episode.number > 10 ? episode.number : "0" + episode.number;

  eachEpisode.textContent += `${episode.name} - S${seasonNumber}E${episodeNumber}`;

  let episodeImage = document.createElement("img");
  episodeImage.setAttribute("src", episode.image.medium);
  eachEpisode.appendChild(episodeImage);

  let showSummary = document.createElement("p");
  eachEpisode.appendChild(showSummary);
  showSummary.innerHTML = episode.summary.replace("<p>", "");
  return eachEpisode;
}

function makePageForEpisodes(episodeList) {
  return episodeList.forEach((episode) => {
    episodeInfo(episode);
  });
}

let searchForm = document.createElement("form");
let targetFirstDiv = document.querySelector(".search-form");

targetFirstDiv.appendChild(searchForm);
let searchBar = document.createElement("input");
searchBar.setAttribute("type", "hidden");
searchBar.setAttribute("placeholder", "Search...");
searchForm.appendChild(searchBar);
let displayResultNumber = document.createElement("label");
searchForm.appendChild(displayResultNumber);

function episodeSearchBar(episodeList) {
  searchBar.addEventListener("keyup", () => {
    let filteredEpisodes = episodeList.filter((episode) => {
      let lowerCaseSummary = episode.summary.toLowerCase();
      let lowerCaseName = episode.name.toLowerCase();
      let searchValue = searchBar.value.toLowerCase();
      if (
        lowerCaseSummary.includes(searchValue) ||
        lowerCaseName.includes(searchValue)
      ) {
        return episode;
      }
    });

    displayResultNumber.innerHTML = `Result ${filteredEpisodes.length}/${episodeList.length}`;
    everyEpisode.innerHTML = ``;
    return makePageForEpisodes(filteredEpisodes);
  });
}

let selectEpisodeBox = document.querySelector(".select-box");

function selectBoxEpisode(episodeList) {
  selectEpisodeBox.innerHTML += `<option value=""> </option>`;

  episodeList.forEach((episode) => {
    let seasonNumber =
      episode.season > 10 ? episode.season : "0" + episode.season;
    let episodeNumber =
      episode.number > 10 ? episode.number : "0" + episode.number;
    selectEpisodeBox.innerHTML += `<option value="${episode.id}">S${seasonNumber}E${episodeNumber} - ${episode.name}</option>`;
  });
}

function matchEpisode(episodeList) {
  let selectBox = document.querySelector(".select-box");
  let targetSelectAll = document.querySelector("#selectAll");
  selectBox.addEventListener("change", (e) => {
    everyEpisode.innerHTML = ` `;
    if (!event.target.value) {
      return makePageForEpisodes(episodeList);
    } else {
      let newEpisodeList = episodeList.filter((episode) => {
        if (episode.id == event.target.value) {
          return episode;
        }
      });
      return makePageForEpisodes(newEpisodeList);
    }
  });
}

//lvl 400

let selectShowBox = document.querySelector(".selectShow");
let selectShowOption = document.querySelector("#selectAllShows");

function selectBoxShow(showList) {
  showList.forEach(
    (show) =>
      (selectShowBox.innerHTML += `<option value="${show.id}">${show.name}</option>`)
  );
}

function displayShows(showList) {
  selectShowBox.addEventListener("change", (event) => {
    everyEpisode.innerHTML = "";

    showList.filter((show) => {
      if (event.target.value == show.id) {
        searchBar.type += "search";
        return fetchShows(show.id);
      }
    });
  });
}

function fetchShows(showId) {
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      episodeSearchBar(data);
      makePageForEpisodes(data);
      selectBoxEpisode(data);
      matchEpisode(data);
    });
}
window.onload = setup;
