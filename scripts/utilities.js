function get(url) {
    return fetch(url)
        .then((res) => res.json())
        .catch((err) => console.error('GET request error: ', err))
};

function sendRequest(url, method, body = undefined) {
    const options = {
        method: method,
        headers: new Headers({'secret-key': '$2b$10$CqwVlkVwW2FzNkqQ/9aMme/9sg9b9RQnhD995TW1MFApM.3OSmm.e', 'Content-Type': 'application/json'}),
        // mode: 'no-cors'
    };
    if (body !== undefined) {
        options.body = JSON.stringify(body)
    }
    return fetch(url, options)
        .then((res) => res.json());
}

const dummyBinIdMap = {"zach!": "nonexistent"};
const emptyPrefs = {"name":"","hash":"","data":{"preferences":{"music":{"likes":[],"dislikes":[]},"movies":{"likes":[],"dislikes":[]},"news":{"likes":[],"dislikes":[]}},"defaultCategories":[]}};

class Api {
    constructor() {
        this.binIdMap = {};
        this.name = null;
        this.prefs = emptyPrefs;

        console.log('init Api()')
        get('https://my-little-cors-proxy.herokuapp.com/https://api.jsonbin.io/b/5d936e62ff3d100ac6c48eeb/latest')
            .then((json) => {this.binIdMap = json})
            .then(() => console.log("got binIdMap: ", this.binIdMap))
            .then(() => {this.getPrefs('Zach')}) /* this is just for testing, remove when we have ui hooks */
    }

    getPrefs(name) {
        if (this.binIdMap === {}) console.warn('ONLY CALL .getPrefs() AFTER binIdMap IS POPULATED')
        if (!this.binIdMap[name]) {
            console.log('getPrefs can\'t find ' + name)
            this._addName(name);
            this.prefs = emptyPrefs;
        } else {
            console.log(name + ' exists, returning prefs');
            const id = this.binIdMap[name];
            // nocache is to avoid browser 304 responses
            sendRequest(`https://my-little-cors-proxy.herokuapp.com/https://api.jsonbin.io/b/${id}/latest?nocache=${Math.random()}`, 'GET')
                .then((json) => {this.prefs = json})
                .then((json) => console.log('got prefs', this.prefs))
            // fetch prefs
        }
    }

    _addName(name) {
        console.log('adding name', name)
        //  create new id and prefs for user
        this.prefs.name = name;
        this.name = name;
        sendRequest(`https://my-little-cors-proxy.herokuapp.com/https://api.jsonbin.io/b/`, "POST", this.prefs)
            .then((json) => {
                console.log('new id ', json);
                this.binIdMap[name] = json.id;
                sendRequest(`https://my-little-cors-proxy.herokuapp.com/https://api.jsonbin.io/b/5d936e62ff3d100ac6c48eeb`, "PUT", this.binIdMap)
                this.persistPrefs()
            })

        //  update binIdIndex

    }

    persistPrefs() {
        console.log('persist prefs', this.prefs);
        const id = this.binIdMap[this.name];
        if (id !== undefined) {
            sendRequest(`https://my-little-cors-proxy.herokuapp.com/https://api.jsonbin.io/b/${id}`, "PUT", this.prefs)
        } else {
            console.log('name undefined')
        }
    }
}