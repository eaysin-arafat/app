import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import TutorialList from "./components/TutorialList";
import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";

function App() {
  return (
    <Router>
      <nav>
        <h3>bezKoder</h3>
        <div>
          <li>
            <Link to="/tutorials">Tutorials</Link>
          </li>
          <li>
            <Link to="/add">Add</Link>
          </li>
        </div>
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<TutorialList />} />
          <Route path="/tutorials" element={<TutorialList />} />
          <Route path="/add" element={<AddTutorial />} />
          <Route path="/tutorials/:id" element={<Tutorial />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
