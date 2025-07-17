// utils/auth.ts
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase/config";

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Sign-in error:", error);
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
  }
}
