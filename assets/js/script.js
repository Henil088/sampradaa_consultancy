'use strict';

/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * toggle navbar
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

//animation 

const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 300,
}) 

sr.reveal(`.hero-banner`,{delay: 300, scale: .5,})
sr.reveal(`.hero-content, .about-content, .container`)


/**
 * Page loader
 */
const pageLoader = document.getElementById('loader');

window.addEventListener('load', function () {
  if (!pageLoader) return;
  pageLoader.classList.add('hidden');
  // remove from DOM after transition
  setTimeout(() => {
    if (pageLoader && pageLoader.parentNode) pageLoader.parentNode.removeChild(pageLoader);
  }, 600);
});


// contact form emailjs

const form = document.getElementById("contact-form");

if (form) {
  const submitButton = form.querySelector("button[type='submit'], input[type='submit']");
  let isSubmitting = false;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (isSubmitting) return;

    isSubmitting = true;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    emailjs.sendForm(
      "service_bsq43ji",
      "template_fb03k4r",
      this
    )
      .then(function () {
        form.reset();
        alert("Message sent successfully!");
      })
      .catch(function (error) {
        console.log(error);
        alert("Failed to send message.");
      })
      .finally(function () {
        isSubmitting = false;

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Send Message";
        }
      });
  });
}
