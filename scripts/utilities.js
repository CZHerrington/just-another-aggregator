function get(url) {
    return fetch(url)
        .then((res) => res.json())
        .catch((err) => console.error('GET request error: ', err))
};

/**
 * @name filterContentByKeyValue
 * @param {string} key key value to filter by (ex: 'title' or 'artist')
 * @param {object[]} filteredArray array of objects to filter by key
 * @param {string[]} valueArray array of strings, is list of values to filter out
 */
const filterContentByKeyValue = (key, filteredArray, valueArray) => filteredArray.filter((item) => valueArray.indexOf(item[key]) === -1);

function baseDeferredFilter(baseCategories) {
    console.log(baseSubcategories)
    mainContent.childNodes.forEach((child) => {
        if (child.nodeName === "DIV") {
            if (child.dataset.category !== undefined) {
                let category = child.dataset.category;
                let subcategory = child.dataset.subcategory;
                let subcategories = baseSubcategories[category];
                if (subcategories === undefined) {
                    subcategories = baseSubcategories[categoryLookup[category]]
                }
                // console.log(category);
                // console.log(subcategory);
                if (!baseCategories[category] ||
                    (category !== 'music' && subcategories[subcategory] === false)) {
                    child.classList.add('hidden')
                    setTimeout(function() {child.classList.add('removed')}, 300)
                } else {
                    child.classList.remove('hidden')
                    setTimeout(function() {child.classList.remove('removed')}, 300)
                }
            }
        }
    })
}

function sendRequest(url, method, body = undefined) {
    const options = {
        method: method,
        headers: new Headers({
            'secret-key': '$2b$10$CqwVlkVwW2FzNkqQ/9aMme/9sg9b9RQnhD995TW1MFApM.3OSmm.e',
            'Content-Type': 'application/json'
        })
    };
    if (body !== undefined) { options.body = JSON.stringify(body) }
    return fetch(url, options).then((res) => res.json());
}
// neccessary to map html ids and preference data
const categoryLookup = {
    books: 'book',
    tv: 'tv',
    movies: 'movie',
    music: 'music',
    gaming: 'gaming'
}

const emptyPrefs = {"name":"","hash":"","data":{"preferences":{"music":{"likes":[],"dislikes":[]},"gaming":{"likes":[],"dislikes":[]},"movies":{"likes":[],"dislikes":[]},"news":{"likes":[],"dislikes":[]},"tv":{"likes":[],"dislikes":[]},"books":{"likes":[],"dislikes":[]}},"defaultCategories":["movies","music","books","tv","news","gaming"],"subcategories":{"movie":{"Action":true,"Adventure":true,"Animation":true,"Comedy":true,"Crime":true,"Documentary":true,"Drama":true,"Family":true,"Fantasy":true,"History":true,"Horror":true,"Music":true,"Mystery":true,"Romance":true,"Sci-Fi":true,"TVMovie":true,"Thriller":true,"War":true,"Western":true},"book":{"Fiction":true,"Nonfiction":true},"tv":{"Action":true,"Animation":true,"Comedy":true,"Crime":true,"Documentary":true,"Drama":true,"Family":true,"Kids":true,"Mystery":true,"News":true,"Reality":true,"Sci-Fi":true,"Soap":true,"Talk":true,"War":true,"Western":true},"news":{"Arts":true,"Business":true,"Climate":true,"Health":true,"SmarterLiving":true,"Movies":true,"NewYork":true,"Opinion":true,"Style":true,"Technology":true,"TheUpshot":true,"Travel":true,"US":true,"World":true},"gaming":{"IGN":true,"Polygon":true}}}}
const apiUrl = `https://my-little-cors-proxy.herokuapp.com/https://api.jsonbin.io/b/`;
const indexId = '5d936e62ff3d100ac6c48eeb';

const apiUrlCreator = (id) => `${apiUrl}${id}/latest?nocache=${Math.random()}`; // nocache param is to prevent browser from returning 304 calls
const apiUrlCreatorCache = (id) => `${apiUrl}${id}`;
const apiUrlIndex = `${apiUrl}${indexId}`;

class User {
    constructor(name) {
        this.binIdMap = {};
        this.name = name;
        this.prefs = emptyPrefs;
        this.isLoggedIn = false;

        get(apiUrlCreator(indexId))
            .then((json) => {this.binIdMap = json})
            .then(() => {this.requestPrefs(name)})
    }

    deferredFilter() {
        mainContent.childNodes.forEach((child) => {
            if (child.nodeName === "DIV") {
                if (child.dataset.category !== undefined) {
                    let key = child.dataset.key
                    let category = child.dataset.category
                    let subcategory = child.dataset.subcategory
                    let dislikes = this.getPreferences(category)['dislikes'];
                    let defaultCategories = this.getDefaultCategories();
                    let subcategories = this.getSubcategories()[categoryLookup[category]];

                    if ((dislikes.indexOf(key) !== -1) ||
                        (defaultCategories.indexOf(category) === -1) ||
                        (category !== 'music' && subcategories && subcategories[subcategory] === false)) {
                        console.log('hiding ' + key + ' in category ' + category + '!')
                        child.classList.add('hidden')
                        setTimeout(function() {child.classList.add('removed')}, 300)
                    } else {
                        child.classList.remove('hidden')
                        setTimeout(function() {child.classList.remove('removed')}, 300)
                    }
                } else {
                    console.warn('Someone forgot to set a category!')
                }
            }
        })
    }

    requestPrefs(name) {
        if (this.binIdMap === {}) console.warn('ONLY CALL .requestPrefs() AFTER binIdMap IS POPULATED -- OTHERWISE `name` WILL BE OVERWRITTEN')
        if (!this.binIdMap[name]) {
            this.prefs = emptyPrefs;
            this._addName(name);
        } else {
            const id = this.binIdMap[name];
            // fetch prefs
            // nocache is to avoid browser 304 responses
            sendRequest(apiUrlCreator(id), 'GET')
                .then((json) => {this.prefs = json})
                .then(() => {this.deferredFilter()})
                .then(() => {this._setUICategories()})
            this.isLoggedIn = true;
            console.log(this.name + ' logged in / preferences retrieved')
        }
    }

    _setUICategories() {
        document.querySelector('#categoryToggleRow').childNodes.forEach((el) => {
            if (el.nodeName === "DIV" && !!el.id) {
                let category = el.id.split('Toggle')[0];
                if (this.prefs.data.defaultCategories.indexOf(category) !== -1) {
                    el.classList.add('activated')
                } else {
                    el.classList.remove('activated');
                } 
                // Toggle the category's settings pane visibility
                checkSettingsRowVisibility(el);
            }
        })
        document.querySelectorAll('.genreToggleWrapper').forEach((el) => {
            let category = el.id.split('Toggle')[0];
            el.childNodes.forEach((button) => {
                if (button.nodeName === "DIV") {
                    let subcategory = button.id.split(el.id)[1];
                    if (this.prefs.data.subcategories[category] && this.prefs.data.subcategories[category][subcategory]) {
                            button.classList.add('activated')
                        } else {
                            button.classList.remove('activated')
                        }
                }
            })
        })
        
    }

    _addName(name) {
        //  create new id and prefs for user
        this.prefs.name = name;
        sendRequest(apiUrl, "POST", this.prefs)
            .then((json) => {
                this.binIdMap[name] = json.id;
                sendRequest(apiUrlIndex, "PUT", this.binIdMap)
                this.persistPrefs();
                this.isLoggedIn = true;
            })
    }
    persistPrefs() {
        const id = this.binIdMap[this.name];
        if (id !== undefined) {
            sendRequest(apiUrlCreatorCache(id), "PUT", this.prefs)
        } else {
            
        }
    }

    getPreferences(category) {
        return _.get(this.prefs.data.preferences, category);
    }

    getDefaultCategories() {
        return this.prefs.data.defaultCategories;
    }

    getSubcategories() {
        return this.prefs.data.subcategories;
    }

    setLike(category, value) {
        if (this.prefs.data.preferences[category]['likes'].indexOf(value) === -1) {
            this.prefs.data.preferences[category]['likes'].push(value);
            this.persistPrefs()
            this.deferredFilter()
        }
    }

    setDislike(category, value) {
        // check if category exists
        console.log(category + ' ' + value, this.prefs.data.preferences[category]['dislikes'])
        if (this.prefs.data.preferences[category]['dislikes'].indexOf(value) === -1) {
            this.prefs.data.preferences[category]['dislikes'].push(value);
            this.persistPrefs()
            this.deferredFilter()
        }
    }

    toggleDefaultCategory(category) {
        console.log(`toggleDefaultCategory(${category})`);
        let index = this.prefs.data.defaultCategories.indexOf(category);
        if (index === -1) {
            this.prefs.data.defaultCategories.push(category);
            console.log('enabling category')
            this.persistPrefs()
        } else {
            this.prefs.data.defaultCategories.splice(index, 1);
            console.log('disabling category')
            this.persistPrefs()
        }
    }

    toggleSubcategory(category, subcategory) {
        console.log(`toggleSubcategory(${category}, ${subcategory})`);
        if (category === 'music') {
            console.log('music, ignoring')
        } else {
            let sentinel = this.prefs.data.subcategories[category][subcategory];
    
            if (! sentinel) {
                this.prefs.data.subcategories[category][subcategory] = true;
                this.persistPrefs()
                console.log('enabling subcategory')
                // this.persistPrefs()
            } else {
                this.prefs.data.subcategories[category][subcategory] = false;
                this.persistPrefs()
                console.log('disabling subcategory')
                // this.persistPrefs()
            }
        }
    }
}