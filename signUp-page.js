// import {select} from "https://cdn.jsdelivr.net/gh/RiteshBorse/testing/home.js";
import { writeUserData, writeAdminData } from "./firebaseLogin.js";

const sSignup = document.querySelector('.js-signup-s-button');
const aSignup = document.querySelector('.js-signup-a-button');

sSignup.addEventListener(('click') , async ()=>{
  let user = {
    crn : document.querySelector('.js-signup-s-crn').value ,
    email : document.querySelector('.js-signup-s-email').value ,
    password : document.querySelector('.js-signup-s-password').value
  };
  await writeUserData(user.crn , user);
  alert('Student account created');
  window.location.href = 'login-page.html';
  document.querySelector('.js-signup-s-crn').value = '';
  document.querySelector('.js-signup-s-email').value= '';
  document.querySelector('.js-signup-s-password').value = '';
});

aSignup.addEventListener(('click') , async ()=>{
    let user = {
      email : document.querySelector('.js-signup-a-email').value ,
      name : document.querySelector('.js-signup-a-name').value ,
      password : document.querySelector('.js-signup-a-password').value
    };
    await writeAdminData(user.email , user);
    alert('Admin account created');
    window.location.href = 'login-page.html';
    document.querySelector('.js-signup-a-email').value = '';
    document.querySelector('.js-signup-a-name').value= '';
    document.querySelector('.js-signup-a-password').value = '';
});