// testimonial Slider
var swiper = new Swiper(".testimonialSlider", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".portfolio-slider-tab", {
  slidesPerView: 4,
});

var swiper = new Swiper(".partner-slider", {
  slidesPerView: 4,
  breakpoints: {
    1400: {
      slidesPerView: 5,
      spaceBetweenSlides: 30
    },
    1200: {
      slidesPerView: 4,
      spaceBetweenSlides: 30
    },
    767: {
      slidesPerView: 3,
      spaceBetweenSlides: 30
    },

    575: {
      slidesPerView: 2,
      spaceBetweenSlides: 40
    },
    320: {
      slidesPerView: 1,
      spaceBetweenSlides: 40
    }
  }
});

// filter 
const tabItems = document.querySelectorAll('.tab-item')
const contentItems = document.querySelectorAll('.content-item')

const clearActiveClass = (element, className = 'is-active') => {
  element.forEach(item => item.classList.remove(`${ className }`))
}

const setActiveClass = (element, index, className = 'is-active') => {
  element[index].classList.add(`${ className }`)
}

const checkoutTabs = (item, index) => {
  item.addEventListener('click', () => {
    if (item.classList.contains('is-active')) return

    const currentItem = index

    clearActiveClass(tabItems)
    clearActiveClass(contentItems)

    setActiveClass(tabItems, currentItem)
    setActiveClass(contentItems, currentItem)
  })
}

tabItems.forEach(checkoutTabs)
var swiper = new Swiper('.alex-portfolio-swiper-container', {
  slidesPerView: 3,
  direction: getDirection(),
  navigation: {
    nextEl: '.alax-portfolio-swiper-button-next',
    prevEl: '.alax-portfolio-swiper-button-prev',
  },
  on: {
    resize: function () {
      swiper.changeDirection(getDirection());
    },
  },
});

function getDirection() {
  var windowWidth = window.innerWidth;
  var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

  return direction;
}

// init Isotope
var $grid = $('.all-items-portfolio').isotope({
  // options
});
// filter items on button click
$('.portfolio-menu').on('click', 'li', function () {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({
    filter: filterValue
  });
});

$('.scroll-shift').click(function (e) {
  e.preventDefault();
  var target = $($(this).attr('href'));
  if (target.length) {
    var scrollTo = target.offset().top;
    $('body, html').animate({
      scrollTop: scrollTo + 'px'
    }, 400);
  }
});

window.addEventListener('load', function () {
  let theme = localStorage.getItem('theme');

  var themeMode = document.getElementById("themeMode")
  console.log(themeMode);
  if (themeMode) themeMode.value = theme;
  if (theme) {
	changeTheme(theme);
  }  
});

var e = document.getElementById("themeMode");
e.addEventListener('change', function () {
  var e = document.getElementById("themeMode");

  changeTheme(e.value);
})

function changeTheme(value) {
  localStorage.setItem('theme', value)
  document.documentElement.dataset.bsTheme = value;
  /*
  if (value == "dark") {
    document.getElementById('theme').classList.add('dark-theme')
  } else {
    document.getElementById('theme').classList.remove('dark-theme')
  }*/
}

window.addEventListener('load', (event) => {
  let theme = localStorage.getItem('theme');
  let element = document.getElementById("themeMode");
  element.value = theme;
});
