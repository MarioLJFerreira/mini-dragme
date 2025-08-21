// BoardContext: provides columns and tasks state for the Kanban board.
// Exposes helpers to add tasks, move tasks, and lock/unlock columns.
import { createContext, useCallback, useContext, useMemo, useState } from "react";

// BoardContext - Manages the state for the current board (tasks, columns, etc.)

const BoardContext = createContext(null);

// Define a simple starter board to render immediately
function createInitialColumns() {
  return [
    {
      id: "column-todo",
      title: "To Do",
      locked: false,
      tasks: [
        {
          id: "task-sample-1",
          title: "Set up project structure",
          description: "Scaffold initial components and contexts",
          tags: ["setup", "project"],
        },
      ],
    },
    {
      id: "column-in-progress",
      title: "In Progress",
      locked: false,
      tasks: [],
    },
    {
      id: "column-done",
      title: "Done",
      locked: false,
      tasks: [],
    },
  ];
}

export function BoardProvider({ children }) {
  const [columns, setColumns] = useState(createInitialColumns);

  // Append a task to the end of a column
  const addTask = useCallback((columnId, newTaskInput) => {
    setColumns((prevColumns) => {
      return prevColumns.map((column) => {
        if (column.id !== columnId) return column;

        const taskId = `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const taskToAdd = {
          id: taskId,
          title: newTaskInput?.title || "New Task",
          description: newTaskInput?.description || "",
          tags: Array.isArray(newTaskInput?.tags) ? newTaskInput.tags : [],
        };

        return { ...column, tasks: [...column.tasks, taskToAdd] };
      });
    });
  }, []);

  // Move a task from one column to another (or reorder within a column)
  const moveTask = useCallback((fromColumnId, toColumnId, taskId, toIndex) => {
    setColumns((prev) => {
      const next = prev.map((c) => ({ ...c, tasks: [...c.tasks] }));
      const fromCol = next.find((c) => c.id === fromColumnId);
      const toCol = next.find((c) => c.id === toColumnId);
      if (!fromCol || !toCol) return prev;
      const taskIdx = fromCol.tasks.findIndex((t) => t.id === taskId);
      if (taskIdx === -1) return prev;
      const [task] = fromCol.tasks.splice(taskIdx, 1);
      const insertAt = typeof toIndex === "number" ? toIndex : toCol.tasks.length;
      toCol.tasks.splice(insertAt, 0, task);
      return next;
    });
  }, []);

  // Lock/unlock a column to disable editing and DnD
  const toggleColumnLock = useCallback((columnId) => {
    setColumns((prev) =>
      prev.map((c) => (c.id === columnId ? { ...c, locked: !c.locked } : c))
    );
  }, []);

  const value = useMemo(
    () => ({ columns, setColumns, addTask, moveTask, toggleColumnLock }),
    [columns, addTask, moveTask, toggleColumnLock]
  );

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

export function useBoard() {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error("useBoard must be used within a BoardProvider");
  return ctx;
}

export default BoardContext;