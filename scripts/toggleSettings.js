const expandCollapse = document.querySelector("#expandCollapse");
const settingsOverlay = document.querySelector("#settingsOverlay");
const mainContent = document.querySelector("#mainContent");


const categoryToggleRow = document.querySelector('#categoryToggleRow');
const musicToggleRow = document.querySelector('#musicToggleRow');
const movieToggleRow = document.querySelector('#movieToggleRow');
const tvToggleRow = document.querySelector('#tvToggleRow');
const bookToggleRow = document.querySelector('#bookToggleRow');
const newsToggleRow = document.querySelector('#newsToggleRow');


expandCollapse.addEventListener('click', function(e) {
    console.log('clicked');
    expandCollapse.classList.toggle('activated');
    settingsOverlay.classList.toggle('activated');
    mainContent.classList.toggle('hidden');
});

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


