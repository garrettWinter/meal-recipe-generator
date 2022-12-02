console.log("Testing Connection");

var mainArray = [];

/* This will need to be run manauly */
function recipeAPITesting (event){
    mainArray = [];
    console.log("Testing has been trigged")

    /* Setting the URL and triggering the GET API */
    var requestUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=chicken%20rice%20tomato&app_id=9f8e9bb4&app_key=e6371ff056c6f2217c6e6095d104cdeb'
    fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('----------\n API Response Data \n----------');
    console.log(data);
    mainArray = data;
   });
};
