import React from "react";
import Descr from "./Descr";

const Range = () => {
  const [value, setValue] = React.useState(90);
  const [name, setName] = React.useState("Skill Name");
  return (
    <div style={{ display: "inline-block", width: "33%", margin: "0.4rem 0" }}>
      <Descr>
        {name} - {value}
      </Descr>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "60%", marginRight: "0.5rem" }}
      />
      <input
        type="range"
        min="0"
        max="100"
        step="10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: "97%", height: "6px", margin: "0 0.4rem" }}
      />
    </div>
  );
};

export default Range;
