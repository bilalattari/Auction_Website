import { Button, message } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

function Signin() {
  const navigate = useNavigate();
  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log("results=>", result);
        const ref = doc(db, "users", user.uid);
        setDoc(ref, {
          email: user.email,
          photoUrl: user.photoURL,
          uid: user.uid,
          displayName: user.displayName,
        }).then(() => {
          navigate("/");
          message.success("Aapka account ban gya he. Bht bht shkrya");
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        message.success(errorMessage);

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="flex justify-center my-40">
      <Button onClick={handleLogin}>Login With Google</Button>
    </div>
  );
}

export default Signin;
