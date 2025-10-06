import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, addDoc, collection } from 'firebase/firestore';

// Firebase configuration
// IMPORTANT: Replace these with your Firebase project credentials
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection reference
const canvasCollection = collection(db, 'canvases');

/**
 * Create a new canvas document in Firestore
 * @returns {Promise<string>} Document ID
 */
export async function createCanvasDoc() {
  try {
    const docRef = await addDoc(canvasCollection, {
      scene: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating canvas document:', error);
    throw error;
  }
}

/**
 * Save canvas data to Firestore
 * @param {string} id - Canvas document ID
 * @param {string} jsonData - Canvas JSON data
 */
export async function saveCanvas(id, jsonData) {
  try {
    const docRef = doc(db, 'canvases', id);
    await setDoc(docRef, {
      scene: jsonData,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving canvas:', error);
    throw error;
  }
}

/**
 * Load canvas data from Firestore
 * @param {string} id - Canvas document ID
 * @returns {Promise<string|null>} Canvas JSON data or null
 */
export async function loadCanvas(id) {
  try {
    const docRef = doc(db, 'canvases', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.scene || null;
    } else {
      console.warn('Canvas document not found');
      return null;
    }
  } catch (error) {
    console.error('Error loading canvas:', error);
    throw error;
  }
}
