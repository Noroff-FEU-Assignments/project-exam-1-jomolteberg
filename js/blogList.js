import { blogPostsPage } from "./renderBlogPosts.js";
import { loadInitialPosts, loadMorePosts } from "./loadMorePosts.js";

document.addEventListener("DOMContentLoaded", async () => {
  blogPostsPage();
  loadInitialPosts();

  const loadMoreButton = document.querySelector("#load-more-button");
  loadMoreButton.addEventListener("click", loadMorePosts);
});
