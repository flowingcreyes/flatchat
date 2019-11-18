import React, { Component } from "react";
import { tsExpressionWithTypeArguments } from "@babel/types";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ""
    };

    this.roomsRef = this.props.firebase.database().ref("rooms");
  }
  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({
        rooms: this.state.rooms.concat(room)
      });
    });
  }
  handleRoomCreation(e) {
    this.setState({
      newRoomName: e.target.value
    });
  }
  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({
      newRoomName: ""
    });
  }

  render() {
    let rooms = this.state.rooms.map(room => (
      <div key={room.key}>{room.name}</div>
    ));
    return (
      <div className="room">
        {rooms}
        <form onSubmit={e => this.createRoom(e)}>
          <input
            type="text"
            value={this.state.newRoomName}
            onChange={e => this.handleRoomCreation(e)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default RoomList;
