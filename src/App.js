import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./components/RoomList.js";
import MessageList from "./components/MessageList.js";

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
    this.state = {
      activeRoom: null
    };
  }
  activeRoom(room) {
    this.setState({
      activeRoom: room.key
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.activeRoom == null ? (
          <RoomList
            firebase={firebase}
            activeRoom={this.activeRoom.bind(this)}
          />
        ) : (
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
        )}
      </div>
    );
  }
}

export default App;
