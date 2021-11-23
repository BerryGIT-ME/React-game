import React from "react";
import { useGame } from "../../context/useGameContext";
import { isGreenSprite } from "../../utils/isGreenSprite";
import "./cell.css";

function Cell({ rowIndex, colIndex }) {
  const {
    gameDimension: { center },
    greenSprite,
  } = useGame();

  const greenCheck = isGreenSprite(rowIndex, colIndex, greenSprite);
  const isCenter = rowIndex === center.rowIndex && colIndex === center.colIndex;
  return (
    <div
      className={`cell ${isCenter && "center"} ${greenCheck && "green-sprite"}`}
    ></div>
  );
}

export default Cell;
