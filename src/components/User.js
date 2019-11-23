import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    };
  }
  componentDidMount(){
      this.props.firebase.auth().onAuthStateChanged(user => {
          this.props.setUser(user)
      })
  }
  signIn(){
    var provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider)
  }
  signOut(){
      this.props.firebase.auth().signOut();
      window.location.reload(false);
  }
  consoleName(){
      console.log(this.props.user.displayName)
  }
  render(){
      return(
          <div>
              {this.props.user}
              <button onClick={() => this.signIn()}>SignIn</button>
              <button onClick={() => this.signOut()}>SignOut</button>
          </div>
      )
  }
}
export default User;
