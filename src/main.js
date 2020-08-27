// Create variables targetting the relevant DOM elements here 👇
var coverImage = document.querySelector('.cover-image')
var coverTitle = document.querySelector('.cover-title')
var coverDescriptor = document.querySelector('.tagline')
var showRandomCover = document.querySelector(`.random-cover-button`)


// We've provided a few variables below
var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];
var currentCover;
// Add your event listeners here 👇
showRandomCover.addEventListener('click', displayNewCover);

// Create your event handlers and other functions here 👇

function getRandomIndex(bookItem) {
  var randomIndex = Math.floor(Math.random() * bookItem.length)
  return bookItem[randomIndex]
}

function createNewCover(){
  currentCover = new Cover(getRandomIndex(covers), getRandomIndex(titles), getRandomIndex(descriptors), getRandomIndex(descriptors))
  if (currentCover.tagline1 === currentCover.tagline2) {
    createNewCover()
  }
  return currentCover
}

function displayNewCover() {
  coverImage.src = createNewCover().cover
  coverTitle.textContent = createNewCover().title
  coverDescriptor.textContent = `A tale of ${createNewCover().tagline1} and ${createNewCover().tagline2}`
}

displayNewCover()
