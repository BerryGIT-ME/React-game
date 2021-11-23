export function isGreenSprite(rowIndex, colIndex, greenSprite) {
  const { greenSpriteRow, greenSpriteCol } = greenSprite;

  for (let i = 0; i < greenSpriteRow.length; i++)
    if (greenSpriteRow[i] === rowIndex && greenSpriteCol[i] === colIndex)
      return true;

  return false;
}
