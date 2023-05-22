import { createBlogPostHTML } from "./helpers.js";
import { getBlogImage } from "./renderBlogPosts.js";

export async function createCarousel(carouselBlogPosts) {

  const carouselContainer = document.querySelector(".carousel-container");
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');

  if (!carouselContainer || !prevButton || !nextButton) {
    return;
  }

 // Create the carousel content container
const carouselContent = document.createElement('div');
carouselContent.classList.add('carousel-content');

// Create a wrapper for the carousel
const carouselWrapper = document.createElement('div');
carouselWrapper.classList.add('carousel-wrapper');

// Append the buttons and content to the wrapper
carouselWrapper.append(prevButton, carouselContent, nextButton);

// Append the wrapper to the carousel container
carouselContainer.append(carouselWrapper);

  const imageURLs = await Promise.all(
    carouselBlogPosts.map((post) => getBlogImage(post.featured_media))
  );

  let startIndex = 0;
  let postCount = 3;

  function updateCarousel() {
    let postCount;
    if (window.innerWidth < 768) {
      postCount = 1;
    } else {
      postCount = 3;
    }

    carouselContent.innerHTML = "";
    for (let i = 0; i < postCount; i++) {
      const index = (startIndex + i) % carouselBlogPosts.length;
      const blogPost = carouselBlogPosts[index];
      const imageURL = imageURLs[index];
      createBlogPostHTML(blogPost, imageURL, carouselContent);
    }
  }

  prevButton.addEventListener('click', () => {
    startIndex = (startIndex - postCount + carouselBlogPosts.length) % carouselBlogPosts.length;
    updateCarousel();
  });
  
  nextButton.addEventListener('click', () => {
    startIndex = (startIndex + postCount) % carouselBlogPosts.length;
    updateCarousel();
  });
  
  updateCarousel();
}
