import React from "react";
import { useGame } from "../../context/useGameContext";
import Cell from "../Cell/Cell";

import "./row.css";

function Row({ rowIndex }) {
  const { gameDimension } = useGame();
  const cells = new Array(gameDimension.colLength).fill(0);
  return (
    <div className="row">
      {cells.map((cell, index) => (
        <Cell key={index} rowIndex={rowIndex} colIndex={index} />
      ))}
    </div>
  );
}

export default Row;
