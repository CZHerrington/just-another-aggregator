const expandCollapse = document.querySelector("#expandCollapse");
const settingsOverlay = document.querySelector("#settingsOverlay");
const mainContent = document.querySelector("#mainContent");


const categoryToggleRow = document.querySelector('#categoryToggleRow');
const musicToggle = document.querySelector('#musicToggle');
const moviesToggle = document.querySelector('#moviesToggle');
const tvToggle = document.querySelector('#tvToggle');
const booksToggle = document.querySelector('#booksToggle');
const newsToggle = document.querySelector('#newsToggle');


expandCollapse.addEventListener('click', function(e) {
    console.log('clicked');
    expandCollapse.classList.toggle('activated');
    settingsOverlay.classList.toggle('activated');
    mainContent.classList.toggle('hidden');
});

categoryToggleRow.addEventListener('click', function(e) {
    e.target.classList.toggle('activated');
});


