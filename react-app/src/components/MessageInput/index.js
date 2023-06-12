import "./MessageInput.css";
import { useState } from "react";
import React from "react";
import { useSelector } from "react-redux";

const MessageInput = ({ sendMessage }) => {
  const userId = useSelector((state) => state.session.user.id);
  const [chatContent, setChatContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("content", chatContent);
    formData.append("senderId", userId);
    sendMessage(formData);
    setChatContent("");
  };

  return (
    <form id="chat-input" onSubmit={handleSubmit}>
      <input
        id="chat-message-input"
        placeholder="Send a message!"
        onChange={(e) => setChatContent(e.target.value)}
        value={chatContent}
      />
    </form>
  );
};

export default MessageInput;
