const OnlineBadge = ({ online }) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-3 h-3 rounded-full ${
          online ? "bg-green-400" : "bg-gray-500"
        }`}
      ></span>

      <span className="text-sm text-white/80">
        {online ? "Online" : "Offline"}
      </span>
    </div>
  );
};

export default OnlineBadge;