function get(url) {
    return fetch(url)
        .then((res) => res.json())
        .catch((err) => console.error('GET request error: ', err))
};

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

const emptyPrefs = {"name":"","hash":"","data":{"preferences":{"music":{"likes":[],"dislikes":[]},"movies":{"likes":[],"dislikes":[]},"news":{"likes":[],"dislikes":[]},"tv":{"likes":[],"dislikes":[]},"books":{"likes":[],"dislikes":[]}},"defaultCategories":["movies", "music", "books", "tv", "news"]}};
const apiUrl = `https://my-little-cors-proxy.herokuapp.com/https://api.jsonbin.io/b/`;
const indexId = '5d936e62ff3d100ac6c48eeb';

const apiUrlCreator = (id) => `${apiUrl}${id}/latest?nocache=${Math.random()}`
const apiUrlCreatorCache = (id) => `${apiUrl}${id}`
const apiUrlIndex = `${apiUrl}${indexId}`
class Api {
    constructor(name) {
        this.binIdMap = {};
        this.name = name;
        this.prefs = emptyPrefs;

        console.log('init Api()')
        get(apiUrlCreator(indexId))
            .then((json) => {this.binIdMap = json})
            .then(() => console.log("got binIdMap: ", this.binIdMap))
            .then(() => {this.requestPrefs(name)})
    }

    requestPrefs(name) {
        if (this.binIdMap === {}) console.warn('ONLY CALL ._requestPrefs() AFTER binIdMap IS POPULATED')
        if (!this.binIdMap[name]) {
            console.log('_requestPrefs can\'t find ' + name)
            this.prefs = emptyPrefs;
            this._addName(name);
        } else {
            console.log(name + ' exists, returning prefs');
            const id = this.binIdMap[name];
            // nocache is to avoid browser 304 responses
            // fetch prefs
            sendRequest(apiUrlCreator(id), 'GET')
                .then((json) => {this.prefs = json})
                .then((json) => console.log('got prefs', this.prefs))
        }
    }

    _addName(name) {
        console.log('adding name', name)
        //  create new id and prefs for user
        this.prefs.name = name;
        this.name = name;
        sendRequest(apiUrl, "POST", this.prefs)
            .then((json) => {
                console.log('new id ', json);
                this.binIdMap[name] = json.id;
                sendRequest(apiUrlIndex, "PUT", this.binIdMap)
                this.persistPrefs()
            })
    }
    persistPrefs() {
        console.log('persist prefs', this.prefs);
        const id = this.binIdMap[this.name];
        if (id !== undefined) {
            sendRequest(apiUrlCreatorCache(id), "PUT", this.prefs)
        } else {
            console.log('name undefined ', this.binIdMap)
        }
    }

    getPreferences(category) {
        return _.get(this.prefs.data.preferences, category);
    }

    getDefaultCategories() {
        return this.prefs.data.defaultCategories;
    }

    setLike(category, value) {
        if (this.prefs.data.preferences[category]['likes'].indexOf(value) === -1) {
            this.prefs.data.preferences[category]['likes'].push(value);
            this.persistPrefs()
        }
    }

    setDislike(category, value) {
        if (this.prefs.data.preferences[category]['dislikes'].indexOf(value) === -1) {
            this.prefs.data.preferences[category]['dislikes'].push(value);
            this.persistPrefs()
        }
    }

    toggleDefaultCategory(category) {
        let index = this.prefs.data.defaultCategories.indexOf(category);
        if (index === -1) {
            this.prefs.data.defaultCategories.push(category);
        } else {
            delete this.prefs.data.defaultCategories.splice(index, 1);
        }
    }
}