// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBRgBMfUAHmckE4Ha9ACpX04c9KbVAmdsE",
  authDomain: "productauction-fa570.firebaseapp.com",
  projectId: "productauction-fa570",
  storageBucket: "productauction-fa570.appspot.com",
  messagingSenderId: "617966179508",
  appId: "1:617966179508:web:7c19db6874f3453d8173e1",
  measurementId: "G-VNV15RBQ2F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storageDB = getStorage(app);

const getProductInfo = async (id) => {
  const docRef = doc(db, "products", id);
  const prouductInfo = getDoc(docRef);
  return await prouductInfo;
};

const getProductBids = async (id) => {
  const bidCollectionRef = collection(db, "bids");
  const q = query(bidCollectionRef, where("productId", "==", id));
  return await getDocs(q);
};

const updateBidStatus = async (bidId, status) => {
  const bidCollectionRef = doc(db, "bids", bidId);
  const updated = await updateDoc(bidCollectionRef, { status });
  return updated;
};
const getUserBids = async (userId) => {
  const bidCollectionRef = collection(db, "bids");
  const q = query(bidCollectionRef, where("userId", "==", userId));
  return await getDocs(q);
};

const getUserProducts = async (userId) => {
  const bidCollectionRef = collection(db, "products");
  const q = query(bidCollectionRef, where("createdBy", "==", userId));
  return await getDocs(q);
};

export {
  auth,
  db,
  storageDB,
  getProductInfo,
  getUserBids,
  getProductBids,
  updateBidStatus,
  getUserProducts,
};
