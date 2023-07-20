import React from "react";
import firebase from "firebase/compat/app";
import 'firebase/firestore';
import 'firebase/auth';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const SignIn = () => {
    const auth  = getAuth();

    const signInWithGoogle = () => {
        // var provider = new firebase.auth.GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }
    
    return (
        <div>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    );
}

export default SignIn;