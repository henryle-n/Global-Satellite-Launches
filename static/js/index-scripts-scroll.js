(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 72)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 75
  });

  // function to collapse nav bar
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-scrolled");
    } else {
      $("#mainNav").removeClass("navbar-scrolled");
    }
  };
  // if not at top :: collapse navbar
  navbarCollapse();

// navbar hiden when scroll
  $(window).scroll(navbarCollapse);



})(jQuery); // End of use strict


// Good trial for Vanilla JS
var textContainerID = ".main-page-title";

var textContainer = document.querySelector(textContainerID);
var textString= textContainer.textContent;
var splittedText = textString.split("");
textContainer.innerHTML = "";
var strLen = splittedText.length;


for (let i=0; i<strLen; i++) {

  if (splittedText[i] === " ") {
    textContainer.innerHTML += '<span class="hidden-Text">' + "&nbsp" + "</span>";
  }

  else if (splittedText[i] == "#") {
    textContainer.innerHTML += '<span style="display: block;">' + "</span>";
  }

  else {
  textContainer.innerHTML += '<span class="hidden-Text">' + splittedText[i] + "</span>";
  }
}

var nthChild = 0;
var textAnimSpeed = 50;
var userTextWaitTime = textAnimSpeed * strLen;
var timer;

// build a timer loop
setTimeout(userMessage2, userTextWaitTime);

function animMainT () {
  
    var animTexts = textContainer.querySelectorAll('span')[nthChild];
    animTexts.setAttribute('class', 'myAnim');
    nthChild++

    if (nthChild == strLen){
      clearInterval(timer);
      timer=null;
    };
  }




var facts = [
  "Did you know: In the last 46 years, there are 2,666 Satellites and counting have been successfully lauched!?",
  "Pretty Amazing, right?",
  "Do you know who owns the most satellite?",
  "Do you know who are the second and the third?",
  " Well, so many facts we didn't know, right?",
  "Let's find out!",
  "Scroll down to see our team and project",
  "Or select one of the options in the Navigation Bar!",
  "Thank you for visting and enjoy!"
]
  

var nFact=0;
// let timerMsgBox= setInterval(userMessage, 10000);
var msgArea = document.querySelector('#user-exp-text');
var factsLen = facts.length;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function userMessage2() {
  
  if(!msgArea.classList.contains("activeText")) {
  msgArea.classList.add('activeText');
  }
  
  for (nFact=0; nFact<factsLen-1; nFact++) {
    if(!msgArea.classList.contains("inactiveText")) {
      msgArea.classList.add('inactiveText');
    }
    console.log ("contains activeText ??", msgArea.classList.contains("inactiveText"));
    msgArea.classList.replace('inactiveText', 'activeText');
    
    fact = facts[nFact]
    console.log("this is fact :: ", fact);
    msgArea.innerHTML = fact;
    await sleep(3000);
    msgArea.classList.replace('activeText', 'inactiveText');
    console.log("inactive changed");
    await sleep(150);
  }
  
  msgArea.innerHTML = facts.slice(-1);
  msgArea.classList.replace('inactiveText', 'activeText-last');
  timer= setInterval(animMainT, textAnimSpeed);
  document.querySelector('.btn-xl-hidden').classList.replace('btn-xl-hidden', 'btn-xl-show');

};





function userMessage (fact){
    msgArea.classList.add('activeText');
    // msgArea.classList.add('activeText');
    
    fact = facts[nFact]
    console.log("this is fact :: ", fact);
    msgArea.innerHTML = fact;
    nFact++  
    msgArea.classList.add('activeText');

    if (nFact == factsLen){
      clearInterval(timerMsgBox);
      timerMsgBox=null;
      console.log("All facts exported!")
    };

}



