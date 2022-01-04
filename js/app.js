/* ----------------------Functions------------------------- */

/* Function to apply different forms of bg elements */
function heroBgAnimacija(nextFirstPathID, nextSecondPathID) {
  var tween1 = KUTE.fromTo(
    "#left-universal",
    { path: "#left-universal" },
    { path: `#${nextFirstPathID}` },
    {
      easing: "easingCircularOut",
      duration: 1500,
    }
  ).start();

  var tween2 = KUTE.fromTo(
    "#right-universal",
    { path: "#right-universal" },
    { path: `#${nextSecondPathID}` },
    {
      easing: "easingCircularOut",
      duration: 1500,
    }
  ).start();
}

/* Function to apply color fill on bg elements */
function fillAnimacija(nextColor) {
  var fillAnimation = KUTE.allTo(
    "#left-universal",
    {
      attr: { fill: nextColor },
    },
    {
      easing: "easingCubicInOut",
    }
  ).start();

  var fillAnimation2 = KUTE.allTo(
    "#right-universal",
    {
      attr: { fill: nextColor },
    },
    {
      easing: "easingCubicInOut",
    }
  ).start();
}

/* Function to alter between colors and forms of bg elements depending on section clicked */
function switchCase(targetID, nextBg, nextColor) {
  switch (targetID) {
    case "home-link":
      nextBg.push("left-home", "right-home");
      fillAnimacija(nextColor.homeColor);
      break;
    case "about-link":
      nextBg.push("left-about", "right-about");
      fillAnimacija(nextColor.aboutColor);
      break;
    case "projects-link":
      nextBg.push("left-projects", "right-projects");
      fillAnimacija(nextColor.projectsColor);
      break;
    case "contact-link":
      nextBg.push("left-contact", "right-contact");
      fillAnimacija(nextColor.contactColor);
      break;

    default:
      break;
  }
}

/* Function to change to selected section and remove tabIndex from inactive ones */
function changeSection(sections, activeSection, index) {
  const projectsLinks = document.querySelectorAll(".swiper-slide a");
  const contactFormInputs = document.querySelectorAll("#contact .contact-wrapper form input");
  const contactFormTextarea = document.querySelector("#contact .contact-wrapper form textarea");

  /* Removing tab indecies from all inactive sections */
  if (sections[activeSection].id == "projects") {
    projectsLinks.forEach((link) => {
      link.tabIndex = "-1";
      link.style.pointerEvents = "none";
    });
  } else if (sections[activeSection].id == "contact") {
    contactFormInputs.forEach((input) => {
      input.tabIndex = "-1";
    });
    contactFormTextarea.tabIndex = "-1";
  }
  /* Removing tab indecies from all inactive sections - end */

  /* Changing sections */
  sections[activeSection].classList.remove("newSection");
  sections[activeSection].classList.add("closeSection");

  sections[index].classList.remove("closeSection");
  sections[index].classList.add("newSection");
  /* Changing sections - end*/

  /* Adding tab indecies to active sections */
  if (sections[index].id == "projects") {
    projectsLinks.forEach((link) => {
      link.style.pointerEvents = "all";
    });
  } else if (sections[index].id == "contact") {
    contactFormInputs.forEach((input) => {
      input.tabIndex = "0";
    });
    contactFormTextarea.tabIndex = "0";
  }
  /* Adding tab indecies to active sections - end*/
}

/* Function to check if User is hovering over the Swiper Slides or not */
function checkHover() {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  swiperWrapper.mouseIsOver = false;
  swiperWrapper.onmouseover = function () {
    this.mouseIsOver = true;
  };
  swiperWrapper.onmouseout = function () {
    this.mouseIsOver = false;
  };

  return mouseIsOver;
}

/* Function to update the direction of the slides in Swiper on Projects section */
function updateSwiper(swiperObject) {
  if (window.innerWidth <= 768) {
    swiperObject.changeDirection("vertical");
  } else {
    swiperObject.changeDirection("horizontal");
  }
}

/* ------------------Main-------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const navIcons = [...document.querySelectorAll(".nav-icon img")];
  const navLinks = document.querySelectorAll(".nav-link");
  const hero = document.querySelector("#hero");
  const heroInnerContainer = document.querySelector(".hero-inner-container");
  const sections = document.querySelectorAll(".hero-inner-container section");
  const contactFormInputs = document.querySelectorAll("#contact .contact-wrapper form input");
  const contactFormTextarea = document.querySelector("#contact .contact-wrapper form textarea");
  const projectsLinks = document.querySelectorAll(".swiper-slide a");

  /* Color variables */
  const varHomeColor = "#1b042b";
  const varAboutColor = "#113e3a";
  const varProjectsColor = "#18094d";
  const varContactColor = "#911d40";

  const varHomeColorInner = "#12031d";
  const varAboutColorInner = "#0C2C29";
  const varProjectsColorInner = "#120738";
  const varContactColorInner = "#910f36";

  const varHomeColorHero = "#0e0214";
  const varAboutColorHero = "#040f0e";
  const varProjectsColorHero = "#0b0424";
  const varContactColorHero = "#91002c";
  /* Color variables - end */

  /* Colors dictionary */
  const nextColor = {
    homeColor: varHomeColor,
    aboutColor: varAboutColor,
    projectsColor: varProjectsColor,
    contactColor: varContactColor,
  };
  const nextInnerColor = {
    homeColor: varHomeColorInner,
    aboutColor: varAboutColorInner,
    projectsColor: varProjectsColorInner,
    contactColor: varContactColorInner,
  };
  const nextHeroColor = {
    homeColor: varHomeColorHero,
    aboutColor: varAboutColorHero,
    projectsColor: varProjectsColorHero,
    contactColor: varContactColorHero,
  };
  /* Colors dictionary - end */

  let nextBg = [];
  let activeLinkID;
  let activeSection;

  /* Remove tab indecies from Projects and Contact sections on first page load */
  projectsLinks.forEach((link) => {
    link.tabIndex = "-1";
    link.style.pointerEvents = "none";
  });

  contactFormInputs.forEach((input) => {
    input.tabIndex = "-1";
  });

  contactFormTextarea.tabIndex = "-1";
  /* Remove tab indecies from Projects and Contact sections on first page load - end */

  /* Set to the active section on first page load (Home page) */
  for (let i = 0; i < navLinks.length; i++) {
    if (navLinks[i].classList.contains("active")) {
      activeLinkID = navLinks[i].id;
      switchCase(activeLinkID, nextBg, nextColor);
      heroBgAnimacija(nextBg[0], nextBg[1]);
      nextBg = [];
    }
  }
  /* Set to the active section on first page load (Home page) - end */

  /* Initialize and set properties of swiper on Projects section */
  const swiper = new Swiper(".swiper", {
    enabled: false,
    effect: "coverflow",
    slidesPerView: "auto",
    loopedSlides: 6,
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    mousewheel: true,
    observer: true,

    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 300,
      scale: 0.95,
      modifier: 1,
      slideShadows: true,
    },

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: checkHover,
    },

    keyboard: {
      enabled: true,
      onlyInViewport: false,
      pageUpDown: true,
    },

    breakpoints: {
      // when window width is >= 250px
      250: {
        spaceBetween: 10,
      },
      // when window width is >= 400px
      400: {
        spaceBetween: 20,
      },
      // when window width is >= 769px
      769: {
        spaceBetween: 30,
      },
      // when window width is >= 1000px
      1000: {
        spaceBetween: 40,
      },
    },
  });
  /* Initialize and set properties of swiper on Projects section - end */

  /* Update the direction of slides in Swiper on page load depending on screen width */
  updateSwiper(swiper);

  window.addEventListener("resize", function () {
    updateSwiper(swiper);
  });
  /* Update the direction of slides in Swiper on page load depending on screen width - end */

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (e.target.classList.contains("active")) return;
      else {
        for (let j = 0; j < navLinks.length; j++) {
          if (navLinks[j].classList.contains("active")) {
            navLinks[j].classList.remove("active");
            activeSection = j;

            // Check which link was clicked
            switch (e.target.id) {
              case "home-link":
                changeSection(sections, activeSection, 0);
                hero.style.backgroundColor = "";
                heroInnerContainer.style.backgroundColor = nextInnerColor.homeColor;
                hero.style.background = `linear-gradient(to top right, ${nextHeroColor.homeColor}, ${nextInnerColor.homeColor})`;
                nav.style.backgroundColor = nextInnerColor.homeColor;
                navIcons.forEach((icon) => {
                  icon.style.filter =
                    "invert(21%) sepia(34%) saturate(6395%) hue-rotate(265deg) brightness(82%) contrast(113%)";
                });
                swiper.disable(); // disable moving of swiper slides when Projects section isn't active
                break;
              case "about-link":
                changeSection(sections, activeSection, 1);
                heroInnerContainer.style.backgroundColor = nextInnerColor.aboutColor;
                hero.style.background = `linear-gradient(to top right, ${nextHeroColor.aboutColor}, ${nextInnerColor.aboutColor})`;
                nav.style.backgroundColor = nextInnerColor.aboutColor;
                navIcons.forEach((icon) => {
                  icon.style.filter =
                    "invert(31%) sepia(67%) saturate(511%) hue-rotate(126deg) brightness(93%) contrast(81%)";
                });
                swiper.disable(); // disable moving of swiper slides when Projects section isn't active
                break;
              case "projects-link":
                changeSection(sections, activeSection, 2);
                heroInnerContainer.style.backgroundColor = nextInnerColor.projectsColor;
                hero.style.background = `linear-gradient(to top right, ${nextHeroColor.projectsColor}, ${nextInnerColor.projectsColor})`;
                nav.style.backgroundColor = nextInnerColor.projectsColor;
                navIcons.forEach((icon) => {
                  icon.style.filter =
                    "invert(14%) sepia(85%) saturate(4396%) hue-rotate(254deg) brightness(71%) contrast(112%)";
                });
                swiper.enable(); // enable moving of swiper slides when Projects section becomes active
                break;
              case "contact-link":
                changeSection(sections, activeSection, 3);
                heroInnerContainer.style.backgroundColor = nextInnerColor.contactColor;
                hero.style.background = `linear-gradient(to top right, ${nextHeroColor.contactColor}, ${nextInnerColor.contactColor})`;
                nav.style.backgroundColor = nextInnerColor.contactColor;
                navIcons.forEach((icon) => {
                  icon.style.filter =
                    "invert(30%) sepia(85%) saturate(3901%) hue-rotate(326deg) brightness(93%) contrast(91%)";
                });
                swiper.disable(); // disable moving of swiper slides when Projects section isn't active
                break;

              default:
                break;
            }
          }
        }
        e.target.classList.add("active");

        switchCase(e.target.id, nextBg, nextColor);
        heroBgAnimacija(nextBg[0], nextBg[1]);
        nextBg = [];
      }
    });
  });

  // disable tab key on Swiper slides
  document.querySelector(".swiper *").addEventListener("keydown", function (e) {
    if (e.keyCode == 9) {
      return;
    }
  });
});
