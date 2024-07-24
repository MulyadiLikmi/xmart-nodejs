import React from "react";

const Header = () => {
  return (
    <header style={styles.header}>
      <h2>X-Mart</h2>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#282c34",
    padding: "20px",
    color: "white",
    textAlign: "center",
  },
};

export default Header;
