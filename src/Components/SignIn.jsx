import React from "react";
import { signInWithGoogle } from "../Backend/Firebase";

const SignIn = () => {
    return (
        <div>
            <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
            <p style={{marginLeft: "12%",marginRight:"10%"}}>Do not violate the community guidelines or you will be banned for life!</p>
        </div>
    );
}

export default SignIn;