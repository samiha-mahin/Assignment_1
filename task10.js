function fetchWithTimeout(url, ms) {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, ms);

    return fetch(url, {
        signal: controller.signal
    })
    .catch(error => {
        if (error.name === "AbortError") {
            throw new Error("Request Timed Out");
        }

        throw error;
    })
    .finally(() => {
        clearTimeout(timeoutId);
    });
}

// Example
fetchWithTimeout("https://scholar.google.com/", 200)
    .then(response => console.log(response))
    .catch(error => console.log(error.message));