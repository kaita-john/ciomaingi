import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-7I62H2YOy71mua1QK1hFAR8Re0cvy-M",
  authDomain: "starpal-82301.firebaseapp.com",
  databaseURL: "https://starpal-82301-default-rtdb.firebaseio.com",
  projectId: "starpal-82301",
  storageBucket: "starpal-82301.firebasestorage.app",
  messagingSenderId: "1097894578661",
  appId: "1:1097894578661:web:efde23c83357c436c8070c",
  measurementId: "G-XSY096NTZC"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };