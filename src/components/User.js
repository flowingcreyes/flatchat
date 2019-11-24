import React, { Component } from "react";
import "./User.css" 
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    };
  }
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }
  signIn() {
    var provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }
  signOut() {
    this.props.firebase.auth().signOut();
    window.location.reload(false);
  }
  3;
  render() {
    return (
      <div>
        {this.props.user}
        {this.props.user == "Guest" ? (
          <div className="auth" onClick={() => this.signIn()}>SignIn</div>
        ) : (
          <div className="auth" onClick={() => this.signOut()}>SignOut</div>
        )}
      </div>
    );
  }
}
export default User;
