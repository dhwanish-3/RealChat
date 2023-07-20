import { signOut } from "firebase/auth";
import firebase from "react";

const auth = firebase.auth();

const SignOut = () => {
    return auth.currentUser && (
        <button onClick={() => auth.signOut()}>Sign Out</button>
    );
}

export default signOut;