import { useState } from "react";

const MessageInput = ({ onSendMessage }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow p-2 border rounded-l-lg"
        placeholder="Escribe tu mensaje..."
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-r-lg"
      >
        Enviar
      </button>
    </form>
  );
};

export default MessageInput;
