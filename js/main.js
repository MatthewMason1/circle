// Firebase Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase, ref, push, set, get, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// 🔑 Replace with your Firebase config
export const firebaseConfig = {
  apiKey: "AIzaSyAxUMoTXhPRYeSB7GkZMPBefYRahE9dxOc",
  authDomain: "circleforum.firebaseapp.com",
  projectId: "circleforum",
  storageBucket: "circleforum.firebasestorage.app",
  messagingSenderId: "119179526047",
  appId: "1:119179526047:web:a1e98de151905d296bc7aa",
  measurementId: "G-CLD53NWH2N"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

// Auth functions
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

export const createUser = async (email, password, username) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await set(ref(db, `users/${cred.user.uid}`), { username, pfp: "", banner: "" });
};

export const loginUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const uploadFile = async (file, folder="uploads") => {
  const storageRef = sRef(storage, `${folder}/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

// Listen to auth state
export const onAuthChange = (callback) => {
  onAuthStateChanged(auth, callback);
};
