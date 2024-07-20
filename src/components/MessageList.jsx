import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div className="flex flex-col flex-grow overflow-y-auto mb-4">
      {messages.map((message) => (
        <div key={message.id} className={`p-2 my-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}>
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
