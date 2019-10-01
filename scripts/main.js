"use strict";

//jquery to select the element on the DOM
const main = $('main')


//  template html
const musicCardTemplate = `
    <div data-index="<%= id %>" class="small-card music-card">
        <img class="album-art" src="<%= art %>">
        <div class="song-info">
            <h2><%= track%></h2>
            <h3><%= artist%></h3>
            <h3><i><%= album%></i></h3>
        </div>
        <div class="upvoteDownvote">
            <img class="voteButton" src="images/thumbs-up-hand-symbol.svg">
            <img class="voteButton" src="images/thumbs-down-silhouette.svg">
        </div>
    </div>`;    

// create a new template function with your html
const musicTemplateFn = _.template(musicCardTemplate);


// call the template function, passing it data. This returns compiled html
function createMusicList(response) {
    let musicArray = _.reverse(response.trending);
    musicArray.forEach(
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


//create a function to retrieve trending music data
function updateTrendData() {
    
    get(`https://theaudiodb.com/api/v1/json/1/trending.php?country=us&type=itunes&format=singles&country=us&type=itunes&format=singles`)
    .then(response => {
        createMusicList(response);
        //console.log("response is ", response);
    });

updateTrendData();
}
    





