"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firestore = void 0;
var firebaseConfig = {
  apiKey: "AIzaSyCr0lkdCbVZw5p-40ZQv_PNs4wd5QdrRKQ",
  authDomain: "docs-clone-9e4ea.firebaseapp.com",
  projectId: "docs-clone-9e4ea",
  storageBucket: "docs-clone-9e4ea.appspot.com",
  messagingSenderId: "97006722002",
  appId: "1:97006722002:web:9976f95dd133dbaba3460b"
};
var app = !firebase.apps.length > 0 ? firebase.initializeApp(firebaseConfig) : firebase.app();
var firestore = app.firestore();
exports.firestore = firestore;