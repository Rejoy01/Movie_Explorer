const  SearchEL = document.getElementById("search");
const formEL = document.getElementById("form");
const imagePath = "https://image.tmdb.org/t/p/w1280"
const MoviesContainer = document.querySelector(".movies-details");
const paginationsContainer = document.querySelector('.paginations');
const listItems = paginationsContainer.querySelectorAll('ul li');
//fc95b085c87b910a96dbb74ba609c600
//https://api.themoviedb.org/3/collection/collection_id/images/api_key=fc95b085c87b910a96dbb74ba609c600
const MoviesAPI = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.des&api_key=fc95b085c87b910a96dbb74ba609c600&page="

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
        MoviesContainer.appendChild(MoviesDisplay)
    })
}


//pagination
listItems.forEach((pages,index)=>{
    pages.addEventListener('click',()=>{
        if(getMovies){
            getMovies(MoviesAPI+index)
        }
    })
})