import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter} from 'react-router-dom';

function Banner() {
    return (<div class="flex items-center justify-center h-[calc(100vh-4rem)] overflow-hidden text-center">
        <div className="bg-black text-white bg-opacity-70 p-7 rounded-xl space-y-2">
            <h1 className="text-5xl">SRM Institute of Science and Technology</h1>
            <h2 className="text-2xl">Department of Computational Intelligence</h2>
            <h2 className="text-2xl">School of Computing,<br />
                College of Engineering and Technology</h2>
            <h2 className="text-2xl">21CSC204J-DESIGN AND ANALYSIS OF ALGORITHMS VIRTUAL LAB</h2>
            <div className="flex items-center justify-center gap-x-8 text-black">
                <Link to="/introduction" className="text-2xl bg-yellow-300 p-2 rounded-xl hover:bg-yellow-500">Introduction</Link>
                <Link to="/explist" className="text-2xl bg-yellow-300 p-2 rounded-xl hover:bg-yellow-500">List of Experiments</Link>
            </div>
        </div>
    </div>)
}

export default Banner