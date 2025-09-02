import styles from "/src/styles/cards.module.css";
import EditableText from "../ui/EditableText";
import { useBoard } from "../../context/BoardContext";

export default function ColumnHeader({ column }) {
  const { updateColumnTitle, toggleColumnLock, deleteColumn } = useBoard();

  const handleTitleSave = (newTitle) => {
    updateColumnTitle(column.id, newTitle);
  };

  const handleDeleteColumn = () => {
    if (
      window.confirm(`Are you sure you want to delete the column "${column.title}"?`)
    ) {
      deleteColumn(column.id);
    }
  };

  return (
    <div className={styles.columnHeader}>
      <EditableText
        initialValue={column.title}
        onSave={handleTitleSave}
        disabled={column.locked}
      />
      <div className={styles.columnActions}>
        <button
          className={styles.lockButton}
          title={column.locked ? "Unlock column" : "Lock column"}
          onClick={() => toggleColumnLock(column.id)}
          aria-pressed={column.locked}
        >
          {column.locked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
            </svg>
          )}
        </button>
        <button
          className={styles.deleteButton}
          onClick={handleDeleteColumn}
          title="Delete column"
          disabled={column.locked}
        >
          x
        </button>
      </div>
    </div>
  );
}