import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //
    };
  }

  signIn() {
    var provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }
  signOut() {
    this.props.firebase.auth().signOut();
    window.location.reload(false);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  render() {
    return (
      <div id="buttons">
        <h4 id="displayName">
          Current User: {this.props.user ? this.props.user : "Guest"}
        </h4>

        {this.props.user == "Guest" ? (
          <button id="signInBtn" onClick={() => this.signIn()}>
            Sign In
          </button>
        ) : (
          <button id="signInBtn" onClick={() => this.signOut()}>
            Sign Out
          </button>
        )}
      </div>
    );
  }
}

export default User;
