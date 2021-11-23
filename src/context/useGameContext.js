import { useContext, useState, createContext, useEffect } from "react";
import generateRandomPair from "./../utils/randomPair";

const GameContext = createContext();

function GameProvider({ children }) {
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
    const greenSprite = generateRandomPair({ rowLength, center });
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
