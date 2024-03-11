"use strict";

const MoviesAPI = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.des&api_key=fc95b085c87b910a96dbb74ba609c600&page="

const header = document.querySelector('header');
let sliders;
let data;

const leftBtn = document.getElementById("left");
const RightBtn = document.getElementById("right");




async function getData(url) {
  try {
    const result = await fetch(url)
    const jsonData = await result.json();
    return jsonData.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  sliders = document.querySelectorAll(".slide");
  data = await getData(MoviesAPI);
  setSlider(data);
});

leftBtn.addEventListener("click", () => {
  leftSlide();
});

RightBtn.addEventListener("click", () => {
  rightSlide();
});

let activeSlide = 0;

function setSlider(data) {
  if (sliders && data && data.length > 0) {
    data.slice(0, sliders.length).forEach((movie, index) => {
      const { title, poster_path ,release_date,vote_average} = movie;
      const slide = sliders[index];
      const content = slide.querySelector('.slider-content');
      const titleElement = content.querySelector('.movies-titles');
      const releaseDate = content.querySelector('.release-date');
      const Rating = content.querySelector('.Rating');

      
      slide.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${poster_path}')`;

      
      titleElement.textContent = title;
      Rating.textContent = `Rating : ${vote_average.toFixed(1)}`;
      releaseDate.textContent = `Release Date: ${release_date}`;
    });

    setBgBody();
    setActiveSlide();
    setContent();
  }
}

function setActiveSlide() {
  if (sliders && sliders.length > 0) {
    sliders.forEach((slides) => {
      slides.classList.remove("active");
    });
    sliders[activeSlide].classList.add("active");
  }
}

function setBgBody() {
  if (sliders && sliders.length > 0) {
    header.style.backgroundImage = sliders[activeSlide].style.backgroundImage;
  }
}

function setContent() {
  const sliderContent = document.querySelectorAll(".slider-content");
  if (sliderContent) {
    sliderContent.forEach((sliderCon) => {
      sliderCon.classList.remove("active");
    })
    sliderContent[activeSlide].classList.add("active")
  }
}

const leftSlide = () => {
  activeSlide--;
  if (activeSlide < 0) {
    activeSlide = sliders.length - 1;
  }
  setBgBody();
  setActiveSlide();
  setContent();
}

const rightSlide = () => {
  activeSlide++;
  if (activeSlide >= sliders.length) {
    activeSlide = 0;
  }
  setBgBody();
  setActiveSlide();
  setContent();
}

function changeImgInterval() {
  setInterval(() => {
    rightSlide();
  }, 6000);
}

changeImgInterval();
