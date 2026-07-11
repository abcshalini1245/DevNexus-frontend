
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import socket from "../utils/socket";
import { BASE_URL } from "../utils/constants";

import ChatHeader from "../components/ChatHeader";
import ChatBody from "../components/ChatBody";
import ChatInput from "../components/ChatInput";
import TypingIndicator from "../components/TypingIndicator";

const Chat = () => {
  const user = useSelector((store) => store.user);
  const { targetUserId } = useParams();

  const [messages, setMessages] = useState([]);
  const [friend, setFriend] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [typing, setTyping] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
const [editText, setEditText] = useState("");

  const bottomRef = useRef(null);
  const [replyMessage,setReplyMessage]=useState(null);

  // Load chat history
  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/chat/" + targetUserId,
        {
          withCredentials: true,
        }
      );

      setMessages(res.data);

      const profile = await axios.get(
        BASE_URL + "/profile/" + targetUserId,
        {
          withCredentials: true,
        }
      );

      setFriend(profile.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!user) return;

    const init = async () => {
      await fetchMessages();

      socket.connect();

      socket.emit("joinChat", {
        userId: user._id,
        targetUserId,
      });

      socket.on("receiveMessage", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      socket.on("onlineUsers", (users) => {
        setIsOnline(users.includes(targetUserId));
      });

      socket.on("typing", () => {
        setTyping(true);

        setTimeout(() => {
          setTyping(false);
        }, 1200);
      });
    };

    init();

    return () => {
      socket.off("receiveMessage");
      socket.off("onlineUsers");
      socket.off("typing");
      socket.disconnect();
    };
  }, [user, targetUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);



  const deleteMessage = async (messageId) => {
  try {

    await axios.delete(
      BASE_URL + "/chat/message/" + messageId,
      {
        withCredentials: true,
      }
    );

    setMessages((prev) =>
      prev.filter((msg) => msg._id !== messageId)
    );

  } catch (err) {
    console.error(err);
  }
};

  const sendMessage = (text) => {
    socket.emit("sendMessage", {
      userId: user._id,
      targetUserId,
      text,
      replyTo:replyMessage?._id
    });
     setReplyMessage(null);
  };
 

  const editMessage = async () => {
  try {

    const res = await axios.patch(
      BASE_URL + "/chat/message/" + editingMessage._id,
      {
        text: editText,
      },
      {
        withCredentials: true,
      }
    );

    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === editingMessage._id
          ? res.data
          : msg
      )
    );

    setEditingMessage(null);
    setEditText("");

  } catch (err) {
    console.log(err);
  }
};

  if (!user)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="flex justify-center py-8 bg-base-200 min-h-screen">

      <div className="w-[95%] xl:w-[85%] max-w-7xl h-[82vh] bg-base-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden">

        <ChatHeader
          user={friend}
          online={isOnline}
        />

        <ChatBody
          messages={messages}
          currentUserId={user._id}
          onDelete={deleteMessage}
          onEdit={(msg) => {
      setEditingMessage(msg);
      setEditText(msg.text);
          
   }}
   onReply={(msg)=>setReplyMessage(msg)}
        />

        <TypingIndicator typing={typing} />

        <div ref={bottomRef} />


        {replyMessage && (

<div className="bg-base-200 border-l-4 border-primary p-3 mx-4 rounded">

<div className="text-xs text-primary">
Replying to
</div>

<div className="font-semibold">
{replyMessage.text}
</div>

<button
className="btn btn-xs btn-circle float-right"
onClick={()=>setReplyMessage(null)}
>
✕
</button>

</div>

)}

        <ChatInput
          onSend={sendMessage}
        />

      </div>
      {editingMessage && (

<div className="modal modal-open">

  <div className="modal-box">

    <h3 className="font-bold text-lg">
      Edit Message
    </h3>

    <textarea
      className="textarea textarea-bordered w-full mt-4"
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
    />

    <div className="modal-action">

      <button
        className="btn"
        onClick={() => setEditingMessage(null)}
      >
        Cancel
      </button>

      <button
        className="btn btn-primary"
        onClick={editMessage}
      >
        Save
      </button>

    </div>

  </div>

</div>

)}

    </div>
  );
};

export default Chat;