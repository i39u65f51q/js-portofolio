const header = document.querySelector('header');
const main = document.querySelector('main');
const carousel = document.querySelector('section .carousel');
const manualBtns = carousel.querySelectorAll('.carousel-manually ul li');
//ScollHandler
function scrollHandler() {
  let num = 100;
  //PikaChu Transform
  const blockPage = document.querySelector('.block');
  function PikaChuHandler() {
    if (num <= 100 && num >= 0) {
      blockPage.style.setProperty(
        'transform',
        `translateY(${num - scrollY * 0.15}%)`
      );
    }
  }
  //SideBar
  const sidebar = document.querySelector('.sidebar');
  const headerHeight = header.getBoundingClientRect().height;
  function sideBarHandler() {
    if (scrollY > headerHeight / 2) {
      sidebar.classList.add('show');
    } else {
      sidebar.classList.remove('show');
    }
  }
  sideBarHandler();
  PikaChuHandler();
}
//Carousel
let slide = 0;
const carouselImgs = carousel.querySelectorAll('.img img');
function carouselSlideNext() {
  slide++;
  if (slide > carouselImgs.length - 1) {
    slide = 0;
  }
  transformCarousel();
}
function carouselSlidePrev() {
  slide--;
  if (slide < 0) {
    slide = carouselImgs.length - 1;
  }
  transformCarousel();
}
function transformCarousel() {
  carouselImgs.forEach(img => {
    img.style.setProperty('transform', `translateX(${slide * -100}%)`);
  });
  carousel.querySelector('ul li.select').classList.remove('select');
  manualBtns[slide].classList.add('select');
}
setInterval(carouselSlideNext, 5000);
carousel.querySelectorAll('.bx').forEach(btn => {
  btn.addEventListener('click', e => {
    if (e.target.classList.contains('right-btn')) {
      carouselSlideNext();
    }
    if (e.target.classList.contains('left-btn')) {
      carouselSlidePrev();
    }
  });
});
manualBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    slide = i;
    carousel.querySelector('ul li.select').classList.remove('select');
    btn.classList.add('select');
    transformCarousel();
  });
});
window.addEventListener('scroll', scrollHandler);

//Article Paragraph
const paragraphs = document.querySelectorAll('article p');
paragraphs.forEach(p => {
  const newParagraph = p.textContent.split(' ');
  if (newParagraph.length > 50) {
    newParagraph.splice(50);
  }
  p.textContent = newParagraph + '... More';
});
