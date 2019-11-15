import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./components/RoomList.js";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAiJy9fcQEcdKb-yUZaTXFzvG-cxhCNWHM",
  authDomain: "flatchat-fcced.firebaseapp.com",
  databaseURL: "https://flatchat-fcced.firebaseio.com",
  projectId: "flatchat-fcced",
  storageBucket: "flatchat-fcced.appspot.com",
  messagingSenderId: "663952428260",
  appId: "1:663952428260:web:42914c1436b7703fff70f1",
  measurementId: "G-4FTN4WQHDD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
