import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import User from "./components/User";

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
      activeRoom: "",
      user: "Guest"
    };
  }

  handleRoomClick(room) {
    this.setState({ activeRoom: room });
  }

  setUser(user) {
    this.setState({ user: user.displayName });
  }

  render() {
    const showMessages = this.state.activeRoom;
    return (
      <div className="App">
        <aside id="sidebar">
          <h1 className="appName">FlatChat</h1>
          <h4>Create rooms and send some messages!</h4>
          <User
            firebase={firebase}
            setUser={this.setUser.bind(this)}
            user={this.state.user}
          />
          <RoomList
            firebase={firebase}
            handleRoomClick={room => this.handleRoomClick(room)}
            activeRoom={this.state.activeRoom}
          />
        </aside>

        {showMessages ? (
          <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            user={this.state.user}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
