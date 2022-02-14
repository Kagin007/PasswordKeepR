const yelp = require('yelp-fusion');
const request = require('request-promise');

const search = 'kfc'

const movieAPIkey = '6c221930e1adc8e2c3d046a15e547b2e';

//Checks if a string could be a movie
//MovieAPI
const movieAPICall = () => {
  return request.get(`https://api.themoviedb.org/3/search/multi?api_key=${movieAPIkey}&query=${search}`)
    .then (res => {
      console.log(`this is a ${JSON.parse(res).results[0].media_type}.`)
      return `this is a ${JSON.parse(res).results[0].media_type}.`
    })
    .catch( err => err)
}



//Checks if a string is a restaurant
//Yelp
const yelpApiKey = 'w8L3Eb9iX9rS4KnoOa530di5FSA7RVeEiclTzrwJ6D-h7MW-DqEfXb0ult_pWfMLVBjjScD8qNX0TqdbEg7_D_Uf2wI2sng1qH8GEAFvosXiW2HFm5dOeUoJtP0HYnYx';

const yelpApiCall = () => {

  const searchRequest = {
    term:`${search}`,
    location: 'toronto, on',
    match_threshold: 'strict',
    parent_aliases: 'restaurant',
    alias: 'restaurant'
  };

  const client = yelp.client(yelpApiKey);

  client.search(searchRequest)
    .then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);

    if (JSON.parse(prettyJson).name.toLowerCase().replace(/'/g, '').split(' ').join('') == search.toLowerCase().replace(/'/g, '').split(' ').join('')) {
      console.log('restaurant')
      return 'restaurant';
    };
  })
  .catch(e => {
    console.log(e);
  })
};



//Checks if a string is a book
// Wolfram
const WolframappId = 'WY4Q9T-8W44L72HA8'

const wolframApiCall = () => {
  return request.get(`https://api.wolframalpha.com/v2/query?input=${search}&appid=${WolframappId}&output=json`)
  .then( res => {

    ( JSON.parse(res).queryresult.assumptions.values ).forEach(element => {
    // console.log(res)
      Object.values(element).find(string => {
        if (string.includes('book')) {
          console.log('book array: ', element)
          return 'This is a book'
        }
      })
    })
  })
  .catch( err => err)
}

Promise.all([yelpApiCall(), wolframApiCall(), movieAPICall()]).then((values) => {

    console.log(values);
  });
