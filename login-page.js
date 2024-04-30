import { readUser, readAdmin } from "./firebaseLogin.js";



// let student,
document.querySelector('.login-s-btn')
  .addEventListener(('click'), async () => {
    let crn = document.querySelector('.js-login-s-crn');
    let password = document.querySelector('.js-login-s-password');
    let getUser = await readUser(crn.value);

    if (getUser.crn == crn.value && getUser.password == password.value) {
      let data = sessionStorage.setItem("getUser", JSON.stringify(getUser));
      alert('Student login success');
      window.location.href = 'Student%20Side/Student-complaint-page.html';
    }
    else {
      alert("Oops! can't login");
    }
  });
document.querySelector('.login-a-btn')
  .addEventListener('click', async () => {

    let crn = document.querySelector('crn'); //crn here is actually input of email
    let password = document.querySelector('pass');
    let getAdmin = await readAdmin(crn.value);

    if (getAdmin.crn == crn.value && getAdmin.password == password.value) {
      let data = sessionStorage.setItem("getAdmin", JSON.stringify(getAdmin));
      alert('Feedback-Admin login success');
      window.location.href = 'Admin%20Side/admin-login-page.html';
    }
    else {
      alert("Oops! can't login");
    }

})