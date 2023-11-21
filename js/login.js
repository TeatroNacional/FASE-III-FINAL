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
        background: type === "success" ? "green" : (type === "info" ? "blue" : "red")
      },
      onClick: function(){} // Callback after click
    }).showToast();
    
  }
  // Your web app's Firebase configuration
  var firebaseConfig = {
      apiKey: "AIzaSyD2INxoq1mP_PJLlfFTApcLYvsYXhO-rrk",
    authDomain: "teatro-nacional-d212e.firebaseapp.com",
    databaseURL: "https://teatro-nacional-d212e-default-rtdb.firebaseio.com",
    projectId: "teatro-nacional-d212e",
    storageBucket: "teatro-nacional-d212e.appspot.com",
    messagingSenderId: "460099722342",
    appId: "1:460099722342:web:8732286a2b0e30317e61a7"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // Initialize variables
    const auth = firebase.auth()
    const database = firebase.database()
/*
     function validateFields() {
    // Obtener los valores de los campos
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validar campos vacíos
    if(!validate_field(email)){
      showMessage('The email address field is empty, Please you must enter your email address ','info'); return false;
    }else if(!validate_field(password)){
      showMessage('The password field is empty, Please you must enter your password','info'); return false;
    }
    return true;
  }
  */
    function login () {
        // Get all our input fields
        email = document.getElementById('email').value
        password = document.getElementById('password').value
      /*
        if (!validateFields()) {
            return;
          }
        */
        auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            var user = auth.currentUser;
      
            // Obtener información del usuario desde la base de datos
            var userRef = database.ref('users/' + user.uid);
            
      
            userRef.once('value')
              .then(function (snapshot) {
                var userData = snapshot.val();
      
                // Verificar el nivel de acceso
                if (userData.role === 'administrador') {
                  // Usuario es administrador
                  showMessage('Welcome admin' + userData.name);
                  window.location.href='../TEATRO_NACIONAL/indexAdmin.html'
                } else if (userData.role === 'gestor') {
                  // Usuario es gestor
                  showMessage('Welcome manager' + userData.name);
                  window.location.href='../TEATRO_NACIONAL/indexGestor.html'
                } else {
                  // Usuario es cliente
                  showMessage('Welcome ' + name);
                  window.location.href='../TEATRO_NACIONAL/indexUser.html'
                }
              });
          })
          .catch(function (error) {
            // Manejar errores
            var error_code = error.code;
            var error_message = error.message;
            console.log(error_message)
          console.log(error_code)
      if(error_code == 'auth/invalid-email'){
            showMessage("The email address is wrong. ", "error")
          }else if(error_code == 'auth/wrong-password'){
            showMessage("The password is invalid or the user does not have a password. ", "error")
          }else if(error_code == 'auth/internal-error'){
            showMessage(" An error occurred, try again ", "error")
          }
          });
      }
      
      // Validate Functions
      function validate_email(email) {
        expression = /^[^@]+@\w+(\.\w+)+\w$/
        if (expression.test(email) == true) {
          // Email is good
          return true
        } else {
          // Email is not good
          return false
        }
      }
      
      function validate_password(password) {
        // Firebase only accepts lengths greater than 6
        if (password < 6) {
          return false
        } else {
          return true
        }
      }
      
      function validate_field(field) {
        if (field == null) {
          return false
        }
      
        if (field.length <= 0) {
          return false
        } else {
          return true
        }
      }  