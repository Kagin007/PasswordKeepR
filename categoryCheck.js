const yelp = require('yelp-fusion');
const request = require('request-promise');
require('dotenv').config()


// const search = "the dark tower"

const categoryFinder = (search) => {

  //Checks if a string could be a movie
  //MovieAPI
  const movieAPICall = () => {
    return request.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.movieAPIkey}&query=${search}`)
      .then (res => {
        // console.log(res)
        if (JSON.parse(res).results[0]) {

        // console.log(`this is a ${JSON.parse(res).results[0].media_type}.`)
        return 'movie'
        // return `this is a ${JSON.parse(res).results[0].media_type}.`
        }
      })
      .catch( err => err)
  }

  //Checks if a string is a restaurant
  //Yelp
  const yelpApiCall = () => {

    const searchRequest = {
      term:`${search}`,
      location: 'toronto, on',
      match_threshold: 'strict',
      parent_aliases: 'restaurant',
      alias: 'restaurant'
    };

    const client = yelp.client(process.env.yelpApiKey);

    return client.search(searchRequest)
      .then(response => {
        // console.log(response)
        return response

    })
    .catch(e => {
      console.log(e);
    })
  };

  const APIresponseYelp = (data) => {
    // console.log('YELP resonse JSON: ', data)

    const firstResult = data.jsonBody.businesses[0];
    if (!firstResult) {
      return undefined
    }

    const prettyJson = JSON.stringify(firstResult, null, 4);

    if (JSON.parse(prettyJson).name.toLowerCase().replace(/'/g, '').split(' ').join('') == search.toLowerCase().replace(/'/g, '').split(' ').join('')) {
      // console.log('restaurant')

      return 'restaurant';
    };
  }

  const APIresponseBook = (data) => {
    let result;
    // console.log(data)

    if (typeof data !== 'object') {
      return undefined
    }
    if (data === undefined) {
      return undefined
    }
    if (data.statusCode === 503) {
      return undefined
    }
    data.forEach(element => {
      // console.log(res)
        return Object.values(element).find(string => {
          if (string.includes('book')) {
            // console.log('book array: ', element)
            result = 'book';
          }
        })
      })
      return result
  }

  //Checks if a string is a book
  // Wolfram
  const wolframApiCall = () => {
    return request.get(`https://api.wolframalpha.com/v2/query?input=${search}&appid=${process.env.WolframappId}&output=json`)
    .then( res => {
      if (!JSON.parse(res).queryresult.assumptions) {
        return undefined
      }

      return ( JSON.parse(res).queryresult.assumptions.values )

    })
    .catch( err => err)
  }

  //resolves all promises together

  return Promise.all([
    yelpApiCall(),
    wolframApiCall(),
    movieAPICall()
    ])
    .then(values => {

    if (APIresponseYelp(values[0])) {
      console.log(APIresponseYelp(values[0]))
      return APIresponseYelp(values[0])
    } else if (APIresponseBook(values[1])) {
      console.log(APIresponseBook(values[1]))
      return APIresponseBook(values[1])
    } else if (values[2]) {
      console.log(values[2])
      return values[2]
    } else {
      return 'product'
    }

    })
    .catch((err) => console.log(err));
};

module.exports = { categoryFinder }
