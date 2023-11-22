// teatroScriptObra1.js
function showMessage(message, type = "success") {
  Toastify({
    text: message,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: type === "success" ? "green" :"blue" ,
    },
    onClick: function(){} // Callback after click
  }).showToast();
  
}
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

  // Inicializa Firestore
  const db = firebase.firestore();

  // ID del documento que quieres obtener
  const documentId = "RkTjExgc1eaME11sLgma";

  // Referencia a la colección "products" y al documento específico
  const docRef = db.collection("products").doc(documentId);

  // Obtén los datos del documento
  docRef.get().then((doc) => {
    if (doc.exists) {
      // Los datos del documento
      const data = doc.data();

      // Muestra la información en el elemento HTML con id "info-obra"
      const infoObraElement = document.getElementById("info-obra");
      infoObraElement.innerHTML = `
      <div class="emballage">
      <div class="title">
        <p>${data.name}</p></div>
        <div class="precio">
        <p> ${data.price}</p></div>
        <div class="descripcion">
        <p> ${data.description}</p></div>
        <div class="imagen">
        <img src="${data.image}" alt="Imagen de la obra" id=""></div>
      </div>`;
    } else {
      console.log("El documento no existe");
    }
  }).catch((error) => {
    console.error("Error al obtener el documento:", error);
  });

  function obtenerEntradas() {
    // Obtener las entradas
    const entradasSalvadorenos = document.getElementById("contador-salvadorenos").querySelector("#entradaSal").value;
    const entradasExtranjeros = document.getElementById("contador-extranjeros").querySelector("#entradaExt").value;
    const entradasNoResidentes = document.getElementById("contador-no-residentes").querySelector("#entradaNoResi").value;
  let sal=0;
  let extra=0;let noRes=0;
    // Validar las entradas
    if (entradasSalvadorenos === "" && entradasExtranjeros ===0 && entradasNoResidentes ===0) {
      showMessage("Debe seleccionar al menos una entrada.","error");
      return;
    }else if (entradasSalvadorenos === 0 && entradasExtranjeros ==="" && entradasNoResidentes ===0) {
      showMessage("Debe seleccionar al menos una entrada.","error");
      return;
    }else if (entradasSalvadorenos === 0 && entradasExtranjeros ===0 && entradasNoResidentes ==="") {
      showMessage("Debe seleccionar al menos una entrada.","error");
      return;
    }
  
    // Seleccione solo un tipo de entrada
    let totalEntradas = 0;
    if (parseInt(entradasSalvadorenos) > 0 || parseInt(entradasExtranjeros)==0 || parseInt(entradasNoResidentes)==0) {
      window.location.href="../TEATRO_NACIONAL/facturacion.html"
      totalEntradas = parseInt(entradasSalvadorenos);
    } else if (parseInt(entradasExtranjeros) > 0 || parseInt(entradasSalvadorenos)==0 || parseInt(entradasNoResidentes)==0) {
      window.location.href="../TEATRO_NACIONAL/facturacion.html"
      totalEntradas = parseInt(entradasExtranjeros);
    } else if (parseInt(entradasNoResidentes) > 0 ||parseInt(entradasExtranjeros) == 0 || parseInt(entradasSalvadorenos)==0 ) {
      window.location.href="../TEATRO_NACIONAL/facturacion.html"
      totalEntradas = parseInt(entradasNoResidentes);
    }
  
    if (totalEntradas < 1) {
      showMessage("Debe seleccionar un tipo de entrada.","e");
      return;
    }
  
    // Envío a otro formulario
    // Su código para enviar las entradas a otro formulario
    // ...
  }