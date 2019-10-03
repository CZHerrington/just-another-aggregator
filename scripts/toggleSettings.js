"use strict";

// * * * * * * * * * * * * * * * *
// * * * DOM EVENT LISTENERS * * *
// * * * * * * * * * * * * * * * *
let user = null;
const baseCategories = {"movies": true, "music": true, "books": true, "tv": true, "news": true};
const expandCollapse = document.querySelector("#expandCollapse");
const settingsOverlay = document.querySelector("#settingsOverlay");
const mainContent = document.querySelector("#mainContent");
const header = document.querySelector("#header");

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
    // filters categories if user is logged in
    if (!settingsOverlay.classList.contains('activated') && user !== null) {
        user.deferredFilter();
    }
    // filters categories if user is not logged in
    if (user === null) {
        baseDeferredFilter(baseCategories);
    }
    // Scrolls back to the top of the page
    window.scrollTo({top: 0, behavior: 'smooth'});
});

// In the settings pane, toggles the categories and genres
categoryToggleRow.addEventListener('click', function(e) {
    // Toggles the button's activated state
    e.target.classList.toggle('activated');

    // Parses the category and updates preferences
    let category = e.target.id.split('Toggle')[0];
    if (user !== null &&
        category !== 'category') {
        user.toggleDefaultCategory(category);
    }
    if (user === null) {
        baseCategories[category] = ! baseCategories[category]
    }

    // Hides/shows the appropriate settings rows
    checkSettingsRowVisibility(e.target);

});

// Hides/shows the appropriate settings rows
function checkSettingsRowVisibility(target) {
    
    // Ensures it wasn't just the row that was clicked
    if (target.classList.contains('categoryToggleRow')) {return};
    
    let category = target.id.split('Toggle')[0];

    // Toggles the row visibility if needed
    if ((target.classList.contains('activated'))) {
        ensureSettingsRowVisible("#" + category + "ToggleHr");
        ensureSettingsRowVisible("#" + category + "ToggleWrapper");
    } else {
        ensureSettingsRowHidden("#" + category + "ToggleHr");
        ensureSettingsRowHidden("#" + category + "ToggleWrapper");
    }

    // Adds hidden if absent
    function ensureSettingsRowHidden(elementID) {
        let target = document.querySelector(elementID);
    
        if (!target.classList.contains('hidden')) {
            target.classList.add('hidden');
        }
    }
    
    // Removes hidden if present
    function ensureSettingsRowVisible(elementID) {
        let target = document.querySelector(elementID);
    
        if (target.classList.contains('hidden')) {
            target.classList.remove('hidden');
        }
    }

}




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

        const usernameSelect = document.querySelector("#usernameSelect");

        if (e.target.id === 'signInButton') {
            console.log(e);
            if (usernameSelect.value === "New User") {

                document.querySelector("#settings-card-default").classList.toggle("hidden");
                document.querySelector("#settings-card-overlay").classList.toggle("hidden");   

            } else {
                console.log("selected other username");
                let username = usernameSelect.value;
                user = new User(username);
                // UPDATE THE PAGE FOR THE USER SELECTED
                document.querySelector("#welcomeHeader").textContent = `Welcome, ${username}`;
            }
        }

        if (e.target.id === 'newUserSignInButton') {

            // UPDATE, create and repopulate based on the new user name

            // Clears the input field
            let username = document.querySelector("#userNameInputField").value
            // creates a new user or instantiates an existing one
            user = new User(username);
            document.querySelector("#userNameInputField").value = '';

            // Flips back to the other screen
            document.querySelector("#settings-card-default").classList.toggle("hidden");
            document.querySelector("#settings-card-overlay").classList.toggle("hidden");  

            // Change the welcome text to the new user's name and updates the dropdown options
            document.querySelector("#welcomeHeader").textContent = `Welcome, ${username}`;
            usernameSelect.innerHTML += `<option value="${username}" selected>${username}</option>`

        }

        
    });
}

// Dislike button
mainContent.addEventListener('click', function(e) {
    if (e.target.classList.contains('voteDown')) {
        e.target.parentElement.parentElement.classList.toggle('hidden');
        setTimeout(function() {
            e.target.parentElement.parentElement.classList.toggle('removed')
        }, 300);

        if (user!== null) {
            let key = e.target.parentElement.parentElement.dataset.key;
            let category = e.target.parentElement.parentElement.dataset.category;
            user.setDislike(category, key);
        }
        // e.target.parentElement.parentElement.classList.toggle('removed');
    }
});

// SCROLL HANDLER
document.addEventListener('wheel', (e) => {
    let classes = header.classList;
    let windowScroll = window.scrollY;
    if (windowScroll > 40 && !classes.contains('scrolled')){
        header.classList.add('scrolled');
    }
    if (windowScroll < 40 && classes.contains('scrolled')){
        header.classList.remove('scrolled');
    }
}, { capture: false, passive: true });











// * * * * * * * * * * * * *
// * * * * API SECTION * * *
// * * * * * * * * * * * * *


const moviesAPIKey = "8895918e5c66d703e2331fdd92606203";
const movieGenre = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror', 
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
}
const tvGenre = {
    10759: "Action & Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    10762: "Kids",
    9648: "Mystery",
    10763: "News",
    10764: "Reality",
    10765: "Sci-Fi & Fantasy",
    10766: "Soap",
    10767: "Talk",
    10768: "War & Politics",
    37: "Western"
}

//  template html
const musicCardTemplate = `
    <div data-index="<%= id %>" data-key="<%= key %>" data-category="<%= category %>" class="small-card music-card">
        <img class="album-art" src="<%= art %>">
        <div class="song-info">
            <a href=<%= url %> target="_blank" class="titleLinks">
                <h2><%= track %></h2>
            </a>
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
// NOTE: WHICH OF THESE data tags should have genre?
const movieCardTemplate = `
    <div data-index="<%= id %>" data-key="<%= key %>" data-category="<%= category %>" data-url="<%= url %>" class="small-card music-card">
        <img class="album-art" src="<%= art %>">
        <div class="song-info">
            <a href=<%= url %> target="_blank" class="titleLinks">
                <h2><%= title %></h2>
            </a>
            <h3>Rating: <%= rating %></h3>
            <h3><i><%= genre %> Movie</i></h3>
        </div>
        <div class="upvoteDownvote">
            <img class="voteButton voteUp" src="images/thumbs-up-hand-symbol.svg">
            <img class="voteButton voteDown" src="images/thumbs-down-silhouette.svg">
        </div>
    </div>`;    
// create a new template function with your html for movies
const movieTemplateFn = _.template(movieCardTemplate);

//  template html
const tvCardTemplate = `
    <div data-index="<%= id %>" data-key="<%= key %>" data-category="<%= category %>" class="small-card music-card">
        <img class="album-art" src="<%= art %>">
        <div class="song-info">
            <h2><%= title %></h2>
            <h3>Rating: <%= rating %></h3>
            <h3><i><%= genre %> Show</i></h3>
        </div>
        <div class="upvoteDownvote">
            <img class="voteButton voteUp" src="images/thumbs-up-hand-symbol.svg">
            <img class="voteButton voteDown" src="images/thumbs-down-silhouette.svg">
        </div>
    </div>`;    
// create a new template function with your html for movies
const tvTemplateFn = _.template(tvCardTemplate);

//  template html
const bookCardTemplate = `
    <div data-index="<%= id %>" data-key="<%= key %>" data-category="<%= category %>" class="small-card music-card">
        <img class="album-art" src="<%= art %>">
        <div class="song-info">
            <a href=<%= url %> target="_blank" class="titleLinks">
                <h2><%= title %></h2>
            </a>
            <h3><%= rank %></h3>
            <h3><i><%= author %></i></h3>
        </div>
        <div class="upvoteDownvote">
            <img class="voteButton voteUp" src="images/thumbs-up-hand-symbol.svg">
            <img class="voteButton voteDown" src="images/thumbs-down-silhouette.svg">
        </div>
    </div>`; 
// create a new template function with your html for books
const bookTemplateFn = _.template(bookCardTemplate);

//  template html
const newsCardTemplate = `
    <div data-index="<%= id %>" data-key="<%= key %>" data-category="<%= category %>" class="small-card music-card">
        <img class="album-art" src="<%= art %>">
        <div class="song-info">
            <a href="<%= id %>" target="_blank" class="titleLinks">
                <h2 class="newsTitle"><%= section %>: &nbsp;<%= title %></h2>
            </a>
        </div>
        <div class="upvoteDownvote">
            <img class="voteButton voteUp" src="images/thumbs-up-hand-symbol.svg">
            <img class="voteButton voteDown" src="images/thumbs-down-silhouette.svg">
        </div>
    </div>`; 
// create a new template function with your html for books
const newsTemplateFn = _.template(newsCardTemplate);


{// GETTER FUNCTIONS
//Returns an array of HTML templates of the trending music data
// function updateTrendMusicData() {
    
//     return get(`https://theaudiodb.com/api/v1/json/1/trending.php?country=us&type=itunes&format=singles&country=us&type=itunes&format=singles`)
//         .then(responseMusic => {

//             let resultsArray = [];
//             responseMusic.trending.forEach((item) => {

//                 // Generate the HTML template
//                 let html = musicTemplateFn({'id': item.intChartPlace, 'artist': item.strArtist, 'track': item.strTrack, 'album': item.strAlbum, 'art': item.strTrackThumb + "/preview", 'key': item.strArtist, 'category': 'music'});
                
//                 resultsArray.push(html);
//             })

//             return resultsArray;
//         });
// }
}

// Returns an array of HTML templates of the top movies
function updateMovieData() {

    return get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${moviesAPIKey}`)
        .then(responseMovies => {

            let resultsArray = [];
            responseMovies.results.forEach((item) => {
                
                let movieSearch = encodeURIComponent(item.title);
                // Generate HTML template
                let html = movieTemplateFn({id: item.id,url: `https://www.google.com/search?q=${movieSearch}+trailer+youtube&btnI`, title: item.title, genre: movieGenre[item.genre_ids[0]], rating: item.vote_average, art: "https://image.tmdb.org/t/p/w200" + item.poster_path, 'key': item.title, 'category': 'movies'});
                
                // item.vote_average will return the average rating of the show/movie
                // item.release_date will return the release date
                // Maybe use this instead of release date?

                resultsArray.push(html);
            })

            return resultsArray;
        });
}

function updateTVData() {

    return get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${moviesAPIKey}`)
        .then(responseTV => {

            let resultsArray = [];
            responseTV.results.forEach((item) => {
                // Generate HTML template
                let html = tvTemplateFn({id: item.id, title: item.name, genre: tvGenre[item.genre_ids[0]], rating: item.vote_average, art: "https://image.tmdb.org/t/p/w200" + item.poster_path, 'key': item.name, 'category': 'tv'});
                
                // item.vote_average will return the average rating of the show/movie
                // item.first_air_date will return the average rating of the show/movie
                // Maybe use this instead of release date?

                resultsArray.push(html);
            })

            return resultsArray;
        });
}

// Returns an array of HTML templates of top fiction books
function updateFictionBookData() {
    
    return get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=HfHxWUxYzqeXzAYx2V26or4nU9mOnw8n`)
        .then(responseBooks => {

            let resultsArray = [];
            responseBooks.results.books.forEach((item) => {
                
                let bookSearch = encodeURIComponent(item.author + ' ' + _.startCase(_.toLower(item.title))); 
                let html = bookTemplateFn({id: item.primary_isbn10,url: `https://www.google.com/search?q=${bookSearch}+goodreads&btnI`,rank: "NYT Fiction Rank: " + item.rank, title: _.startCase(_.toLower(item.title)), author: item.author, art: item.book_image, 'key': item.title, 'category': 'books'});

                resultsArray.push(html);
            })

            return resultsArray;
        });
    
}

// Returns an array of HTML templates of top nonfiction books
function updateNonfictionBookData() {
    
    return get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json?api-key=HfHxWUxYzqeXzAYx2V26or4nU9mOnw8n`)
        .then(responseBooks => {

            let resultsArray = [];
            responseBooks.results.books.forEach((item) => {

                let bookSearch = encodeURIComponent(item.author + ' ' + _.startCase(_.toLower(item.title))); 
                let html = bookTemplateFn({id: item.primary_isbn10,url: `https://www.google.com/search?q=${bookSearch}+goodreads&btnI`,rank: "NYT Nonfiction Rank: " + item.rank, title: _.startCase(_.toLower(item.title)), author: item.author, art: item.book_image, 'key': item.title, 'category': 'books'});

                resultsArray.push(html);
            })

            return resultsArray;
        });
    
}

// Returns an array of HTML templates of top nonfiction books
function updateNewsData() {
    
    return get(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=HfHxWUxYzqeXzAYx2V26or4nU9mOnw8n`)
        .then(responseNews => {
        
            console.log(responseNews);

            let resultsArray = [];
            let url;
            responseNews.results.forEach((item) => {

                let sectionTitle = '';
                (item.section === "U.S.") ? sectionTitle = 'US' : sectionTitle = item.section;

                if (item.multimedia[1] == undefined){
                    url = "images/times.png";
                } else {
                    url = item.multimedia[1].url
                }

                let html = newsTemplateFn({id: item.short_url,title: item.title, art: url, 'key': item.title, section: sectionTitle, 'category': 'news'});

                resultsArray.push(html);
            })

            return resultsArray;
        });
    
}

// Generates the initial cards
async function updateAllCards() {

    let cardArray = [];

    // let musicArray = await updateTrendMusicData();
    let movieArray = await updateMovieData();
    let tvArray = await updateTVData();
    let nfBookArray = await updateNonfictionBookData();
    let fBookArray = await updateFictionBookData();
    let dzMusicArray = await updateDeezerData();
    let newsArray = await updateNewsData();

    cardArray = cardArray.concat(await movieArray, await tvArray, await nfBookArray, await fBookArray, await dzMusicArray, await newsArray);

    /// Hides the loading animation
    document.querySelector('#loadingAnimation').classList.toggle('hidden');

    // Randomizes the cards display order
    cardArray = _.shuffle(cardArray);

    // Appends them in the DOM
    cardArray.forEach((card) => {
        mainContent.innerHTML += card;
        // console.log(card);
    });
     /**********************************
     enable filtering by calling:
     user.deferredFilter()
     **********************************/
    addSignInEventListener();

};

updateAllCards();




// TEST DEEZER API - I believe this is better. Can make separate genre calls. No key needed. 50 calls / 5 seconds.
// https://developers.deezer.com/api/explorer?url=chart

// This maps all the genres to their IDs
const deezerGenres = 
    [{
    "id": "0",
    "name": "All",
    },
    {
    "id": "132",
    "name": "Pop",
    },
    {
    "id": "116",
    "name": "Rap/Hip Hop",
    },
    {
    "id": "122",
    "name": "Reggaeton",
    },
    {
    "id": "152",
    "name": "Rock",
    },
    {
    "id": "113",
    "name": "Dance",
    },
    {
    "id": "165",
    "name": "R&B",
    },
    {
    "id": "85",
    "name": "Alternative",
    },
    {
    "id": "186",
    "name": "Christian",
    },
    {
    "id": "106",
    "name": "Electro",
    },
    {
    "id": "466",
    "name": "Folk",
    },
    {
    "id": "144",
    "name": "Reggae",
    },
    {
    "id": "129",
    "name": "Jazz",
    },
    {
    "id": "84",
    "name": "Country",
    },
    {
    "id": "67",
    "name": "Salsa",
    },
    {
    "id": "65",
    "name": "Traditional Mexicano",
    },
    {
    "id": "98",
    "name": "Classical",
    },
    {
    "id": "173",
    "name": "Films/Games",
    },
    {
    "id": "464",
    "name": "Metal",
    },
    {
    "id": "169",
    "name": "Soul & Funk",
    },
    {
    "id": "2",
    "name": "African Music",
    },
    {
    "id": "16",
    "name": "Asian Music",
    },
    {
    "id": "153",
    "name": "Blues",
    },
    {
    "id": "75",
    "name": "Brazilian Music",
    },
    {
    "id": "71",
    "name": "Cumbia",
    },
    {
    "id": "81",
    "name": "Indian Music",
    },
    {
    "id": "95",
    "name": "Kids",
    },
    {
    "id": "197",
    "name": "Latin Music",
    }] 

    // let deezerURL = "https://api.deezer.com/chart/0"; // The 0 means all genres, sub ids for different genre charts


function updateDeezerData() {

    return get(`https://my-little-cors-proxy.herokuapp.com/https://api.deezer.com/chart/0/tracks`)
        .then(responseMusic => {

            let resultsArray = [];
            responseMusic.data.forEach((item) => {
                
                let musicSearch = encodeURIComponent(item.artist.name + ' ' + item.title);
                // Generate the HTML template
                let html = musicTemplateFn({'id': item.position, url:  `https://www.google.com/search?q=${musicSearch}+youtube&btnI`, 'artist': item.artist.name, 'track': item.title, 'album': item.album.title, 'art': item.album.cover_medium, 'key': item.artist.name, 'category': 'music'});
                
                resultsArray.push(html);
            })

            return resultsArray;
        });
}