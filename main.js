const firebaseConfig = {
    apiKey: "AIzaSyC0THL3rQUy2BalrI4cLYHJbbaDKvYq24g",
    authDomain: "protfolio-9e108.firebaseapp.com",
    databaseURL: "https://protfolio-9e108-default-rtdb.firebaseio.com",
    projectId: "protfolio-9e108",
    storageBucket: "protfolio-9e108.firebasestorage.app",
    messagingSenderId: "676400124635",
    appId: "1:676400124635:web:24384cad2b1887514c72fe",
    measurementId: "G-MKYTYJ1GJJ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const contactForm = document.getElementById('contact-firebase-form');
const statusMessage = document.getElementById('status-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = contactForm.name.value;
    const email = contactForm.email.value;
    const message = contactForm.message.value;

    statusMessage.textContent = 'Sending message...';
    statusMessage.className = 'mt-4 text-sm font-medium text-blue-500';

    try {
        // Wait for the Firebase operation to complete
        await db.collection("contacts").add({
            name: name,
            email: email,
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        statusMessage.textContent = 'Message sent successfully! Thank you. 😊';
        statusMessage.className = 'mt-4 text-sm font-medium text-green-600';
        contactForm.reset();
    } catch (error) {
        console.error("Error adding document: ", error);
        statusMessage.textContent = 'Oops! Something went wrong. Please try again.';
        statusMessage.className = 'mt-4 text-sm font-medium text-red-600';
    }
});