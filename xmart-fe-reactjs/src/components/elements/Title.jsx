import React from "react";

const Title = ({ text }) => {
  return <h1 style={styles.title}>{text}</h1>;
};

const styles = {
  title: {
    fontSize: "36px",
    marginBottom: "20px",
  },
};

export default Title;
