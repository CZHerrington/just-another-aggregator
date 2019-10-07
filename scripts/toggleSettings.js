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
const usernameSelect = document.querySelector("#usernameSelect");

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
        // console.log('book subcat listener', subcat, baseSubcategories.book[subcat])
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

        // const usernameSelect = document.querySelector("#usernameSelect");

        if (e.target.id === 'signInButton') {
            // console.log(e);
            resetCategoryButtons();
            // If new user, flip to the new user overlay
            if (usernameSelect.value === "New User") {

                document.querySelector("#settings-card-default").classList.toggle("hidden");
                document.querySelector("#settings-card-overlay").classList.toggle("hidden");   

            } else {  // Else update the name and load the user profile
                // console.log("selected other username");
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

// Populate the username choices
(function setInitialUserChoices() {
    get(apiUrlCreator(indexId))
    .then((json) => {
        for (let key in json) {
            usernameSelect.innerHTML += `<option value="${key}">${key}</option>`
        }
    })
})()

















