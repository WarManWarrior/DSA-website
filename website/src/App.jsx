import Home from "./assets/pages/home"
import InsertionSortVisualizer from "./assets/algorithms/insertion_sort";
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter} from 'react-router-dom';
function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/insertion" element={<InsertionSortVisualizer/>}/>
      </Routes>
      </BrowserRouter>
</div>

  )
};

export default App
