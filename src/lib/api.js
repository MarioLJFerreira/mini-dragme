import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";



/**
 * Fetches a board for a given user.
 * @param {string} userId The user's ID.
 * @param {string} boardId The board's ID.
 * @returns {Promise<object|null>} The board data or null if not found.
 */
export async function getBoard(userId, boardId) {
  const boardDocRef = doc(db, `users/${userId}/boards/${boardId}`);
  const boardSnap = await getDoc(boardDocRef);
  return boardSnap.exists() ? boardSnap.data() : null;
}



/**
 * Creates a default board for a new user.
 * @param {string} userId The user's ID.
 */
export async function createDefaultBoard(userId) {
  const defaultBoard = {
    name: "My First Board",
    columns: [
      {
        id: "column-todo",
        title: "To Do",
        locked: false,
        tasks: [
          {
            id: "task-sample-1",
            title: "Welcome to your new board!",
            description: "You can drag this task to other columns.",
            tags: ["welcome"],
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
    ],
  };
  // The default board will have a fixed ID of "default"
  const boardDocRef = doc(db, `users/${userId}/boards/default`);
  await setDoc(boardDocRef, defaultBoard);
}




/**
 * Updates a board's data.
 * @param {string} userId The user's ID.
 * @param {string} boardId The board's ID.
 * @param {object} boardData The data to update.
 */
export async function updateBoard(userId, boardId, boardData) {
  const boardDocRef = doc(db, `users/${userId}/boards/${boardId}`);
  await updateDoc(boardDocRef, boardData);
}
 