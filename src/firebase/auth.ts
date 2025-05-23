import app from ".";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const auth = getAuth(app);

if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
}

export { auth };
