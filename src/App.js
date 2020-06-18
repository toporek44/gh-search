const dotenv = require("dotenv").config();
const inputName = document.querySelector(".input");
const btnSearch = document.querySelector(".btn__search");
const ghLink = document.querySelector(".gh__link");
const dataOutput = [...document.querySelectorAll(".data__output")];
const ghImg = document.querySelector("img");
const warning = document.querySelector(".warning");
let objItems = [];
console.log(process.env);
let data;
const findUsers = async (user) => {
  const resp = await fetch(
    `https://api.github.com/users/${user}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
  );
  data = await resp.json();
};
const showData = async (e) => {
  e.preventDefault();
  if (inputName.value === "") {
    warning.style.display = "block";
    return;
  } else {
    warning.style.display = "none";
  }
  objItems = [];
  await findUsers(inputName.value);
  let { name, login, public_repos, html_url, avatar_url } = data;
  ghImg.src = avatar_url;

  objItems.push(name, login, public_repos, html_url);

  dataOutput.forEach((item, i, a) => {
    a[i].textContent = "";
    a[i].textContent =
      objItems[i] == null ? (objItems[i] = "No information :(") : objItems[i];
  });
  ghLink.setAttribute("href", objItems[objItems.length - 1]);

  inputName.value = "";
};
btnSearch.addEventListener("click", showData);
