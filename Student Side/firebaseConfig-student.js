 

 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
  import {getDatabase,set,ref,get,child} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
  import {select} from "https://cdn.jsdelivr.net/gh/RiteshBorse/testing/home.js";
import { generateRandomNumber } from "./stud-complaint.js";
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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase();
  async function addComplaint(data){
    let id = generateRandomNumber();
    await set(ref(db,`complaints/${id}`),data);
    alert('data added');
  }
  async function readData() { 
    const dbRef = ref(getDatabase()); 
    const snapshot = await get(child(dbRef, 'complaints/')); 
    if (snapshot.exists()) { 
        return snapshot.val(); 
    } 
    else { 
        return false; 
     } 
 };

export async function readAllEvents() 
 { 
     let allEvent = ''; 
     const db = getDatabase(); 
     const dbRef = ref(db); 
     get(child(dbRef,'complaints/')) 
         .then(async (snapshot) => { 
  
                 snapshot.forEach(element => { 
                        console.log(element.val()); 
                         
                 }); 
         });      
  
      }
  
  let complaintType = document.querySelector('.js-type');
  let image = document.querySelector('.js-image');
  let anonymity = document.querySelector('.js-anonymity');
  let title = document.querySelector('.js-title-complaint');
  let complaint = document.querySelector('.js-complaint');
  let submit = document.querySelector('.js-submit');
  submit.addEventListener(('click') , async ()=>{
    let complaintTypeValue = complaintType.value;
    let titleValue = title.value;
    let complaintValue = complaint.value;

    // Check if required fields are filled
    if (!complaintTypeValue || !titleValue || !complaintValue) {
        alert('Please fill in all required fields: Complaint Type, Title, and Complaint.');
        return;
    }
    let data = {
      complaintType : complaintType.value,
      image : image.value,
      anonymity: anonymity.value,
      title : title.value,
      complaint : complaint.value
    }
    addComplaint(data);
    let events = await readAllEvents();
    console.log(events);
  });
  
 