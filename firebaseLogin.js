
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
  import { getDatabase , set , ref , child , get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBoZwThtmjBNBUR1QAIwVJhcsow9Qa_uBU",
    authDomain: "feedback-forum-43ab1.firebaseapp.com",
    projectId: "feedback-forum-43ab1",
    storageBucket: "feedback-forum-43ab1.appspot.com",
    messagingSenderId: "339551754655",
    appId: "1:339551754655:web:dc765ac0e4457002c245aa",
    measurementId: "G-VR6YM99MC7"
  };

export function auth(){
  if(JSON.parse(sessionStorage.getItem("getUser")) == null){
      window.location.href = 'login-page.html';
  } 
}
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db  = getDatabase();

  export async function writeUserData(crn, newUser) {
    await set(ref(db, 'users/' + crn), newUser);
};

export async function writeAdminData(name, newUser) {
  await set(ref(db, 'admin/' + name), newUser);
};

export async function readUser(newUser) {
  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, `users/${newUser}`));
  if (snapshot.exists()) {
      return snapshot.val();
  }
  else {
      return '';
  }
};

