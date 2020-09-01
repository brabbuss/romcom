// Create variables targetting the relevant DOM elements here 👇
var coverImage = document.querySelector('.cover-image')
var coverTitle = document.querySelector('.cover-title')
var coverTagline = document.querySelector('.tagline')

var showRandomCoverButton = document.querySelector('.random-cover-button')
var saveCoverButton = document.querySelector('.save-cover-button')
var homeViewButton = document.querySelector('.home-button')
var savedViewButton = document.querySelector('.view-saved-button')
var makeOwnCoverButton = document.querySelector('.make-new-button')
var userCreateNewCoverButton = document.querySelector('.create-new-book-button')

var userCoverInput = document.querySelector('#cover')
var userTitleInput = document.querySelector('#title')
var userDescriptor1Input = document.querySelector('#descriptor1')
var userDescriptor2Input = document.querySelector('#descriptor2')

var savedCoversSection = document.querySelector('.saved-covers-section')

// We've provided a few variables below
var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];
var taglineArray = []
var displayViewSettings = {}

// Add your event listeners here 👇
showRandomCoverButton.addEventListener('click', displayNewCover)

makeOwnCoverButton.addEventListener('click', unhideFormView)

homeViewButton.addEventListener('click', unhideHomeView)

savedViewButton.addEventListener('click',() => {
  unhideSavedView()
  loadSavedCovers()
})

userCreateNewCoverButton.addEventListener('click',() => {
  saveUserNewCoverData()
  createUserNewCover()
  unhideHomeView()
})

saveCoverButton.addEventListener('click',() => {
  saveCurrentCover()
  deleteDuplicateCover()
})

// Create your event handlers and other functions here 👇
function getRandomIndex(bookItem) {
  var randomIndex = Math.floor(Math.random() * bookItem.length)
  return bookItem[randomIndex]
}

function createNewCover() {
  var currentCover = new Cover(getRandomIndex(covers), getRandomIndex(titles), getRandomIndex(descriptors), getRandomIndex(descriptors))
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
  displayViewSettings = {
    savedView: 'none',
    formView: 'block',
    homeView: 'none',
    showRandomCoverButton: 'none',
    saveCoverButton: 'none',
    homeViewButton: 'block',
  }
  switchPageViewsSettings(displayViewSettings)
  clearFields()
}

function unhideSavedView() {
  displayViewSettings = {
    savedView: 'block',
    formView: 'none',
    homeView: 'none',
    showRandomCoverButton: 'none',
    saveCoverButton: 'none',
    homeViewButton: 'block',
  }
  switchPageViewsSettings(displayViewSettings)
}

function unhideHomeView() {
  displayViewSettings = {
    savedView: 'none',
    formView: 'none',
    homeView: 'block',
    showRandomCoverButton: 'block',
    saveCoverButton: 'block',
    homeViewButton: 'none',
  }
  switchPageViewsSettings(displayViewSettings)
}

function switchPageViewsSettings(displayViewSettings) {
  var formView = document.querySelector('.form-view')
  var homeView = document.querySelector('.home-view')
  var savedView = document.querySelector('.saved-view')

  savedView.style.display = displayViewSettings.savedView
  formView.style.display = displayViewSettings.formView
  homeView.style.display = displayViewSettings.homeView
  showRandomCoverButton.style.display = displayViewSettings.showRandomCoverButton
  saveCoverButton.style.display = displayViewSettings.saveCoverButton
  homeViewButton.style.display = displayViewSettings.homeViewButton
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
  var userNewBookCover = new Cover(covers[covers.length-1], titles[titles.length-1], descriptors[descriptors.length-2], descriptors[descriptors.length-1])
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
  cleanViewCoversPage()
  savedCovers.forEach((cover, i) => {
    var miniCoverBlock =
     `
      <div id="${cover.id}" class="mini-cover">
        <img class="mini-cover" src="${cover.cover}">
        <h2 class="cover-title cover-title::first-letter">${cover.title}</h2>
        <h3 class="tagline">A tale of ${cover.tagline1} and ${cover.tagline2}</h3>
      </div>
      `
      savedCoversSection.insertAdjacentHTML("afterbegin", miniCoverBlock)
  })
  var coversList = document.querySelectorAll(`div.mini-cover`)
  coversList.forEach((divElement, i) => {
    divElement.addEventListener('dblclick', () =>  {
      divElement.remove()
      var coverIdNumber = divElement.id
      removeCoverFromSavedCovers(coverIdNumber)
    })
  })
}

function removeCoverFromSavedCovers(coverId) {
  for (var j = 0; j < savedCovers.length; j++){
    var index = j
    if (coverId == savedCovers[index].id){
      savedCovers.splice(index, 1)
    }
  }
}

function cleanViewCoversPage() {
        savedCoversSection.innerHTML = ""
}

function saveCurrentCover() {
  splitTagline()
  var homeCurrentCover = new Cover(coverImage.src, coverTitle.textContent, taglineArray[0], taglineArray[1])
  savedCovers.push(homeCurrentCover)
  return cleanTempArrays()
}

function cleanTempArrays() {
  taglineArray.splice(0,2)
}

function splitTagline() {
  var taglineWordCount = coverTagline.textContent.split(" ")
  return taglineArray.push(taglineWordCount[3], taglineWordCount[5])
}


displayNewCover()
