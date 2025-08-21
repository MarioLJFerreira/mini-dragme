// TaskCard: displays a single task with title, optional description and tags
// It can be dragged between columns using react-dnd
import styles from "/src/styles/cards.module.css";
import { useDrag } from "react-dnd";

function TaskCard({ task, columnColor }) {
  if (!task) return null;

  // Configure the card as a draggable source
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "TASK_CARD",
      item: { taskId: task.id },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [task?.id]
  );

  return (
    <div
      ref={dragRef}
      className={styles.card}
      data-task-id={task.id}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className={styles.cardTitle}>{task.title}</div>
      {task.description ? (
        <div className={styles.cardDescription}>{task.description}</div>
      ) : null}
      {Array.isArray(task.tags) && task.tags.length > 0 ? (
        <div className={styles.tagList}>
          {task.tags.map((tag) => (
            <span key={tag} className={styles.tag} style={{ background: columnColor?.bg, color: columnColor?.fg }}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default TaskCard;