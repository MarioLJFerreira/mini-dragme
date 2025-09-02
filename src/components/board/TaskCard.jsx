import styles from "/src/styles/cards.module.css";
import { useDrag } from "react-dnd";
import EditableText from "../ui/EditableText";
import { useBoard } from "../../context/BoardContext";
import { useState } from "react";

function TaskCard({ task, isLocked }) {
  if (!task) return null;
  const { updateTask, deleteTask } = useBoard();
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  // Configure the card as a draggable source
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "TASK_CARD",
      item: { taskId: task.id },
      canDrag: !isLocked,
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [task?.id, isLocked]
  );

  const handleTitleSave = (newTitle) => {
    updateTask(task.id, { ...task, title: newTitle });
  };

  const handleDescriptionSave = (newDescription) => {
    updateTask(task.id, { ...task, description: newDescription });
    setIsEditingDescription(false);
  };

  const handleAddTag = () => {
    const tagsInput = prompt("Enter tag names, separated by commas:");
    if (tagsInput) {
      const newTags = tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      if (newTags.length > 0) {
        const updatedTags = [...(task.tags || []), ...newTags];
        updateTask(task.id, { ...task, tags: updatedTags });
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const newTags = task.tags.filter((tag) => tag !== tagToRemove);
    updateTask(task.id, { ...task, tags: newTags });
  };

  const handleDeleteTask = () => {
    if (window.confirm(`Are you sure you want to delete the task "${task.title}"?`)) {
      deleteTask(task.id);
    }
  };

  return (
    <div
      ref={dragRef}
      className={`${styles.card} ${isLocked ? styles.cardLocked : ""}`}
      data-task-id={task.id}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className={styles.cardHeader}>
        <EditableText
          initialValue={task.title}
          onSave={handleTitleSave}
          className={styles.cardTitle}
          disabled={isLocked}
        />
        <button
          className={styles.deleteTaskButton}
          onClick={handleDeleteTask}
          disabled={isLocked}
        >
          x
        </button>
      </div>

      <div className={styles.cardDescription}>
        {isEditingDescription && !isLocked ? (
          <EditableText
            initialValue={task.description || ""}
            onSave={handleDescriptionSave}
            startInEditMode={true}
          />
        ) : task.description ? (
          <EditableText
            initialValue={task.description}
            onSave={handleDescriptionSave}
            disabled={isLocked}
          />
        ) : (
          <button
            className={styles.addDescriptionButton}
            onClick={() => setIsEditingDescription(true)}
            disabled={isLocked}
          >
            + Add Description
          </button>
        )}
      </div>

      <div className={styles.tagList}>
        {Array.isArray(task.tags) &&
          task.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
              <button
                className={styles.removeTagButton}
                onClick={() => handleRemoveTag(tag)}
                disabled={isLocked}
              >
                x
              </button>
            </span>
          ))}
        <button
          className={styles.addTagButton}
          onClick={handleAddTag}
          disabled={isLocked}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
