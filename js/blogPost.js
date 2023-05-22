const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

const apiBase = "https://beautifuldestinations.jomolteberg.no/";
const wpRestBase = "/wp-json/wp/v2";
const postsBase = "/posts";
const imageBase = "/media";

async function getBlogPost(id) {
  const response = await fetch(`${apiBase}${wpRestBase}${postsBase}/${id}`);
  const blogPost = await response.json();
  return blogPost;
}

export async function getBlogImage(id) {
  const fullBlogImageURL = apiBase + wpRestBase + imageBase + "/" + id;
  const response = await fetch(fullBlogImageURL);
  const blogImage = await response.json();
  return blogImage.source_url;
}

async function getBlogPostPage() {
  const blogPost = await getBlogPost(postId);
  document.title = `Beautiful destinations | ${blogPost.title.rendered}`;

  // Fetch the blog image URL
  const imageURL = await getBlogImage(blogPost.featured_media);

  const blogPostContainer = document.createElement("div");
  blogPostContainer.classList.add("blogPost");
  blogPostContainer.id = blogPost.id;

  const img = document.createElement("img");
  img.src = imageURL;
  img.alt = blogPost.title.rendered;
  img.classList.add("clickable-image");
  blogPostContainer.append(img);

  const title = document.createElement("h3");
  title.innerText = blogPost.title.rendered;
  blogPostContainer.append(title);

  const dateData = new Date(blogPost.date);
  const formattedDate = `${
    dateData.getMonth() + 1
  }/${dateData.getDate()}/${dateData.getFullYear()}`;
  const date = document.createElement("p");
  date.innerText = "Date:" + " " + formattedDate;
  date.classList.add("blogPostDate");
  blogPostContainer.append(date);

  const paragraphsContainer = document.createElement("div");
  blogPostContainer.append(paragraphsContainer);
  paragraphsContainer.classList.add("paragraphsContainer");

  const paragraphs = document.createElement("p");
  paragraphs.innerHTML = blogPost.content.rendered;
  paragraphsContainer.append(paragraphs);

  document.querySelector(".blogPostContent").append(blogPostContainer);

  // Creating a modal for our image
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.style.display = "none";
  modal.innerHTML = `<div class="modal-content"><img src="${imageURL}" alt="${blogPost.title.rendered}" /></div>`;

  document.body.appendChild(modal);

  // Adding event listener for image click
  img.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Adding event listener for modal click to hide modal
  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

getBlogPostPage();
