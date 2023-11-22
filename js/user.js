
// teatroScriptUser.js

// Inicializa Firebase (asegúrate de tener configurado tu proyecto de Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyD2INxoq1mP_PJLlfFTApcLYvsYXhO-rrk",
    authDomain: "teatro-nacional-d212e.firebaseapp.com",
    databaseURL: "https://teatro-nacional-d212e-default-rtdb.firebaseio.com",
    projectId: "teatro-nacional-d212e",
    storageBucket: "teatro-nacional-d212e.appspot.com",
    messagingSenderId: "460099722342",
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Obtiene una referencia a la colección de productos en Firestore
  const productsCollection = firebase.firestore().collection('products');
  
  // Función para obtener y mostrar los productos en la página
  async function showProducts() {
    try {
      // Obtiene los productos desde Firestore
      const snapshot = await productsCollection.get();
      
      // Verifica si hay datos
      if (snapshot.empty) {
        console.log('No hay productos disponibles');
        return;
      }
  
      // Muestra los productos en la página
      let containerNumber = 1; // Inicializa el número del contenedor
      snapshot.forEach(doc => {
        const product = doc.data();
        const productContainer = document.getElementById(`product-container${containerNumber}`);
  
        // Crea un elemento para mostrar cada producto
        const productElement = document.createElement('div');
        productElement.innerHTML = `
          <h2>${product.name}</h2>
          <p><strong>Precio:</strong> $${product.price}</p>
          <p><strong>Descripción:</strong> ${product.description}</p>
          <img src="${product.image}" alt="${product.name}" width="200">
          
        `;
  
        // Agrega el elemento al contenedor
        productContainer.appendChild(productElement);
  
        // Incrementa el número del contenedor para el próximo producto
        containerNumber++;
      });
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  }
  
  // Llama a la función para mostrar productos cuando la página se carga completamente
document.addEventListener('DOMContentLoaded', () => {
  showProducts();

  // Agrega un evento de clic al botón "Aceptar" en el modal
  const btnAceptar = document.getElementById('btnAceptar');
  btnAceptar.addEventListener('click', redirectToLogin);
});

  // Función para manejar el clic en el botón
  function handleButtonClick(productName, containerNumber) {
    // Usa un switch para determinar qué página redireccionar según el contenedor
    switch (containerNumber) {
      case 1:
        window.location.href = './indexuserObra.html';
        break;
      case 2:
        window.location.href = './indexuserObra2.html';
        break;
      case 3:
        window.location.href = './indexuserObra3.html';
        break;
    }
  }

// Llama a la función para mostrar productos cuando la página se carga completamente


  
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  