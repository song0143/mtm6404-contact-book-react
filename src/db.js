// db.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCEJJJLsHPjuc6e1S1hBHQkd6paTPANOZ0",
    authDomain: "contact-book-44d15.firebaseapp.com",
    projectId: "contact-book-44d15",
    storageBucket: "contact-book-44d15.firebasestorage.app",
    messagingSenderId: "56171104822",
    appId: "1:56171104822:web:10a01d397dcb07c24aa697"
};

// 初始化 Firebase 应用
const app = initializeApp(firebaseConfig);

// 获取 Firestore 实例
const db = getFirestore(app);

export default db;
