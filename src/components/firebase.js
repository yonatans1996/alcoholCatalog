import firebase from "firebase"
import "firebase/auth"
var firebaseConfig = {
    apiKey: "AIzaSyDVDY9gS9PIZDMPdtdUUWhgg3gxU0Qhr6k",
    authDomain: "workshift-shaked.firebaseapp.com",
    databaseURL: "https://workshift-shaked-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "workshift-shaked",
    storageBucket: "workshift-shaked.appspot.com",
    messagingSenderId: "987192493584",
    appId: "1:987192493584:web:acbdc6d99aa63be04e6c95"
  };
  // Initialize Firebase
  export const app=firebase.initializeApp(firebaseConfig);
  export const auth=app.auth();
  export default firebase;
