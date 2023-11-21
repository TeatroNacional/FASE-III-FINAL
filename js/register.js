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

function validateFields() {
  // Obtener los valores de los campos
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;
  const lastname = document.getElementById('lastname').value;
  const age = document.getElementById('age').value;
  const residence_country = document.getElementById('residence_country').value;

  // Validar campos vacíos
  if(!validate_field(name)){
    showMessage('The name field is empty, Please you must enter your name','info'); return false;
  }else if(!validate_field(lastname)){
    showMessage('The lastName field is empty, Please you must enter your lastname','info'); return false;
  }else if(!validate_field(email)){
    showMessage('The email address field is empty, Please you must enter your email address ','info'); return false;
  }else if(!validate_field(password)){
    showMessage('The password field is empty, Please you must enter your password','info'); return false;
  }else if(!validate_field(age)){
    showMessage('The age field is empty, Please you must enter your age','info'); return false;
  }else if(!validate_field(residence_country)){
    showMessage('The residence country field is empty, Please you must enter your residence country ','info'); return false;
  }

  // Validar edad mayor de 18
  if (parseInt(age) < 18) {
    showMessage('You must be at least 18 years old', 'info');
    return false;
  }
  return true;
}

// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  name = document.getElementById('name').value
  lastname = document.getElementById('lastname').value
  age = document.getElementById('age').value
  residence_country = document.getElementById('residence_country').value

  // Validate input fields
  if(!validateFields()){ return;}
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      name : name,
      lastname:lastname,
      age : age,
      residence_country : residence_country,
      last_login : Date.now(),
      role: "cliente"
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    showMessage(" Welcome " + name);
    window.location.href = '../TEATRO_NACIONAL/login.html';
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    console.log(error_message)
      console.log(error_code)
      if (!validateFields()) {
        return;
      }else{
       if(error_code ==='auth/email-already-in-use'){
          showMessage("The email address is already in use by another account.", "error");
        }else if(error_code ==='auth/invalid-email'){
          showMessage("The email address is badly .", "error");
        }else if(error_code === 'auth/weak-password'){
          showMessage("The password must be 6 characters long or more.", "error");
        }
      }
  })
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