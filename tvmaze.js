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

  console.log(showArr);
  
  // Return array of shows queried. 
  return showArr;
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();
  // console.log(shows);

  for (let i = 0; i < shows.length; i++) {
    const $show = $(
        `<div data-show-id="${shows[i].id}" class="Show col-md-12 col-lg-6 mb-4">
          <div class="card" data-show-id="${shows[i].id}">
            <img 
                src="${shows[i].image}" 
                alt="${'/Volumes/LaCie/Springboard/How the Web Works and AJAX/AJAX/apis-tvmaze/Screen Shot 2021-02-05 at 8.11.23 AM.png'}" 
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

async function run() {
  let testShows = await getShowsByTerm('the office');
  
  populateShows(testShows);
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }

// let testShows = getShowsByTerm('the office');
// console.log(testShows); 

// populateShows(testShows);

run();

