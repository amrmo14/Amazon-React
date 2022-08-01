import {
  addDoc,
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "./../../components/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";

//------------------------------------------------------

let dbRef = collection(db, "sellers");

//HANDLE: add new seller
export let addSeller = async (seller) => {
  try {
    let userRef = await createUserWithEmailAndPassword(
      auth,
      seller.email,
      seller.password
    );
    let docRef = await addDoc(dbRef, {
      ...seller,
      permission: false,
      userAuthId: userRef.user.uid,
      role: "seller",
      createdAt: serverTimestamp(),
      purchasedProducts: [],
    });
    await signOut(auth);
    return {
      userAuth: userRef,
      user: docRef,
    };
  } catch (err) {
    return err.message;
  }
};

//HANDLE: login
export let login = async (email, password) => {
  try {
    //HANDLE: auth
    let cred = await signInWithEmailAndPassword(auth, email, password);
    //HANDLE: seller doc
    let q = query(dbRef, where("userAuthId", "==", cred.user.uid));
    let docsRef = await getDocs(q);
    let docs = docsRef.docs.map((data) => {
      return {
        ...data.data(),
        _id: data.id,
      };
    });
    console.log(docs);
    localStorage.setItem("token", cred.user.accessToken);
    localStorage.setItem("userId", docs[0]._id);
    localStorage.setItem("role", docs[0].role);
    return cred.user;
  } catch (err) {
    return err.message;
  }
};

//HANDLE: get singler user
export let getSeller = async (id) => {
  let docRef = doc(db, "sellers", id);
  let snapshot = await getDoc(docRef);
  return snapshot.data();
};

//HANDLE: logout
export let logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return true;
  } catch (err) {
    return err.message;
  }
};

//HANDLE: Reset password
export let resetPassword = async () => {
  let d = doc(db, "sellers", "UeLdZp9mBXXYjAmnYdsc");
  await updateDoc(d, {
    name: "Updated Amr",
  });
  return d;
};
