import { firebaseAuth } from "@/helpers/firebase";
import router from "@/router/index.js";

export default store => {
  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
      console.log(user);
      store.dispatch("user/updateUser", user);
    } else {
      store.dispatch("user/logout").then(() => {
        if (!router.history.current.meta.requiresNoAuth) {
          router.push("login");
        }
      });
    }
  });
};
