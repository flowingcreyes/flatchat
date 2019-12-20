import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import User from "./components/User";

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBxrzLC0uRRuyl6tiUTKE-b2P8ucelyD0c",
    authDomain: "flatchat-76c5a.firebaseapp.com",
    databaseURL: "https://flatchat-76c5a.firebaseio.com",
    projectId: "flatchat-76c5a",
    storageBucket: "flatchat-76c5a.appspot.com",
    messagingSenderId: "859474629760",
    appId: "1:859474629760:web:98b98fa4112b2d91df0265",
    measurementId: "G-6MMBV85DR8"
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
