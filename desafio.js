import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB7U59W_GogE48TAPg2_2MknrDcF0J835I",
  authDomain: "data-d19f8.firebaseapp.com",
  databaseURL: "https://data-d19f8-default-rtdb.firebaseio.com",
  projectId: "data-d19f8",
  storageBucket: "data-d19f8.firebasestorage.app",
  messagingSenderId: "806240704400",
  appId: "1:806240704400:web:1c938eb5a95816f6290515",
  measurementId: "G-6NHRR1H95B"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const form = document.getElementById("desafio-form");
const usernameInput = document.getElementById("username");
const answerInput = document.getElementById("answer");
const answersContainer = document.getElementById("answers-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const answer = answerInput.value.trim();

  if (username && answer) {
    const answersRef = ref(db, "desafio-respuestas");
    push(answersRef, {
      username,
      answer,
      timestamp: Date.now()
    });
    answerInput.value = "";
  }
});

function displayAnswers(answers) {
  answersContainer.innerHTML = "";
  answers.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<strong>${item.username}</strong><p>${item.answer}</p>`;
    answersContainer.appendChild(div);
  });
  answersContainer.scrollTop = answersContainer.scrollHeight;
}

const answersRef = ref(db, "desafio-respuestas");
onValue(answersRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    const answersArray = Object.values(data).sort((a,b) => a.timestamp - b.timestamp);
    displayAnswers(answersArray);
  } else {
    answersContainer.innerHTML = "<p>No hay respuestas aún.</p>";
  }
});
