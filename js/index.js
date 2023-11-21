// teatroScript.js

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
      snapshot.forEach(doc => {
        const product = doc.data();
        const productContainer = document.getElementById('product-container');
  
        // Crea un elemento para mostrar cada producto
        const productElement = document.createElement('div');
        productElement.innerHTML = `
          <h2>${product.name}</h2>
          <p><strong>Precio:</strong> $${product.price}</p>
          <p><strong>Descripción:</strong> ${product.description}</p>
          <img src="${product.image}" alt="${product.name}" width="200">
          <button onclick="handleButtonClick('${product.name}')">Agregar al carrito</button>
        `;
  
        // Agrega el elemento al contenedor
        productContainer.appendChild(productElement);
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
function handleButtonClick(productName) {
    // Puedes realizar alguna acción aquí, por ejemplo, agregar el producto al carrito
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
}

// Llama a la función para mostrar productos cuando la página se carga completamente

function redirectToLogin() {
    // Cambia la ubicación del navegador a login.html
    window.location.href = '../TEATRO_NACIONAL/login.html';
}
  