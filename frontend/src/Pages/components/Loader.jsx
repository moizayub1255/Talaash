import React from "react";

const Loader = () => {
  return (
    <div style={styles.overlay}>
      <img src="/GREEN (1).gif" alt="Loading..." style={styles.gif} />
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  gif: {
    width: "400px",
    height: "400px",
  },
};

export default Loader;
