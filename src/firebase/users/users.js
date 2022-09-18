import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../config";

let sellers = collection(db, "sellers");
let users = collection(db, "users");
// HANDLE: login
export let userLogin = async (email, password) => {
  let sellerRef = doc(db, "email", email);
  let seller = await getDoc(sellerRef);
  if (seller.data()) {
    console.log(seller.data());
    return "User EXIST";
  } else {
    let user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user.user.uid);
    let q = query(users, where("userAuth", "==", user.user.uid));
    let docsRef = await getDocs(q);
    let docs = docsRef.docs.map((data) => {
      return {
        ...data.data(),
        _id: data.id,
      };
    });
    console.log(docs);
    localStorage.setItem("amazon_user", docs[0]._id);
  }
};

// HANDLE: create new user
export let signin = async (user) => {
  let userAuth = await createUserWithEmailAndPassword(
    auth,
    user.email,
    user.password
  );
  let userRef = await addDoc(users, {
    ...user,
    userAuth: userAuth.user.uid,
    role: "user",
    purchasedProducts: [],
  });
  return {
    userAuth: userAuth,
    user: userRef,
  };
};

// HANDLE:get user by id
export let getUserById = async (id) => {
  console.log(id);
  let userRef = doc(db, "users", id);
  let userDoc = await getDoc(userRef);
  return {
    ...userDoc.data(),
  };
};

// HANDLE: logout
export let userLogout = async () => {
  await signOut(auth);
};

// HANDLE: update user purshase
export let updateUserPurshase = async (id, product) => {
  let docRef = doc(db, "users", id);
  await updateDoc(docRef, {
    purchasedProducts: arrayUnion({
      productID: product,
      date: new Date().toLocaleString(),
    }),
  });
};
