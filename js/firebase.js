import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
  import {getFirestore,collection, addDoc, getDocs,getCountFromServer, deleteDoc, 
    doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD2INxoq1mP_PJLlfFTApcLYvsYXhO-rrk",
    authDomain: "teatro-nacional-d212e.firebaseapp.com",
    databaseURL: "https://teatro-nacional-d212e-default-rtdb.firebaseio.com",
    projectId: "teatro-nacional-d212e",
    storageBucket: "teatro-nacional-d212e.appspot.com",
    messagingSenderId: "460099722342",
    appId: "1:460099722342:web:8732286a2b0e30317e61a7"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db=getFirestore()

  export const saveProduct=(product)=>{
    addDoc(collection(db,'products'),product);
  }

  export const getProducts=()=>getDocs(collection(db,'products'))

  export const getProduct=(id)=>getDoc(doc(db,'products',id))

  export const getProductListSize=async()=>{
    const products = collection(db, "products");
    const snapshot = await getCountFromServer(products);
    return snapshot.data().count;
  }

export const deleteProduct=(id)=> deleteDoc(doc(db,'products',id))

export const updateProduct=(id, newFields)=>updateDoc(doc(db,'products',id), newFields)

