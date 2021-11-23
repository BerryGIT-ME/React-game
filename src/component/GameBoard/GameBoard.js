import React from "react";
import Row from "../Row/Row";
import { useGame, withGameContext } from "../../context/useGameContext";

function GameBoard() {
  const { gameDimension } = useGame();

  const rows = new Array(gameDimension.rowLength).fill(0);
  return (
    <div>
      {rows.map((row, index) => (
        <Row key={index} rowIndex={index} />
      ))}
    </div>
  );
}

export default withGameContext(GameBoard);
