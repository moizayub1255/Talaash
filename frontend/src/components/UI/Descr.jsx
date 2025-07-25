import React from "react";

const Descr = ({ children, isPrimary, isSecondary, style }) => {
  const [text, setText] = React.useState(children);
  return (
    <p
      style={{
        color: isPrimary ? "blue" : isSecondary ? "gray" : "black",
        margin: "0.5rem 0",
        ...style,
      }}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onInput={(e) => setText(e.currentTarget.textContent)}
    >
      {text}
    </p>
  );
};

export default Descr;
