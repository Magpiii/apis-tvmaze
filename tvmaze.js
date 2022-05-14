"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  const res = await axios.get('https://api.tvmaze.com/search/shows', { params: { q: `${term}`} }); 
  // Source: (https://stackoverflow.com/questions/64319107/convert-array-of-objects-with-promise-to-normal-array, accessed 14 May 2022). 
  const resArray = await Promise.all(res.data);

  // for (let show of res.data) {
  //   if (show.image.original === null || show.image.original === undefined) {
  //     show.image.original = '/Volumes/LaCie/Springboard/How the Web Works and AJAX/AJAX/apis-tvmaze/Screen Shot 2021-02-05 at 8.11.23 AM.png';
  //   }
  // }
  
  // Return array of shows queried. 
  return resArray;
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    let showImage = show.show.image.original;

    // Set default image if show object from API call doesn't return an 
    // image.
    if (showImage === null || showImage === undefined) {
      showImage = '/Volumes/LaCie/Springboard/How the Web Works and AJAX/AJAX/apis-tvmaze/Screen Shot 2021-02-05 at 8.11.23 AM.png';
    }

    const $show = $(
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src="${showImage}" 
              alt="Bletchly Circle San Francisco" 
              class="w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);

    $showsList.append($show);  }
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

let shows = getShowsByTerm('the office');

console.log(shows);
populateShows(shows);

