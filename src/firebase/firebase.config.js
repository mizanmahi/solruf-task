
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCudKkqpi4yqqZPwQGUiqaBEwNfQ3qmpa4",
  authDomain: "solruf-task.firebaseapp.com",
  projectId: "solruf-task",
  storageBucket: "solruf-task.appspot.com",
  messagingSenderId: "79804481560",
  appId: "1:79804481560:web:59f65687718fce5974436d"
};

// Initialize Firebase
const initializeFirebase = () => initializeApp(firebaseConfig);
export default initializeFirebase;