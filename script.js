const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];



// unsplash API
const count = 10;
const apiKey = 'hZ3pckoCFnAmAOISrSF_zvlZB_WG-F4pS9oP8pmwi3M';
const query = 'houses';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}`;

function imageLoaded() {

    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready=', ready);
    }
}
// creat elements for links and photos, add to DOM
// helper function to set attributes on DOM element
function attributeSet(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

}
function displayPhotos() {
    // run function for each object in array
    photosArray.forEach((photo) => {
        imagesLoaded = 0;
        totalImages = photosArray.length;
        console.log('total images', totalImages);
        // creat <a> to link to unsplash
        const item = document.createElement('a');
        attributeSet(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // create image for photo
        const img = document.createElement('img');
        attributeSet(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // event listener, check when loaded
        img.addEventListener('load', imageLoaded)
        // put img inside a and put both inside container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from unsplash api

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {

    }
}

// load more photos if bottom of page scrolled
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// on load
getPhotos();