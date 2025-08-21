import "./App.css";
import Header from "./components/layout/Header";
import ProjectView from "./pages/ProjectView";
import { useAuth } from "./context/AuthContext";
import WelcomePage from "./pages/WelcomePage";

function App() {
  const { userLoggedIn } = useAuth();
  return (
    <>
      <Header />
      {userLoggedIn ? <ProjectView /> : <WelcomePage />}
    </>
  );
}

export default App;
