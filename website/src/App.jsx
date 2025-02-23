import Home from "./assets/pages/home";
import LinearSearch from "./assets/page_components/linearsearch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExperimentsPage from "./assets/pages/Experiments";
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
import Stringmatching from "./assets/page_components/stringmatching";
import Randomizedquicksort from "./assets/page_components/randomizedquicksort";
import Travellingsalesman from "./assets/page_components/travellingsalesman";





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
          <Route path="/sorting/randomized-quick-sort" element={<Randomizedquicksort />} />
          <Route path="/searching/linear-search" element={<LinearSearch />} />
          <Route path="/searching/binary-search" element={<Binarysearch />} />
          <Route path="/divide-conquer/merge-sort" element={<Mergesort />} />
          <Route path="/divide-conquer/quick-sort" element={<Quicksort />} />
          <Route path="/divide-conquer/strassen-matrix" element={<Strassenmatrix />} />
          <Route path="/divide-conquer/largest-subarray-sum" element={<Largestsubarraysum />} />
          <Route path="/divide-conquer/find-max-min" element={<Findingmaxandmin />} />
          <Route path="/greedy/huffman-tree" element={<Huffmantree />} />
          <Route path="/greedy/fractional-knapsack" element={<Factionalknapsack />} />
          <Route path="/greedy/salesman-problem" element={<Travellingsalesman />} />
          <Route path="/dynamic-programming/lcs" element={<Largestcommonsubs />} />
          <Route path="/dynamic-programming/lcs" element={<Largestcommonsubs />} />
          <Route path="/dynamic-programming/sma" element={<Stringmatching />} />
          <Route path="/backtracking/n-queens" element={<Nqueen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
