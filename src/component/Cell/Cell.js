import React from "react";
import { useGame } from "../../context/useGameContext";
import "./cell.css";

function Cell({ rowIndex, colIndex }) {
  const {
    gameDimension: { center },
  } = useGame();
  const isCenter = rowIndex === center.rowIndex && colIndex === center.colIndex;
  return <div className={`cell ${isCenter && "center"}`}></div>;
}

export default Cell;
