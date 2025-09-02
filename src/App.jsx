import "./App.css";
import Header from "./components/layout/Header";
import ProjectView from "./pages/ProjectView";
import { useAuth } from "./context/AuthContext";
import WelcomePage from "./pages/WelcomePage";
import { BoardProvider } from "./context/BoardContext";

function App() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BoardProvider>
      <Header />
      {currentUser ? <ProjectView /> : <WelcomePage />}
    </BoardProvider>
  );
}

export default App;
