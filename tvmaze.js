"use strict";

const $showsList = $('#shows-list');
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  const res = await axios.get('https://api.tvmaze.com/search/shows', { params: { q: `${term}`} }); 
  // Source: (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map, accessed 14 May 2022)
  const showArr = res.data.map(el => {
    let show = el.show;

    return { id: show.id, name: show.name, summary: show.summary, image: show.image ? show.image.original : '/Volumes/LaCie/Springboard/How the Web Works and AJAX/AJAX/apis-tvmaze/Screen Shot 2021-02-05 at 8.11.23 AM.png'};
  });

  // console.log(showArr);
  
  // Return array of shows queried. 
  return showArr;
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();
  // console.log(shows);

  for (let i = 0; i < shows.length; i++) {
    const $show = $(
        `<div id="${shows[i].id}" data-show-id="${shows[i].id}" class="Show col-md-12 col-lg-6 mb-4">
          <div class="card" data-show-id="${shows[i].id}">
            <img 
                src="${shows[i].image}" 
                alt="https://tinyurl.com/tv-missing" 
                class="w-25 mr-3">
              <div class="card-body">
                <h5 class="text-primary">${shows[i].name}</h5>
                <div><small>${shows[i].summary}</small></div>
                <button class="btn btn-success btn-sm get-episodes">
                  Episodes
                </button>
              </div>
          </div>  
       </div>
      `);
    
    $showsList.append($show);  
  }
}

async function searchAndDisplayShows(query) {
  let shows = await getShowsByTerm(query);
  console.log(shows);
  
  populateShows(shows);
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

// async function searchForShowAndDisplay() {
//   const term = $("#searchForm-term").val();
//   const shows = await getShowsByTerm(term);

//   $episodesArea.hide();
//   populateShows(shows);
// }

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  // await searchForShowAndDisplay();
});

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) { 
  const episodes = axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
  console.log(episodes);

  const episodeArr = res.data.map(el => {
    let episode = el.show;

    return { id: episode.id, name: episode.name, season: episode.season, number: episode.number};
  });

  return episodeArr;
}

/** Write a clear docstring for this function... */

function populateEpisodes(episodes) { 
  for (let i = 0; i < episodes.length; i++) {
    const $episode = $(
      `<li class="episode-list">
        <ul class="episode">
        
        </ul>
      </li>`
    );
  } 
}

async function searchAndDisplayEpisodes() {
  let episodes = getEpisodesOfShow($()); 
}

$('#search-button').click(function() {
  console.log($('#search-query').val()); 

  searchAndDisplayShows($('#search-query').val());
}); 

// Source: (https://api.jquery.com/on/, accessed 17 May 2022). 
// Source: (https://api.jquery.com/closest/, accessed 17 May 2022). 
$("#shows-list").on("click", ".get-episodes", async function handleEpisodeClick(evt) {
  // Source: (https://api.jquery.com/data/, accessed 17 May 2022). 
  let showId = $(evt.target).closest(".Show").data("show-id");
  let episodes = await getEpisodesOfShow(showId);
  populateEpisodes(episodes);
});

