import { useContext, useState, createContext, useEffect } from "react";
import { moveCenter } from "../utils/moveSprites";
import generateRandomPairs, { isDuplicate } from "./../utils/randomPair";

const GameContext = createContext();

function GameProvider({ children }) {
  const [moveCount, setMoveCount] = useState(0);
  const [greenSprite, setGreenSprite] = useState({
    greenSpriteRow: [],
    greenSpriteCol: [],
  });
  const [gameDimension, setGameDimension] = useState({
    rowLength: 0,
    colLength: 0,
    center: {
      rowIndex: 0,
      colIndex: 0,
    },
  });

  useEffect(() => {
    const handlekeydown = (e) => {
      const gameDimensionCopy = { ...gameDimension };
      const newCenter = moveCenter(gameDimensionCopy, e.key);

      const { rowIndex, colIndex } = gameDimensionCopy.center;
      const { greenSpriteRow, greenSpriteCol } = { ...greenSprite };

      if (isDuplicate(rowIndex, colIndex, greenSpriteRow, greenSpriteCol)) {
        let matchIndex;
        for (let i = 0; i < greenSpriteRow.length; i++) {
          if (
            rowIndex === greenSpriteRow[i] &&
            colIndex === greenSpriteCol[i]
          ) {
            matchIndex = i;
          }
        }
        greenSpriteRow.splice(matchIndex, 1);
        greenSpriteCol.splice(matchIndex, 1);
      }
      const validMoves = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      if (validMoves.includes(e.key))
        setMoveCount((moveCount) => moveCount + 1);

      if (greenSpriteCol.length === 0)
        alert(`you have completed the game in ${moveCount} moves`);
      setGreenSprite({ greenSpriteRow, greenSpriteCol });
      setGameDimension({ ...gameDimension, center: newCenter });
    };

    // event handler for moving the sprites in the game
    document.addEventListener("keydown", handlekeydown);

    return () => {
      document.removeEventListener("keydown", handlekeydown);
    };
  }, [gameDimension, greenSprite, moveCount]);

  useEffect(() => {
    let rowLength, colLength;

    while (isNaN(rowLength) || isNaN(colLength)) {
      try {
        rowLength = parseInt(prompt("Please enter the number of rows"));
        colLength = parseInt(prompt("Please enter the number of columns"));

        if (isNaN(rowLength) || isNaN(colLength)) throw new Error();
      } catch (error) {
        alert(
          "Please make sure your inputs for the row/columns are valid numbers"
        );
      }
    }

    const center = {
      rowIndex: Math.floor(rowLength / 2),
      colIndex: Math.floor(colLength / 2),
    };

    const greenSprite = generateRandomPairs({ rowLength, center });

    setGameDimension({ rowLength, colLength, center });
    setGreenSprite(greenSprite);
  }, []);

  return (
    <GameContext.Provider value={{ gameDimension, greenSprite }}>
      {children}
    </GameContext.Provider>
  );
}

export function withGameContext(Component) {
  return function WithGameContext(props) {
    return (
      <GameProvider>
        <Component {...props} />
      </GameProvider>
    );
  };
}

export function useGame() {
  return useContext(GameContext);
}

export default GameProvider;
