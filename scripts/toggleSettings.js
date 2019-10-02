"use strict";

// * * * * * * * * * * * * * * * *
// * * * DOM EVENT LISTENERS * * *
// * * * * * * * * * * * * * * * *

const expandCollapse = document.querySelector("#expandCollapse");
const settingsOverlay = document.querySelector("#settingsOverlay");
const mainContent = document.querySelector("#mainContent");

// const settingsCardDefault = document.querySelector("#settings-card-default");
// const settingsCardOverlay = document.querySelector("#settings-card-overlay");

const categoryToggleRow = document.querySelector('#categoryToggleRow');
const musicToggleRow = document.querySelector('#musicToggleRow');
const movieToggleRow = document.querySelector('#movieToggleRow');
const tvToggleRow = document.querySelector('#tvToggleRow');
const bookToggleRow = document.querySelector('#bookToggleRow');
const newsToggleRow = document.querySelector('#newsToggleRow');

// Toggles the settings panel
expandCollapse.addEventListener('click', function(e) {
    expandCollapse.classList.toggle('activated');
    settingsOverlay.classList.toggle('activated');
    mainContent.classList.toggle('hidden');
});

// In the settings pane, toggles the categories and genres
categoryToggleRow.addEventListener('click', function(e) {
    e.target.classList.toggle('activated');
});
musicToggleRow.addEventListener('click', function(e) {
    e.target.classList.toggle('activated');
});
movieToggleRow.addEventListener('click', function(e) {
    e.target.classList.toggle('activated');
});
tvToggleRow.addEventListener('click', function(e) {
    e.target.classList.toggle('activated');
});
bookToggleRow.addEventListener('click', function(e) {
    e.target.classList.toggle('activated');
});
newsToggleRow.addEventListener('click', function(e) {
    e.target.classList.toggle('activated');
});

// Sign In Buttons (appending the items removes my
//   signInCard assignemnt, so adding the listener afterwards)
function addSignInEventListener() {
    const signInCard = document.querySelector("#signInCard");

    signInCard.addEventListener('click', function(e) {

        if (e.target.id === 'signInButton') {
            console.log(e);
            if (document.querySelector("#usernameSelect").value === "New User") {

                document.querySelector("#settings-card-default").classList.toggle("hidden");
                document.querySelector("#settings-card-overlay").classList.toggle("hidden");   

            } else {

                // UPDATE THE PAGE FOR THE USER SELECTED
            }
        }

        if (e.target.id === 'newUserSignInButton') {
            console.log(e);
            // UPDATE, create and repopulate based on the new user name

            document.querySelector("#settings-card-default").classList.toggle("hidden");
            document.querySelector("#settings-card-overlay").classList.toggle("hidden");  
        }

        
    });
}

// Dislike button
mainContent.addEventListener('click', function(e) {
    if (e.target.classList.contains('voteDown')) {
        e.target.parentElement.parentElement.classList.toggle('hidden');
    }
});












// * * * * * * * * * * * * *
// * * * * API SECTION * * *
// * * * * * * * * * * * * *



/* Api class use example: */
let user = new Api('zachtest');
// api.deferredFilter(mainContent);

/* using setTimeout() to simulate delay */
// setTimeout(
//     ()=> {
//         api.setDislike('movies', '50 first dates')
//         api.setLike('music', 'basically everything')
//         api.toggleDefaultCategory('movies')

//         const musicPrefs = api.getPreferences('music')
//         const defaultCategories = api.getDefaultCategories()
//     }, 4000
// )

//jquery to select the element on the DOM
// const mainContent = $('main'); NOTE: Redundant, done above
const moviesAPIKey = "8895918e5c66d703e2331fdd92606203";

//  template html
const musicCardTemplate = `
    <div data-index="<%= id %>" data-key="<%= key %>" data-category="<%= category %>" class="small-card music-card">
        <img class="album-art" src="<%= art %>">
        <div class="song-info">
            <h2><%= track %></h2>
            <h3><%= artist %></h3>
            <h3><i><%= album %></i></h3>
        </div>
        <div class="upvoteDownvote">
            <img class="voteButton voteUp" src="images/thumbs-up-hand-symbol.svg">
            <img class="voteButton voteDown" src="images/thumbs-down-silhouette.svg">
        </div>
    </div>`;  
// create a new template function with your html for music
const musicTemplateFn = _.template(musicCardTemplate);  

//  template html
const movieCardTemplate = `
    <div data-index="<%= id %>" class="small-card music-card">
        <img class="album-art" src="<%= art %>">
        <div class="song-info">
            <h2><%= title %></h2>
            <h3><%= genre %></h3>
            <h3><i><%= date %></i></h3>
        </div>
        <div class="upvoteDownvote">
            <img class="voteButton voteUp" src="images/thumbs-up-hand-symbol.svg">
            <img class="voteButton voteDown" src="images/thumbs-down-silhouette.svg">
        </div>
    </div>`;    
// create a new template function with your html for movies
const movieTemplateFn = _.template(movieCardTemplate);




// GETTER FUNCTIONS
//Returns an array of HTML templates of the trending music data
function updateTrendMusicData() {
    
    return get(`https://theaudiodb.com/api/v1/json/1/trending.php?country=us&type=itunes&format=singles&country=us&type=itunes&format=singles`)
        .then(responseMusic => {

            let resultsArray = [];
            responseMusic.trending.forEach((item) => {

                // Generate the HTML template
                let html = musicTemplateFn({'id': item.intChartPlace, 'artist': item.strArtist, 'track': item.strTrack, 'album': item.strAlbum, 'art': item.strTrackThumb + "/preview", 'key': item.strArtist, 'category': 'music'});
                
                resultsArray.push(html);
            })

            return resultsArray;
        });
}

// Returns an array of HTML templates of the top movies
function updateMovieData() {

    return get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${moviesAPIKey}`)
        .then(responseMovies => {

            let resultsArray = []
            responseMovies.results.forEach((item) => {
                
                // Generate HTML template
                let html = movieTemplateFn({id: item.id, title: item.title, genre: item.genre_ids[0], date: item.release_date, art: "https://image.tmdb.org/t/p/w200" + item.poster_path});
                
                resultsArray.push(html);
            })

            return resultsArray;
        });
}



// MUSIC LOGIC
// // call the music template function, passing it data. This returns compiled html
// function createMusicList(responseMusic) {
//     let musicArray = _.reverse(responseMusic.trending);
//     // let musicArray4 = musicArray.splice(0,4);
//     let resultsArray = [];
//     musicArray.forEach(
//         (item) => {
//             let html = musicTemplateFn({'id': item.intChartPlace, 'artist': item.strArtist, 'track': item.strTrack, 'album': item.strAlbum, 'art': item.strTrackThumb + "/preview"});
//             // mainContent.innerHTML += html;
//             resultsArray += html;
//         }
//     )
//     return resultsArray;
// }

// // MOVIE LOGIC
// call the movies template function, passing it data. This returns compiled html
// function createMoviesList(responseMovies) {
//     let movieArray = responseMovies.results;
//     // let movieArray4 = movieArray.splice(0,10);
//     let resultsArray = [];
//     movieArray.forEach(
//         (item) => {
//             let html = movieTemplateFn({id: item.id, title: item.title, genre: item.genre_ids[0], date: item.release_date, art: "https://image.tmdb.org/t/p/w200" + item.poster_path});
//             // mainContent.innerHTML += html;
//             resultsArray += html;
//         }
//     )

//     return resultsArray;
// }


// Generates the initial cards
async function updateAllCards() {

    let cardArray = [];

    let cardArray1 = await updateTrendMusicData();
    let cardArray2 = await updateMovieData();

    cardArray = cardArray.concat(await cardArray1);
    cardArray = cardArray.concat(await cardArray2);

    cardArray = _.shuffle(cardArray);


    cardArray.forEach((card) => {
        mainContent.innerHTML += card;
        // console.log(card);
    });
    user.deferredFilter()
    addSignInEventListener();

};

updateAllCards();

