console.log("Testing Connection");
/* Global Variables  */
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
var ingredient1Input = document.querySelector('#ingredient1');
var ingredient2Input = document.querySelector('#ingredient2');
var ingredient3Input = document.querySelector('#ingredient3');
var ingredient4Input = document.querySelector('#ingredient4');
var recipeArrayLength = 0;


var recipeArray = [];
var firstLoad = true;
var receipeList = document.querySelector('#receipeList')
var searchBtn = document.querySelector('#searchBtn');

/* Start of Edamam API Variables */
var edamamApiKey = 'e6371ff056c6f2217c6e6095d104cdeb';
var edamamApiID = '9f8e9bb4';
var cuisineType = dropdownBtn1.innerText;
var mealType = dropdownBtn2.innerText;
var time = dropdownBtn3.innerText;
var ingredient1 = ingredient1Input.value;
var ingredient2 = ingredient2Input.value;
var ingredient3 = ingredient3Input.value;
var ingredient4 = ingredient4Input.value;
var ingredients = '';
var requestUrl;

/* Start of Giphy API Variables */
 var fixedImg
 var giphy = document.querySelector('#giphy');

function edamamURLBuilder (){
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
if(cuisineType != 'Any'){
  cuisineType = '&cuisineType='+cuisineType;
} else (cuisineType = '')

if(mealType != 'Any'){
  mealType = '&mealType='+mealType;
} else (mealType = '')

if(time != 'Any'){
  time = '&time='+time;
} else (time = '')

if(ingredient1 != ''){
  ingredient1 = ingredient1+"%20";
} else (ingredient1 = '')

if(ingredient2 != ''){
  ingredient2 = ingredient2+"%20";
} else (ingredient2 = '')

if(ingredient3 != ''){
  ingredient3 = ingredient3+"%20";
} else (ingredient3 = '')

if(ingredient4 != ''){
  ingredient4 = ingredient4+"%20";
} else (ingredient4 = '')

ingredients = ingredient1+ingredient2+ingredient3+ingredient4;
if(ingredients != ''){
  ingredients = "&q="+ingredient1+ingredient2+ingredient3+ingredient4;
} 

requestUrl = "https://api.edamam.com/api/recipes/v2?imageSize=THUMBNAIL&type=public&app_key="+edamamApiKey+"&app_id="+edamamApiID+cuisineType+mealType+time+ingredients;
requestUrl = requestUrl.replaceAll(' ', '%20'); //Finds any spaces and replaces these with %20
}

/* This function performs the Edamam API call to gather the recipe data and stores it locally */
function edamamAPI(event) {
  console.log("edamamAPI has been trigged");
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
          imageThumbnail: data.hits[i].recipe.images.THUMBNAIL.url,
          url: data.hits[i].recipe.shareAs,
          totalTime: data.hits[i].recipe.totalTime,
          calories: data.hits[i].recipe.calories,
          yield: data.hits[i].recipe.yield,
          nextPage: data.hits[i]._links.self.href,
        };
        recipeArray.push({ recipeLoop });
      }
      localStorage.setItem('recipes' , JSON.stringify(recipeArray));
      console.log("----------\n Trimmed down API Response Data \n----------");
      console.log(recipeArray);
      recipeDisplay();
      giphyAPITesting ();
    });
}



var userInput = "breakfast";

function giphyAPITesting (event){
  console.log("Testing has been trigged")

  if (mealType != "Any"){
    userInput = dropdownBtn2.innerText;
  };
  console.log(userInput);

  /* Setting the URL and triggering the GET API */
  var requestUrl = 'https://api.giphy.com/v1/gifs/random?api_key=4Ewuj4qufb1PfwbOQoBJi5DiNAlCeDpC&tag='+userInput+'%20food&rating=pg'
  fetch(requestUrl)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log('----------\n Giphy API Response Data \n----------');
  console.log(data);
  console.log(data.data.url);
  fixedImg= data.data.images.fixed_width.url;
  console.log(fixedImg);
  giphy.setAttribute("src",fixedImg);
 });
};

/* Event Listen for Search Buttom Click */
searchBtn.addEventListener("click", edamamAPI);

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
  /* Clearing any previously made child elements */
  if (recipeArrayLength > 0) {
    for (let i = 0; i < recipeArrayLength; i++) {
      receipeList.removeChild(receipeList.children[0]);
    }
  }
  recipeArrayLength = recipeArray.length;
  console.log("Length of Recipe Array is: " + recipeArrayLength)
  for (let i = 0; i < recipeArray.length; i++) {
    //   /* Element Creation for recipies*/
    var createList = document.createElement('li');
    var createImg = document.createElement('img');
    var createA = document.createElement('a');
    var createP = document.createElement('p');
    //   /* Element Updates */
    createList.classList.add("receipeRow");
    createImg.setAttribute('src', recipeArray[i].recipeLoop.imageThumbnail);
    createImg.setAttribute('alt', recipeArray[i].recipeLoop.recipeName);
    createImg.setAttribute('title', recipeArray[i].recipeLoop.recipeName);
    createA.setAttribute('href', recipeArray[i].recipeLoop.url);
    createA.setAttribute('target', '_blank');
    /* Element Appending */
    receipeList.appendChild(createList);
    createList.appendChild(createImg);
    createList.appendChild(createA);
    createA.textContent = recipeArray[i].recipeLoop.recipeName;
    createList.appendChild(createP);
    createP.textContent = recipeArray[i].recipeLoop.cuisineType;
  }
} 


 