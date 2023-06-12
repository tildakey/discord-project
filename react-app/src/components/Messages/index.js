import "./Messages.css";

const Messages = ({ messages }) => {

  return (
    <div className="messages">
      {messages?.map((message) => (
        <div className="message" key={message.id}>
          <div className="user">
            <img
              className="message-profilepic"
              src={message.senderProfilePic}
              alt="profilePicture"
            />
          </div>
          <div className="message-content">
            <h4 className="username">{message.senderUsername}</h4>
            <p>{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
