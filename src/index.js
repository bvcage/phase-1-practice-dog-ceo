const IMG_URL = 'https://dog.ceo/api/breeds/image/random/4';
const BREED_URL = 'https://dog.ceo/api/breeds/list/all';

window.addEventListener('DOMContentLoaded', () => {

    // html elements
    const dogImages = document.querySelector('#dog-image-container');
    const dogBreedList = document.querySelector('#dog-breeds');
    const dogBreedFilter = document.querySelector('#breed-dropdown');

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

            // add breed as new line item
            // use spans to format individual li's
            const newBreed = document.createElement('li');
            const breedSpan = document.createElement('span');
            breedSpan.textContent = breed;
            newBreed.appendChild(breedSpan);

            // if there are subbreeds, implement nested ul & li's
            if (subBreed.length > 0) {

                const subBreedList = document.createElement('ul');
                subBreed.forEach((subBreed) => {
                    const newSubBreed = document.createElement('li');
                    const subBreedSpan = document.createElement('span');
                    subBreedSpan.textContent = subBreed;
                    newSubBreed.appendChild(subBreedSpan);
                    subBreedList.appendChild(newSubBreed);
                });

                // add subbreed ul to main breed li
                newBreed.appendChild(subBreedList);
            }

            // add final breed line item to list
            dogBreedList.appendChild(newBreed);
        })
    })
    .then(() => {   // change color when line item is clicked on
        const allBreedSpans = dogBreedList.querySelectorAll('span');
        allBreedSpans.forEach((element) => {
            element.addEventListener('click', (event) => {
                const breedSpan = event.target;
                breedSpan.style.color = 'blue';
            });
        });
    })
    .then(() => {   // filter breeds based on selection
        dogBreedFilter.addEventListener('change', (event) => {
            const beginLtr = event.target.value;
            const allBreedSpans = dogBreedList.querySelectorAll(':scope > li');
            allBreedSpans.forEach((dogBreed) => {
                if (beginLtr === 'all') {
                    dogBreed.style.display = 'list-item';
                } else if (dogBreed.textContent.charAt(0) === beginLtr) {
                    dogBreed.style.display = 'list-item';
                } else {
                    dogBreed.style.display = 'none';
                }
            })
        });
    })
    .catch((error) => console.log(error));


});