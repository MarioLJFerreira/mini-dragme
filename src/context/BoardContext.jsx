// BoardContext: provides columns and tasks state for the Kanban board.
// Exposes helpers to add tasks, move tasks, and lock/unlock columns.
import { createContext, useCallback, useContext, useMemo, useState, useEffect } from "react";
import { getBoard, createDefaultBoard, updateBoard } from "../lib/api";
import { useAuth } from "./AuthContext";

// BoardContext - Manages the state for the current board (tasks, columns, etc.)

const BoardContext = createContext(null);



export function BoardProvider({ children }) {
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const boardId = "default"; // Using a default board for now

    getBoard(currentUser.uid, boardId).then((board) => {
      if (board) {
        setColumns(board.columns);
      } else {
        createDefaultBoard(currentUser.uid).then(() => {
          getBoard(currentUser.uid, boardId).then((newBoard) => {
            if (newBoard) {
              setColumns(newBoard.columns);
            }
          });
        });
      }
      setLoading(false);
    });
  }, [currentUser]);

  const updateFirestoreBoard = (newColumns) => {
    if (currentUser) {
      const boardId = "default";
      updateBoard(currentUser.uid, boardId, { columns: newColumns });
    }
  };

  const addTask = useCallback((columnId, newTaskInput) => {
    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => {
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
      updateFirestoreBoard(newColumns);
      return newColumns;
    });
  }, [currentUser]);

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
      updateFirestoreBoard(next);
      return next;
    });
  }, [currentUser]);

  const toggleColumnLock = useCallback((columnId) => {
    setColumns((prev) => {
      const newColumns = prev.map((c) => (c.id === columnId ? { ...c, locked: !c.locked } : c));
      updateFirestoreBoard(newColumns);
      return newColumns;
    });
  }, [currentUser]);

  const addColumn = useCallback((columnName) => {
    const newColumn = {
      id: `column-${Date.now()}`,
      title: columnName,
      locked: false,
      tasks: [],
    };
    const newColumns = [...columns, newColumn];
    setColumns(newColumns);
    updateFirestoreBoard(newColumns);
  }, [columns, currentUser]);

  const updateColumnTitle = useCallback((columnId, newTitle) => {
    const newColumns = columns.map((column) =>
      column.id === columnId ? { ...column, title: newTitle } : column
    );
    setColumns(newColumns);
    updateFirestoreBoard(newColumns);
  }, [columns, currentUser]);

  const updateTask = useCallback((taskId, updatedTask) => {
    const newColumns = columns.map((column) => {
      const taskIndex = column.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) return column;
      const newTasks = [...column.tasks];
      newTasks[taskIndex] = updatedTask;
      return { ...column, tasks: newTasks };
    });
    setColumns(newColumns);
    updateFirestoreBoard(newColumns);
  }, [columns, currentUser]);

  const deleteTask = useCallback((taskId) => {
    const newColumns = columns.map((column) => {
      const newTasks = column.tasks.filter((task) => task.id !== taskId);
      return { ...column, tasks: newTasks };
    });
    setColumns(newColumns);
    updateFirestoreBoard(newColumns);
  }, [columns, currentUser]);

  const deleteColumn = useCallback((columnId) => {
    const newColumns = columns.filter((column) => column.id !== columnId);
    setColumns(newColumns);
    updateFirestoreBoard(newColumns);
  }, [columns, currentUser]);

  const value = useMemo(
    () => ({ columns, addTask, moveTask, toggleColumnLock, loading, addColumn, updateColumnTitle, updateTask, deleteTask, deleteColumn }),
    [columns, addTask, moveTask, toggleColumnLock, loading, addColumn, updateColumnTitle, updateTask, deleteTask, deleteColumn]
  );

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

export function useBoard() {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error("useBoard must be used within a BoardProvider");
  return ctx;
}

export default BoardContext;