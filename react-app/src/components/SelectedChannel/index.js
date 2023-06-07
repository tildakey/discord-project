import "./SelectedChannel.css";
import Messages from "../Messages";
import MessageInput from "../MessageInput";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { postMessage } from "../../store/channel";
import { io } from 'socket.io-client';
let socket;
// maybe pass in an object from SelectedServer?
const SelectedChannel = () => {
  const currentChannel = useSelector((state) => state.channelsReducer.currentChannel);
  const currentChannelMessages = useSelector((state) => state.channelsReducer.currentChannel.messages);
  const channelId = currentChannel?.id;
  const [socketRoom, setSocketRoom] = useState();
  const [messages, setMessages] = useState([]);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    setSocketRoom(`channel${channelId}`);
  }, [channelId]);
  
  useEffect(() => {
    let isActive = true;
    const channelMessagesObj = currentChannel?.messages;

    if (channelMessagesObj && isActive)
      setMessages(Object.values(channelMessagesObj));

    return () => (isActive = false);
  }, [currentChannel, currentChannelMessages]);

  useEffect(() => {

    // create websocket/connect
    socket = io();

    socket.on("message", (data) => {
      console.log(data)
      setMessages((messages) => [...messages, data["message"]]);
    });

    // when component unmounts, disconnect
    return (() => {
      socket.disconnect()
    })
  }, [])

  // additional code to be added

  const sendMessage = async (formData) => {
    await dispatch(postMessage(channelId, formData))
    .then((message) =>
      socket.send({ message, room: socketRoom })
    );
  };

  return (
    <>
      <h1>CURRENT CHANNEL</h1>
      {currentChannel?.messages && <Messages messages={messages} />}

      <MessageInput sendMessage={sendMessage} className="chat_input" />
    </>
  );
};

export default SelectedChannel;
