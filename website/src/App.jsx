import Home from "./assets/pages/home";
import InsertionSortVisualizer from "./assets/algorithms/insertion_sort";
import LinearSearch from "./assets/algorithms/linearsearch";
import BubbleSortVisualizer from "./assets/algorithms/bubble_sort";
import BinarySearchVisualization from "./assets/algorithms/Binary_Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insertion" element={<InsertionSortVisualizer />} />
          <Route path="/linearsearch" element={<BinarySearchVisualization />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
