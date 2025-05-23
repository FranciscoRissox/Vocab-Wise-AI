import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import app from ".";

const firestore = getFirestore(app);

if (import.meta.env.DEV) {
  connectFirestoreEmulator(firestore, "localhost", 8080);
}

export { firestore };
