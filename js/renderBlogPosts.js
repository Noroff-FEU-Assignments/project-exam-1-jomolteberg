import { createBlogPostHTML } from "./helpers.js";

const apiBase = "https://beautifuldestinations.jomolteberg.no/";
const wpRestBase = "/wp-json/wp/v2";
const postsBase = "/posts";
const imageBase = "/media";

const fullBlogPostsURL = apiBase + wpRestBase + postsBase;

export async function getBlogPosts() {
  const response = await fetch(fullBlogPostsURL);
  const blogPosts = await response.json();
  return blogPosts;
}

export async function getBlogImage(id) {
  const fullBlogImageURL = apiBase + wpRestBase + imageBase + "/" + id;
  const response = await fetch(fullBlogImageURL);
  const blogImage = await response.json();
  return blogImage.source_url;
}


export async function createBlogPostsHTML(blogPosts) {
  const imageURLs = await Promise.all(
    blogPosts.map((post) => getBlogImage(post.featured_media))
  );

  for (let i = 0; i < blogPosts.length; i++) {
    const blogPost = blogPosts[i];
    const imageURL = imageURLs[i];
    createBlogPostHTML(blogPost, imageURL);
  }
}


export async function createCarousel(carouselBlogPosts) {
  console.log("Creating carousel");
  const carouselContainer = document.querySelector(".carousel-container");

  const prevButton = document.createElement('button');
  prevButton.textContent = 'Previous';
  prevButton.classList.add('carousel-prev');
  carouselContainer.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.classList.add('carousel-next');
  carouselContainer.append(nextButton);

  const carouselContent = document.createElement('div');
  carouselContent.classList.add('carousel-content');
  carouselContainer.append(carouselContent);

  const imageURLs = await Promise.all(
    carouselBlogPosts.map((post) => getBlogImage(post.featured_media))
  );

  let startIndex = 0;
  const postCount = 3;

  function updateCarousel() {
    carouselContent.innerHTML = "";
    for (
      let i = startIndex;
      i < startIndex + postCount && i < carouselBlogPosts.length;
      i++
    ) {
      const blogPost = carouselBlogPosts[i];
      const imageURL = imageURLs[i];
      createBlogPostHTML(blogPost, imageURL, carouselContent);
    }
  }

  prevButton.addEventListener('click', () => {
    console.log('Previous button clicked'); // Add this line
    startIndex = Math.max(0, startIndex - postCount);
    updateCarousel();
  });
  
  nextButton.addEventListener('click', () => {
    console.log('Next button clicked'); // Add this line
    startIndex = Math.min(carouselBlogPosts.length - postCount, startIndex + postCount);
    updateCarousel();
  });
  
  updateCarousel();
}



export async function blogPostsPage() {
  console.log("blogPostsPage called"); // Add this line

  const blogPostsContainer = document.querySelector(".blog-container");
  blogPostsContainer.innerHTML = "";

  const blogPosts = await getBlogPosts();
  console.log("blogPosts fetched", blogPosts); // Add this line

  const carouselBlogPosts = blogPosts.slice(0, 3);
  const nonCarouselBlogPosts = blogPosts.slice(3);

  createBlogPostsHTML(nonCarouselBlogPosts);
  createCarousel(carouselBlogPosts);
}






