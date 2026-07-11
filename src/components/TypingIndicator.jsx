const TypingIndicator = ({ typing }) => {
  if (!typing) return null;

  return (
    <div className="px-5 py-2 text-sm italic text-gray-400">
      Typing...
    </div>
  );
};

export default TypingIndicator;