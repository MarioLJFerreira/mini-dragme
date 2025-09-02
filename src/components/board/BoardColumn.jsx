import ColumnHeader from "/src/components/board/ColumnHeader.jsx";
// BoardColumn: shows the column title, its task list, and an add button
// It also acts as a drop target for task cards using react-dnd
import TaskCard from "/src/components/board/TaskCard.jsx";
import AddTaskCard from "/src/components/board/AddTaskCard.jsx";
import styles from "/src/styles/cards.module.css";
import { useDrop } from "react-dnd";
import { useBoard } from "/src/context/BoardContext.jsx";

function BoardColumn({ column }) {
  if (!column) return null;

  // Access board actions and current state
  const { columns, moveTask } = useBoard();
  // Configure the column as a drop target
  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: "TASK_CARD",
      canDrop: () => !column.locked,
      drop: (item, monitor) => {
        if (monitor.didDrop()) return;
        const taskId = item.taskId;
        let fromColumnId = undefined;
        for (const c of columns) {
          if (c.tasks.some((t) => t.id === taskId)) {
            fromColumnId = c.id;
            break;
          }
        }
        if (!fromColumnId) return;
        if (fromColumnId === column.id) return; // ignore drop on same column container for now
        moveTask(fromColumnId, column.id, taskId);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }),
    [column.locked, column.id, columns]
  );

  return (
    <div
      className={`${styles.column} ${column.locked ? styles.columnLocked : ""}`}
      data-column-id={column.id}
    >
      <ColumnHeader column={column} />
      <div
        ref={dropRef}
        className={styles.columnBody}
        style={{ outline: isOver && canDrop ? `2px dashed var(--buttonBorder)` : "none" }}
      >
        {Array.isArray(column.tasks) && column.tasks.length > 0 ? (
          column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} isLocked={column.locked} />
          ))
        ) : (
          <div className={styles.emptyState}>
            {column.locked ? "Editing disabled - column is locked" : "No tasks yet"}
          </div>
        )}
      </div>
      <div className={styles.columnFooter}>
        {!column.locked && <AddTaskCard columnId={column.id} />}
      </div>
      {column.locked && (
        <div className={styles.columnLockedNotice}>
          Column is locked - drag and drop disabled
        </div>
      )}
    </div>
  );
}

export default BoardColumn;
