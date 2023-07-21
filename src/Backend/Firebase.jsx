import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Credentials from '../private/Credentials';
import { collection, getDoc, getFirestore, limitToLast } from 'firebase/firestore'; 
import { query, orderBy } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

const app = initializeApp(Credentials);

const auth = getAuth(app);
const db = getFirestore(app);

const messageRef = collection(db, 'messages');

const Query = query(messageRef, orderBy('createdAt'), limitToLast(50));

const provider = new GoogleAuthProvider();


const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

  } catch (error) {
    console.error('Google sign-in error:', error);
  }
};

const banEvilUser = async () => {
  await setDoc(doc(db, "banned", auth.currentUser.uid), {});
}

const isBanned = async () => {
  const bannedRef = doc(db, "banned", auth.currentUser.uid);
  const bannedSnap = await getDoc(bannedRef);

  if (bannedSnap.exists()) {
    console.log("Banned");
    return true;
  } else {
    console.log("Not banned");
    return false;
  }
}

export {
    app,
    auth,
    db,
    Query,
    messageRef,
    signInWithGoogle,
    banEvilUser,
    isBanned
}