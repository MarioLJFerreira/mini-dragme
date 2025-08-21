import { useCallback } from "react";
// AddTaskCard: simple button that prompts for a task title and tags
// Keeps UX minimal while you study React; can be replaced with a proper modal later
import { useBoard } from "/src/context/BoardContext.jsx";
import styles from "/src/styles/cards.module.css";

function AddTaskCard({ columnId }) {
  const { addTask } = useBoard();

  const handleAdd = useCallback(() => {
    const title = window.prompt("Task title");
    if (!title) return;
    const tagsInput = window.prompt("Tags (comma separated)") || "";
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    addTask(columnId, { title, tags });
  }, [addTask, columnId]);

  return (
    <button type="button" className={styles.addTaskButton} onClick={handleAdd}>
      + Add task
    </button>
  );
}

export default AddTaskCard;