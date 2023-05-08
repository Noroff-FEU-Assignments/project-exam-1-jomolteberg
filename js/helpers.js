export function createBlogPostHTML(blogPost, imageURL, container) {
  const blogPostsContainer = container || document.querySelector(".blog-container");

  const blogPostContainer = document.createElement("div");
  blogPostContainer.classList.add("blog-post");
  blogPostContainer.id = blogPost.id;

  const blogPostLink = document.createElement("a");
  blogPostLink.href = `blog-post.html?id=${blogPost.id}`;
  blogPostContainer.append(blogPostLink);

  const img = document.createElement("img");
  img.src = imageURL;
  img.alt = blogPost.title.rendered;
  blogPostLink.append(img);

  const title = document.createElement("h3");
  title.innerText = blogPost.title.rendered;
  blogPostLink.append(title);

  blogPostsContainer.append(blogPostContainer);
}