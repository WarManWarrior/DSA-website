import Home from "./assets/pages/home";
import InsertionSortVisualizer from "./assets/algorithms/insertion_sort";
import LinearSearch from "./assets/algorithms/linearsearch";
import BubbleSortVisualizer from "./assets/algorithms/bubble_sort";
import BinarySearchVisualization from "./assets/algorithms/Binary_Search";
import MergeSortVisualizer from "./assets/algorithms/Merge_sort";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StrassenMatrixVisualization from "./assets/algorithms/Strassen_Matrix";
import HuffmanCodingVisualization from "./assets/algorithms/Huffman_coding";
import KnapsackVisualization from "./assets/algorithms/Kanpsack_Greedy";
import CodeEditor from "./assets/page_components/CodeEditor";
import ConvexHullVisualizer from "./assets/algorithms/ConvexHull";
import QuickSort from "./assets/algorithms/quicksort";
import LinearSearchApp from "./assets/algorithms/LinearSearchApp";




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
