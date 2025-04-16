// src/auth.js
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login automático com usuário fixo
export const loginUnico = async () => {
  const email = process.env.REACT_APP_FIREBASE_EMAIL; // conta fixa
  const senha = process.env.REACT_APP_FIREBASE_SENHA;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    console.log("usuario logado")
    return true;
  } catch (error) {
    // alert("Erro no login:", error);
  }
};
