// Firebase configuration (replace with your actual config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Reference to the Firestore collection
  const contactFormRef = db.collection("contactFormSubmissions");
  
  // Handle form submission
  document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    try {
      // Add a new document to Firestore
      await contactFormRef.add({
        name: name,
        subject: subject,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // Adds server-side timestamp
      });
      
      // Show success message
      document.getElementById('successMessage').style.display = 'block';
      document.getElementById('contactForm').reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        document.getElementById('successMessage').style.display = 'none';
      }, 5000);
      
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an error submitting your form. Please try again.");
    }
  });