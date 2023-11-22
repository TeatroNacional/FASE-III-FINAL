const firebaseConfig = {
    apiKey: "AIzaSyD2INxoq1mP_PJLlfFTApcLYvsYXhO-rrk",
    authDomain: "teatro-nacional-d212e.firebaseapp.com",
    databaseURL: "https://teatro-nacional-d212e-default-rtdb.firebaseio.com",
    projectId: "teatro-nacional-d212e",
    storageBucket: "teatro-nacional-d212e.appspot.com",
    messagingSenderId: "460099722342",
  };

  // Inicializa Firebase
  firebase.initializeApp(firebaseConfig);

  // Referencia a la colección "details"
  const detailsCollection = firebase.firestore().collection('details');

  // Función para enviar datos a Firestore
  function enviarDatos() {
    // Obtén los valores de los campos del formulario
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const pais = document.getElementById('pais').value;
    const municipio = document.getElementById('municipio').value;
    const direccion = document.getElementById('direccion').value;
    const codigoPostal = document.getElementById('codigo-postal').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;

    // Validación: Verifica si algún campo está vacío
    if (!nombres || !apellidos || !pais || !municipio || !direccion || !codigoPostal || !telefono || !correo) {
      alert('Por favor, completa todos los campos');
      return;
    }

    // Objeto con los datos a enviar a Firestore
    const datos = {
      nombres: nombres,
      apellidos: apellidos,
      pais: pais,
      municipio: municipio,
      direccion: direccion,
      codigoPostal: codigoPostal,
      telefono: telefono,
      correo: correo
    };

    // Añade los datos a la colección "details" en Firestore
    detailsCollection.add(datos)
      .then(() => {
        // Si la operación es exitosa, redirige a otra página
        window.location.href = 'pago.html';
      })
      .catch((error) => {
        console.error('Error al enviar datos a Firestore: ', error);
        alert('Hubo un error al enviar los datos. Por favor, intenta nuevamente.');
      });
  }