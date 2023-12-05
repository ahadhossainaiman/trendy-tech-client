// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBci72bmirVawPJIpRt_GiBmJWASKe6f5g",
  authDomain: "trendy-tech-f013a.firebaseapp.com",
  projectId: "trendy-tech-f013a",
  storageBucket: "trendy-tech-f013a.appspot.com",
  messagingSenderId: "975855132779",
  appId: "1:975855132779:web:7e58b6f1d467067933112e"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

 const auth = getAuth(app);
 export default auth;