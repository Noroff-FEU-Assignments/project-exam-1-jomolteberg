import { createBlogPostHTML } from "./helpers.js";
import { getBlogPosts, getBlogImage } from "./renderBlogPosts.js";

let currentPage = 1;
const itemsPerPage = 10;

export async function loadMorePosts() {
    const blogPosts = await getBlogPosts();
    const morePosts = blogPosts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    
    if (morePosts.length === 0) {
      const blogPostsContainer = document.querySelector(".blog-container");
      const message = document.createElement("p");
      message.innerText = "No more posts to show.";
      blogPostsContainer.append(message);

      const loadMoreButton = document.querySelector("#load-more-button");
      loadMoreButton.style.display = "none";
      return;
    }
  
    const imageURLs = await Promise.all(
      morePosts.map((post) => getBlogImage(post.featured_media))
    );
  
    for (let i = 0; i < morePosts.length; i++) {
      const blogPost = morePosts[i];
      const imageURL = imageURLs[i];
      createBlogPostHTML(blogPost, imageURL);
    }
  
    currentPage += 1;
  }
  

export async function loadInitialPosts() {
  const blogPosts = await getBlogPosts();
  const initialPosts = blogPosts.slice(0, itemsPerPage);
  
  const imageURLs = await Promise.all(
    initialPosts.map((post) => getBlogImage(post.featured_media))
  );

  for (let i = 0; i < initialPosts.length; i++) {
    const blogPost = initialPosts[i];
    const imageURL = imageURLs[i];
    createBlogPostHTML(blogPost, imageURL);
  }
}
