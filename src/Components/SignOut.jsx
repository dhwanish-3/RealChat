import { auth } from "../Backend/Firebase";

const SignOut = () => {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    );
}

export default SignOut;