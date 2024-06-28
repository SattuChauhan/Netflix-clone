import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyD6R868MHgweH7mXEpFYPKchJsc9GI0tfc",
  authDomain: "netflix-clone-9cb2f.firebaseapp.com",
  projectId: "netflix-clone-9cb2f",
  storageBucket: "netflix-clone-9cb2f.appspot.com",
  messagingSenderId: "1030803389956",
  appId: "1:1030803389956:web:9edddce84bf5a856de3f51"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name , email , password) => {
    try {
      const res =   await createUserWithEmailAndPassword (auth , email , password);
      const user = res.user
      await addDoc(collection(db , "user"), {
        uid :user.uid,
        name ,
        authProvider : "local",
        email,
      })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('_').join(" "))
    }
}

const login = async (email , password) => {
    try {
       await signInWithEmailAndPassword(auth ,email ,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('_').join(" "))
    }
}


const logout = () => {
    signOut(auth)
}

export { auth , db , login , signup , logout } ;