// Board: renders all columns in a grid and provides DnD context
// Note: We use react-dnd with the HTML5 backend for browser drag-and-drop
import { useBoard } from "/src/context/BoardContext.jsx";
import BoardColumn from "/src/components/board/BoardColumn.jsx";
import styles from "/src/styles/cards.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Board() {
  // Read columns from context (single source of truth)
  const { columns } = useBoard();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.board}>
        {columns.map((column) => (
          <BoardColumn key={column.id} column={column} />
        ))}
      </div>
    </DndProvider>
  );
}

export default Board;