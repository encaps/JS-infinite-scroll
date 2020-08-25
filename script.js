
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let readyLoadingAllImages = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'sxwvXQhor42IyHNMO3jFGMej_k62fWqT-ejMKqWNdU4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images have been loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        readyLoadingAllImages = true;
        loader.hidden = true;
        console.log("readyLoadingAllImages = true");
    }
    
}

// Helpers 
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
    totalImages = photosArray.length;
    imagesLoaded = 0;
    photosArray.forEach(photo => {
        
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item,{
           href: photo.links.html,
           target:'_blank',
        });
       
        // Create <img> for photo
        const image = document.createElement('img');
        setAttributes(image,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
         })
        // Event Listener, check when loading is done
        image.addEventListener('load', imageLoaded);

        //Put <img> inside <a>, then put both inside image-container Element
        item.appendChild(image);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    readyLoadingAllImages = false;
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error) {
        console.log(error)
    }
}

// Add Event Listeners

// Scroll near bottom? Load more photos
window.addEventListener('scroll', () => {

    // window.innerHeight = total height of browser window
    // window.scrollY = distance from top of page user has scrolled

   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && readyLoadingAllImages) {  
        console.log('load more')
        getPhotos();
   }
   
});


// On Load 

getPhotos();