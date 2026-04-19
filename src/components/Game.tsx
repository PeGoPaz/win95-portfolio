
import { Button } from "@react95/core";
import { useMemo, useState } from "react";

const ROWS = 8;
const COLS = 8;
const MINES = 10;

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

type Board = Cell[][];

const createEmptyBoard = (): Board =>
  Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    })),
  );

const inBounds = (row: number, col: number) =>
  row >= 0 && row < ROWS && col >= 0 && col < COLS;

const getNeighbors = (row: number, col: number) => {
  const neighbors: Array<[number, number]> = [];

  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
      if (rowOffset === 0 && colOffset === 0) continue;
      const nextRow = row + rowOffset;
      const nextCol = col + colOffset;
      if (inBounds(nextRow, nextCol)) neighbors.push([nextRow, nextCol]);
    }
  }

  return neighbors;
};

const createBoard = (): Board => {
  const board = createEmptyBoard();
  let planted = 0;

  while (planted < MINES) {
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);
    if (board[row][col].isMine) continue;
    board[row][col].isMine = true;
    planted += 1;
  }

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      if (board[row][col].isMine) continue;
      board[row][col].adjacentMines = getNeighbors(row, col).filter(
        ([nRow, nCol]) => board[nRow][nCol].isMine,
      ).length;
    }
  }

  return board;
};

const revealAll = (board: Board): Board =>
  board.map((row) => row.map((cell) => ({ ...cell, isRevealed: true })));

const revealConnectedEmptyCells = (board: Board, startRow: number, startCol: number): Board => {
  const next = board.map((row) => row.map((cell) => ({ ...cell })));
  const queue: Array<[number, number]> = [[startRow, startCol]];

  while (queue.length > 0) {
    const [row, col] = queue.shift() as [number, number];
    const cell = next[row][col];
    if (cell.isRevealed || cell.isFlagged) continue;

    cell.isRevealed = true;
    if (cell.adjacentMines !== 0) continue;

    getNeighbors(row, col).forEach(([nRow, nCol]) => {
      const neighbor = next[nRow][nCol];
      if (!neighbor.isRevealed && !neighbor.isMine) queue.push([nRow, nCol]);
    });
  }

  return next;
};

function Game() {
  const [board, setBoard] = useState<Board>(() => createBoard());
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");

  const remainingSafeCells = useMemo(
    () =>
      board
        .flat()
        .filter((cell) => !cell.isMine && !cell.isRevealed).length,
    [board],
  );

  const resetGame = () => {
    setBoard(createBoard());
    setStatus("playing");
  };

  const revealCell = (row: number, col: number) => {
    if (status !== "playing") return;
    const cell = board[row][col];
    if (cell.isFlagged || cell.isRevealed) return;

    if (cell.isMine) {
      setBoard(revealAll(board));
      setStatus("lost");
      return;
    }

    const nextBoard = revealConnectedEmptyCells(board, row, col);
    setBoard(nextBoard);

    const nextRemaining = nextBoard
      .flat()
      .filter((nextCell) => !nextCell.isMine && !nextCell.isRevealed).length;

    if (nextRemaining === 0) {
      setStatus("won");
      setBoard(revealAll(nextBoard));
    }
  };

  const toggleFlag = (row: number, col: number) => {
    if (status !== "playing") return;
    const cell = board[row][col];
    if (cell.isRevealed) return;

    setBoard((prev) =>
      prev.map((currentRow, rowIndex) =>
        currentRow.map((currentCell, colIndex) =>
          rowIndex === row && colIndex === col
            ? { ...currentCell, isFlagged: !currentCell.isFlagged }
            : currentCell,
        ),
      ),
    );
  };

  const statusText =
    status === "won" ? "You won!" : status === "lost" ? "Game over" : "Playing";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>{statusText}</span>
        <span>Safe cells: {remainingSafeCells}</span>
        <Button onClick={resetGame}>New Game</Button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 40px)`,
          gap: "2px",
          background: "#808080",
          width: "fit-content",
          padding: "4px",
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              type="button"
              onClick={() => revealCell(rowIndex, colIndex)}
              onContextMenu={(event) => {
                event.preventDefault();
                toggleFlag(rowIndex, colIndex);
              }}
              style={{
                width: "40px",
                height: "40px",
                border: "2px outset #c0c0c0",
                background: cell.isRevealed ? "#d4d0c8" : "#c0c0c0",
                fontWeight: "bold",
                cursor: status === "playing" ? "pointer" : "default",
                padding: 0,
              }}
            >
              {cell.isRevealed && cell.isMine && "*"}
              {!cell.isRevealed && cell.isFlagged && "F"}
              {cell.isRevealed && !cell.isMine && cell.adjacentMines > 0 && cell.adjacentMines}
            </button>
          )),
        )}
      </div>
      <small>Left click to reveal, right click to flag.</small>
    </div>
  );
}

export default Game;
