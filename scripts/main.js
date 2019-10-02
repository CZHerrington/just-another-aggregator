"use strict";

/* Api class use example: */
// let api = new Api('example#3')

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
const main = $('main')

//  template html
const musicCardTemplate = `
    <div data-index="<%= id %>" class="small-card music-card">
        <img class="album-art" src="<%= art %>">
        <div class="song-info">
            <h2><%= track %></h2>
            <h3><%= artist %></h3>
            <h3><i><%= album %></i></h3>
        </div>
        <div class="upvoteDownvote">
            <img class="voteButton" src="images/thumbs-up-hand-symbol.svg">
            <img class="voteButton" src="images/thumbs-down-silhouette.svg">
        </div>
    </div>`;    

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
            <img class="voteButton" src="images/thumbs-up-hand-symbol.svg">
            <img class="voteButton" src="images/thumbs-down-silhouette.svg">
        </div>
    </div>`;    

//  template html
const bookCardTemplate = `
    <div data-index="<%= id %>" class="small-card music-card">
        <img class="album-art" src="<%= art %>">
        <div class="song-info">
            <h2><%= title %></h2>
            <h3><%= rank %></h3>
            <h3><i><%= author %></i></h3>
        </div>
        <div class="upvoteDownvote">
            <img class="voteButton" src="images/thumbs-up-hand-symbol.svg">
            <img class="voteButton" src="images/thumbs-down-silhouette.svg">
        </div>
    </div>`; 

// create a new template function with your html for music
const musicTemplateFn = _.template(musicCardTemplate);

// create a new template function with your html for movies
const movieTemplateFn = _.template(movieCardTemplate);

// create a new template function with your html for movies
const bookTemplateFn = _.template(bookCardTemplate);

// call the music template function, passing it data. This returns compiled html
function createMusicList(responseMusic) {
    let musicArray = _.reverse(responseMusic.trending);
    console.log(musicArray);
    let musicArray4 = musicArray.splice(0,4);
    console.log(musicArray4);
    musicArray4.forEach(
        (item) => {
            //let item = musicArray[musicArray.length - index - 1]
        //console.log(item.intChartPlace);    
        //console.log(item.strArtist);
        //console.log(item.strTrack);
        //console.log(item.strAlbum);
        //console.log(item.strTrackThumb);
            let html = musicTemplateFn({id: item.intChartPlace, artist: item.strArtist, track: item.strTrack, album: item.strAlbum, art: item.strTrackThumb + "/preview"});
            main.append(html)
        }
    )
}

// call the movies template function, passing it data. This returns compiled html
function createMoviesList(responseMovies) {
    let movieArray = responseMovies.results;
    console.log(movieArray);
    let movieArray4 = movieArray.splice(0,10);
    console.log(movieArray4);
    movieArray4.forEach(
        (item) => {
            //let item = musicArray[musicArray.length - index - 1]
        //console.log(item.title);    
        //console.log(item.genre_ids[0]);
        //console.log(item.poster_path);
        //console.log(item.release_date);
        //console.log(item.id);
            let html = movieTemplateFn({id: item.id, title: item.title, genre: item.genre_ids[0], date: item.release_date, art: "https://image.tmdb.org/t/p/w200" + item.poster_path});
            main.append(html)
        }
    )
}

// call the books template function, passing it data. This returns compiled html
function createBooksList(responseBooks, genre) {
    let bookArray = responseBooks.results.books;
    console.log(bookArray);
    let bookArray4 = bookArray.splice(0,10);
    console.log(bookArray4);
    bookArray4.forEach(
        (item) => {
            //let item = musicArray[musicArray.length - index - 1]
            console.log("Title: ", item.title =  _.startCase(_.toLower(item.title)));
            //console.log("Author: ", item.books.author);
            //console.log("NY Times Rank: ", item.books.rank);
            //console.log("data tag: ", item.books.primary_isbn10);
            //console.log("data tag: ", item.books.book_image);
            //console.log(item.title);    
            //console.log(item.genre_ids[0]);
        //console.log(item.poster_path);
        //console.log(item.release_date);
        //console.log(item.id);
            let html = bookTemplateFn({id: item.primary_isbn10,rank: "NY Times Rank: " + item.rank, title: item.title, author: item.author, art: item.book_image});
            main.append(html)
        }
    )
}


//create a function to retrieve trending music data
function updateTrendMusicData() {
    
    get(`https://theaudiodb.com/api/v1/json/1/trending.php?country=us&type=itunes&format=singles&country=us&type=itunes&format=singles`)
    .then(responseMusic => {
        createMusicList(responseMusic);
        //console.log("response is ", response);
    });
          
}


//create a function to retrieve movie data
function updateMovieData() {
    
    get(`https://api.themoviedb.org/3/trending/movie/day?api_key=8895918e5c66d703e2331fdd92606203`)
    .then(responseMovies => {
        createMoviesList(responseMovies);
        console.log("response is ", responseMovies);
        
    });
    
}

//create a function to retrieve fiction books data
function updateBookData() {
    
    get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=HfHxWUxYzqeXzAYx2V26or4nU9mOnw8n`)
    .then(responseBooks => {
        createBooksList(responseBooks);
        console.log("response is ", responseBooks);
    });
    
}

//create a function to retrieve fiction books data
function updateNfBookData() {
    
    get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json?api-key=HfHxWUxYzqeXzAYx2V26or4nU9mOnw8n`)
    .then(responseBooks => {
        createBooksList(responseBooks);
        console.log("response is ", responseBooks);
    });
    
}

//trigger api calls for category data defaults
updateTrendMusicData();
updateMovieData();
updateBookData();
updateNfBookData();





