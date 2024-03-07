"use strict";

const header = document.querySelector('header');
const sliders = document.querySelectorAll(".slide");
const sliderContent = document.querySelectorAll(".slider-content");
const leftBtn = document.getElementById("left");
const RightBtn = document.getElementById("right");


RightBtn.addEventListener("click", () => {
    rigthSlide()
    setBgBody();
    setActiveSlide();
    setContent()
  });
  
  leftBtn.addEventListener("click", () => {
    leftSlide()
    setBgBody();
    setActiveSlide();
    setContent()
  });
  

let activeSlide = 0;

function setBgBody() {
    header.style.backgroundImage = sliders[activeSlide].style.backgroundImage;
}

setBgBody();

function setActiveSlide() {
  sliders.forEach((slides) => {
    slides.classList.remove("active");
  });
  sliders[activeSlide].classList.add("active");
}

function setContent (){
  sliderContent.forEach((sliderCon) => {
    sliderCon.classList.remove("active");
    
  })
    sliderContent[activeSlide].classList.add("active")
}


const leftSlide =()=>{
    activeSlide--;
    if (activeSlide < 0) {
      activeSlide = sliders.length - 1;
    }
}

const rigthSlide =()=>{
    activeSlide++;
  if (activeSlide > sliders.length - 1) {
    activeSlide = 0;
  }
}

function changeImgInterval (){ setInterval(() => {
    rigthSlide();
    setBgBody();
    setActiveSlide();
    setContent()
}, 6000)}

changeImgInterval()
