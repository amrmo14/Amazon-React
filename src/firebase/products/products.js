import { db, auth } from "../config";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
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
      imgs: [],
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
    imgs: newUrlImg,
  });
};

//HANDLE: get products by category
export let getProductsByCategory = async (category) => {
  try {
    let products = [];
    let q = query(productsRef, where("ar.category", "==", category));
    let docsRef = await getDocs(q);
    products = docsRef.docs.map((doc) => ({
      ...doc.data(),
      productID: doc.id,
    }));
    return products;
  } catch (err) {
    return err.message;
  }
};

//HANDLE: add comments to product
export let addProductComment = async (prodId, comment) => {
  let docRef = doc(db, "products", prodId);
  let updated = await updateDoc(docRef, {
    comments: arrayUnion(comment),
  });
  return updated;
};

//HANDLE: get comments of specific prodcut
export let getProductComments = async (prodiD) => {
  let docRef = doc(db, "products", prodiD);
  let product = await getDoc(docRef);
  let data = product.data();
  return data.comments;
};

//HANDLE: get product by id
export let getProductById = async (id) => {
  let docRef = doc(db, "products", id);
  let productRef = await getDoc(docRef);
  let product = productRef.data();
  return product;
};

//HANDLE: get products bt user id
export let getProductsByUserId = async (userId) => {
  let q = query(productsRef, where("sellerID", "==", userId));
  let products = (await getDocs(q)).docs.map((doc) => {
    return { ...doc.data(), productID: doc.id };
  });
  return products;
};

//HANDLE: search for product depending on documnt fields and it's value
export let getProductsWithFields = async (fieldName, fieldValue, lang) => {
  //5000
  switch (fieldName) {
    case "price":
    case "discount": {
      let q = query(
        productsRef,
        where(
          fieldName == "price" ? "price" : fieldName,
          "<=",
          Number(fieldValue)
        )
      );
      let products = (await getDocs(q)).docs.map((doc) => doc.data()).reverse();
      return products;
      break;
    }
    case "category":
      console.log(fieldName, fieldValue);
      let q = query(productsRef, where("en.category", "==", fieldValue));
      let products = (await getDocs(q)).docs.map((doc) => doc.data());
      return products;
  }
};

// HANDLE: Filter products
export let filterProducts = async (fieldName) => {
  let q;
  let products;
  if (fieldName == "mostSold") {
    q = query(productsRef, orderBy("soldQuantity"));
    products = (await getDocs(q)).docs.map((doc) => doc.data()).reverse();
  } else if (fieldName == "lowestSold") {
    q = query(productsRef, orderBy("soldQuantity"));
    products = (await getDocs(q)).docs.map((doc) => doc.data());
  } else if (fieldName == "price") {
    q = query(productsRef, orderBy("price"));
    products = (await getDocs(q)).docs.map((doc) => doc.data()).reverse();
  } else if (fieldName == "discount") {
    q = query(productsRef, orderBy("discount"));
    products = (await getDocs(q)).docs.map((doc) => doc.data()).reverse();
  }
  return products;
};

//HANDLE: update product
export let updatProduct = async (data, id) => {
  let docRef = doc(db, "products", id);
  let updated = await updateDoc(docRef, {
    ...data,
  });
};
