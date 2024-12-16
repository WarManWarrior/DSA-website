import Home from "./assets/pages/home";
import InsertionSortVisualizer from "./assets/algorithms/insertion_sort";
import LinearSearch from "./assets/algorithms/linearsearch";
import BubbleSortVisualizer from "./assets/algorithms/bubble_sort";
import BinarySearchVisualization from "./assets/algorithms/Binary_Search";
import SortingVisualizer from "./assets/algorithms/Merge_sort";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StrassenMatrixVisualization from "./assets/algorithms/Strassen_Matrix";
import HuffmanCodingVisualization from "./assets/algorithms/Huffman_coding";
import KnapsackVisualization from "./assets/algorithms/Kanpsack_Greedy";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insertion" element={<InsertionSortVisualizer />} />
          <Route path="/linearsearch" element={<KnapsackVisualization />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
