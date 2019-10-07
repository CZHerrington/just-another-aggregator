"use strict";

let user = null;
const baseCategories = {"movies": true, "music": true, "books": true, "tv": true, "news": true, "gaming": true};
const baseSubcategories = {"movie":{"Action":true,"Adventure":true,"Animation":true,"Comedy":true,"Crime":true,"Documentary":true,"Drama":true,"Family":true,"Fantasy":true,"History":true,"Horror":true,"Music":true,"Mystery":true,"Romance":true,"Sci-Fi":true,"TVMovie":true,"Thriller":true,"War":true,"Western":true},"book":{"Fiction":true,"Nonfiction":true},"tv":{"Action":true,"Animation":true,"Comedy":true,"Crime":true,"Documentary":true,"Drama":true,"Family":true,"Kids":true,"Mystery":true,"News":true,"Reality":true,"Sci-Fi":true,"Soap":true,"Talk":true,"War":true,"Western":true},"news":{"Arts":true,"Business":true,"Climate":true,"Health":true,"SmarterLiving":true,"Movies":true,"NewYork":true,"Opinion":true,"Style":true,"Technology":true,"TheUpshot":true,"Travel":true,"US":true,"World":true},"gaming":{"IGN":true,"Polygon":true}};

// * * * * * * * * * * * * * * * *
// * * * DOM EVENT LISTENERS * * *
// * * * * * * * * * * * * * * * *
const expandCollapse = document.querySelector("#expandCollapse");
const settingsOverlay = document.querySelector("#settingsOverlay");
const mainContent = document.querySelector("#mainContent");
const header = document.querySelector("#header");

const categoryToggleRow = document.querySelector('#categoryToggleRow');

const musicToggle = document.querySelector("#musicToggle");
const moviesToggle = document.querySelector("#moviesToggle");
const tvToggle = document.querySelector("#tvToggle");
const booksToggle = document.querySelector("#booksToggle");
const newsToggle = document.querySelector("#newsToggle");
const gamingToggle = document.querySelector("#gamingToggle");
const categoryToggles = [musicToggle, moviesToggle, tvToggle, booksToggle, newsToggle, gamingToggle];

const musicToggleRow = document.querySelector('#musicToggleRow');
const movieToggleRow = document.querySelector('#movieToggleRow');
const tvToggleRow = document.querySelector('#tvToggleRow');
const bookToggleRow = document.querySelector('#bookToggleRow');
const newsToggleRow = document.querySelector('#newsToggleRow');
const gamingToggleRow = document.querySelector('#gamingToggleRow');

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


// Toggles the category buttons
musicToggleRow.addEventListener('click', function(e) {
    e.target.classList.toggle('activated');
});
movieToggleRow.addEventListener('click', function(e) {
    e.target.classList.toggle('activated');

    if (user !== null) {
        let subcat = e.target.id.split('movieToggleRow')[1];
        user.toggleSubcategory('movie', subcat);
    } else {
        let subcat = e.target.id.split('movieToggleRow')[1];
        baseSubcategories.movie[subcat] = ! baseSubcategories.movie[subcat];
    }
});
tvToggleRow.addEventListener('click', function(e) {
    e.target.classList.toggle('activated');

    if (user !== null) {
        let subcat = e.target.id.split('tvToggleRow')[1];
        user.toggleSubcategory('tv', subcat);
    } else {
        let subcat = e.target.id.split('tvToggleRow')[1];
        baseSubcategories.tv[subcat] = ! baseSubcategories.tv[subcat];
    }
});
bookToggleRow.addEventListener('click', function(e) {
    e.target.classList.toggle('activated');

    if (user !== null) {
        let subcat = e.target.id.split('bookToggleRow')[1];
        user.toggleSubcategory('book', subcat);
    } else {
        let subcat = e.target.id.split('bookToggleRow')[1];
        baseSubcategories.book[subcat] = ! baseSubcategories.book[subcat];
        console.log('book subcat listener', subcat, baseSubcategories.book[subcat])
    }
});
newsToggleRow.addEventListener('click', function(e) {
    e.target.classList.toggle('activated');

    if (user !== null) {
        let subcat = e.target.id.split('newsToggleRow')[1];
        user.toggleSubcategory('news', subcat);
    } else {
        let subcat = e.target.id.split('newsToggleRow')[1];
        baseSubcategories.news[subcat] = ! baseSubcategories.news[subcat];
    }
});
gamingToggleRow.addEventListener('click', function(e) {
    e.target.classList.toggle('activated');

    if (user !== null) {
        let subcat = e.target.id.split('gamingToggleRow')[1];
        user.toggleSubcategory('gaming', subcat);
    } else {
        let subcat = e.target.id.split('gamingToggleRow')[1];
        baseSubcategories.gaming[subcat] = ! baseSubcategories.gaming[subcat];
    }
});

// Sign In Buttons (appending the items removes my
//   signInCard assignemnt, so adding the listener afterwards)
function addSignInEventListener() {
    const signInCard = document.querySelector("#signInCard");

    signInCard.addEventListener('click', function(e) {

        const usernameSelect = document.querySelector("#usernameSelect");

        if (e.target.id === 'signInButton') {
            // console.log(e);
            resetCategoryButtons();
            // If new user, flip to the new user overlay
            if (usernameSelect.value === "New User") {

                document.querySelector("#settings-card-default").classList.toggle("hidden");
                document.querySelector("#settings-card-overlay").classList.toggle("hidden");   

            } else {  // Else update the name and load the user profile
                console.log("selected other username");
                let username = usernameSelect.value;
                user = new User(username);
                // Update the page for the selected user
                document.querySelector("#welcomeHeader").textContent = `Welcome, ${username}`;
            }
        }

        if (e.target.id === 'newUserSignInButton') {

            // UPDATE, create and repopulate based on the new user name

            resetCategoryButtons();

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
    // If the dislike butotn was pressed...
    if (e.target.classList.contains('voteDown')) {
        // flip to 0 opacity for 300ms to let the transition animation play
        e.target.parentElement.parentElement.classList.toggle('hidden');
        setTimeout(function() {
            // then remove the card from the page flow
            e.target.parentElement.parentElement.classList.toggle('removed')
        }, 300);

        // If signed in, store the user's dislike for that item
        if (user!== null) {
            let key = e.target.parentElement.parentElement.dataset.key;
            let category = e.target.parentElement.parentElement.dataset.category;
            user.setDislike(category, key);
        }
        // e.target.parentElement.parentElement.classList.toggle('removed');
    }
});

// Darkens the header on scroll
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

function resetCategoryButtons() {
    // Reset the toggles before sign in
    categoryToggles.forEach(function(item) {
        item.classList.add("activated");
    })
}









// * * * * * * * * * * * * *
// * * * * API SECTION * * *
// * * * * * * * * * * * * *

// Lists used to match the top movie/show with its genre
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
    <div data-index="<%= id %>" data-key="<%= key %>" data-category="<%= category %>" data-subcategory="<%= subcategory %>" class="small-card music-card">
        <img class="album-art" src="<%= art %>">
        <div class="song-info">
            <a href=<%= url %> target="_blank" class="titleLinks">
                <h2><%= track %></h2>
            </a>
            <h3><%= artist %></h3>
            <h3><i><%= album %></i></h3>
        </div>
        <div class="upvoteDownvote">
            <svg width="24" height="24" class="voteButton voteDown" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 10.293l5.293-5.293.707.707-5.293 5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707 5.293-5.293-5.293-5.293.707-.707 5.293 5.293z"/></svg>
        </div>
    </div>`;  
// create a new template function with your html for music
const musicTemplateFn = _.template(musicCardTemplate);  

//  template html
// NOTE: WHICH OF THESE data tags should have genre?
const movieCardTemplate = `
    <div data-index="<%= id %>" data-key="<%= key %>" data-category="<%= category %>" data-subcategory="<%= subcategory %>" data-url="<%= url %>" class="small-card music-card">
        <img class="album-art" src="<%= art %>">
        <div class="song-info">
            <a href=<%= url %> target="_blank" class="titleLinks">
                <h2><%= title %></h2>
            </a>
            <h3>Rating: <%= rating %></h3>
            <h3><i><%= genre %> Movie</i></h3>
        </div>
        <div class="upvoteDownvote">
            <svg width="24" height="24" class="voteButton voteDown" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 10.293l5.293-5.293.707.707-5.293 5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707 5.293-5.293-5.293-5.293.707-.707 5.293 5.293z"/></svg>
        </div>
    </div>`;    
// create a new template function with your html for movies
const movieTemplateFn = _.template(movieCardTemplate);

//  template html
const tvCardTemplate = `
    <div data-index="<%= id %>" data-key="<%= key %>" data-category="<%= category %>" data-subcategory="<%= subcategory %>" class="small-card music-card">
        <img class="album-art" src="<%= art %>">
        <div class="song-info">
            <a href=<%= url %> target="_blank" class="titleLinks">
                <h2><%= title %></h2>
            </a>
            <h3>Rating: <%= rating %></h3>
            <h3><i><%= genre %> Show</i></h3>
        </div>
        <div class="upvoteDownvote">
            <svg width="24" height="24" class="voteButton voteDown" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 10.293l5.293-5.293.707.707-5.293 5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707 5.293-5.293-5.293-5.293.707-.707 5.293 5.293z"/></svg>
        </div>
    </div>`;    
// create a new template function with your html for movies
const tvTemplateFn = _.template(tvCardTemplate);

//  template html
const bookCardTemplate = `
    <div data-index="<%= id %>" data-key="<%= key %>" data-category="<%= category %>" data-subcategory="<%= subcategory %>" class="small-card music-card">
        <img class="album-art" src="<%= art %>">
        <div class="song-info">
            <a href=<%= url %> target="_blank" class="titleLinks">
                <h2><%= title %></h2>
            </a>
            <h3><%= rank %></h3>
            <h3><i><%= author %></i></h3>
        </div>
        <div class="upvoteDownvote">
            <svg width="24" height="24" class="voteButton voteDown" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 10.293l5.293-5.293.707.707-5.293 5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707 5.293-5.293-5.293-5.293.707-.707 5.293 5.293z"/></svg>
        </div>
    </div>`; 
// create a new template function with your html for books
const bookTemplateFn = _.template(bookCardTemplate);

//  template html
const newsCardTemplate = `
    <div data-index="<%= id %>" data-key="<%= key %>" data-category="<%= category %>" data-subcategory="<%= subcategory %>" class="small-card music-card">
        <img class="album-art" src="<%= art %>">
        <div class="song-info">
            <a href="<%= id %>" target="_blank" class="titleLinks">
                <h2 class="newsTitle"><%= section %>: &nbsp;<%= title %></h2>
            </a>
        </div>
        <div class="upvoteDownvote">
            <svg width="24" height="24" class="voteButton voteDown" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 10.293l5.293-5.293.707.707-5.293 5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707 5.293-5.293-5.293-5.293.707-.707 5.293 5.293z"/></svg>
        </div>
    </div>`; 
// create a new template function with your html for books
const newsTemplateFn = _.template(newsCardTemplate);

//  template html
const gamingCardTemplate = `
    <div data-index="<%= id %>" data-key="<%= key %>" data-category="<%= category %>" data-subcategory="<%= subcategory %>" class="small-card music-card">
        <img class="album-art" src="<%= art %>">
        <div class="song-info">
            <a href="<%= url %>" target="_blank" class="titleLinks">
                <h2 class="newsTitle"><%= publisher %>: &nbsp;<%= title %></h2>
            </a>
        </div>
        <div class="upvoteDownvote">
            <svg width="24" height="24" class="voteButton voteDown" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 10.293l5.293-5.293.707.707-5.293 5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707 5.293-5.293-5.293-5.293.707-.707 5.293 5.293z"/></svg>
        </div>
    </div>`; 
// create a new template function with your html for books
const gamingTemplateFn = _.template(gamingCardTemplate); 


// GETTER FUNCTIONS

// Returns an array of HTML templates of the top movies
function updateMovieData() {

    return get(`https://api.themoviedb.org/3/trending/movie/week?api_key=8895918e5c66d703e2331fdd92606203`)
        .then(responseMovies => {

            let resultsArray = [];
            responseMovies.results.forEach((item) => {
                
                let movieSearch = encodeURIComponent(item.title);
                // Generate HTML template
                let html = movieTemplateFn({
                    id: item.id,
                    url: `https://www.google.com/search?q=${movieSearch}+trailer+youtube&btnI`,
                    title: item.title,
                    genre: movieGenre[item.genre_ids[0]],
                    rating: item.vote_average,
                    art: "https://image.tmdb.org/t/p/w200" + item.poster_path,
                    'key': item.title,
                    'category': 'movies',
                    subcategory: movieGenre[item.genre_ids[0]]
                });
                
                // item.vote_average will return the average rating of the show/movie
                // item.release_date will return the release date
                // Maybe use this instead of release date?

                resultsArray.push(html);
            })

            return resultsArray;
        });
}

// Returns an array of HTML templates of the top tv shows
function updateTVData() {

    return get(`https://api.themoviedb.org/3/trending/tv/week?api_key=8895918e5c66d703e2331fdd92606203`)
        .then(responseTV => {

            let resultsArray = [];
            responseTV.results.forEach((item) => {

                // Create the Google 'Lucky' search query components
                let tvSearch = encodeURIComponent(item.name); 

                // Generate HTML template
                let html = tvTemplateFn({
                    id: item.id,
                    title: item.name,
                    url: `https://www.google.com/search?q=${tvSearch}+show+trailer+youtube&btnI`,
                    genre: tvGenre[item.genre_ids[0]],
                    rating: item.vote_average,
                    art: "https://image.tmdb.org/t/p/w200" + item.poster_path,
                    'key': item.name,
                    'category': 'tv',
                    subcategory: tvGenre[item.genre_ids[0]]
                });
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
                
                // Create the Google 'Lucky' search query components
                let bookSearch = encodeURIComponent(item.author + ' ' + _.startCase(_.toLower(item.title))); 

                let html = bookTemplateFn({
                    id: item.primary_isbn10,
                    url: `https://www.google.com/search?q=${bookSearch}+goodreads&btnI`,
                    rank: "NYT Fiction Rank: " + item.rank,
                    title: _.startCase(_.toLower(item.title)),
                    author: item.author,
                    art: item.book_image,
                    'key': item.title,
                    'category': 'books',
                    subcategory: 'Fiction'
                });
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

                // Create the Google 'Lucky' search query components
                let bookSearch = encodeURIComponent(item.author + ' ' + _.startCase(_.toLower(item.title))); 

                let html = bookTemplateFn({
                    id: item.primary_isbn10,
                    url: `https://www.google.com/search?q=${bookSearch}+goodreads&btnI`,
                    rank: "NYT Nonfiction Rank: " + item.rank,
                    title: _.startCase(_.toLower(item.title)),
                    author: item.author,
                    art: item.book_image,
                    'key': item.title,
                    'category': 'books',
                    subcategory: 'Nonfiction'
                });

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
            let urlCount = 0;
            responseNews.results.forEach((item) => {

                let sectionTitle = '';
                // Clean up "US" so it doesn't show as U.S.:
                (item.section === "U.S.") ? sectionTitle = 'US' : sectionTitle = item.section;

                // If the image is in the article, use it. Otherwise, default to the NYT logo.
                if (item.multimedia[1] == undefined){
                    url = "images/times.png";
                } else {
                    url = item.multimedia[1].url
                }

                let html = newsTemplateFn({
                    id: item.short_url,
                    title: item.title,
                    art: url,
                    'key': item.title,
                    section: sectionTitle,
                    'category': 'news',
                    'subcategory': item.section
                });
                // NOTE: I'm limiting us to 20 articles
                if (urlCount <= 20) {resultsArray.push(html)}
                urlCount++;
            })

            return resultsArray;
        });
    
}

// Returns an array of HTML templates of top songs
function updateDeezerData() {

    return get(`https://my-little-cors-proxy.herokuapp.com/https://api.deezer.com/playlist/2098157264?limit=30`)
        .then(responseMusic => {

            let resultsArray = [];
            responseMusic.tracks.data.forEach((item) => {
                
                let musicSearch = encodeURIComponent(item.artist.name + ' ' + item.title);
                // Generate the HTML template
                let html = musicTemplateFn({
                    'id': item.position,
                    url:  `https://www.google.com/search?q=${musicSearch}+youtube&btnI`,
                    'artist': item.artist.name,
                    'track': item.title,
                    'album': item.album.title,
                    'art': item.album.cover_medium,
                    'key': item.artist.name,
                    'category': 'music',
                    subcategory: 'sub'
                });
                
                resultsArray.push(html);
            })

            return resultsArray;
        });
}
    
// Returns an array of HTML templates of top songs
function updateGamingData() {

    return get(`https://newsapi.org/v2/top-headlines?apiKey=335ef27328fb481aa97916cb3c338206&pageSize=20&sources=ign,polygon`)
        .then(responseGames => {

            let resultsArray = [];
            responseGames.articles.forEach((item) => {

                console.log(item.source.name);

                // Generate the HTML template
                let html = gamingTemplateFn({
                    'id': item.source.id,
                    'url':  item.url,
                    'publisher': item.source.name,
                    'title': item.title,
                    'art': item.urlToImage,
                    'key': item.title,
                    'category': 'gaming',
                    subcategory: item.source.name
                });
                
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
    let gamingArray = await updateGamingData();

    cardArray = cardArray.concat(await movieArray, await tvArray, await nfBookArray, await fBookArray, await dzMusicArray, await newsArray, await gamingArray);
    
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







