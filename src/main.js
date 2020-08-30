// Create variables targetting the relevant DOM elements here 👇
var coverImage = document.querySelector('.cover-image');
var coverTitle = document.querySelector('.cover-title');
var coverTagline = document.querySelector('.tagline');
var showRandomCoverButton = document.querySelector('.random-cover-button');
var makeOwnCover = document.querySelector('.make-new-button');
var formView = document.querySelector('.form-view');
var homeView = document.querySelector('.home-view');
var saveCoverButton = document.querySelector('.save-cover-button');
var homeViewButton = document.querySelector('.home-button');
var savedViewButton = document.querySelector('.view-saved-button');
var savedView = document.querySelector('.saved-view');

var userCoverInput = document.querySelector('#cover')
var userTitleInput = document.querySelector('#title')
var userDescriptor1Input = document.querySelector('#descriptor1')
var userDescriptor2Input = document.querySelector('#descriptor2')
var userCreateNewCoverButton = document.querySelector('.create-new-book-button')

var savedCoversSection = document.querySelector('.saved-covers-section')
var taglineArray = []

// We've provided a few variables below
var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];
var currentCover;
var userNewBookCover;
var homeCurrentCover;
// var currentCustomCover = [];

// Add your event listeners here 👇
showRandomCoverButton.addEventListener('click', displayNewCover);
makeOwnCover.addEventListener('click', unhideFormView);
savedViewButton.addEventListener('click',() => {
  unhideSavedView();
  // loadSavedCovers();
});
homeViewButton.addEventListener('click', unhideHomeView);

userCreateNewCoverButton.addEventListener('click',() => {
  saveUserNewCoverData();
  createUserNewCover();
  unhideHomeView();
});
saveCoverButton.addEventListener('click',() => {
  saveCurrentCover();
  deleteDuplicateCover()

});

// Create your event handlers and other functions here 👇
function getRandomIndex(bookItem) {
  var randomIndex = Math.floor(Math.random() * bookItem.length)
  return bookItem[randomIndex]
}

function createNewCover() {
  currentCover = new Cover(getRandomIndex(covers), getRandomIndex(titles), getRandomIndex(descriptors), getRandomIndex(descriptors))
  var tagline1 = getRandomIndex(descriptors)
  var tagline2 = getRandomIndex(descriptors)
  while (tagline1 === tagline2) {
    tagline2 = getRandomIndex(descriptors)
  }
  return currentCover
}

function displayNewCover() {
  var newCoverItem = createNewCover()
  coverImage.src = newCoverItem.cover
  coverTitle.textContent = newCoverItem.title
  coverTagline.textContent = `A tale of ${newCoverItem.tagline1} and ${newCoverItem.tagline2}`
}

function unhideFormView() {
  savedView.style.display = 'none'
  formView.style.display = 'block'
  homeView.style.display = 'none'
  showRandomCoverButton.style.display = 'none'
  saveCoverButton.style.display = 'none'
  homeViewButton.style.display = 'block'
  clearFields()
}

function unhideSavedView() {
  savedView.style.display = 'block'
  homeView.style.display = 'none'
  showRandomCoverButton.style.display = 'none'
  saveCoverButton.style.display = 'none'
  homeViewButton.style.display = 'block'
  formView.style.display = 'none'
}

function unhideHomeView() {
  savedView.style.display = 'none'
  homeView.style.display = 'block'
  showRandomCoverButton.style.display = 'block'
  saveCoverButton.style.display = 'block'
  homeViewButton.style.display = 'none'
  formView.style.display = 'none'
}

function clearFields() {
  userTitleInput.value = ''
  userCoverInput.value = ''
  userDescriptor1Input.value = ''
  userDescriptor2Input.value = ''
}

function saveUserNewCoverData() {
  titles.push(userTitleInput.value)
  covers.push(userCoverInput.value)
  descriptors.push(userDescriptor1Input.value, userDescriptor2Input.value)
  event.preventDefault();
}

function createUserNewCover() {
  userNewBookCover = new Cover(covers[covers.length-1], titles[titles.length-1], descriptors[descriptors.length-2], descriptors[descriptors.length-1])
  coverImage.src = userNewBookCover.cover
  coverTitle.textContent = userNewBookCover.title
  coverTagline.textContent = `A tale of ${userNewBookCover.tagline1} and ${userNewBookCover.tagline2}`
}

function deleteDuplicateCover() {
  var workingEmptyArray = []
  for (i = 0; i < savedCovers.length - 1; i++) {
    var bookValues = Object.values(savedCovers[i])
    var newBookValues = Object.values(savedCovers[savedCovers.length - 1])
    for (j = 1; j < bookValues.length; j++) {
      if (bookValues[j] === newBookValues[j]) {
        workingEmptyArray.push(bookValues[j])
      }
    }
  }
  if (workingEmptyArray.length === 4) {
    savedCovers.pop()
  }
}

function loadSavedCovers() {
  var miniCoverBlock =
  `
  <div class="mini-cover">
    <img class="mini-cover" src="${homeCurrentCover.cover}">
    <h2 class="cover-title cover-title::first-letter">${homeCurrentCover.title}</h2>
    <h3 class="tagline">A tale of ${homeCurrentCover.tagline1} and ${homeCurrentCover.tagline2}</h3>
  </div>
  `
  savedCoversSection.insertAdjacentHTML("afterbegin", miniCoverBlock)
}

// saveCurrentCover() for saving current homepage cover into savedCovers array
// splitTagline() pushed descriptors into array, this fxn uses them and
// then cleans the array out with .splice()
function saveCurrentCover() {
  splitTagline()
  homeCurrentCover = new Cover(coverImage.src, coverTitle.textContent, taglineArray[0], taglineArray[1])
  savedCovers.push(homeCurrentCover)
  loadSavedCovers()
  return cleanTempArrays()
}

function cleanTempArrays() {
  taglineArray.splice(0,2)
  // currentCustomCover.splice(0,1)
}
// splitTagline() fxn inside of saveCurrentCover(). split tagline to save desc1 and desc2
function splitTagline() {
  var taglineWordCount = coverTagline.textContent.split(" ")
  return taglineArray.push(taglineWordCount[3], taglineWordCount[5])
}

displayNewCover();

