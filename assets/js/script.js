console.log("Testing Connection");


/* This will need to be run manauly */
function recipeAPITesting (event){
    console.log("Testing has been trigged")

    /* Setting the URL and triggering the GET API */
    var requestUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=chicken%20rice%20tomato&app_id=9f8e9bb4&app_key=e6371ff056c6f2217c6e6095d104cdeb'
    fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('----------\n Recipe API Response Data \n----------');
    console.log(data);
   });
};



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

function giphyAPITesting (event){
    console.log("Testing has been trigged")

    /* Setting the URL and triggering the GET API */
    var requestUrl = 'https://api.giphy.com/v1/gifs/random?api_key=4Ewuj4qufb1PfwbOQoBJi5DiNAlCeDpC&tag=mediterranean%20food&rating=pg'
    fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('----------\n Giphy API Response Data \n----------');
    console.log(data);
   });
};