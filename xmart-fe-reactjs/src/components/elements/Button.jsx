import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} style={styles.button}>
      {text}
    </button>
  );
};

const styles = {
  button: {
    padding: "10px 20px",
    margin: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Button;
