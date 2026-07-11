import { HiDotsVertical } from "react-icons/hi";

const MessageMenu = ({ onDelete }) => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-xs">
        <HiDotsVertical />
      </label>

      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-36"
      >
        <li>
          <button onClick={onDelete}>Delete</button>
        </li>

        <li>
          <button
            onClick={() =>
              navigator.clipboard.writeText("Copied")
            }
          >
            Copy
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MessageMenu;