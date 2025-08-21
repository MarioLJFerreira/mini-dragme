import Board from "/src/components/board/Board.jsx";
import { BoardProvider } from "/src/context/BoardContext.jsx";

function ProjectView() {
  return (
    <BoardProvider>
      <Board />
    </BoardProvider>
  );
}

export default ProjectView;