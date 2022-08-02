import { db, auth } from "../config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { async } from "@firebase/util";

let productsRef = collection(db, "products");
//HANDLE: add new product
export let addProduct = async (newProduct) => {
  try {
    let docRef = await addDoc(productsRef, {
      ...newProduct,
      images: [],
      sellerID: localStorage.getItem("userId"),
    });
    return docRef.id;
  } catch (err) {
    return err.message;
  }
};
//HANDLE: upload images
export let uploadImgs = async (productID, newUrlImg) => {
  let docRef = doc(db, "products", productID);
  await updateDoc(docRef, {
    images: newUrlImg,
  });
};

//HANDLE: get products by category
export let getProductsByCategory = async (category) => {
  try {
    let products = [];
    let q = query(productsRef, where("en.category", "==", category));
    let docsRef = await getDocs(q);
    products = docsRef.docs.map((doc) => doc.data());
    return products;
  } catch (err) {
    return err.message;
  }
};
