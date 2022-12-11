console.log("Connected");
/* Global Variables  */
var contentArea = document.getElementById("content-area");
var dropdown1 = document.getElementById("dropdown-1");
var dropdown2 = document.getElementById("dropdown-2");
var dropdown3 = document.getElementById("dropdown-3");
var dropdownItem_1_1 = document.getElementById("dropdown-item-1-1");
var dropdownItem_1_2 = document.getElementById("dropdown-item-1-2");
var dropdownItem_1_3 = document.getElementById("dropdown-item-1-3");
var dropdownItem_1_4 = document.getElementById("dropdown-item-1-4");
var dropdownItem_1_5 = document.getElementById("dropdown-item-1-5");
var dropdownItem_1_6 = document.getElementById("dropdown-item-1-6");
var dropdownItem_1_7 = document.getElementById("dropdown-item-1-7");
var dropdownItem_1_8 = document.getElementById("dropdown-item-1-8");
var dropdownItem_1_9 = document.getElementById("dropdown-item-1-9");
var dropdownItem_1_10 = document.getElementById("dropdown-item-1-10");
var dropdownItem_1_11 = document.getElementById("dropdown-item-1-11");
var dropdownItem_1_12 = document.getElementById("dropdown-item-1-12");
var dropdownItem_1_13 = document.getElementById("dropdown-item-1-13");
var dropdownItem_1_14 = document.getElementById("dropdown-item-1-14");
var dropdownItem_1_15 = document.getElementById("dropdown-item-1-15");
var dropdownItem_1_16 = document.getElementById("dropdown-item-1-16");
var dropdownItem_1_17 = document.getElementById("dropdown-item-1-17");
var dropdownItem_1_18 = document.getElementById("dropdown-item-1-18");
var dropdownItem_1_19 = document.getElementById("dropdown-item-1-19");
var dropdownItem_2_1 = document.getElementById("dropdown-item-2-1");
var dropdownItem_2_2 = document.getElementById("dropdown-item-2-2");
var dropdownItem_2_3 = document.getElementById("dropdown-item-2-3");
var dropdownItem_2_4 = document.getElementById("dropdown-item-2-4");
var dropdownItem_2_5 = document.getElementById("dropdown-item-2-5");
var dropdownItem_3_1 = document.getElementById("dropdown-item-3-1");
var dropdownItem_3_2 = document.getElementById("dropdown-item-3-2");
var dropdownItem_3_3 = document.getElementById("dropdown-item-3-3");
var dropdownItem_3_4 = document.getElementById("dropdown-item-3-4");
var dropdownItem_3_5 = document.getElementById("dropdown-item-3-5");
var dropdownItem_3_6 = document.getElementById("dropdown-item-3-6");
var dropdownBtn1 = document.getElementById("dropdown-btn1-html");
var dropdownBtn2 = document.getElementById("dropdown-btn2-html");
var dropdownBtn3 = document.getElementById("dropdown-btn3-html");
var ingredient1Input = document.querySelector("#ingredient1");
var ingredient2Input = document.querySelector("#ingredient2");
var ingredient3Input = document.querySelector("#ingredient3");
var ingredient4Input = document.querySelector("#ingredient4");
var recipeContent = document.querySelector('content');
var recipeArrayLength = 0;

var recipeArray = [];
var firstLoad = true;

var receipeList = document.querySelector('#receipeList')
var searchBoxText = document.querySelector('#searchBoxText')
var searchBtn = document.querySelector('#searchBtn');
var bookmarkAnchor = document.querySelector("#bookmarkAnchor");
var clearBookmarks = document.querySelector('#clearBookmarks');
var modalDelete = document.querySelector('.modalDelete'); 


/* Start of Edamam API Variables */
var edamamApiKey = "e6371ff056c6f2217c6e6095d104cdeb";
var edamamApiID = "9f8e9bb4";
var cuisineType = dropdownBtn1.innerText;
var mealType = dropdownBtn2.innerText;
var time = dropdownBtn3.innerText;
var ingredient1 = ingredient1Input.value;
var ingredient2 = ingredient2Input.value;
var ingredient3 = ingredient3Input.value;
var ingredient4 = ingredient4Input.value;
var ingredients = "";
var requestUrl;

/* Start of Giphy API Variables */
var fixedImg;
var giphy = document.querySelector("#giphy");
var giphyAttribution = document.querySelector("#giphyAttribution");

function edamamURLBuilder() {
  console.log("edamamURLBuilder has been trigged");
  /* Updating the variables to so they have most recent values */
  cuisineType = dropdownBtn1.innerText;
  mealType = dropdownBtn2.innerText;
  time = dropdownBtn3.innerText;
  ingredient1 = ingredient1Input.value;
  ingredient2 = ingredient2Input.value;
  ingredient3 = ingredient3Input.value;
  ingredient4 = ingredient4Input.value;

  /* ---Edamam Request URL building Logic--- */

  if (cuisineType != 'Any') {
    cuisineType = '&cuisineType=' + cuisineType;
  } else (cuisineType = '')

  if (mealType != 'Any') {
    mealType = '&mealType=' + mealType;
  } else (mealType = '')

  if (time != 'Any') {
    time = '&time=' + time;
  } else (time = '')

  if (ingredient1 != '') {
    ingredient1 = ingredient1 + "%20";
  } else (ingredient1 = '')

  if (ingredient2 != '') {
    ingredient2 = ingredient2 + "%20";
  } else (ingredient2 = '')

  if (ingredient3 != '') {
    ingredient3 = ingredient3 + "%20";
  } else (ingredient3 = '')

  if (ingredient4 != '') {
    ingredient4 = ingredient4 + "%20";
  } else (ingredient4 = '')

  ingredients = ingredient1 + ingredient2 + ingredient3 + ingredient4;
  if (ingredients != '') {
    ingredients = "&q=" + ingredient1 + ingredient2 + ingredient3 + ingredient4;
  }

  requestUrl = "https://api.edamam.com/api/recipes/v2?imageSize=REGULAR&type=public&app_key=" + edamamApiKey + "&app_id=" + edamamApiID + cuisineType + mealType + time + ingredients;
  requestUrl = requestUrl.replaceAll(' ', '%20'); //Finds any spaces and replaces these with %20

}

/* This function performs the Edamam API call to gather the recipe data and stores it locally */
function edamamAPI(event) {
  console.log("edamamAPI has been trigged");
  searchBoxText.textContent = "Results for corresponding recipes will appear below:";
  edamamURLBuilder();
  /* Setting the URL and triggering the GET API */
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("----------\n Recipe API Response Data \n----------");
      console.log(data);
      /* Clearning out old search data*/
      recipeArray = [];
      /* Data processing*/
      for (let i = 0; i < data.hits.length; i++) {
        recipeLoop = {
          recipeName: data.hits[i].recipe.label,
          cuisineType: data.hits[i].recipe.cuisineType[0],
          imageThumbnail: data.hits[i].recipe.images.REGULAR.url,
          url: data.hits[i].recipe.shareAs,
          calories: data.hits[i].recipe.calories,
          timeTaken: data.hits[i].recipe.totalTime,
          yield: data.hits[i].recipe.yield,
          nextPage: data.hits[i]._links.self.href,
        };
        recipeArray.push({ recipeLoop });
      }

      localStorage.setItem('recipes', JSON.stringify(recipeArray));

      console.log("----------\n Trimmed down API Response Data \n----------");
      console.log(recipeArray);
      if (recipeArray.length === 0) {
         searchBoxText.textContent = "No search results found based on your choices, please try again!";
      };
      userInput = "breakfast";
      recipeDisplay();
      giphyAPITesting();
    });
    dropdownBtn1.innerText = "Any";
    dropdownBtn2.innerText = "Any";
    dropdownBtn3.innerText = "Any";
    ingredient1Input.value = "";
    ingredient2Input.value = "";
    ingredient3Input.value = "";
    ingredient4Input.value = "";
}

var userInput = "breakfast";

function giphyAPITesting(event) {
  console.log("Testing has been trigged")
  console.log(mealType);
  if (mealType === '') {
    userInput = "breakfast";
  } else if (mealType != "Any") {
    userInput = dropdownBtn2.textContent;
  };

  if (recipeArray.length === 0) {
    userInput = "sad";
  }
  console.log("Giphy Search Term:" + userInput);

  /* Setting the URL and triggering the GET API */
  var requestUrl = 'https://api.giphy.com/v1/gifs/random?api_key=4Ewuj4qufb1PfwbOQoBJi5DiNAlCeDpC&tag=' + userInput + '%20food&rating=pg'
  console.log(requestUrl);
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('----------\n Giphy API Response Data \n----------');
      console.log(data);
      console.log(data.data.url);
      fixedImg = data.data.images.fixed_width.url;
      console.log(fixedImg);
      giphy.setAttribute("src", fixedImg);
      giphyAttribution.setAttribute("src", "./assets/images/giphyimg.png");
    });
};
function storageRetrieval() {
   if (localStorage.recipes === undefined) {
   console.log("if statement ran")
    return;   
    }
  recipeArray = JSON.parse(localStorage.getItem("recipes"));
  recipeDisplay();
}
 storageRetrieval();

/* Event Listen for Search Buttom Click */
searchBtn.addEventListener("click", edamamAPI);
receipeList.addEventListener("click", bookmarkSave);
clearBookmarks.addEventListener("click", clearAllBookmarks);
bookmarkAnchor.addEventListener("click", bookmarkSingleDelete);

var bookmark;

function bookmarkSave(event){
  console.log("bookmarkSave has triggered");
  console.log(event.target.getAttribute('bookmarkArray'));
  console.log(event.target.classList);
    if (event.target.getAttribute('bookmarkArray') === null){
    console.log("caught the if");
    return;
  };
  bookmark = JSON.parse(localStorage.getItem("bookmarkRecipes"));
  if (bookmark === null){
    console.log("boomark is null");
    bookmark = [];
  };
  dataAttribute = event.target.getAttribute('bookmarkArray');
  console.log(recipeArray[dataAttribute]);
  bookmark.push(recipeArray[dataAttribute]);
  localStorage.setItem('bookmarkRecipes', JSON.stringify(bookmark));
}

function clearAllBookmarks (){
  console.log("clearAllBookmarks has run");
  console.log(bookmarkAnchor.childElementCount);
  bookmark = JSON.parse(localStorage.getItem("bookmarkRecipes"));
    /* Clearing any previously made child elements */
    if (bookmarkAnchor.childElementCount > 0) {
      for (let i = 0; i < bookmarkAnchor.childElementCount; i++) { // THis should be reverted to bookmark.length once displayBookmarksHistory has been completed.
        bookmarkAnchor.removeChild(bookmarkAnchor.children[0]);
      }
    }
    bookmark = [];
    localStorage.setItem('bookmarkRecipes', JSON.stringify(bookmark));
}
/*----------------------------JS for the dropdown buttons--------------------------*/
dropdown1.addEventListener("click", function () {
  dropdown1.classList.toggle("is-active");
});
dropdown2.addEventListener("click", function () {
  dropdown2.classList.toggle("is-active");
});
dropdown3.addEventListener("click", function () {
  dropdown3.classList.toggle("is-active");
});
dropdownItem_1_1.addEventListener("click", function () {
  dropdownBtn1.innerHTML = dropdownItem_1_1.innerHTML;
});
dropdownItem_1_2.addEventListener("click", function () {
  dropdownBtn1.innerHTML = dropdownItem_1_2.innerHTML;
});
dropdownItem_1_3.addEventListener("click", function () {
  dropdownBtn1.innerHTML = dropdownItem_1_3.innerHTML;
});
dropdownItem_1_4.addEventListener("click", function () {
  dropdownBtn1.innerHTML = dropdownItem_1_4.innerHTML;
});
dropdownItem_1_5.addEventListener("click", function () {
  dropdownBtn1.innerHTML = dropdownItem_1_5.innerHTML;
});
dropdownItem_1_6.addEventListener("click", function () {
  dropdownBtn1.innerHTML = dropdownItem_1_6.innerHTML;
});
dropdownItem_1_7.addEventListener("click", function () {
  dropdownBtn1.innerHTML = dropdownItem_1_7.innerHTML;
});
dropdownItem_1_8.addEventListener("click", function () {
  dropdownBtn1.innerHTML = dropdownItem_1_8.innerHTML;
});
dropdownItem_1_9.addEventListener("click", function () {
  dropdownBtn1.innerHTML = dropdownItem_1_9.innerHTML;
});
dropdownItem_1_10.addEventListener("click", function () {
  dropdownBtn1.innerHTML = dropdownItem_1_10.innerHTML;
});
dropdownItem_1_11.addEventListener("click", function () {
  dropdownBtn1.innerHTML = dropdownItem_1_11.innerHTML;
});
dropdownItem_1_12.addEventListener("click", function () {
  dropdownBtn1.innerHTML = dropdownItem_1_12.innerHTML;
});
dropdownItem_1_13.addEventListener("click", function () {
  dropdownBtn1.innerHTML = dropdownItem_1_13.innerHTML;
});
dropdownItem_1_14.addEventListener("click", function () {
  dropdownBtn1.innerHTML = dropdownItem_1_14.innerHTML;
});
dropdownItem_1_15.addEventListener("click", function () {
  dropdownBtn1.innerHTML = dropdownItem_1_15.innerHTML;
});
dropdownItem_1_16.addEventListener("click", function () {
  dropdownBtn1.innerHTML = dropdownItem_1_16.innerHTML;
});
dropdownItem_1_17.addEventListener("click", function () {
  dropdownBtn1.innerHTML = dropdownItem_1_17.innerHTML;
});
dropdownItem_1_18.addEventListener("click", function () {
  dropdownBtn1.innerHTML = dropdownItem_1_18.innerHTML;
});
dropdownItem_1_19.addEventListener("click", function () {
  dropdownBtn1.innerHTML = dropdownItem_1_19.innerHTML;
});
dropdownItem_2_1.addEventListener("click", function () {
  dropdownBtn2.innerHTML = dropdownItem_2_1.innerHTML;
});
dropdownItem_2_2.addEventListener("click", function () {
  dropdownBtn2.innerHTML = dropdownItem_2_2.innerHTML;
});
dropdownItem_2_3.addEventListener("click", function () {
  dropdownBtn2.innerHTML = dropdownItem_2_3.innerHTML;
});
dropdownItem_2_4.addEventListener("click", function () {
  dropdownBtn2.innerHTML = dropdownItem_2_4.innerHTML;
});
dropdownItem_2_5.addEventListener("click", function () {
  dropdownBtn2.innerHTML = dropdownItem_2_5.innerHTML;
});
dropdownItem_3_1.addEventListener("click", function () {
  dropdownBtn3.innerHTML = dropdownItem_3_1.innerHTML;
});
dropdownItem_3_2.addEventListener("click", function () {
  dropdownBtn3.innerHTML = dropdownItem_3_2.innerHTML;
});
dropdownItem_3_3.addEventListener("click", function () {
  dropdownBtn3.innerHTML = dropdownItem_3_3.innerHTML;
});
dropdownItem_3_4.addEventListener("click", function () {
  dropdownBtn3.innerHTML = dropdownItem_3_4.innerHTML;
});
dropdownItem_3_5.addEventListener("click", function () {
  dropdownBtn3.innerHTML = dropdownItem_3_5.innerHTML;
});
dropdownItem_3_6.addEventListener("click", function () {
  dropdownBtn3.innerHTML = dropdownItem_3_6.innerHTML;
});

/*----------------------------JS for the dropdown buttons--------------------------*/

/* This function will take the data from reciepe (Edamam) API and display it onscreen. */
function recipeDisplay() {
  console.log("recipeDisplay has run");
  if (recipeArray.length === 0){
    return;
  }
  /* Clearing any previously made child elements */
  console.log(recipeArrayLength);
  if (recipeArrayLength > 0) {
    for (let i = 0; i < recipeArrayLength; i++) {
      contentArea.removeChild(contentArea.children[0]);
    }
  }
  // console.log(JSON.parse(localStorage.recipes)); // This could be deleted
  recipeArrayLength = recipeArray.length;
  console.log("Length of Recipe Array is: " + recipeArray.length);
  for (let i = 0; i < recipeArray.length; i++) {
    //   /* Element Creation for recipies*/
    var columnDivEl = document.createElement("div");
    var cardDivEl = document.createElement("div");
    var cardImgDivEl = document.createElement("div");
    var figureEl = document.createElement("figure");
    var recipeImg = document.createElement("img");
    var cardContentDiv = document.createElement("div");
    var cuisineName = document.createElement("p");
    var calories = document.createElement("p");
    var timeTaken = document.createElement("p");
    var createA = document.createElement("a");
    var bookmarkBtn = document.createElement("button")
    //   /* Element Updates */
    columnDivEl.classList.add("column");
    columnDivEl.classList.add("is-2");
    columnDivEl.classList.add("is-flex");
    cardDivEl.classList.add("card");
    cardImgDivEl.classList.add("card-image");
    figureEl.classList.add("image");
    figureEl.classList.add("is-96by96");
    cardContentDiv.classList.add("card-content");
    cardContentDiv.classList.add("pt-1");
    cuisineName.classList.add("title");
    cuisineName.classList.add("is-5");
    cuisineName.classList.add("ml-3");
    cuisineName.classList.add("mb-1");
    calories.classList.add("ml-3");
    calories.classList.add("mb-1");
    timeTaken.classList.add("ml-3");
    timeTaken.classList.add("mb-0");
    cuisineName.classList.add("has-text-info");
    bookmarkBtn.classList.add("pb-1");
    bookmarkBtn.classList.add("bookmark");
    bookmarkBtn.classList.add("button");
    bookmarkBtn.classList.add("is-primary");
    bookmarkBtn.classList.add("is-small"); 
    bookmarkBtn.setAttribute("bookmarkArray",[i]);
    recipeImg.setAttribute("src", recipeArray[i].recipeLoop.imageThumbnail);
    recipeImg.setAttribute("alt", recipeArray[i].recipeLoop.recipeName);
    recipeImg.setAttribute("title", recipeArray[i].recipeLoop.recipeName);
    createA.setAttribute("href", recipeArray[i].recipeLoop.url);
    createA.setAttribute("target", "_blank");
    /* Element Appending */
    contentArea.appendChild(columnDivEl);
    columnDivEl.appendChild(cardDivEl);
    cardDivEl.appendChild(cardImgDivEl);
    cardDivEl.appendChild(cardContentDiv);
    cardImgDivEl.appendChild(figureEl);
    figureEl.appendChild(recipeImg);
    cardContentDiv.appendChild(bookmarkBtn);
    bookmarkBtn.textContent = "Bookmark Recipe";
    cardContentDiv.appendChild(createA);
    cardContentDiv.appendChild(calories);
    cardContentDiv.appendChild(timeTaken);
    cardContentDiv.appendChild(timeTaken);
    createA.appendChild(cuisineName);
    cuisineName.textContent = recipeArray[i].recipeLoop.recipeName;
    var meal = "This meal contains ";
    var drink = "This drink contains ";
    calories.textContent =
      meal + Math.trunc(recipeArray[i].recipeLoop.calories) + " calories.";
    timeTaken.textContent =
      "This will take " + recipeArray[i].recipeLoop.timeTaken + " min to make";
    if (recipeArray[i].recipeLoop.timeTaken === 0) {
      timeTaken.textContent = "This can be made in no time!";
    }
  }
}


/* Modal JS */



document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      bookmarkModalTrigger();
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});


function bookmarkModalTrigger() {
  console.log("bookmarkModalTrigger has run");
  bookmark = JSON.parse(localStorage.getItem('bookmarkRecipes'));
   if (bookmark === null ) {
    console.log("Bookmark was null");
    bookmark = [];
  };
  if (bookmark.length === 0) {
    console.log("bookmark.length is 0");
    bookmarkAnchor.innerHTML = "Were sorry you have no bookmarks saved. We hope you find some delicious receipies!";
  }
  if (bookmarkAnchor.childElementCount > 0) {
    console.log("boommarkAmchor has "+ bookmarkAnchor.childElementCount + "children");
    for (let i = 0; i < bookmarkAnchor.childElementCount; i++) { // THis should be reverted to bookmark.length once displayBookmarksHistory has been completed.
      bookmarkAnchor.removeChild(bookmarkAnchor.children[0]);
    }
  }

  // modalImageA.setAttribute("href", bookmark[i].recipeLoop.url);
  // modalImageA.setAttribute("target", "_blank");


  if (bookmark.length > 0) {
    console.log("Bookmark.length is " + bookmark.length);
    bookmarkAnchor.innerHTML = "";
    for (let i = 0; i < bookmark.length; i++) {
      console.log([i]);
      /* Creation of Elements*/
      var modalColumnsDiv = document.createElement("div");
      var modalImageDiv = document.createElement("div");
      var modalImageA = document.createElement("a");      
      var modalImage = document.createElement("img");
      var modalReceipeDiv = document.createElement("div");
      var modalReceipeH2 = document.createElement("h2");
      var modalReceipeA = document.createElement("a");
      var modalCuisineP = document.createElement("p");
      var modalCookTimeP = document.createElement("p");
      var modalCaloriesP = document.createElement("p");
      var modalDeleteDiv = document.createElement("div");
      var modalDeleteBtn = document.createElement("button");

      /* Class and Attribute updates */
      modalColumnsDiv.classList.add("columns");
      modalColumnsDiv.classList.add("is-1");
      modalImageDiv.classList.add("column");
      modalImageDiv.classList.add("is-narrow");
      modalImageA.setAttribute("href", bookmark[i].recipeLoop.url);
      modalImageA.setAttribute("target", "_blank");
      modalImage.classList.add("image");
      modalImage.classList.add("is-128x128");
      modalImage.setAttribute("src", bookmark[i].recipeLoop.imageThumbnail);
      modalImage.setAttribute("alt", bookmark[i].recipeLoop.recipeName);
      modalImage.setAttribute("title", bookmark[i].recipeLoop.recipeName);
      modalReceipeA.setAttribute("href", bookmark[i].recipeLoop.url);
      modalReceipeA.setAttribute("target", "_blank");
      modalReceipeA.classList.add("is-size-4");
      modalReceipeDiv.classList.add("column");
      modalDeleteDiv.classList.add("column");
      modalDeleteDiv.classList.add("is-narrow");
      modalDeleteBtn.setAttribute("modalIndex", [i]);
      modalDeleteBtn.classList.add("is-large");
      modalDeleteBtn.classList.add("delete");
      modalDeleteBtn.classList.add("modalDelete");

      /* Appending Elements to the modal */
      bookmarkAnchor.appendChild(modalColumnsDiv);
      modalColumnsDiv.appendChild(modalImageDiv);
      modalImageDiv.appendChild(modalImageA);
      modalImageA.appendChild(modalImage);
      modalColumnsDiv.appendChild(modalReceipeDiv);
      modalReceipeDiv.appendChild(modalReceipeA);
      modalReceipeA.appendChild(modalReceipeH2);
      modalReceipeDiv.appendChild(modalCuisineP);
      modalReceipeDiv.appendChild(modalCookTimeP);
      modalReceipeDiv.appendChild(modalCaloriesP);
      modalColumnsDiv.appendChild(modalDeleteDiv);
      modalDeleteDiv.appendChild(modalDeleteBtn);

      /* Content Updates */
      modalReceipeH2.innerHTML = bookmark[i].recipeLoop.recipeName; // This needs to be updated
      modalCuisineP.innerHTML = "Cuisine: " + bookmark[i].recipeLoop.cuisineType; // This needs to be updated
      modalCookTimeP.innerHTML = "Cook Time: " + bookmark[i].recipeLoop.timeTaken + " minutes"; // This needs to be updated
      modalCaloriesP.innerHTML = "Calories Per Serving: " + Math.floor((bookmark[i].recipeLoop.calories) / (bookmark[i].recipeLoop.yield)); // This needs to be updated

    }
  }
}

// array.remove(index)

function bookmarkSingleDelete (event){
  console.log("bookmarkSingleDelete has run");
  console.log(event.target.getAttribute('modalIndex'));
  if (event.target.getAttribute('modalIndex') === null) {
    return;
  };
  numToDelete = event.target.getAttribute('modalIndex');
  console.log(numToDelete);
  bookmark.splice(numToDelete, 1);
  localStorage.setItem('bookmarkRecipes', JSON.stringify(bookmark));
  bookmarkModalTrigger();
}