//You can edit ALL of the code here

//This content is from https://www.tvmaze.com/
//specifically: https://api.tvmaze.com/shows/82/episodes

function setup() {
  const allEpisodes = getAllEpisodes();
  episodeSearchBar(allEpisodes);
  makePageForEpisodes(allEpisodes);
 
}

function makePageForEpisodes(episodeList) {

  const rootElem = document.getElementById("root");

  let allEpisodes = document.createElement("div");
  allEpisodes.className = "allEpisodes";
  rootElem.appendChild(allEpisodes);

  let myVar = episodeList.forEach((episode) => {
    let eachEpisode = document.createElement("div");
    eachEpisode.className = "oneEpisode";
    allEpisodes.appendChild(eachEpisode);

    let seasonNumber =
      episode.season > 10 ? epissode.season : "0" + episode.season;
    let episodeNumber =
      episode.number > 10 ? epissode.number : "0" + episode.number;

    eachEpisode.textContent += `${episode.name} - S${seasonNumber}E${episodeNumber}`;

    let episodeImage = document.createElement("img");
    episodeImage.setAttribute("src", episode.image.medium);
    eachEpisode.appendChild(episodeImage);

    let showSummary = document.createElement("p");
    eachEpisode.appendChild(showSummary);
    showSummary.innerHTML += episode.summary.replace("<p>", "");
  });
}

function episodeSearchBar(episodeList) {
  const rootElem = document.getElementById("root");
  let searchForm = document.createElement("form");
  rootElem.appendChild(searchForm);
  let searchBar = document.createElement("input");
  searchBar.setAttribute("type", "search");
  searchBar.setAttribute("placeholder", "Search...");
  searchForm.appendChild(searchBar);
  let displayResultNumber = document.createElement("label");
  searchForm.appendChild(displayResultNumber);

  function filterEpisodes() {
    let filteredEpisodes = episodeList.filter((episode) => {
      let lowerCaseSummary = episode.summary.toLowerCase();
      let lowerCaseName = episode.name.toLowerCase();
      let searchValue = searchBar.value.toLowerCase();
      if (
        lowerCaseSummary.includes(searchValue) ||
        lowerCaseName.includes(searchValue)
      ) {
        return true
      }
    });

    displayResultNumber.innerHTML = `Result ${filteredEpisodes.length}/${episodeList.length}`;
    makePageForEpisodes(filteredEpisodes)
  }
  searchBar.addEventListener("keyup", filterEpisodes);
}

window.onload = setup;
