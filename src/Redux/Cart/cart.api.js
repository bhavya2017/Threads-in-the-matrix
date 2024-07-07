import {
  doc,
  where,
  collection,
  query,
  getDocs,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

// Function to fetch cart data for a given user ID
export const cartAPI = async (id) => {
  try {
    const cartRef = collection(db, "cart");
    const q = query(cartRef, where("userId", "==", id));
    const querySnapshot = await getDocs(q);
    let result;
    querySnapshot.forEach((doc) => {
      result = doc.data();
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching cart data');
  }
};

// Function to add item to cart for a given user ID
export const addToCartAPI = async (id, item) => {
  try {
    const cartRef = collection(db, "cart");
    const q = query(cartRef, where("userId", "==", id));
    const querySnapshot = await getDocs(q);

    let cartDoc;
    querySnapshot.forEach((doc) => {
      cartDoc = doc;
    });

    if (cartDoc) {
      // If the cart exists, update it by adding the new item
      const cartDocRef = doc(db, "cart", cartDoc.id);
      await updateDoc(cartDocRef, {
        items: arrayUnion(item)
      });
    } else {
      // If the cart doesn't exist, create a new cart document
      const newCartDocRef = doc(collection(db, "cart"));
      await setDoc(newCartDocRef, {
        userId: id,
        items: [item]
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error adding item to cart');
  }
};
