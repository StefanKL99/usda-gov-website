// Example: Fade out on a link click
/*const links = document.querySelectorAll('a'); // Add more specific selectors if needed

links.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        document.body.classList.add('fade-out');
        const href = this.getAttribute('href');
        setTimeout(() => {
            window.location.href = href;
        }, 500); // Adjust the timeout to match the transition duration
    });
}); */



// JavaScript to toggle the page class and handle fade-out
document.addEventListener('DOMContentLoaded', function () {
   const body = document.querySelector('body');

   // Add click event listeners to your navigation links
   const links = document.querySelectorAll('.navigation a');
   links.forEach(link => {
       link.addEventListener('click', function (event) {
           event.preventDefault();
           
           // Check if the link is navigating to the homepage or interests page
           const href = this.getAttribute('href');
           const isHomepageLink = href === 'index2.html' || href.toLowerCase().includes('home');

           // Add the fade-out class
           body.classList.add('fade-out');

           // Wait for the transition to complete and navigate to the new page
           setTimeout(() => {
               if (isHomepageLink) {
                   window.location.href = 'index.html'; // Adjust the URL as needed
               } else {
                   window.location.href = href;
               }
           }, 500); // Adjust the timeout to match the transition duration
       });
   });
});



let onSlide = false;

window.addEventListener("load", () => {
   autoSlide();

   const dots = document.querySelectorAll(".carousel_dot");
   for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener("click", () => slide(i));
   }

   const buttonPrev = document.querySelector(".carousel_button__prev");
   const buttonNext = document.querySelector(".carousel_button__next");
   buttonPrev.addEventListener("click", () => slide(getItemActiveIndex() - 1));
   buttonNext.addEventListener("click", () => slide(getItemActiveIndex() + 1));
})

function autoSlide() {
   setInterval(() => {
      slide(getItemActiveIndex() + 1);
   }, 3000); // slide speed = 3s
}

function slide(toIndex) {
   if (onSlide)
      return;
   onSlide = true;

   const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
   const itemActive = document.querySelector(".carousel_item__active");
   const itemActiveIndex = itemsArray.indexOf(itemActive);
   let newItemActive = null;

   if (toIndex > itemActiveIndex) {
      // check if toIndex exceeds the number of carousel items
      if (toIndex >= itemsArray.length) {
         toIndex = 0;
      }

      newItemActive = itemsArray[toIndex];

      // start transition
      newItemActive.classList.add("carousel_item__pos_next");
      setTimeout(() => {
         newItemActive.classList.add("carousel_item__next");
         itemActive.classList.add("carousel_item__next");
      }, 20);
   } else {
      // check if toIndex exceeds the number of carousel items
      if (toIndex < 0) {
         toIndex = itemsArray.length - 1;
      }

      newItemActive = itemsArray[toIndex];

      // start transition
      newItemActive.classList.add("carousel_item__pos_prev");
      setTimeout(() => {
         newItemActive.classList.add("carousel_item__prev");
         itemActive.classList.add("carousel_item__prev");
      }, 20);
   }

   // remove all transition class and switch active class
   newItemActive.addEventListener("transitionend", () => {
      itemActive.className = "carousel_item";
      newItemActive.className = "carousel_item carousel_item__active";
      onSlide = false;
   }, {
      once: true
   });

   slideIndicator(toIndex);
}

function getItemActiveIndex() {
   const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
   const itemActive = document.querySelector(".carousel_item__active");
   const itemActiveIndex = itemsArray.indexOf(itemActive);
   return itemActiveIndex;
}

function slideIndicator(toIndex) {
   const dots = document.querySelectorAll(".carousel_dot");
   const dotActive = document.querySelector(".carousel_dot__active");
   const newDotActive = dots[toIndex];

   dotActive.classList.remove("carousel_dot__active");
   newDotActive.classList.add("carousel_dot__active");
}