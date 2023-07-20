import { useAuthState } from 'react-firebase-hooks/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import Credentials from '../private/Credentials';
import { collection, getFirestore } from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore"; 
import { query, orderBy, limit } from "firebase/firestore";

const app = initializeApp(Credentials);

const auth = getAuth(app);
const db = getFirestore(app);

const messageRef  = collection(db, 'messages');

const Query = query(messageRef, orderBy('createdAt'), limit(25));

export {
    app,
    auth,
    db,
    Query,
    messageRef
}