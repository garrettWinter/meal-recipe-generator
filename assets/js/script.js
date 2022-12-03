console.log("Testing Connection");
var recipeArray = [];

/* This will need to be run manauly */
function recipeAPITesting(event) {
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
            console.log('----------\n Sample Recipe API Response data being stored \n----------');
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
                    url: data.hits[i].recipe.shareAs
                };
                recipeArray.push({recipeLoop});
            }
            console.log(recipeArray);
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