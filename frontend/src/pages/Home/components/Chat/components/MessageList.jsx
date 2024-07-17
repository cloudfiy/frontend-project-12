const MessageList = ({ messages }) => (
  <div className="chat-messages overflow-auto px-5" id="messages-box">
    {messages.map((msg) => (
      <div className="text-break mb-2" key={msg.id}>
        <b>{msg.username}</b>: {msg.body}
      </div>
    ))}
  </div>
);

export default MessageList;
