import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCQk8LB777Yk08btEgRt_yDIbxvP71xjB4",
    authDomain: "pillar-5d510.firebaseapp.com",
    projectId: "pillar-5d510",
    storageBucket: "pillar-5d510.firebasestorage.app",
    messagingSenderId: "46656984393",
    appId: "1:46656984393:web:6fc9f82f8fa26394873698",
    measurementId: "G-ZH3JSMZZJP"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };