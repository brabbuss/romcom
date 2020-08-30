// Create variables targetting the relevant DOM elements here 👇
var coverImage = document.querySelector('.cover-image');
var coverTitle = document.querySelector('.cover-title');
var coverDescriptor = document.querySelector('.tagline');
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
// We've provided a few variables below
var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];
var currentCover;
var userNewBookCover;

// Add your event listeners here 👇
showRandomCoverButton.addEventListener('click', displayNewCover);
makeOwnCover.addEventListener('click', unhideFormView);
savedViewButton.addEventListener('click', unhideSavedView);
homeViewButton.addEventListener('click', unhideHomeView);
userCreateNewCoverButton.addEventListener('click', saveUserNewCoverData);
saveCoverButton.addEventListener('click', saveUserNewCover);
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
  coverDescriptor.textContent = `A tale of ${newCoverItem.tagline1} and ${newCoverItem.tagline2}`
}

function unhideFormView() {
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
  createUserNewCover()
  unhideHomeView()
  event.preventDefault();
}

function createUserNewCover() {
  userNewBookCover = new Cover (covers[covers.length-1], titles[titles.length-1], descriptors[descriptors.length-2], descriptors[descriptors.length-1])
  coverImage.src = userNewBookCover.cover
  coverTitle.textContent = userNewBookCover.title
  coverDescriptor.textContent = `A tale of ${userNewBookCover.tagline1} and ${userNewBookCover.tagline2}`
  return userNewBookCover
}

function saveUserNewCover() {
  savedCovers.push(userNewBookCover)
  unhideSavedView()
  deleteDuplicateCover()
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

displayNewCover()

// if (savedCovers[i].cover === userNewBookCover.cover
//   && savedCovers[i].title === userNewBookCover.title
//   && savedCovers[i].tagline1 === userNewBookCover.tagline1
//   && savedCovers[i].tagline2 === userNewBookCover.tagline2) {
//   savedCovers.pop(userNewBookCover)
// }
