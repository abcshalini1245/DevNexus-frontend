import { useState } from "react";
import { IoSend } from "react-icons/io5";

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;

    onSend(text);

    setText("");
  };

  return (
    <div className="p-4 border-t bg-base-300 flex gap-3">
      <input
        className="input input-bordered flex-1"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") send();
        }}
      />

      <button 
        // className="btn btn-primary"
        className="btn btn-primary btn-circle"
        onClick={send}
      >
        {/* <IoSend /> */}
        < IoSend size={20}/>
      </button>
    </div>
  );
};

export default ChatInput;