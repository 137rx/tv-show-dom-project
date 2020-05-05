//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  episodeSearchBar(allEpisodes);
  makePageForEpisodes(allEpisodes);
  selectBoxEpisode(allEpisodes);
  matchEpisode(allEpisodes);
}

//lvl 100

const rootElem = document.getElementById("root");

let everyEpisode = document.createElement("div");
everyEpisode.className = "allEpisodes";
rootElem.appendChild(everyEpisode);
let dataFrom = document.querySelector(".dataFrom");
dataFrom.innerHTML = "All data from TVMaze.com";

function episodeInfo(episode) {
  let eachEpisode = document.createElement("div");
  eachEpisode.className = "oneEpisode col-12 sm-col-12 md-col-5 lg-col-3 ";
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
  return episodeList.forEach((episode) => episodeInfo(episode));
}

//lvl 200

function episodeSearchBar(episodeList) {
  let searchForm = document.createElement("form");
  let targetFirstDiv = document.querySelector(".search-form");

  targetFirstDiv.appendChild(searchForm);
  let searchBar = document.createElement("input");
  searchBar.setAttribute("type", "search");
  searchBar.setAttribute("placeholder", "Search...");
  searchForm.appendChild(searchBar);
  let displayResultNumber = document.createElement("label");
  searchForm.appendChild(displayResultNumber);

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

//lvl 300

function selectBoxEpisode(episodeList) {
  let selectBox = document.querySelector(".select-box");

  console.log(selectBox);
  episodeList.forEach((episode) => {
    let seasonNumber =
      episode.season > 10 ? episode.season : "0" + episode.season;
    let episodeNumber =
      episode.number > 10 ? episode.number : "0" + episode.number;
    selectBox.innerHTML += `<option value="${episode.id}">S${seasonNumber}E${episodeNumber} - ${episode.name}</option>`;
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

window.onload = setup;
