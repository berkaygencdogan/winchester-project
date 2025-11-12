// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6tEz5kv_ZZqkE8SHS9F27vB62c02bFas",
  authDomain: "winchester-project.firebaseapp.com",
  projectId: "winchester-project",
  storageBucket: "winchester-project.firebasestorage.app",
  messagingSenderId: "784074168501",
  appId: "1:784074168501:web:c40b6ac0c091512408c6fc",
  measurementId: "G-4S1RCLFJTR",
};

// 🔥 Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// 🔐 Authentication servisini al
const auth = getAuth(app);

export { app, auth };
