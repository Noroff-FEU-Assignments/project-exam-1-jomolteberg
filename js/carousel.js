import { createBlogPostHTML } from "./helpers.js";
import { getBlogImage } from "./renderBlogPosts.js";

export async function createCarousel(carouselBlogPosts) {

  const carouselContainer = document.querySelector(".carousel-container");
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');

  if (!carouselContainer || !prevButton || !nextButton) {
    return;
  }

const carouselContent = document.createElement('div');
carouselContent.classList.add('carousel-content');

const carouselWrapper = document.createElement('div');
carouselWrapper.classList.add('carousel-wrapper');
carouselWrapper.append(prevButton, carouselContent, nextButton);

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
