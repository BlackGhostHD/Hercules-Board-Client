import { firebase } from "@firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { config } from "../config/firebase";

// Initialize Firebase
try {
	firebase.initializeApp(config);
} catch (error) {
	console.error(error);
}

export { firebase };
export const firebaseAuth = firebase.auth();
export const firebaseStore = firebase.firestore();
