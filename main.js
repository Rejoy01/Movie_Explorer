const  SearchEL = document.getElementById("Search");
const formEL = document.getElementById("form");
const imagePath = "https://image.tmdb.org/t/p/w1280"
const MoviesContainer = document.querySelector(".movies-details");
const RecommendedMoviesContainer = document.querySelector(".Recommended-movies");
const paginationsContainer = document.querySelector('.paginations');
const listItems = paginationsContainer.querySelectorAll('ul li');
//fc95b085c87b910a96dbb74ba609c600
//https://api.themoviedb.org/3/collection/collection_id/images/api_key=fc95b085c87b910a96dbb74ba609c600
const MoviesAPI = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.des&api_key=fc95b085c87b910a96dbb74ba609c600&page="

const searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=fc95b085c87b910a96dbb74ba609c600&query="

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzk1YjA4NWM4N2I5MTBhOTZkYmI3NGJhNjA5YzYwMCIsInN1YiI6IjY1ZTZjMGRhOGQxYjhlMDE2MzY2ZDBlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nubfsmdkVnpIrodIFatI9C6dUsqO4F5xvZxvs4FHexY'
    }
  };




function fetchCredits(moiveId){
   
    const url = `https://api.themoviedb.org/3/movie/${moiveId}/credits?language=en-US`

    fetch(url,options)
    .then(response => response.json())
    .then(data =>{
        const cast = data.cast;
        const crew = data.crew;
        displayCrewAndCrew(cast,crew)

    })
    .catch(error => console.error('Error fetching movie credits :',error   ));

}


function fetchMovieTrailer(movieId) {

    const apiKey = 'fc95b085c87b910a96dbb74ba609c600';

    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Assuming the first video returned is the trailer
            const trailerKey = data.results[0].key;
            displayTrailer(trailerKey);
        })
        .catch(error => console.error('Error fetching trailer:', error));
}




function fetchDetails(movieId){
    
    
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
    
    fetch(url,options)
    .then(response => response.json())
    .then(data =>{
        const DetailData = data.genres[0].name
        displayDetails(DetailData)
    }).catch(error => console.error('Error fetching Details',error))
    
}


function fetchRecommendations(movieId){
    const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`
    fetch(url, options)
    .then(response => response.json())
    .then(data =>{
        RecommendedMovies(data.results)
    })
    .catch(err => console.error("Error fetching recommendations", err))
}



function displayCrewAndCrew(cast,crew){
    // console.log(cast);
    const Director = document.getElementById("Director")
    const Writers = document.getElementById("writers")
    const StarsEle = document.getElementById("stars")
    cast.slice(0,3).forEach(member  =>{
        const listItem = document.createElement("li")
        listItem.classList.add("List")
        listItem.textContent =` ${member.name}`
        StarsEle.appendChild(listItem)
    })
    crew.filter(member=> member.department == "Writing").slice(0,3).forEach(member =>{
        const writersList = document.createElement("li")
        writersList.classList.add("List")
        writersList.textContent = `${member.name}`
        Writers.appendChild(writersList)
    })
    crew.filter(member=> member.job === "Director").slice(0,1).forEach(director => {
        const Directors = document.createElement("li")
        Directors.classList.add("List")
        Directors.textContent = `${director.name} `
        Director.appendChild(Directors)
    })
    
}


function displayDetails(genre){
    console.log(genre)
    document.getElementById('genre').textContent =`${genre}`
}




function displayTrailer(trailerKey) {
    const trailerContainer = document.getElementById('trailer-container');
    trailerContainer.innerHTML = `
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailerKey}" frameborder="0" allowfullscreen></iframe>
    `;
}



//fetch movies
getMovies(MoviesAPI)

async function getMovies(url){
    try {
        const result = await fetch(url)
        const data = await result.json()
        showMovies(data.results)
        // console.log(data);
    } catch (error) {
        console.log(error);
    }
}


//display movie inside html
function showMovies(movies){
    MoviesContainer.innerHTML = " ";
    const length = movies.length
    movies.slice(0,12).forEach((movie)=>{
        const {title,release_date,poster_path,vote_average} = movie
        const MoviesDisplay = document.createElement('div');
        MoviesDisplay.classList.add('movies');
        MoviesDisplay.innerHTML=`<img src="${imagePath+poster_path}" alt="">
        <p class="movies-title">
          ${title}
        </p>
        <div class="short-des">
          <p class="year">Date : ${release_date}</p>
          <p class="rating">Rating : ${vote_average.toFixed(1)}</p>
        </div>`
        MoviesDisplay.addEventListener('click', ()=>{showMovieDetails(movie)})
        MoviesContainer.appendChild(MoviesDisplay)

        // showMovieDetails(movie)
    })
}


formEL.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchTerm = SearchEL.value;
    
    if(searchTerm ){
        getMovies(searchUrl+searchTerm)
        document.getElementById('movies').classList.remove('hidden');
        document.getElementById('footer').classList.remove('hidden');
        document.getElementById('movieDetails').classList.add('hidden');
    }else{
        window.location.reload();
        
    }
})
//693134
//pagination
listItems.forEach((pages,index)=>{
    pages.addEventListener('click',()=>{
        if(getMovies){
            if(index ==0){
                index++
            }
            getMovies(MoviesAPI+index)
        }
    })
})

function showMovieDetails(movie) {
    // console.log(movie);
    fetchRecommendations(movie.id)
    fetchDetails(movie.id)
    fetchMovieTrailer(movie.id);
    fetchCredits(movie.id)
    document.getElementById('detailTitle').textContent = movie.title;
    document.getElementById('detailPoster').innerHTML = `<img class="MovieImg"src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">`; // Line 3
    document.getElementById('detailRating').textContent = `Rating : ${movie.vote_average.toFixed(1)}`; 
    // document.getElementById('genre').textContent = `${movie.genre_ids}`; 
    document.getElementById('overview').textContent = movie.overview; 
    document.getElementById('releaseDate').textContent =`Release date : ${movie.release_date}`; 
    
    document.getElementById('movies').classList.add('hidden');
    document.querySelector('header').classList.add('hidden');
    document.getElementById('footer').classList.add('hidden');
    document.getElementById('movieDetails').classList.remove('hidden'); 

 
    document.getElementById('backButton').addEventListener('click', () => {
        console.log(); 
        document.getElementById('movies').classList.remove('hidden');
        document.querySelector('header').classList.remove('hidden');
        document.getElementById('footer').classList.remove('hidden');
        document.getElementById('movieDetails').classList.add('hidden');
    });
}


function RecommendedMovies(movies){
    // console.log(movies);
    RecommendedMoviesContainer.innerHTML = " ";
    const length = movies.length
    movies.slice(0,3).forEach((movie)=>{
        const {title,release_date,poster_path,vote_average} = movie
        const MoviesDisplay = document.createElement('div');
        MoviesDisplay.classList.add('movies');
        MoviesDisplay.innerHTML=`<img src="${imagePath+poster_path}" alt="">
        <p class="movies-title">
          ${title}
        </p>
        <div class="short-des">
          <p class="year">Date : ${release_date}</p>
          <p class="rating">Rating : ${vote_average.toFixed(1)}</p>
        </div>`
        MoviesDisplay.addEventListener('click', ()=>{showMovieDetails(movie)})
        RecommendedMoviesContainer.appendChild(MoviesDisplay)

        // showMovieDetails(movie)
    })
}

function isFavorite(movieId){
    let Favorite = json.parse(localStorage.getItem('favorite')) || [];
    const index = Favorite.indexOf(movieId);
    if (index == -1) {
        Favorite.push(movieId)
    }else{
        Favorite.splice(index, 1)
    }
    localStorage.setItem('favorite', JSON.stringify(Favorite))
}

f

