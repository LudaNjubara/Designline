/* ----------------------Functions------------------------- */
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

function changeSection(sections, activeSection, index) {
  const projectsLinks = document.querySelectorAll(".slika a");
  const contactFormInputs = document.querySelectorAll("#contact .contact-wrapper form input");
  const contactFormTextarea = document.querySelector("#contact .contact-wrapper form textarea");

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

  sections[activeSection].classList.remove("newSection");
  sections[activeSection].classList.add("closeSection");

  sections[index].classList.remove("closeSection");
  sections[index].classList.add("newSection");

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

  const nextColor = {
    homeColor: "#1b042b",
    aboutColor: "#ffbe30",
    projectsColor: "#18094d",
    contactColor: "#911d40",
  };
  const nextInnerColor = {
    homeColor: "#12031d",
    aboutColor: "#ffb412",
    projectsColor: "#120738",
    contactColor: "#910f36",
  };
  const nextHeroColor = {
    homeColor: "#0e0214",
    aboutColor: "#ffae00",
    projectsColor: "#0b0424",
    contactColor: "#91002c",
  };

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
