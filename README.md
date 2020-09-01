https://brabbuss.github.io/romcom/
---
# RomCom - Generate Random Romantic Book Covers!
###### Make and Save Your Own Randomly Generated or Custom Book Covers
---
## Table of Contents
* [Introduction](#introduction)
* [Features](#features)
* [Contributors](#contributors)

## Introduction
[The RomCom website](https://brabbuss.github.io/romcom/) aims to put on display the fledgling developer skills of Turing students learned by their second week, and doing so in an entertaining format. The project forces students to manipulate elements on the DOM using only JS - the CSS and HTML files were not manipulated in any way.

The site lets users generate random book covers that pull from an array of preset titles, tagline descriptors, and images. Users can save the covers they enjoy and view them later in the "View Saved Covers" section. In addition, users can also create their own custom book covers in the "Make Your Own Cover" section, which can also be saved to view later.

## Features
* [Generate Random Cover](#Generate-Random-Cover)
* [Create Custom Cover](#Create-Custom-Cover)
* [Save Current Cover](#Save-Current-Cover)
* [View Saved Covers](#View-Saved-Covers)
* [Double Click to Delete Saved Cover](#Double-Click-to-Delete-Saved-Cover)
* [Roadmap](#to-do)

#### Generate Random Cover
Upon page load, a random cover will be generated, drawing on an array of titles, cover images and tagline descriptors 'under the hood'. Clicking on "Show new random cover" in the navigation bar at the top of the site will generate - you guessed it - a new, random book cover!

<details>
  <summary>**Under the Hood**</summary>
A database of assetts for the random covers (image files, titles, and tagline descriptors) was already provided at outset of the project, which is what is drawn upon to create the cover on page load/refresh. That being said, additional assetts are added dynamically to the respective arrays upon creation of a custom cover - the inputted data is stored away and can now be drawn upon when generating random covers. To assemble a random cover upon click of the random cover button, an event listener was assigned to the button. Upon click, an assett is chosen at random from each of the arrays for the corresponding cover elements and injected into a new Class object - the new cover. It is then displayed on the home page by reassigning the corresponding HTML elements, which are targeted with the `document.querySelector()` method.
</details>

#### Create Custom Cover
Users can create their very own custom cover! Clicking "Make Your Own Cover" in the nav bar will take the user to a screen with four input fields:

![Animated gif of custom cover creation](https://media.giphy.com/media/YqzT1CKSOOmqqwwO6Y/giphy.gif)

* **Cover** - In this field, enter the url for an image you'd like to use as your cover image
* **Title** - Enter the desired title for the custom cover. The title will be displayed on the book cover
* **First and Second Descriptor** Enter one descriptor in each field. These descriptors will be inserted into a tagline displayed on the book cover

After filling in these fields, click the "Make my book" button at the bottom of the page to generate and view the custom cover. Click "Save Cover" in the navigation bar to save the cover to an array of saved covers.

<details>
  <summary>**Under the Hood**</summary>
Input fields are cleared when loading the 'make your own cover' section by setting the value of those fields to empty strings. Event listeners are attached to each input field. The value of those input fields, upon click of the 'make my book' button, are stored in their respective data arrays (i.e. value of "Cover" input will be stored in the "covers" data array, within the linked "data.js" file, etc.) with a `.push()` method. Those pieces of information are then drawn on to use in the creation of a new Class object, a new cover, which is then displayed on the home page. 
</details>

#### Save Current Cover
The "Save Cover" button in the nav bar will save the current random or user generated cover to an array of saved covers. These saved covers can be accessed in the "View Saved Covers" section at any time.

<details>
  <summary>**Under the Hood**</summary>
Using event listeners, corresponding information (values) from the various elements of the currently viewed book cover are pulled and then injected into the the creation of a new Class object (our book cover), which is then stored in an array of saved covers (`savedCovers`) to draw upon later (for viewing saved covers). Inside of this save cover function, a separate function was needed to pull two pieces of data (`descriptor1` and `descriptor2`) from the tagline string. This was accomplished by splitting the tagline string into an array of strings, and pulling the descriptors by their new index positions within that array (for our  tagline, positions [3] and [5]). Duplicates within the `savedCovers` array are avoided with a separate function. That function compares the key values of the cover being saved against the covers that have been saved in the `savedCovers` array - if all of the key values (other than the unique `id`) of the cover being saved match up with any of the object key values in the `savedCovers` array, then that is a duplicate cover and it is prevented from being added to the array. 
</details>

#### View Saved Covers
Navigate to the "View Saved Covers" section by clicking the "View Saved Covers" button in the navigation bar. This section will display all covers that were previously saved with the "Save Cover" function (clicking the "Save Cover" button). *It is important to note that all saved covers will be cleared if the page is refreshed*

![Generating random covers, saving covers, and viewing saved covers](https://media.giphy.com/media/H1HOmpNBG5Od9id6e1/giphy.gif)

<details>
  <summary>**Under the Hood**</summary>
To prevent duplicate covers from displaying, the team decided to clear HTML elements composing the displayed list of saved covers - which would be leftover from any previous visit to the saved covers section. With the section cleared, a `for loop` is used to iterate through the `savedCovers` array and inject the key values of the cover object at index [i] into the corresponding HTML elements (which are targeted with the `.querySelector()` method). Those elements are then inserted into the HTML using the `insertAdjacentHTML()` method.
</details>

#### Double Click to Delete Saved Cover
In the "View Saved Covers" section, double-clicking directly on the saved cover the user wishes to delete will remove thaqt cover from the view and remove it from the array containing the date of that saved cover.

<details>
  <summary>**Under the Hood**</summary>
A new document method was added to the `loadSavedCovers()` function that is responsible for creating a list of Nodes from the displayed covers on a "View Saved Covers" page. Using `forEach` method we apply a new double click event listener to each cover on the page upon loading the saved view section. Upon double click the `element.remove()` method is triggered, deleting the double-clicked element from the HTML storing the HTML element id in the `coverIdNumber` variable. Then `removeCoverFromSavedCovers()` function uses the `coverIdNumber` to match with the cover id in a `savedCovers` array in order to remove the saved cover from the database. 
</details>

#### Roadmap
* In the next iteration, we hope to add:
 * Ability to enlarge view of saved cover by clicking on it
 * Re-order saved covers by clicking and dragging
 * Error validation in the make custom cover section

## Contributors

<img src="https://avatars0.githubusercontent.com/u/66269306?s=400&u=b59f8ccc1002269319d952aa028ee270629b2ead&v=4" alt="Coding Mermaid"
 width="150" height="auto" />\
**Olga Morgan**
[GitHub Profile](https://github.com/scripka)

<img src="https://avatars1.githubusercontent.com/u/66697338?s=460&u=3d2e338fdeb625c1940a87b1cfdb7ba6e7d16c5c&v=4" alt="Coding Merman"
 width="150" height="auto" />\
**Scott Brabson**
[GitHub Profile](https://github.com/brabbuss)
