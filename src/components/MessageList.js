import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: ""
    };
    this.messageRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messageRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  handleChange(e) {
    this.setState({ newMessage: e.target.value });
  }

  createMessage(e) {
    e.preventDefault();
    this.messageRef.push({
      username: this.props.user,
      content: this.state.newMessage,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom.key
    });
    document.getElementById("messageInput").value = "";
  }

  getFilteredRooms() {
    return this.state.messages.filter(message => {
      return this.props.activeRoom.key === message.roomId;
    });
  }

  render() {
    var roomId = this.props.activeRoom.key;
    return (
      <div id="message-group">
        <div id="msgGroup">
          <h4>Room: {this.props.activeRoom.name}</h4>
          {this.getFilteredRooms().map((message, i, arr) => {
            return (
              <div key={i} id="msgBubble">
                <span id="msgText">
                  {message.username}: {message.content}
                </span>
              </div>
            );
          })}
        </div>
        <div className="container">
          <form className="newMessage" onSubmit={e => this.createMessage(e)}>
            <input
              type="text"
              id="messageInput"
              autoComplete="off"
              placeholder="Enter New Message"
              onChange={e => this.handleChange(e)}
            />
            <button id="msgSubmit">
              <ion-icon name="send" />{" "}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default RoomList;
