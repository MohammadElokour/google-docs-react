import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCr0lkdCbVZw5p-40ZQv_PNs4wd5QdrRKQ",
  authDomain: "docs-clone-9e4ea.firebaseapp.com",
  projectId: "docs-clone-9e4ea",
  storageBucket: "docs-clone-9e4ea.appspot.com",
  messagingSenderId: "97006722002",
  appId: "1:97006722002:web:9976f95dd133dbaba3460b"
};



const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const firestore = app.firestore();

export { firestore };