"use strict";
import { fetchUserData } from "./data.js";
function formElements() {
  const form = document.getElementById("post-form");
  const title = document.getElementById("post-title");
  const content = document.getElementById("post-content");
  return { form, title, content };
}
const form = document.getElementById("post-form");
const title = document.getElementById("post-title");
const content = document.getElementById("post-content");
let isUpdate = false;

class UserData {
  constructor(userData) {
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    this.bio = userData.bio;
    this.birthDate = userData.birthDate;
    this.coverImage = userData.coverImage;
    this.posts = userData.posts;
    this.gender = userData.gender;
  }

  renderUserData() {
    // this function will call all the render functions
    this.renderInitials();
    this.renderUserName();
    this.renderBirthDate();
    this.renderCoverImage();
    this.renderBio();
    this.renderPosts();
    this.renderFormPost();
    this.startListening();
  }

  // render methods

  renderInitials() {
    // this function will render the user initials (first letter of first name, and first letter of last name)

    const initialsContainer = document.getElementById("profile-initials");
    const userInitials = this.formatInitials();
    initialsContainer.textContent = userInitials;
  }

  renderUserName() {
    // this function will render the combination of the user's first name and last name
    // also add Mr, Or Ms based on the gender
    const userNameContainer = document.getElementById("full-name");
    const userName = `${this.firstName} ${this.lastName}`;
    const title = this.getUserTitle();
    userNameContainer.textContent = `${title} ${userName}`;
  }

  renderBirthDate() {
    // this function will render the formatted birth date for a user as (DD/MM/YYYY)
    const birthDateContainer = document.getElementById("birthdate");
    const formattedBirthDate = this.formatBirthDate();
    birthDateContainer.textContent = formattedBirthDate;
    const isAdult = this.checkIfAdult();
    if (!isAdult) {
      birthDateContainer.classList.add("child");
    }
  }

  renderCoverImage() {
    // this function will render the user's cover image, and check if it's not there to add a fallback image

    const coverImageElement = document.getElementById("cover-img");
    let coverImage = this.coverImage;

    if (!coverImage) {
      coverImage = "https://via.placeholder.com/1500x500";
    }

    coverImageElement.setAttribute("src", coverImage);
  }

  renderBio() {
    // this function will render the bio, and checks if the text is overflowing to trim, max length should be 40 characters
    const bioContainer = document.getElementById("bio-text");
    const trimmedBio = this.checkBioLength();

    bioContainer.textContent = trimmedBio;
  }

  renderPosts() {
    // this function will loop over the posts to render each post as separate element

    const postsContainer = document.getElementById("posts");
    const posts = this.posts;
    this.clearElement(postsContainer);

    posts.forEach((post) => {
      const title = post.title;
      const content = post.content;

      const postContainer = document.createElement("div");
      postContainer.classList.add("post");

      const postTitleContainer = document.createElement("h3");

      const postContentContainer = document.createElement("P");

      const buttonsContainer = document.createElement("div");
      buttonsContainer.classList.add("buttons-container");

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", () =>
        this.deletePostHandler(post.id)
      );

      const updatBtn = document.createElement("button");
      updatBtn.classList.add("update-btn");
      updatBtn.addEventListener("click", () => this.showUpdateForm(post.id));

      postTitleContainer.textContent = title;
      postContentContainer.textContent = content;
      deleteBtn.textContent = "Delete";
      updatBtn.textContent = "Update";

      postContainer.appendChild(postTitleContainer);
      postContainer.appendChild(postContentContainer);
      postContainer.appendChild(buttonsContainer);
      buttonsContainer.appendChild(deleteBtn);
      buttonsContainer.appendChild(updatBtn);
      postsContainer.appendChild(postContainer);
    });
  }

  // internal methods

  checkIfAdult() {
    // this function checks if the user has age over 18 years
    const currentYear = new Date().getFullYear(); // 2023
    const userYear = this.birthDate.getFullYear(); // 1998

    const difference = currentYear - userYear; // 25

    return difference > 18;
  }

  formatInitials() {
    // this function will return the initials as explained above

    const firstName = this.firstName; // JOHN[0] -> J
    const lastName = this.lastName; // DOE[0] -> D
    const initials = firstName[0] + lastName[0]; // JD
    return initials;
  }

  formatBirthDate() {
    // this function will return the formatted date as requested above
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = this.birthDate;

    const day = date.getDate(); // 19
    const monthIndex = date.getMonth(); // 4
    const monthName = months[monthIndex]; // May
    const year = date.getFullYear(); // 2023;

    const formattedBirthdate = `${day}/${monthName}/${year}`;

    return formattedBirthdate;
  }

  getUserTitle() {
    // this function will check the gender of the user and return Mr. or Ms. based on it
    const gender = this.gender.toLowerCase(); // male/female
    if (gender === "male") {
      return "Mr.";
    } else {
      return "Ms.";
    }
  }

  checkBioLength() {
    let bio = this.bio;
    if (bio.length > 40) {
      return bio.substr(0, 40) + "...";
    } else {
      return bio;
    }
  }

  renderFormPost() {
    const formContainer = document.getElementById("form-container");

    // create the form element
    const form = document.createElement("form");
    const formTitle = document.createElement("h3");

    formTitle.textContent = "Add New Post";
    form.classList.add("post-form");
    form.setAttribute("id", "post-form");

    formContainer.appendChild(form);
    form.appendChild(formTitle);

    // create the form group for the title input
    const formGroup = document.createElement("div");
    formGroup.classList.add("form-group");

    const titleLable = document.createElement("label");
    titleLable.setAttribute("for", "post-title");
    titleLable.textContent = "Title";

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "post-title");

    form.appendChild(formGroup);
    formGroup.appendChild(titleLable);
    formGroup.appendChild(titleInput);

    // create the form group for the content input
    const secFormGroup = document.createElement("div");
    secFormGroup.classList.add("form-group");

    const contentLable = document.createElement("label");
    contentLable.setAttribute("for", "post-content");
    contentLable.textContent = "Content";

    const contentInput = document.createElement("textarea");
    contentInput.setAttribute("id", "post-content");
    contentInput.setAttribute("rows", "4");

    form.appendChild(secFormGroup);
    secFormGroup.appendChild(contentLable);
    secFormGroup.appendChild(contentInput);

    // create the submit button
    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.classList.add("btn-submit");
    submitBtn.textContent = "Add Post";
    form.appendChild(submitBtn);
  }

  startListening() {
    // const form = document.getElementById("post-form");
    const form = formElements().form;
    const handleFormSubmitFn = this.handleFormSubmit.bind(this);
    form.addEventListener("submit", handleFormSubmitFn);
  }

  handleFormSubmit(event) {
    event.preventDefault();

    if (isUpdate) {
      this.updatePostHandler(event);
    } else {
      this.addPostHandler(event);
    }
  }

  addPostHandler(event) {
    event.preventDefault();

    const { title, content } = formElements();
    const post = {
      id: this.posts.length + 1,
      title: title.value,
      content: content.value,
    };

    this.posts.push(post);
    this.renderPosts();

    this.resetForm();
  }

  deletePostHandler(id) {
    const allPosts = this.posts;
    const filteredPosts = allPosts.filter((post) => post.id !== id);
    this.posts = filteredPosts;
    this.renderPosts();
  }

  clearElement(element) {
    element.innerHTML = "";
  }

  showUpdateForm(id) {
    const post = this.posts.find((post) => post.id === id);

    const { title, content } = formElements();
    title.value = post.title;
    content.value = post.content;

    const submitBtn = document.querySelector(".btn-submit");
    submitBtn.setAttribute("id", id);
    submitBtn.textContent = "Update Post";
    isUpdate = true;

    // scroll to the form container
    const formContainer = document.getElementById("form-container");
    formContainer.scrollIntoView({ behavior: "smooth" });
  }

  updatePostHandler(event) {
    event.preventDefault();

    const id = event.target.querySelector(".btn-submit").id;

    const { title, content } = formElements();

    const post = this.posts.find((post) => post.id === Number(id));
    post.title = title.value;
    post.content = content.value;
    this.renderPosts();

    isUpdate = false;
    this.resetForm();
    const submitBtn = document.querySelector(".btn-submit");
    submitBtn.textContent = "Add Post";
  }

  resetForm() {
    const { title, content } = formElements();
    title.value = " ";
    content.value = " ";
  }
}

// fetch the user data
fetchUserData().then((userData) => {
  // initialize the class using the fetched data
  const user = new UserData(userData);
  user.renderUserData();
});

// render the data
