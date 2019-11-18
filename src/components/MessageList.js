import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.messagesRef = this.props.firebase.database().ref("messages");
  }
  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      let message = snapshot.val();
      message.key = snapshot.key;
      this.setState({
        messages: this.state.messages.concat(message)
      });
    });
  }
  render() {
    return <div>{this.state.messages.filter(message => {
        return message.roomId = 2
    })}</div>;
  }
}

export default MessageList;
