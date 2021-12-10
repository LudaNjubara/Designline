/* ----------------------Functions------------------------- */

/* Function to apply different forms on bg elements */
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

/* Function to alter between colors and forms on bg elements depending on section clicked */
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

/* Function to change to selected section and remove tabIndex from unactive ones */
function changeSection(sections, activeSection, index) {
  const projectsLinks = document.querySelectorAll(".slika a");
  const contactFormInputs = document.querySelectorAll("#contact .contact-wrapper form input");
  const contactFormTextarea = document.querySelector("#contact .contact-wrapper form textarea");

  /* Removing tab indecies from all unactive sections */
  if (sections[activeSection].id == "projects") {
    projectsLinks.forEach((link) => {
      link.tabIndex = "-1";
    });
  } else if (sections[activeSection].id == "contact") {
    contactFormInputs.forEach((input) => {
      input.tabIndex = "-1";
    });
    contactFormTextarea.tabIndex = "-1";
  }
  /* Removing tab indecies from all unactive sections - end */

  /* Changing sections */
  sections[activeSection].classList.remove("newSection");
  sections[activeSection].classList.add("closeSection");

  sections[index].classList.remove("closeSection");
  sections[index].classList.add("newSection");
  /* Changing sections - end*/

  /* Adding tab indecies to active sections */
  if (sections[index].id == "projects") {
    projectsLinks.forEach((link) => {
      link.tabIndex = "0";
    });
  } else if (sections[index].id == "contact") {
    contactFormInputs.forEach((input) => {
      input.tabIndex = "0";
    });
    contactFormTextarea.tabIndex = "0";
  }
  /* Adding tab indecies to active sections - end*/
}

/* ------------------Main-------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const hero = document.querySelector("#hero");
  const heroInnerContainer = document.querySelector(".hero-inner-container");
  const sections = document.querySelectorAll(".hero-inner-container section");
  const projectsLinks = document.querySelectorAll(".slika a");
  const contactFormInputs = document.querySelectorAll("#contact .contact-wrapper form input");
  const contactFormTextarea = document.querySelector("#contact .contact-wrapper form textarea");

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

  projectsLinks.forEach((link) => {
    link.tabIndex = "-1";
  });

  contactFormInputs.forEach((input) => {
    input.tabIndex = "-1";
  });

  contactFormTextarea.tabIndex = "-1";

  for (let i = 0; i < navLinks.length; i++) {
    if (navLinks[i].classList.contains("active")) {
      activeLinkID = navLinks[i].id;
      switchCase(activeLinkID, nextBg, nextColor);
      heroBgAnimacija(nextBg[0], nextBg[1]);
      nextBg = [];
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (e.target.classList.contains("active")) return;
      else {
        for (let j = 0; j < navLinks.length; j++) {
          if (navLinks[j].classList.contains("active")) {
            navLinks[j].classList.remove("active");
            activeSection = j;

            switch (e.target.id) {
              case "home-link":
                changeSection(sections, activeSection, 0);
                hero.style.backgroundColor = "";
                heroInnerContainer.style.backgroundColor = nextInnerColor.homeColor;
                hero.style.background = `linear-gradient(to top right, ${nextHeroColor.homeColor}, ${nextInnerColor.homeColor})`;
                break;
              case "about-link":
                changeSection(sections, activeSection, 1);
                heroInnerContainer.style.backgroundColor = nextInnerColor.aboutColor;
                hero.style.background = `linear-gradient(to top right, ${nextHeroColor.aboutColor}, ${nextInnerColor.aboutColor})`;
                break;
              case "projects-link":
                changeSection(sections, activeSection, 2);
                heroInnerContainer.style.backgroundColor = nextInnerColor.projectsColor;
                hero.style.background = `linear-gradient(to top right, ${nextHeroColor.projectsColor}, ${nextInnerColor.projectsColor})`;
                break;
              case "contact-link":
                changeSection(sections, activeSection, 3);
                heroInnerContainer.style.backgroundColor = nextInnerColor.contactColor;
                hero.style.background = `linear-gradient(to top right, ${nextHeroColor.contactColor}, ${nextInnerColor.contactColor})`;
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
});
