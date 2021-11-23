export function moveCenter(gameDimension, direction) {
  const { rowLength, colLength, center } = gameDimension;
  if (direction === "ArrowUp") {
    center.rowIndex = center.rowIndex === 0 ? 0 : center.rowIndex - 1;
  }
  if (direction === "ArrowDown") {
    const lastIndex = rowLength - 1;
    center.rowIndex =
      center.rowIndex === lastIndex ? lastIndex : center.rowIndex + 1;
  }
  if (direction === "ArrowLeft") {
    center.colIndex = center.colIndex === 0 ? 0 : center.colIndex - 1;
  }
  if (direction === "ArrowRight") {
    const lastIndex = colLength - 1;
    center.colIndex =
      center.colIndex === lastIndex ? lastIndex : center.colIndex + 1;
  }

  return center;
}
