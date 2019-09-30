function get(url) {
    return fetch(url)
        .then((res) => res.json())
        .catch((err) => console.error('GET request error: ', err))
};