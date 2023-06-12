import "./SelectedChannel.css";
import Messages from "../Messages";
import MessageInput from "../MessageInput";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import EditAChannel from "../EditAChannelModal";
import { addChannelMessage, getAChannel, postMessage } from "../../store/channel";
import { io } from 'socket.io-client';
let socket;
const SelectedChannel = () => {
  const currentChannel = useSelector((state) => state.channelsReducer.currentChannel);
  const currentUserId = useSelector((state) => state.session.user.id)
  const currentServerOwnerId = useSelector((state) => state.serversReducer?.currentServer?.ownerId?.id)
  const currentChannelMessages = useSelector((state) => state.channelsReducer.currentChannel.messages);
  const channelId = currentChannel?.id;
  const [socketRoom, setSocketRoom] = useState();
  const [messages, setMessages] = useState([]);
  const isServerOwner = currentUserId === currentServerOwnerId

  const dispatch = useDispatch();


  useEffect(() => {
    let isActive = true;
    const channelMessagesObj = currentChannel?.messages;

    if (channelMessagesObj && isActive)
      setMessages(Object.values(channelMessagesObj));

    return () => (isActive = false);
  }, [currentChannelMessages]);

  useEffect(() => {

    // create websocket/connect
    socket = io();

    socket.on("message", (data) => {
      console.log(data)
      // setMessages((messages) => [...messages, data["message"]]);
      dispatch(addChannelMessage(data))
    });

    // socket.emit("join_room", {"room": socketRoom})

    // when component unmounts, disconnect
    return (() => {
      socket.disconnect()
    })
  }, [])

  useEffect(() => {
    setSocketRoom(`channel${channelId}`);
    socket.emit("join_room", { "room": socketRoom })
    return (() => {
      socket.emit("leave_room", { "room": socketRoom })
    })
  }, [channelId, socketRoom]);
  // useEffect(() => {

  //   socket.emit("join_room", {"room": socketRoom})

  // }, [socketRoom])


  // additional code to be added

  const sendMessage = async (formData) => {
    await dispatch(postMessage(channelId, formData))
      .then((message) =>
        socket.emit('message', { 'message': message, 'room': socketRoom })
      );
  };

  return (
    <div className="move-it-over">
      <h1>{currentChannel.name}</h1>
      {isServerOwner && (
        <OpenModalButton
          buttonText="Edit a Channel"
          modalComponent={<EditAChannel />}
        />
      )}

      {currentChannel?.messages && <Messages messages={messages} />}

      <MessageInput sendMessage={sendMessage} className="chat_input" />
    </div>
  );
};

export default SelectedChannel;
