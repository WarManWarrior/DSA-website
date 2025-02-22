import Home from "./assets/pages/home";
import LinearSearch from "./assets/page_components/linearsearch";
import BubbleSortVisualizer from "./assets/algorithms/bubble_sort";
import BinarySearchVisualization from "./assets/algorithms/Binary_Search";
import MergeSortVisualizer from "./assets/algorithms/Merge_sort";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StrassenMatrixVisualization from "./assets/algorithms/Strassen_Matrix";
import HuffmanCodingVisualization from "./assets/algorithms/Huffman_coding";
import KnapsackVisualization from "./assets/algorithms/Knapsack_Greedy";
import CodeEditor from "./assets/page_components/CodeEditor";
import ConvexHullVisualizer from "./assets/algorithms/ConvexHull";
import LinearSearchApp from "./assets/algorithms/LinearSearchApp";
import ExperimentsPage from "./assets/pages/Experiments";
import RandomizedQuickSort from "./assets/algorithms/randomizedquicksort";
import TravellingSalesmanProblem from "./assets/algorithms/TravellingSalesmanProblem";
import NQueensVisualizer from "./assets/algorithms/NqueensProblem";
import LCSVisualizer from "./assets/algorithms/LCS";
import StringMatchingVisualizer from "./assets/algorithms/StringMatching";
import Nqueen from "./assets/page_components/nqueen";
import Binarysearch from "./assets/page_components/binarysearch";
import Bubblesort from "./assets/page_components/bubblesort";
import Factionalknapsack from "./assets/page_components/factionalknapsack";
import Findingmaxandmin from "./assets/page_components/findingmaxandmin";
import Huffmantree from "./assets/page_components/huffmantree";
import Insertionsort from "./assets/page_components/insertionsort";
import Largestcommonsubs from "./assets/page_components/largestcommonsubs";
import Mergesort from "./assets/page_components/mergesort";
import Quicksort from "./assets/page_components/quicksort";
import Strassenmatrix from "./assets/page_components/strassensmatrix";
import Largestsubarraysum from "./assets/page_components/largestsubarraysum";





function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/introduction" element={<Nqueen />} />
          <Route path="/explist" element={<ExperimentsPage/>} />
          <Route path="/sorting/insertion-sort" element={<Insertionsort />} />
          <Route path="/sorting/bubble-sort" element={<Bubblesort />} />
          <Route path="/searching/linear-search" element={<LinearSearch />} />
          <Route path="/searching/binary-search" element={<Binarysearch />} />
          <Route path="/divide-conquer/merge-sort" element={<Mergesort />} />
          <Route path="/divide-conquer/quick-sort" element={<Quicksort />} />
          <Route path="/divide-conquer/strassen-matrix" element={<Strassenmatrix />} />
          <Route path="/divide-conquer/largest-subarray-sum" element={<Largestsubarraysum />} />
          <Route path="/divide-conquer/find-max-min" element={<Findingmaxandmin />} />
          <Route path="/greedy/huffman-tree" element={<Huffmantree />} />
          <Route path="/greedy/fractional-knapsack" element={<Factionalknapsack />} />
          <Route path="/greedy/prims-algorithm" element={<LinearSearch />} />
          <Route path="/greedy/kruskals-algorithm" element={<LinearSearch />} />
          <Route path="/dynamic-programming/lcs" element={<Largestcommonsubs />} />
          <Route path="/backtracking/n-queens" element={<Nqueen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
