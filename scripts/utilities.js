function get(url) {
    return fetch(url)
        .then((res) => res.json())
        .catch((err) => console.err('GET request error: ', err))
}