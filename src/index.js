const IMG_URL = 'https://dog.ceo/api/breeds/image/random/4';
const BREED_URL = 'https://dog.ceo/api/breeds/list/all';

window.addEventListener('DOMContentLoaded', () => {

    // html elements
    const dogImages = document.querySelector('#dog-image-container');
    const dogBreedList = document.querySelector('#dog-breeds');

    // get & display dog images
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

    // get & display dog breeds
    fetch(BREED_URL)
    .then((response) => response.json())
    .then((data) => {
        const dogBreeds = data.message;
        Object.entries(dogBreeds).forEach(([breed, subBreed]) => {
            const newBreed = document.createElement('li');
            newBreed.textContent = breed;
            if (subBreed.length > 0) {
                const subBreedList = document.createElement('ul');
                subBreed.forEach((subBreed) => {
                    const newSubBreed = document.createElement('li');
                    newSubBreed.textContent = subBreed;
                    subBreedList.appendChild(newSubBreed);
                });
                newBreed.appendChild(subBreedList);
            }
            dogBreedList.appendChild(newBreed);
        })
    })
    .catch((error) => console.log(error));


});