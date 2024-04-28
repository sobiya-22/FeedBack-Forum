import { readUser } from "./firebaseLogin.js";
      
document.querySelector('.login-s-btn')
  .addEventListener(('click') , async ()=>{
    let crn = document.querySelector('.js-login-s-crn');
    let password = document.querySelector('.js-login-s-password');
    let getUser =  await readUser(crn.value);
    

    if(getUser.crn == crn.value && getUser.password == password.value) {
      let data = sessionStorage.setItem("getUser" , JSON.stringify(getUser));
      alert('login success');
      window.location.href = 'Student%20Side/Student-complaint-page.html';
      

    }
    else{
      alert('login unsuccess');
    }
  });
