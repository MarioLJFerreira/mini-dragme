import Board from "/src/components/board/Board.jsx";
import { useBoard } from "/src/context/BoardContext.jsx";

function ProjectView() {
  const { loading } = useBoard();

  if (loading) {
    return <div>Loading board...</div>;
  }

  return <Board />;
}

export default ProjectView;
