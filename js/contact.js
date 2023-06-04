import { checkEmail } from "./components/checkMail.js";
import { checkLength } from "./components/checkLength.js";

const form = document.querySelector(".form");

const name = document.querySelector("#name");
const nameError = document.querySelector("#nameError");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");

const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const successMessage = document.querySelector(".successMessage");

const validateForm = () => {
  event.preventDefault();

  if (checkLength(name.value, 5) === true) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }

  if (checkLength(subject.value, 15) === true) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  if (checkLength(message.value, 25) === true) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }

  if (checkEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (
    checkLength(name.value, 5) &&
    checkLength(subject.value, 15) &&
    checkLength(message.value, 25) &&
    checkEmail(email.value) === true
  ) {
    successMessage.style.display = "block";
    console.log("test");
  } else {
    successMessage.style.display = "none";
  }
};

form.addEventListener("submit", validateForm);
