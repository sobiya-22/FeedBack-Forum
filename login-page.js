import { readUser, readAdmin } from "./firebaseLogin.js";

document.querySelector('.login-s-btn')
  .addEventListener(('click'), async () => {
    let crn = document.querySelector('.js-login-s-crn');
    let password = document.querySelector('.js-login-s-password');
    let getUser = await readUser(crn.value);


    if (getUser.crn == crn.value && getUser.password == password.value) {
      let data = sessionStorage.setItem("getUser", JSON.stringify(getUser));
      window.location.href = 'Student%20Side/Student-complaint-page.html';
    }
    else {
      alert('login unsuccess');
    }
  });
document.body.addEventListener(('keydown'), async (event) => {
  if (event.key === 'Enter') {
    let crn = document.querySelector('.js-login-s-crn');
    let password = document.querySelector('.js-login-s-password');
    let getUser = await readUser(crn.value);


    if (getUser.crn == crn.value && getUser.password == password.value) {
      let data = sessionStorage.setItem("getUser", JSON.stringify(getUser));
      window.location.href = 'Student%20Side/Student-complaint.html';
    }
    else {
      alert('login unsuccess');
    }
  }
});

document.querySelector('.login-a-btn')
  .addEventListener(('click'), async () => {
    let mail = document.querySelector('.js-login-a-mail');
    let password = document.querySelector('.js-login-a-password');
    let getAdmin = await readAdmin(mail.value);


    if (getAdmin.email == mail.value && getAdmin.password == password.value) {
      let data = sessionStorage.setItem("getAdmin", JSON.stringify(getAdmin));
      if (getAdmin.category == 'feedbackforum') {
        window.location.href = 'Admin%20Side/admin-login-page.html';
      }
      else {
        window.location.href = 'Admin%20Side/authority-page.html';
      }
    }
    else {
      alert('login unsuccess');
    }
  });
//   export function getUserData() {
//     // Get the user data from sessionStorage
//     let data = sessionStorage.getItem("getUser");

//     // Parse the JSON string back into an object
//     let user = JSON.parse(data);

//     // Now you can access the user's data
//     let email = user.email;
//     // return email;
//     return user;
// }

