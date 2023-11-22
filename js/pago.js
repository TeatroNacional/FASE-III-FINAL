// Configura tu proyecto de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD2INxoq1mP_PJLlfFTApcLYvsYXhO-rrk",
    authDomain: "teatro-nacional-d212e.firebaseapp.com",
    databaseURL: "https://teatro-nacional-d212e-default-rtdb.firebaseio.com",
    projectId: "teatro-nacional-d212e",
    storageBucket: "teatro-nacional-d212e.appspot.com",
    messagingSenderId: "460099722342",
};

firebase.initializeApp(firebaseConfig);

// Referencia a la colección "payment"
const paymentCollection = firebase.firestore().collection("payment");

function validateAndSubmit() {
    // Realiza las validaciones aquí
    const cardNumber = document.getElementById("cardNumber").value;
    const cvv = document.getElementById("cvv").value;
    const cardHolder = document.getElementById("cardHolder").value;
    const expirationMonth = document.getElementById("expirationMonth").value;
    const expirationYear = document.getElementById("expirationYear").value;

    if (cardNumber && cvv && cardHolder && expirationMonth && expirationYear) {
        // Verifica si la tarjeta es Visa o Mastercard
        const cardType = getCardType(cardNumber);
        if (cardType === "visa" || cardType === "mastercard") {
            // Si todas las validaciones pasan, envía los datos a Firestore
            paymentCollection.add({
                cardNumber,
                cardHolder,
                expirationMonth,
                expirationYear
            })
            .then(() => {
                // Muestra el modal de éxito
                document.getElementById("successModal").style.display = "block";
            })
            .catch(error => {
                console.error("Error al enviar datos a Firestore:", error);
            });
        } else {
            alert("El número de tarjeta no es Visa ni Mastercard");
        }
    } else {
        alert("Por favor, complete todos los campos");
    }
}

function getCardType(cardNumber) {
    // Elimina los espacios en blanco y caracteres no numéricos
    const cleanedCardNumber = cardNumber.replace(/\D/g, '');

    // Verifica si el número de tarjeta comienza con "4" o "5"
    if (/^4/.test(cleanedCardNumber)) {
        return "visa";
    } else if (/^5/.test(cleanedCardNumber)) {
        return "mastercard";
    } else {
        // Puedes agregar más casos para otros tipos de tarjetas si es necesario
        return "otro";
    }
}

function redirectToIndex() {
    // Redirige a indexUser.html
    window.location.href = "indexUser.html";
}