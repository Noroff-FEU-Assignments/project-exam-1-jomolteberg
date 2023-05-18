import { createBlogPostHTML } from "./helpers.js";
import { createCarousel } from "./carousel.js";

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

export async function blogPostsPage() {

  const blogPostsContainer = document.querySelector(".blog-container");
  blogPostsContainer.innerHTML = "";

  const blogPosts = await getBlogPosts();

  const carouselBlogPosts = blogPosts;
  const nonCarouselBlogPosts = blogPosts;

  createBlogPostsHTML(nonCarouselBlogPosts);
  createCarousel(carouselBlogPosts);
}

