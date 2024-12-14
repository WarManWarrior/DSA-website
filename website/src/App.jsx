import Home from "./assets/pages/home";
import InsertionSortVisualizer from "./assets/algorithms/insertion_sort";
import LinearSearch from "./assets/algorithms/linearsearch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insertion" element={<InsertionSortVisualizer />} />
          <Route path="/linearsearch" element={<LinearSearch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
