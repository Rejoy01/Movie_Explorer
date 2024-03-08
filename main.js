const  SearchEL = document.getElementById("Search");
const formEL = document.getElementById("form");
const imagePath = "https://image.tmdb.org/t/p/w1280"
const MoviesContainer = document.querySelector(".movies-details");
const paginationsContainer = document.querySelector('.paginations');
const listItems = paginationsContainer.querySelectorAll('ul li');
//fc95b085c87b910a96dbb74ba609c600
//https://api.themoviedb.org/3/collection/collection_id/images/api_key=fc95b085c87b910a96dbb74ba609c600
const MoviesAPI = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.des&api_key=fc95b085c87b910a96dbb74ba609c600&page="

const searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=fc95b085c87b910a96dbb74ba609c600&query="




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

// Function to display the trailer on the page
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
        console.log(data);
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
          <p class="rating">Rating : ${vote_average}</p>
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
    console.log(movie);
    document.getElementById('detailTitle').textContent = movie.title;
    document.getElementById('detailPoster').innerHTML = `<img class="MovieImg"src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">`; // Line 3

    fetchMovieTrailer(movie.id);
    document.getElementById('detailRating').textContent = `Rating : ${movie.vote_average}`; 
    document.getElementById('genre').textContent = `Rating : ${movie.vote_average}`; 
    document.getElementById('overview').textContent = movie.overview; 
    document.getElementById('releaseDate').textContent =`Release date : ${movie.release_date}`; 
    
    document.getElementById('movies').classList.add('hidden');
    document.getElementById('footer').classList.add('hidden');
    document.getElementById('movieDetails').classList.remove('hidden'); 

 
    document.getElementById('backButton').addEventListener('click', () => {
        console.log(); 
        document.getElementById('movies').classList.remove('hidden');
        document.getElementById('footer').classList.remove('hidden');
        document.getElementById('movieDetails').classList.add('hidden');
    });
}