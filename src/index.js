console.log('%c HI', 'color: firebrick')

const IMG_URL = "https://dog.ceo/api/breeds/image/random/4";

window.addEventListener('DOMContentLoaded', () => {

    // dog image container
    const dogImages = document.querySelector('#dog-image-container');

    // get dog images
    fetch(IMG_URL)
    .then((response) => response.json())
    .then((data) => {
        const dogPicSrcs = data.message;
        dogPicSrcs.forEach(imgSrc => {
            const newImg = document.createElement('img');
            newImg.src = imgSrc;
            dogImages.append(newImg);
        });
    })
    .catch((error) => console.log(error));


});