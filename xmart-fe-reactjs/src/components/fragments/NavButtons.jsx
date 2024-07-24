import React from "react";
import Button from "../elements/Button";
import { useNavigate } from "react-router-dom";

const NavButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="navButtonContainer">
      <Button
        className="navButton"
        text="Shopping"
        onClick={() => navigate("/shopping")}
      />
      <Button
        className="navButton"
        text="Market Info"
        onClick={() => navigate("/market-info")}
      />
      <Button
        className="navButton"
        text="Transaction History"
        onClick={() => navigate("/transaction-history")}
      />
    </div>
  );
};

export default NavButtons;
