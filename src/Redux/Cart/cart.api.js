import {
  doc,
  where,
  collection,
  query,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

export const cartAPI = async (id) => {
  try {
    const citiesRef = collection(db, "cart");
    const q = query(citiesRef, where("userId", "==", id));
    const querySnapshot = await getDocs(q);
    let result;
    querySnapshot.forEach((doc) => {
      result = doc.data();
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};
