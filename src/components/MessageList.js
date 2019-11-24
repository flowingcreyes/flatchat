import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      content: ""
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
  sendMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      username: this.props.user,
      content: this.state.content,
      sent: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
    this.setState({
      content: ""
    });
  }
  typeMessage(e){
    this.setState({
      content: e.target.value
    })
  }
  render() {
    return (
      <div className="messages">
        {this.state.messages.map(message => {
          if (message.roomId == this.props.activeRoom) {
            return (
              <div key={message.key}>
                {message.username} {message.content} {message.sentAt}
              </div>
            );
          }
        })}
        <div>
          <form onSubmit={(e) => this.sendMessage(e)}>
            <input type="text"  onChange={(e) => this.typeMessage(e)} value={this.state.content} placeholder="type your msg"/>
            <input type="submit">Submit</input>
            </form>
            </div>
      </div>
    );
  }
}

export default MessageList;
