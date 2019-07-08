// Purr
const url = "https://aws.random.cat/meow";


// Timeout promises
function timePromise(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject('No response from server'), timeout);
    })
}

fetch_params = {
    mode: 'cors',
    headers: {
        "Accept": "application/json",
    }
};

const selectRandomImage = () => {
    const $images = document.getElementsByClassName('js-img');
    return $images[Math.floor(Math.random() * $images.length)];
};

// Add random kitten for fun
let swapImage = () => {
    Promise.race(
        [
            fetch(url, fetch_params),
            timePromise(3000)
        ]
    )
        .then(
            response => {
                if(response.ok) { return response.json() }
                throw new Error('Invalid response');
            })
        .then(
            response => {
                const $img = selectRandomImage();
                $img.src = response.file;
            })
        .catch(
            e => {
                console.error(e);
                const $img = selectRandomImage();
                $img.src = './assets/img/dummy-200x200.png';
            });
};