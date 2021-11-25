export default function generateRandomPairs({ rowLength, center }) {
  const greenSpriteRow = new Array(rowLength);
  const greenSpriteCol = new Array(rowLength);

  const forbiddenRow = [center.rowIndex];
  const forbiddenCol = [center.colIndex];

  for (let i = 0; i < rowLength; i++) {
    // generate random values for the green sprite's location
    let [randRow, randCol] = getRandomValues(
      rowLength,
      forbiddenRow,
      forbiddenCol
    );

    greenSpriteCol[i] = randCol;
    greenSpriteRow[i] = randRow;

    // update the array of forbidden values to prevent repetition when generating random values
    forbiddenRow.push(randRow);
    forbiddenCol.push(randCol);
  }

  return {
    greenSpriteRow,
    greenSpriteCol,
  };
}

function getRandomValues(upperLimit, forbiddenRow, forbiddenCol) {
  let randRow;
  let randCol;

  do {
    randRow = Math.floor(Math.random() * upperLimit);
    randCol = Math.floor(Math.random() * upperLimit);
  } while (isDuplicate(randRow, randCol, forbiddenRow, forbiddenCol));
  return [randRow, randCol];
}

export function isDuplicate(row, col, forbiddenRow, forbiddenCol) {
  for (let i = 0; i < forbiddenCol.length; i++)
    if (forbiddenCol[i] === col && forbiddenRow[i] === row) return true;

  return false;
}
