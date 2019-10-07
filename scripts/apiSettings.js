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
    });

    addSignInEventListener();

};

updateAllCards();