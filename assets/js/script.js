console.log("Testing Connection");
var recipeArray = [];

/* This will need to be run manauly */
function recipeAPITesting(event) {
  console.log("Testing has been trigged");

  /* Setting the URL and triggering the GET API */
  var requestUrl =
    "https://api.edamam.com/api/recipes/v2?type=public&q=chicken%20rice%20tomato&app_id=9f8e9bb4&app_key=e6371ff056c6f2217c6e6095d104cdeb";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("----------\n Recipe API Response Data \n----------");
      console.log(data);
      console.log(
        "----------\n Sample Recipe API Response data being stored \n----------"
      );
      console.log(data.hits[0].recipe.label); //Recipe Name
      console.log(data.hits[0].recipe.cuisineType[0]); //CuisineType
      console.log(data.hits[0].recipe.images.THUMBNAIL.url); //Image Thumbnail
      console.log(data.hits[0].recipe.shareAs); //URL
      /* Data processing*/
      for (let i = 0; i < data.hits.length; i++) {
        console.log(i);
        recipeLoop = {
          recipeName: data.hits[i].recipe.label,
          cuisineType: data.hits[i].recipe.cuisineType[0],
          imageThumbnail: data.hits[i].recipe.images.THUMBNAIL.url,
          url: data.hits[i].recipe.shareAs,
        };
        recipeArray.push({ recipeLoop });
      }
      console.log(recipeArray);
    });
}

/*
Giphy Developers
API KEy - 4Ewuj4qufb1PfwbOQoBJi5DiNAlCeDpC
https://developers.giphy.com/docs/api/endpoint#random
api.giphy.com/v1/gifs/random
api_key: string(required)
tag: string
rating: string
https://api.giphy.com/v1/gifs/random?api_key=4Ewuj4qufb1PfwbOQoBJi5DiNAlCeDpC&tag=burrito&rating=g
*/

function giphyAPITesting(event) {
  console.log("Testing has been trigged");

  /* Setting the URL and triggering the GET API */
  var requestUrl =
    "https://api.giphy.com/v1/gifs/random?api_key=4Ewuj4qufb1PfwbOQoBJi5DiNAlCeDpC&tag=mediterranean%20food&rating=pg";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("----------\n Giphy API Response Data \n----------");
      console.log(data);
    });
}
/*----------------------------JS for the dropdown buttons--------------------------*/
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
var dropdownItem_2_1 = document.getElementById("dropdown-item-2-1");
var dropdownItem_2_2 = document.getElementById("dropdown-item-2-2");
var dropdownItem_2_3 = document.getElementById("dropdown-item-2-3");
var dropdownItem_2_4 = document.getElementById("dropdown-item-2-4");
var dropdownItem_2_5 = document.getElementById("dropdown-item-2-5");
var dropdownItem_2_6 = document.getElementById("dropdown-item-2-6");
var dropdownItem_3_1 = document.getElementById("dropdown-item-3-1");
var dropdownItem_3_2 = document.getElementById("dropdown-item-3-2");
var dropdownItem_3_3 = document.getElementById("dropdown-item-3-3");
var dropdownItem_3_4 = document.getElementById("dropdown-item-3-4");
var dropdownItem_3_5 = document.getElementById("dropdown-item-3-5");
var dropdownItem_3_6 = document.getElementById("dropdown-item-3-6");
var dropdownBtn1 = document.getElementById("dropdown-btn1-html");
var dropdownBtn2 = document.getElementById("dropdown-btn2-html");
var dropdownBtn3 = document.getElementById("dropdown-btn3-html");
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
dropdownItem_2_6.addEventListener("click", function () {
  dropdownBtn2.innerHTML = dropdownItem_2_6.innerHTML;
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
