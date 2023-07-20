import { useAuthState } from 'react-firebase-hooks/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import Credentials from './private/Credentials';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(Credentials);

const auth = getAuth(app);
const db = getFirestore(app);