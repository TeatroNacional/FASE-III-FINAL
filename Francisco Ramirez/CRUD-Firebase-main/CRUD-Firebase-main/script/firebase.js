import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, getCountFromServer, deleteDoc,
  doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCdok70xKyUlc_qmtMbRdWg3_n06J8Vfbc",
    authDomain: "proyecto-lic-2044f.firebaseapp.com",
    projectId: "proyecto-lic-2044f",
    storageBucket: "proyecto-lic-2044f.appspot.com",
    messagingSenderId: "325626490285",
    appId: "1:325626490285:web:e190e3cdb0477ecb574524"
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

