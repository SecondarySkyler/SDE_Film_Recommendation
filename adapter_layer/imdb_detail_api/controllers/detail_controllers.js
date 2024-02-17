const axios = require("axios")
exports.getDetails = async (req, res) => {
  const filmID = req.query.filmID
  const options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/title/get-overview-details',
    params: {
      tconst: filmID,
      currentCountry: 'US'
    },
    headers: {
      'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY ,
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);

    const data = response.data
    const detail ={
      title: data.title.title,
      type: data.title.titleType,
      image: data.title.image.url,
      filmLenght: data.title.runningTimeInMinutes,
      year: data.title.year,
      rating: data.ratings.rating,
      ratingCount: data.ratings.ratingCount,
      genres: data.genres,
      releaseDate: data.releaseDate,
      plot: data.plotOutline.text
    }
    
    return res.status(200).send(detail);
  } catch (error) {
      response = {
        "status": "error",
        "code": 500,
        "message": "Error in fetching data from external API"
      }
      console.log(error)
      return res.status(500).send(response);

  }
     
}

exports.getAutocomplete = async (req, res) => {
  const searchTerm = req.query.name
  const options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/auto-complete',
    params: {q: searchTerm},
    headers: {
      'X-RapidAPI-Key':process.env.X_RAPIDAPI_KEY ,
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    const final_response = response.data.d
    .filter(data=>data.qid==="movie")
    .map(data=>{
      return {
        id: data.id,
        title: data.l,
      }
    })
    return res.status(200).send(final_response);
  } catch (error) {
    response = {
      "status": "error",
      "code": 500,
      "message": "Error in fetching data from external API"
    }
    console.log(error)
    return res.status(500).send(response);
  }
     
}