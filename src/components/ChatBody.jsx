import MessageBubble from "./MessageBubble";

const ChatBody = ({
  messages,
  currentUserId,
  onDelete,
   onEdit,
   onReply,
   
}) => {
  return (
    // <div className="flex-1 overflow-y-auto p-5 bg-base-200">
    <div className="flex-1 overflow-y-auto p-6 bg-base-200 space-y-2">
      {messages.map((msg) => (
        <MessageBubble
          key={msg._id}
          message={msg}
          isMine={
            (typeof msg.senderId === "object"
              ? msg.senderId._id
              : msg.senderId) === currentUserId
          }
         onDelete={onDelete}
         onEdit={onEdit}
         onReply={onReply}
        />
      ))}
    </div>
  );
};

export default ChatBody;