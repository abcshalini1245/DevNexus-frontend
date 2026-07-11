
import {
  HiOutlineDotsVertical,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineClipboard,
  HiOutlineReply,
  HiOutlineHeart,
} from "react-icons/hi";

const MessageBubble = ({
  message,
  isMine,
  onDelete,
  onEdit,
   onReply,
}) => {
  return (
    <div
      className={`group flex mb-3 ${
        isMine ? "justify-end" : "justify-start"
      }`}
    >
      <div className="flex items-end gap-2">

        {/* Friend Menu */}
        {!isMine && (
          <div className="dropdown">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-xs opacity-0 group-hover:opacity-100"
            >
              <HiOutlineDotsVertical size={18} />
            </button>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-300 rounded-box shadow w-48 z-50"
            >
              <li>
              <button
  onClick={() => {
    navigator.clipboard.writeText(message.text);
  }}
>
  📋 Copy
</button>
              </li>

              <li>
                <button onClick={() => onReply(message)}>
  ↩️ Reply
</button>
              </li>

              {/* <li>
              <div className="flex justify-center gap-2 py-2">

<button>❤️</button>

<button>👍</button>

<button>😂</button>

<button>🔥</button>

<button>😍</button>

</div>
              </li> */}
            </ul>
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow ${
            isMine
              ? "bg-linear-to-r from-indigo-500 to-purple-500 text-white rounded-br-md"
              : "bg-[#2b2d31] text-white rounded-bl-md"
          }`}
        >
          <p className="wrap-break-word">{message.text}</p>

          <div className="text-[10px] opacity-60 text-right mt-1">
            {new Date(
              message.createdAt || Date.now()
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

       

        {isMine && (
  <div className="dropdown dropdown-end">
    <label
      tabIndex={0}
      className="btn btn-ghost btn-xs opacity-0 group-hover:opacity-100"
    >
      <HiOutlineDotsVertical size={18} />
    </label>

    <ul
      tabIndex={0}
      className="dropdown-content menu bg-base-300 rounded-box shadow w-48 z-50"
    >
      <li>
        <button onClick={() => onEdit(message)}>
          ✏️ Edit
        </button>
      </li>

      <li>
        <button onClick={() => onDelete(message._id)}>
          🗑 Delete
        </button>
      </li>

      <li>
        <button
          onClick={() =>
            navigator.clipboard.writeText(message.text)
          }
        >
          📋 Copy
        </button>
      </li>

      <li>
        <button onClick={() => onReply(message)}>
          ↩️ Reply
        </button>
      </li>

      
    </ul>
  </div>
)}
      </div>
    </div>
  );
};

export default MessageBubble;