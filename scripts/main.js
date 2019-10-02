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


// create a new template function with your html for music
const musicTemplateFn = _.template(musicCardTemplate);

// create a new template function with your html for movies
const movieTemplateFn = _.template(movieCardTemplate);


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
        console.log(item.title);    
        console.log(item.genre_ids[0]);
        console.log(item.poster_path);
        console.log(item.release_date);
        console.log(item.id);
            let html = movieTemplateFn({id: item.id, title: item.title, genre: item.genre_ids[0], date: item.release_date, art: "https://image.tmdb.org/t/p/w200" + item.poster_path});
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

updateTrendMusicData();

//create a function to retrieve movie data
function updateMovieData() {
    
    get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${moviesKey}`)
    .then(responseMovies => {
        createMoviesList(responseMovies);
        //console.log("response is ", responseMovies);
        //console.log("response is ", responseMovies.results.title);
    });
          
}

updateMovieData();