import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyBS_wYgemEG3Ed_uP8Acq-4Qub-poeM6PM",
  authDomain: "react-blog-demo-app.firebaseapp.com",
  databaseURL: "https://react-blog-demo-app.firebaseio.com",
  projectId: "react-blog-demo-app",
  storageBucket: "react-blog-demo-app.appspot.com",
  messagingSenderId: "655108706558",
  appId: "1:655108706558:web:9ea476b0edaa32a61755af",
  measurementId: "G-5S7NV0ENX9"
};

firebase.initializeApp(config);
export default firebase;
