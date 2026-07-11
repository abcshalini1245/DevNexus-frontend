import OnlineBadge from "./OnlineBadge";

const ChatHeader = ({
  user,
  online,
}) => {
  return (
    <div className="bg-primary text-white p-4 flex items-center gap-4">

      <img
        src={user?.photourl}
        className="w-16 h-16 rounded-full object-cover"
        alt=""
      />

      <div>
        <h2 className="font-bold text-xl">
          {user?.firstName} {user?.lastName}
        </h2>

        <OnlineBadge online={online} />
      </div>

    </div>
  );
};

export default ChatHeader;