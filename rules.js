rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contactFormSubmissions/{document} {
      allow read, write: if request.auth != null; // Only allow authenticated users (for testing)
      // For production, you might want:
      // allow write: if true; // Allow anyone to submit
      // allow read: if false; // But don't allow public reads
    }
  }
}