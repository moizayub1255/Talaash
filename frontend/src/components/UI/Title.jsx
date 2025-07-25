import React from "react";

const Title = ({
  children,
  size = "2",
  isUppercase,
  isShowButton,
  onClick,
  style,
}) => {
  const [text, setText] = React.useState(children);
  return (
    <div style={{ margin: "1rem 0", ...style }}>
      <h2
        style={{
          fontSize: `${size}rem`,
          textTransform: isUppercase ? "uppercase" : "none",
        }}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        onInput={(e) => setText(e.currentTarget.textContent)}
      >
        {text}
        {isShowButton && (
          <button style={{ marginLeft: "1rem" }} onClick={onClick}>
            +
          </button>
        )}
      </h2>
    </div>
  );
};

export default Title;
